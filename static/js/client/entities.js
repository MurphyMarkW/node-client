/**
 *  Entities namespace.
 *  Manages world entities.
**/
(function ( ns ) {

    var entities = new Object();

    var ldb = new PouchDB('entities',{auto_compaction: true});
    var rdb = new PouchDB('http://localhost:5984/entities');

    var last = 0;

    rdb.replicate.to(ldb, {live: true});

    function modify (id) {
        console.log('Entity %s modified.', id);
        ldb.get(id).then( function (doc) {
            models.get(doc.model, function (err, model) {
                world.add(model);
                model.position.x = doc.position.x;
                model.position.y = doc.position.y;
                model.position.z = doc.position.z;
                entities[id] = {
                    model: model
                }
            });
        });
    }

    // Keep track of changes to the local database.
    ldb.changes({
        since: last,
        live: true
    }).on('change', function (c) {
        console.log('Entity change event: %s',c);
        last = c.seq > last ? c.seq : last;
    }).on('create', function (c) {
        modify(c.id);
    }).on('update', function (u) {
        modify(u.id);
    }).on('delete', function (d) {
        console.log('Entity delete event: %s',d);
        var model = entities[c.id].model;
        world.remove(model);
        delete entities[c.id];
    });

    ns.get = function (id, call) {
        // TODO get the specified entity
    }

    /*
    ns.ldb.changes({
        since: last,
        live: true
    }).on('change', function(c) {
        last = c.seq > last ? c.seq : last;
    }).on('create', function(c) {
        console.log('create event');
        console.log(c);
        ns.ldb.get(c.id).then(function(doc) {
            if (doc.type === 'cube') {
                var obj = new THREE.Mesh(geometry, material);
                objs[doc.id] = obj;
                client.scene.add(obj);
            }
        });
    }).on('update', function(u) {
        console.log('update event');
        console.log(u);
        ns.ldb.get(u.id).then(function(doc) {
            if (doc.type !== 'cube') return;
            if (!objs[u.id]) {
                var obj = new THREE.Mesh(geometry, material);
                objs[doc.id] = obj;
                client.scene.add(obj);
            }
            objs[u.id].position.x = doc.x
            objs[u.id].position.y = doc.y
            objs[u.id].position.z = doc.z
        });
    }).on('delete', function(d) {
        console.log('delete event');
        console.log(d);
        client.scene.remove(objs[d.id]);
        delete objs[d.id];
    });

    client.on('load', function () {

    });
    */

}( window.world = window.world || {} ));

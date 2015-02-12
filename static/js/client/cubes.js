/**
 *  World namespace.
**/
(function ( ns ) {

    // Databases for world data.
    ns.ldb = new PouchDB('world',{auto_compaction: true});
    ns.rdb = new PouchDB('http://localhost:5984/world');

    // Last world database sequenced handled.
    var last = 0;

    // Area to load.
    var area = new Array();

    // Currently loaded world objects.
    var objs = new Object();

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
    var cube = new THREE.Mesh( geometry, material );

    var cubeIndex = {
        _id: '_design/cube_index',
        views: {
            'cube_index': {
                map: function (doc) {
                    if (doc.type === 'cube') emit(doc);
                }.toString()
            }
        }
    };

    ns.onload = function () {

        // Start syncing remote world database to local world database.
        console.log('Starting continuous world sync from server...');
        ns.rdb.replicate.to( ns.ldb, { live : true } ).on('error', function () {
            console.log('Error replicating from remote world database.');
            // TODO handle retries and graceful shutdown
        });

        // Start updating world based on changes to local world database.
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

    }

}( window.world = window.world || {} ));

client.on('load', world.onload);

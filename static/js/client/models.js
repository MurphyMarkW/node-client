/**
 *  Models namespace.
**/
(function ( ns ) {

    var models = new Object();

    var ldb = new PouchDB('models',{auto_compation: true});
    var rdb = new PouchDB('http://localhost:5984/models');

    var last = 0;

    rdb.replicate.to(ldb, {live: true});

    // Keep track of changes to the models database.
    ldb.changes({
        since: last,
        live: true
    }).on('change', function(c) {
        console.log('Model change event: %s',c);
        last = c.seq > last ? c.seq : last;
    });

    ns.get = function (id, call) {
        // TODO right now just returns cubes - need to actually load models
        // TODO can we re-use previously loaded models?
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        call(null, new THREE.Mesh(geometry, material));
    };

}( window.models = window.models || {} ));

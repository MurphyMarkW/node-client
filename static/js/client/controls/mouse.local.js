/**
 *  Local mouse controls namespace.
 *  Allows controlling of a camera object via local-space mouse controls.
 *
 *  Shamelessly modified from:
 *  @author mrdoob / http://mrdoob.com/
**/

(function ( ns ) {

    var obj = null;

    var PI_2 = Math.PI / 2;

    ns.enable = function (obj) {
        // Reset camera rotation.
        camera.rotation.set(0, 0, 0);
        
        // Create pitch tracker.
        var pitch = new THREE.Object3D();
        pitch.add(camera);
        
        // Create yaw tracker.
        var yaw = new THREE.Object3D();
        yaw.position.y = 10; // TODO check if necessary?
        yaw.add(pitch);
    }

    ns.disable = function () {
    }

    client.on('mousemove', function (event) {
        console.log('Mouse movement: %s , %s', event.x, event.y);
    });

    
    /*
    THREE.PointerLockControls = function ( camera ) {

        var onMouseMove = function ( event ) {

            if ( scope.enabled === false ) return;

            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            yawObject.rotation.y -= movementX * 0.002;
            pitchObject.rotation.x -= movementY * 0.002;

            pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

        };

        document.addEventListener( 'mousemove', onMouseMove, false );

        this.enabled = false;

        this.getObject = function () {

            return yawObject;

        };

        this.getDirection = function() {

            // assumes the camera itself is not rotated

            var direction = new THREE.Vector3( 0, 0, -1 );
            var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

            return function( v ) {

                rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

                v.copy( direction ).applyEuler( rotation );

                return v;

            }

        }();

    };
    */

}( window.controls.mouselocal = window.controls.mouselocal || {} ));

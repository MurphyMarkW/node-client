/**
 *  World namespace.
 *  Handles rendering visuals for the client.
**/
(function ( ns ) {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    var render = function () {
        // Inform WebGL to use client function when rendering next frame.
        setTimeout( function () {
            requestAnimationFrame(render);
        }, 1000 / 60 );
        
        // TODO remove
        camera.position.z = 5;
        
        // Render the scene.
        renderer.render(scene,camera);
    };

    ns.add = function (obj) {
        // TODO check whether this is needed? idempotent?
        scene.remove(obj);
        scene.add(obj);
    };

    ns.remove = function (obj) {
        scene.remove(obj);
    };

    client.on('load', function () {
        // Add the renderer to the current page.
        var element = renderer.domElement;
        document.body.appendChild(element);
        
        element.addEventListener('click', function toggleFullScreen() {
            if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                if (document.documentElement.requestFullScreen) {
                    document.documentElement.requestFullScreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullScreen) {
                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        });
        
        scene.add(new THREE.GridHelper(10, 2.5));
        
        // Start rendering.
        render();
    });

    client.on('resize', function () {
        // Update the renderer to the window dimensions.
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Update the camera dimensions.
        camera.aspect = window.innerWidth / window.innerHeight;
    });

}( window.world = window.world || {} ));

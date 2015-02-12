/**
 *  Client namespace - basic setup and whatnot.
 *
 *  Stuff in this guy is responsible for linking up the client browser to
 *  the internal libraries. This involves a lot of boring re-mappings and
 *  event handling.
**/
(function ( ns ) {

    var events = new THREE.EventDispatcher();

    ns.on = function (type,func) {
        events.addEventListener(type,func);
    }

    window.onload = function (data) {
        events.dispatchEvent({
            type: 'load',
            data: data,
        });
    };

    window.onresize = function (data) {
        events.dispatchEvent({
            type: 'resize',
            data: data
        });
    };

    window.onmousemove = function (event) {
        events.dispatchEvent({
            type: 'mousemove',
            x: event.clientX,
            y: event.clientY
        });
    };

}( window.client = window.client || {} ));

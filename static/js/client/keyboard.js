/**
 * Keyboard namespace.
**/
(function ( ns ) {

    function onKeyDown (event) {
        var key = String.fromCharCode(event.keyCode);
        console.log(key)
    }

    function onKeyUp (event) {
        var key = String.fromCharCode(event.keyCode);
        console.log(key)
    }

    client.on('load', function () {
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
    });

}( window.keyboard = window.keyboard || {} ));

/**
 * Created by Peyman! on 2/15/2017.
 */
var Key = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    JUMP: 32,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function(keyCode) {
        this._pressed[keyCode] = true;
    },

    onKeyup: function(keyCode) {
        this._pressed[keyCode] = undefined;
    }
};
window.addEventListener('keyup', function(event) { Key.onKeyup(event.keyCode); }, false);
window.addEventListener('keydown', function (e) {
    Key.onKeydown(event.keyCode);
    e.preventDefault();
}, false);
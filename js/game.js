/**
 * Created by Peyman! on 2/9/2017.
 */
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var game = {
    init: function () {
        box2d.init();
        pixi.init();
        loader.init();
    },
    animate: function () {
        pixi.render();
        var currentTime = new Date().getTime();
        var timeStep;
        if (game.lastUpdateTime){
            timeStep = (currentTime - game.lastUpdateTime)/1000;
            if(timeStep >2/60){
                timeStep = 2/60
            }
            box2d.step(timeStep);
        }
        game.lastUpdateTime = currentTime;
        game.animationFrame = window.requestAnimationFrame(game.animate);
    }
};

$(function(){
    game.init();
});
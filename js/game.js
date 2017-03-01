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
        window.requestAnimationFrame = function(callback) {
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
    cameraPanningMode: {x: false, y: false},
    init: function () {
        box2d.init();
        pixi.init();
        loader.init();
    },
    animate: function () {
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
        game.checkPanning();

        game.drawSprite();

        game.updateSprites();

        game.drawSprite();

        game.animationFrame = window.requestAnimationFrame(game.animate);
    },
    updateSprites: function () {
        game.hero.updatePosition();
        game.hero.updateMovement();
    },
    drawSprite: function () {
        pixi.render();
        box2d.world.DrawDebugData();
    },
    checkPanning: function(){
        var width = pixi.renderer.width/2;
        var height = pixi.renderer.height /2;
        if(game.hero.body.GetPosition().x * box2d.scale > width && game.hero.body.GetPosition().x * box2d.scale < pixi.backgroundContainer.width - width)
            game.cameraPanningMode.x = true;
        else game.cameraPanningMode.x = false;
    }
};

$(function(){
    game.init();
});
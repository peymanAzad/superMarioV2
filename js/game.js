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
        game.drawSprite();

        game.updateSprites();
        game.hero.UserUpdate();
        game.drawSprite();

        game.animationFrame = window.requestAnimationFrame(game.animate);
    },
    updateSprites: function () {
        for (var body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
            var entity = body.GetUserData();
            if(entity){
                var position = body.GetPosition();
                var angle = body.GetAngle();
                var sprite = entity.sprite;
                sprite.x = (position.x * box2d.scale);
                sprite.y = (position.y * box2d.scale);
                sprite.rotation = angle;
            }
        }
    },
    drawSprite: function () {
        pixi.render();
        box2d.world.DrawDebugData();
    }
};

$(function(){
    game.init();
});
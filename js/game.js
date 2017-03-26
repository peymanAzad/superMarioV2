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
    enemies: [],
    wallBricks: [],
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

        game.handleHeroCollisions();

        game.animationFrame = window.requestAnimationFrame(game.animate);
    },
    updateSprites: function () {
        game.hero.updatePosition();
        game.hero.updateMovement();
        game.enemies.forEach(function (e) {
            if(!e.died) e.update();
        });
        game.wallBricks.forEach(function (e) {
            e.update();
        });
    },
    drawSprite: function () {
        pixi.render();
        box2d.world.DrawDebugData();
    },
    checkPanning: function(){
        var width = pixi.renderer.width/2;
        var height = pixi.renderer.height /2;
        game.cameraPanningMode.x = game.hero.body.GetPosition().x * box2d.scale > width && game.hero.body.GetPosition().x * box2d.scale < pixi.backgroundContainer.width - width;
    },
    handleHeroCollisions: function () {
        var flag = false;
        game.hero.Contacts.bottom.forEach(function (e, i, a) {
            if(e.GetBody().GetUserData().push) {
                flag = true;
                var v = game.hero.body.GetLinearVelocity();
                v.y = -8;
                game.hero.body.SetLinearVelocity(v);
                // a.splice(i, 1);
                // setTimeout(function () {
                e.GetBody().GetUserData().push();
                // },100);
            }
        });
        if(flag) return;
        game.hero.Contacts.left.forEach(function(e){
            if(e.GetBody().GetUserData().type === "wall") return;
            if(e.GetBody().GetUserData().type === "enemy"){
                if(!game.hero.died) game.hero.die();
                e.GetBody().SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, 0));
            }
        });
        game.hero.Contacts.right.forEach(function(e){
            if(e.GetBody().GetUserData().type === "wall") return;
            if(e.GetBody().GetUserData().type === "enemy"){
                if(!game.hero.died) game.hero.die();
                e.GetBody().SetLinearVelocity(new Box2D.Common.Math.b2Vec2(0, 0));
            }
        });
        game.hero.Contacts.top.forEach(function(e, i, a){
            var data = e.GetBody().GetUserData();
            if(data.type === "wallBrick") {
                data.tap();
                // a.splice(i, 1);
            }
        });
        game.hero.Contacts.top = [], game.hero.Contacts.right = [], game.hero.Contacts.left = [];
    }
};

$(function(){
    game.init();
});
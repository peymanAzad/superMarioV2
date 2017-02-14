/**
 * Created by Peyman! on 2/10/2017.
 */
var loader = {
    init: function () {
        pixi.loadSpriteSheet(loader.spritesheetLoaded);
    },
    spritesheetLoaded: function () {
        loader.spritesheetReady = true;
        levels.load(0);
        game.animate();
    }
};
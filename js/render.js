/**
 * Created by Peyman! on 2/10/2017.
 */
var pixi;
(function(){
    //definitions
    var Container = PIXI.Container,
        autoDetectRenderer = PIXI.autoDetectRenderer,
        Pixiloader = PIXI.loader,
        TextureCache = PIXI.utils.TextureCache,
        Sprite = PIXI.Sprite,
        TilingSprite = PIXI.extras.TilingSprite,
        Rectangle = PIXI.Rectangle,
        Texture = PIXI.Texture;

    pixi = {
        init: function () {
            pixi.stage = new Container();
            pixi.renderer = autoDetectRenderer(800, 600);
            pixi.renderer.view.style.border = "1px solid black";
            pixi.renderer.backgroundColor = "0xFFFFFF";

            pixi.gameContainer = new Container();
            pixi.stage.addChild(pixi.gameContainer);

            $("#gameCanvasContainer").append(pixi.renderer.view);
        },
        loadSpriteSheet: function(callback){
            Pixiloader.add("img/spritesheet.png").load(callback);
        },
        render: function () {
            pixi.renderer.render(pixi.stage);
        },
        createGroundSprite: function (e, def) {
            var ground = new Container();
            ground.cacheAsBitmap = true;

            var loc = def.types.surface.left;
            var topLeft = pixi.helpers.frame("img/spritesheet.png", loc, 0, 0);

            loc = def.types.surface.right;
            var topRight = pixi.helpers.frame("img/spritesheet.png", loc, e.width - loc.width, 0);

            loc = def.types.surface.middle;
            var surface = pixi.helpers.createTilingSprite("img/spritesheet.png", loc, def.types.surface.left.width, 0,
                e.width - 2*def.types.surface.right.width, loc.height);

            loc = def.types.body.middle;
            var body = pixi.helpers.createTilingSprite("img/spritesheet.png", loc, def.types.body.left.width,
                def.types.surface.middle.height, e.width - 2*def.types.body.left.width, e.height - def.types.surface.middle.height);

            loc = def.types.body.left;
            var left = pixi.helpers.createTilingSprite("img/spritesheet.png", loc, 0, def.types.surface.left.height, loc.width,
                    e.height - def.types.surface.left.height);

            loc = def.types.body.right;
            var right = pixi.helpers.createTilingSprite("img/spritesheet.png", loc, e.width - loc.width, def.types.surface.right.height,
                    loc.width, e.height - def.types.surface.right.height);

            ground.addChild(topLeft);
            ground.addChild(topRight);
            ground.addChild(surface);
            ground.addChild(left);
            ground.addChild(body);
            ground.addChild(right);

            ground.position.set(e.x, e.y);
            ground.width = e.width;
            ground.height = e.height;
            pixi.gameContainer.addChild(ground);
            return ground;
        },
        helpers: {
            createTilingSprite: function (source, loc, x, y, width, height) {
                var texture = new Texture(TextureCache[source]);
                var frm = new Rectangle(loc.left, loc.top, loc.width, loc.height);
                texture.frame = frm;
                var sprite = new TilingSprite(
                    texture, width, height
                );
                sprite.position.set(x, y);
                return sprite;
            },
            frame: function (source, loc, x, y) {
                var texture = new Texture(TextureCache[source]);
                var frm = new Rectangle(loc.left, loc.top, loc.width, loc.height);
                texture.frame = frm;
                var sprite = new Sprite(texture);
                sprite.position.set(x, y);
                return sprite;
            }
        }
    };
})();
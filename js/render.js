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
        Texture = PIXI.Texture,
        AnimatedSprite = PIXI.extras.AnimatedSprite;

    pixi = {
        init: function () {
            pixi.stage = new Container();
            pixi.renderer = autoDetectRenderer(800, 600);
            pixi.renderer.view.style.border = "1px solid black";
            pixi.renderer.backgroundColor = "0xFFFFFF";

            pixi.backgroundContainer = new Container();
            pixi.backgroundContainer.cacheAsBitmap = true;
            pixi.stage.addChild(pixi.backgroundContainer);

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

            ground.addChild(topLeft, topRight, surface, left, body, right);

            ground.position.set(e.x, e.y);
            ground.width = e.width;
            ground.height = e.height;

            pixi.gameContainer.addChild(ground);
            return ground;
        },
        createBackground: function (data) {
            var loc = entities.definitions.backgrounds.colors[data.color];
            var colorSprite = pixi.helpers.createTilingSprite("img/spritesheet.png", loc, 0, 0, data.width, pixi.renderer.height);
            pixi.backgroundContainer.addChild(colorSprite);
            pixi.backgroundContainer.width = data.width;

            data.particles.forEach(function(e){
                var loc = entities.definitions.backgrounds.particles[e.name][e.type];
                var sprite = pixi.helpers.frame("img/spritesheet.png", loc, e.x, e.y);
                pixi.backgroundContainer.addChild(sprite);
            });
        },
        createHeroSprite: function (entity, definition) {
            var states = {right:{}, left:{}};
            for(var state in definition.right){
                states.right[state] = pixi.helpers.createAnimationSprite("img/spritesheet.png", definition.right[state], entity.x, entity.y);
            }
            for(var state in definition.left){
                states.left[state] = pixi.helpers.createAnimationSprite("img/spritesheet.png", definition.left[state], entity.x, entity.y);
            }
            var sprite = states.right.idle;
            sprite.states = states;
            sprite.animationSpeed = 0.2;
            // sprite.scale.set(1.5, 1.5);
            sprite.play();
            sprite.anchor.set(0.5, 0.5);
            sprite.changeState = function (vector, state) {
                var current = game.hero.sprite;
                var sprite = current.states[vector][state];
                sprite.position.y +=  current.height - sprite.height;
                sprite.animationSpeed = current.animationSpeed;
                sprite.position = current.position;
                sprite.anchor = current.anchor;
                sprite.routation = current.routation;
                if(sprite.textures.length >1) sprite.play();
                pixi.stage.removeChild(current);
                pixi.stage.addChild(sprite);
                sprite.states = current.states;
                sprite.changeState = current.changeState;
                game.hero.sprite = sprite;
            };
            pixi.stage.addChild(sprite);
            return sprite;
        },
        createEnemy: function (entity, definition) {
            var states = {};
            var sprite;
            if(definition.center) {
                states.center = {};
                for(var state in definition.center) {
                    states.center[state] = pixi.helpers.createAnimationSprite("img/spritesheet.png", definition.center[state], entity.x, entity.y);
                }
                sprite = states.center.run;
            }
            else{
                states = {right:{}, left:{}};
                for(var state in definition.left) {
                    states.left[state] = pixi.helpers.createAnimationSprite("img/spritesheet.png", definition.left[state], entity.x, entity.y);
                }
                for(var state in definition.right) {
                    states.right[state] = pixi.helpers.createAnimationSprite("img/spritesheet.png", definition.right[state], entity.x, entity.y);
                }
                var vector = definition.vX > 0 ? "right" : "left";
                sprite = states[vector].run;
            }
            sprite.states = states;
            sprite.animationSpeed = 0.05;
            sprite.play();
            sprite.anchor.set(0.5, 0.5);
            sprite.changeState = function (vector, state, current) {
                var sprite = current.states[vector][state];
                sprite.animationSpeed = current.animationSpeed;
                sprite.position = current.position;
                sprite.anchor = current.anchor;
                sprite.routation = current.routation;
                if(sprite.textures.length >1) sprite.play();
                pixi.gameContainer.removeChild(current);
                pixi.gameContainer.addChild(sprite);
                sprite.states = current.states;
                sprite.changeState = current.changeState;

                return sprite;
            };
            pixi.gameContainer.addChild(sprite);
            return sprite;
        },
        createBrick: function(entity, definition){
            var sprite = pixi.helpers.createTilingSprite(
                "img/spritesheet.png", definition, entity.x, entity.y, entity.width, entity.height);
            pixi.gameContainer.addChild(sprite);
            return sprite;
        },
        helpers: {
            createTilingSprite: function (source, loc, x, y, width, height) {
                var texture = pixi.helpers.createTexture(source, loc);
                var sprite = new TilingSprite(
                    texture, width, height
                );
                sprite.position.set(x, y);
                return sprite;
            },
            frame: function (source, loc, x, y) {
                var texture = pixi.helpers.createTexture(source, loc);
                var sprite = new Sprite(texture);
                sprite.position.set(x, y);
                return sprite;
            },
            createAnimationSprite: function(source, locArr, x, y){
                var texures = pixi.helpers.createTextureArray(source, locArr);
                var sprite = new AnimatedSprite(texures);
                sprite.position.set(x, y);
                return sprite;
            },
            createTextureArray: function(source, locArr){
                var Arr = [];
                locArr.forEach(function (e) {
                    var texture = pixi.helpers.createTexture(source, e);
                    Arr.push(texture);
                });
                return Arr;
            },
            createTexture: function (source, loc) {
                var texture = new Texture(TextureCache[source]);
                texture.frame = new Rectangle(loc.left, loc.top, loc.width, loc.height);
                return texture;
            }
        },
        camera: {
            defaultParallaxSpeed: 0.4,
            panToX: function (x) {
                pixi.gameContainer.position.x = -x;
                pixi.backgroundContainer.position.x = -(x*pixi.camera.defaultParallaxSpeed);
            }
        }
    };
})();
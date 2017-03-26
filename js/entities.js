/**
 * Created by Peyman! on 2/10/2017.
 */
var entities = {
    definitions: {
        "backgrounds":{
            colors:{
                "blue": {top:295, left:519, width:33, height:30 }
            },
            particles:{
                "clouds":[
                    {top:38, left:621, width:48, height:24},
                    {top:38, left:671, width:64, height:24},
                    {top:38, left:738, width:31, height:24}
                ]
            }
        },
        "dirt":{
            density:3.0,
            friction:1.5,
            restitution:0.2,
            types:{
                surface:{
                    left:{top:256, left:536, width:15, height:16},
                    middle:{top:256, left:554, width:16, height:16},
                    right:{top:256, left:573, width:15, height:16}
                },
                body:{
                    left:{top:274, left:536, width:15, height:16},
                    middle:{top:274, left:554, width:16, height:16},
                    right:{top:274, left:573, width:15, height:16}
                }
            }
        },
        "mario":{
            density:3.0,
            friction:0.0,
            restitution:0.0,
            right:{
                idle:[
                    {top:43, left:276, width:12, height:16}
                ],
                run:[
                    {top:43, left:320, width:15, height:16},
                    {top:43, left:306, width:11, height:16},
                    {top:44, left:291, width:12, height:15}
                ],
                jump:[
                    {top:43, left:354, width:16, height:16}
                ],
                lose:[
                    {top:45, left:485, width:14, height:14}
                ]
            },
            left:{
                idle:[
                    {top:43, left:223, width:12, height:16}
                    ],
                run:[
                    {top:44, left:208, width:12, height:15},
                    {top:43, left:194, width:11, height:16},
                    {top:43, left:176, width:15, height:16}
                ],
                jump:[
                    {top:43, left:141, width:16, height:16}
                ],
                lose:[
                    {top:45, left:12, width:14, height:14}
                ]

            }
        },
        "superMario":{
            density:3.0,
            friction:0.1,
            restitution:0.0,
            horizontalForce:box2d.gravity * 1.7,
            maxHorizontalVelocity: 9,
            verticalImpulse: box2d.gravity * 0.4,
            right:{
                idle:[
                    {top:0, left:257, width:16, height:32}
                    ],
                run:[
                    {top:1, left:314, width:14, height:31},
                    {top:0, left:330, width:16, height:32},
                    {top:2, left:295, width:16, height:30}
                ],
                jump:[
                    {top:1, left:368, width:16, height:31}
                ],
                down:[
                    {top:10, left:176, width:16, height:22}
                ],
                lose:[
                    {top:45-15, left:485, width:14, height:30}
                ]
            },
            left:{
                idle:[
                    {top:0, left:238, width:16, height:32}
                ],
                run:[
                    {top:2, left:200, width:16, height:30},
                    {top:1, left:183, width:14, height:31},
                    {top:0, left:165, width:16, height:32}
                ],
                jump:[
                    {top:1, left:127, width:16, height:31}
                ],
                down:[
                    {top:10, left:219, width:16, height:22}
                ],
                lose:[
                    {top:45-15, left:12, width:14, height:30}
                ]
            }
        },
        "theAngry":{
            density:1.0,
            friction:0.0,
            restitution:0.0,
            HorizontalVelocity: 2,
            center: {
                run: [
                    {top: 186, left: 294, width: 16, height: 16},
                    {top: 186, left: 313, width: 16, height: 16}
                ],
                pushed: [{top: 194, left: 275, width: 16, height: 8}]
            }
        },
        "turtle":{
            density:1.0,
            friction:0.0,
            restitution:0.0,
            HorizontalVelocity: 2,
            right: {
                run: [
                    {top: 208, left: 257, width: 16, height: 21},
                    {top: 207, left: 277, width: 15, height: 22},
                    {top: 208, left: 295, width: 16, height: 21},
                    {top: 207, left: 315, width: 15, height: 22}
                ],
                pushed2: [
                    {top: 214, left: 334, width: 14, height: 15},
                    {top: 217, left: 353, width: 14, height: 12}
                ],
                pushed:[
                    {top: 214, left: 163, width: 14, height: 15},
                    {top: 215, left: 144, width: 14, height: 12}
                ]
            },
            left: {
                run: [
                    {top: 208, left: 238, width: 16, height: 21},
                    {top: 207, left: 219, width: 15, height: 22},
                    {top: 208, left: 200, width: 16, height: 21},
                    {top: 207, left: 181, width: 15, height: 22}
                ],
                pushed2: [
                    {top: 214, left: 334, width: 14, height: 15},
                    {top: 217, left: 353, width: 14, height: 12}
                ],
                pushed: [
                    {top: 214, left: 163, width: 14, height: 15},
                    {top: 215, left: 144, width: 14, height: 12}
                ]
            }
        },
        brick:{
            density:3.0,
            friction:1.5,
            restitution:0.2,
            top:171, left:519, width:16, height:16
        },
        prizeBrick:{
            density:3.0,
            friction:1.5,
            restitution:0.2,
            top:189, left:519, width:16, height:16
        },
        wallBrick:{
            density:3.0,
            friction:1.5,
            restitution:0.2,
            verticalImpulse:5,
            top:131, left:519, width:16, height:17
        },
        noPrizeBrick:{
            density:3.0,
            friction:1.5,
            restitution:0.2,
            top:94, left:519, width:16, height:16
        }
    },
    create: function (entity) {
        var definition = entities.definitions[entity.name];
        switch(entity.type){
            case "ground":
                var sprite = pixi.createGroundSprite(entity, definition);
                entity.sprite = sprite;
                box2d.createRectangle(entity, definition);
                break;
            case "hero":
                game.hero = new Hero(entity, definition);
                break;
            case "enemy":
                var Enemy;
                switch(entity.name){
                    case "theAngry":
                        Enemy = new enemy(entity, definition);
                        break;
                    case "turtle":
                        Enemy = new turtle(entity, definition);
                        break;
                }
                game.enemies.push(Enemy);
                break;
            case "wall":
                switch(entity.name){
                    case "brick":
                        var sprite = pixi.createBrick(entity, definition);
                        entity.sprite = sprite;
                        box2d.createRectangle(entity, definition);
                        break;
                    case "wallBrick":
                        var wallBrickWidth = definition.width;
                        var entityWidth = entity.width;
                        entity.width = wallBrickWidth;
                        for(var i = 0; i < entityWidth; i += wallBrickWidth){
                            var e = {type:"wall", name:"wallBrick", width:16, height:16, isStatic:entity.isStatic};
                            e.x = entity.x + i;
                            e.y = entity.y;
                            game.wallBricks.push(new wallBrick(e, definition));
                        }
                        break;
                }
        }
    }
};
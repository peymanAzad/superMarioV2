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
            friction:0.7,
            restitution:0.0,
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
                ]
            }
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
                var sprite = pixi.createHeroSprite(entity, definition);
                entity.sprite = sprite;
                game.hero = box2d.createRectangle(entity, definition);
                var sensors = [
                    {x: 0, y: 15/30, width: 16, height: 5, name:"bottom"},
                    {x: 0, y: -15/30, width: 16, height: 5, name:"top"},
                    {x: -16/2/30, y: 0, width: 5, height: 31, name:"left"},
                    {x: 16/2/30, y: 0, width: 5, height: 31, name:"right"}
                ];
                box2d.addSensors(game.hero, sensors);
                game.hero.UserContact = {};
                game.hero.UserContact.bottom = [];
                game.hero.UserContact.top = [];
                game.hero.UserContact.left = [];
                game.hero.UserContact.right = [];
                // game.hero.SetSleepingAllowed(true);
                game.hero.SetFixedRotation(true);
                game.hero.currentState = "idle";
                game.hero.currentVector = "right";
                game.hero.moveRight = function () {
                    var vec = new Box2D.Common.Math.b2Vec2(55, 0);
                    if(game.hero.GetLinearVelocity().x < 9) game.hero.ApplyForce(vec, game.hero.GetWorldCenter());
                };
                game.hero.moveLeft = function () {
                    var vec = new Box2D.Common.Math.b2Vec2(-55, 0);
                    if(game.hero.GetLinearVelocity().x > -9) game.hero.ApplyForce(vec, game.hero.GetWorldCenter());
                };
                game.hero.UserUpdate = function () {
                    if(Key.isDown(Key.JUMP)){ if(game.hero.checkForJump()) game.hero.jump();}
                    if (Key.isDown(Key.LEFT)) game.hero.moveLeft();
                    else if (Key.isDown(Key.RIGHT)) game.hero.moveRight();

                    game.hero.updateState();
                    game.hero.updateSpriteState();
                };
                game.hero.updateSpriteState = function(){
                    game.hero.GetUserData().sprite.changeState(game.hero.currentVector, game.hero.currentState);
                };
                game.hero.checkForJump = function () {
                    var contacts = game.hero.UserContact.bottom;
                    if(contacts.length > 0) return true;
                    else return false;
                };
                game.hero.jump = function () {
                    if(game.hero.checkForJump()){
                        var vec = new Box2D.Common.Math.b2Vec2(game.hero.GetLinearVelocity().x, 110);
                        game.hero.ApplyImpulse(vec, game.hero.GetWorldCenter());
                    }
                };
                game.hero.updateState = function () {
                    if(game.hero.UserContact.bottom.length > 0){
                        if (Key.isDown(Key.JUMP)){
                            game.hero.currentState = "jump";
                        }
                        else if (Key.isDown(Key.LEFT)){
                            game.hero.currentState = "run";
                            game.hero.currentVector = "left";
                        }
                        else if (Key.isDown(Key.RIGHT)){
                            game.hero.currentState = "run";
                            game.hero.currentVector = "right";
                        }
                        else{
                            if(Math.abs(game.hero.GetLinearVelocity().x) < 0.01){
                                game.hero.currentState = "idle";
                            }
                        }
                    }
                };
                break;
        }
    }
};
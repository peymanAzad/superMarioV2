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
        }
    }
}
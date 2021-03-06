/**
 * Created by Peyman! on 2/10/2017.
 */
var levels = {
    data: [
        {
            background: {
                color: "blue",
                width: 1200,
                particles:[
                    {name:"clouds", type:1, x:100, y:20},
                    {name:"clouds", type:0, x:300, y:50},
                    {name:"clouds", type:2, x:500, y:50},
                    {name:"clouds", type:2, x:600, y:35}
                ]
            },
            entities:[
                {type:"ground", name:"dirt",x:30,y:400,width:1000,height:200,isStatic:true},
                {type:"hero", name:"superMario", x:40, y:100, width:16, height:31},
                {type:"enemy", name:"theAngry", x:500, y:200, width:16, height:16, vX: -2},
                {type:"enemy", name:"turtle", x:600, y:300, width:16, height:16, vX:-2, vXMax: -10},
                {type:"wall", name:"brick", x:300, y:304, width:16, height:96, isStatic:true},
                {type:"wall", name:"brick", x:700, y:304, width:16, height:96, isStatic:true},
                {type:"wall", name:"wallBrick", x:450, y:290, width:16*3, height:16, isStatic:true},
                // {type:"wall", name:"brick", x:450-16, y:304, width:16, height:16, isStatic:true},
                // {type:"wall", name:"brick", x:450+16*+16, y:304, width:16, height:16, isStatic:true}
            ]
        }
    ],
    load: function (number) {
        pixi.createBackground(levels.data[number].background);
        var entitiess = levels.data[number].entities;
        entitiess.forEach(function(e){
            entities.create(e);
        });
    },
    init: function () {
    }
};
/**
 * Created by Peyman! on 2/10/2017.
 */
var levels = {
    data: [
        {
            background: {
                color: "blue",
                particles:[
                    {name:"clouds", type:1, x:100, y:20},
                    {name:"clouds", type:0, x:300, y:50},
                    {name:"clouds", type:2, x:500, y:50},
                    {name:"clouds", type:2, x:700, y:35}
                ]
            },
            entities:[
                {type:"ground", name:"dirt",x:30,y:400,width:600,height:200,isStatic:true},
                {type:"hero", name:"superMario", x:40, y:100, width:16, height:31}
                // {type:"ground", name:"wood", x:185,y:390,width:30,height:80,isStatic:true},
                //
                // {type:"block", name:"wood", x:520,y:380,angle:90,width:100,height:25},
                // {type:"block", name:"glass", x:520,y:280,angle:90,width:100,height:25},
                // {type:"villain", name:"burger",x:520,y:205,calories:590},
                //
                // {type:"block", name:"wood", x:620,y:380,angle:90,width:100,height:25},
                // {type:"block", name:"glass", x:620,y:280,angle:90,width:100,height:25},
                // {type:"villain", name:"fries", x:620,y:205,calories:420},
                //
                // {type:"hero", name:"orange",x:80,y:405},
                // {type:"hero", name:"apple",x:140,y:405},
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
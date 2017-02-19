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
                {type:"ground", name:"dirt",x:30,y:400,width:700,height:200,isStatic:true},
                {type:"hero", name:"superMario", x:40, y:100, width:16, height:31}
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
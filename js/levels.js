/**
 * Created by Peyman! on 2/10/2017.
 */
var levels = {
    data: [
        {
            entities:[
                {type:"ground", name:"dirt", x:20,y:300,width:600,height:300,isStatic:true},
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
        var entitiess = levels.data[number].entities;
        entitiess.forEach(function(e){
            entities.create(e);
        });
    },
    init: function () {
    }
};
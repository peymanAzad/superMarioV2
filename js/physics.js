/**
 * Created by Peyman! on 2/10/2017.
 */
var box2d;
(function(){
    //definition
    var b2Vec2 = Box2D.Common.Math.b2Vec2;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2Fixture = Box2D.Dynamics.b2Fixture;
    var b2World = Box2D.Dynamics.b2World;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

    box2d = {
        scale:30,
        init: function () {
            var gravity = new b2Vec2(0, 9.8);
            var alowSleep = true;
            box2d.world = new b2World(gravity, alowSleep);

            var debugContext = document.getElementById('debugCanvas').getContext('2d');
            var debugDraw = new b2DebugDraw();
            debugDraw.SetSprite(debugContext);
            debugDraw.SetDrawScale(box2d.scale);
            debugDraw.SetFillAlpha(0.3);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
            box2d.world.SetDebugDraw(debugDraw);
        },
        step: function (elapcedTime) {
            box2d.world.Step(elapcedTime, 8, 3);
            box2d.world.ClearForces();
            box2d.world.DrawDebugData();
        },
        createRectangle: function (entity, definition) {
            var bodydef = new b2BodyDef();
            if(entity.isStatic) bodydef.type = b2Body.b2_staticBody;
            else bodydef.type = b2Body.b2_dynamicBody;
            bodydef.position.x = entity.x/box2d.scale;
            bodydef.position.y = entity.y/box2d.scale;
            if(entity.angle) bodydef.angle = Math.PI * entity.angle / 180;

            var fixtureDef = new b2FixtureDef();
            fixtureDef.density = definition.density;
            fixtureDef.friction = definition.friction;
            fixtureDef.restitution = definition.restitution;
            fixtureDef.shape = new b2PolygonShape();
            fixtureDef.shape.SetAsBox(entity.width/2/box2d.scale, entity.height/2/box2d.scale);

            var body = box2d.world.CreateBody(bodydef);
            body.SetUserData(entity);
            body.CreateFixture(fixtureDef);
            return body;
        },
        createCircle: function (entity, definition) {
            var bodydef = new b2BodyDef();
            if(entity.isStatic) bodydef.type = b2Body.b2_staticBody;
            else bodydef.type = b2Body.b2_dynamicBody;
            bodydef.position.x = entity.x;
            bodydef.position.y = entity.y;
            if(entity.angle) bodydef.angle = Math.PI * entity.angle / 180;

            var fixtureDef = new b2FixtureDef();
            fixtureDef.density = definition.density;
            fixtureDef.friction = definition.friction;
            fixtureDef.restitution = definition.restitution;
            fixtureDef.shape = new b2CircleShape(entity.radius/box2d.scale);

            var body = box2d.world.CreateBody(bodydef);
            body.SetUserData(entity);
            body.CreateFixture(fixtureDef);
            return body;
        }
    }
})();
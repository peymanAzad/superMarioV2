/**
 * Created by Peyman! on 2/26/2017.
 */
function Hero(entity, definition){
    this.sprite = pixi.createHeroSprite(entity, definition);
    this.body = box2d.createRectangle(entity, definition);
    this.entity = entity;
    this.definition = definition;
    this.sensors = [
        {x: 0, y: entity.height/2/box2d.scale, width: entity.width, height: 5, name:"bottom"},
        {x: 0, y: -entity.height/2/box2d.scale, width: entity.width, height: 5, name:"top"},
        {x: -entity.width/2/box2d.scale, y: 0, width: 5, height: entity.height, name:"left"},
        {x: entity.width/2/box2d.scale, y: 0, width: 5, height: entity.height, name:"right"}
    ];
    this.currentState = "idle";
    this.currentVector = "right";
    this.Contacts = {};
    this.Contacts.bottom = [];
    this.Contacts.top = [];
    this.Contacts.left = [];
    this.Contacts.right = [];
    this.body.SetFixedRotation(true);

    this.createSensors();
}
Hero.prototype.moveRight = function () {
    var vec = new Box2D.Common.Math.b2Vec2(this.definition.horizontalForce, 0);
    if(this.body.GetLinearVelocity().x < this.definition.maxHorizontalVelocity)
        this.body.ApplyForce(vec, this.body.GetWorldCenter());
};
Hero.prototype.moveLeft = function () {
    var vec = new Box2D.Common.Math.b2Vec2(-this.definition.horizontalForce, 0);
    if(this.body.GetLinearVelocity().x < -this.definition.maxHorizontalVelocity)
        this.body.ApplyForce(vec, this.body.GetWorldCenter());
};
Hero.prototype.jump = function () {
    if(this.body.checkForJump()){
        var vec = new Box2D.Common.Math.b2Vec2(this.body.GetLinearVelocity().x, this.definition.verticalImpulse);
        game.hero.ApplyImpulse(vec, this.body.GetWorldCenter());
    }
};
Hero.prototype.update = function () {
    if(Key.isDown(Key.JUMP)){ if(this.checkForJump()) this.jump();}
    if (Key.isDown(Key.LEFT)) this.moveLeft();
    else if (Key.isDown(Key.RIGHT)) this.moveRight();

    this.updateState();
    this.updateSpriteState();
};
Hero.prototype.updateState = function () {
    if(this.Contacts.bottom.length > 0){
        if (Key.isDown(Key.JUMP)){
            this.currentState = "jump";
        }
        else if (Key.isDown(Key.LEFT)){
            this.currentState = "run";
            this.currentVector = "left";
        }
        else if (Key.isDown(Key.RIGHT)){
            this.currentState = "run";
            this.currentVector = "right";
        }
        else{
            if(Math.abs(this.body.GetLinearVelocity().x) < 0.01){
                this.currentState = "idle";
            }
        }
    }
};
Hero.prototype.updateSpriteState = function () {
    this.sprite.changeState(this.currentVector, this.currentState);
};
Hero.prototype.checkForJump = function () {
    var contacts = this.Contacts.bottom;
    return contacts.length > 0;
};
Hero.prototype.createSensors = function () {
    box2d.addSensors(this.body, this.sensors);
};
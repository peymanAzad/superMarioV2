/**
 * Created by Peyman! on 2/26/2017.
 */
function Hero(entity, definition){
    this.sprite = pixi.createHeroSprite(entity, definition);
    this.body = box2d.createRectangle(entity, definition);
    this.entity = entity;
    this.definition = definition;
    this.sensors = [
        {x: 0, y: entity.height/2/box2d.scale, width: entity.width-5, height: 3, name:"bottom"},
        {x: 0, y: -entity.height/2/box2d.scale, width: entity.width-5, height: 3, name:"top"},
        {x: -entity.width/2/box2d.scale, y: 0, width: 3, height: entity.height/2, name:"left"},
        {x: entity.width/2/box2d.scale, y: 0, width: 3, height: entity.height/2, name:"right"}
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
    var vec = new Box2D.Common.Math.b2Vec2(this.checkForJump()?this.definition.horizontalForce:this.definition.horizontalForce/3, 0);
    if(this.body.GetLinearVelocity().x < this.definition.maxHorizontalVelocity)
        this.body.ApplyForce(vec, this.body.GetWorldCenter());
};
Hero.prototype.moveLeft = function () {
    var vec = new Box2D.Common.Math.b2Vec2(this.checkForJump()?-this.definition.horizontalForce:-this.definition.horizontalForce/3, 0);
    if(this.body.GetLinearVelocity().x > -this.definition.maxHorizontalVelocity)
        this.body.ApplyForce(vec, this.body.GetWorldCenter());
};
Hero.prototype.jump = function () {
    if(this.checkForJump()){
        var vec = new Box2D.Common.Math.b2Vec2(0, -this.definition.verticalImpulse);
        game.hero.body.ApplyImpulse(vec, this.body.GetWorldCenter());
    }
};
Hero.prototype.updateMovement = function () {
    if(!this.died) {
        if (Key.isDown(Key.JUMP)) {
            if (this.checkForJump()) this.jump();
        }
        if (Key.isDown(Key.LEFT)) this.moveLeft();
        else if (Key.isDown(Key.RIGHT)) this.moveRight();
    }
    this.updateState();
    this.updateSpriteState();
};
Hero.prototype.updatePosition = function () {
    var position = this.body.GetPosition();
    var angle = this.body.GetAngle();
    if(game.cameraPanningMode.x) pixi.camera.panToX((position.x * box2d.scale)-pixi.renderer.width/2);
    else this.sprite.position.x = (position.x * box2d.scale)+pixi.gameContainer.position.x;
    this.sprite.position.y = position.y * box2d.scale;
    this.sprite.rotation = angle;
};
Hero.prototype.updateState = function () {
    if(this.died) return;
    if(this.Contacts.bottom.length > 0){
        if (Key.isDown(Key.JUMP)){
            this.currentState = "jump";
        }
        else if (Key.isDown(Key.LEFT) || Key.isDown(Key.RIGHT)) {
            this.currentState = "run";
        } else if (Math.abs(this.body.GetLinearVelocity().x) < 0.01) {
            this.currentState = "idle";
        }
    }
    var v = this.body.GetLinearVelocity().x;
    if(v > 0.0) this.currentVector = "right";
    if(v < 0.0) this.currentVector = "left";
};
Hero.prototype.updateSpriteState = function () {
    if(this.previouseState !== this.currentState || this.previouseVector !== this.currentVector) {
        this.sprite.changeState(this.currentVector, this.currentState);
        this.previouseState = this.currentState;
        this.previouseVector = this.currentVector;
    }
};
Hero.prototype.checkForJump = function () {
    return this.Contacts.bottom.length > 0;
};
Hero.prototype.createSensors = function () {
    box2d.addSensors(this.body, this.sensors);
};
Hero.prototype.die = function () {
    this.died = true;
    this.currentState = "lose";
    var self = this;
    setTimeout(function () {
        var vec = new Box2D.Common.Math.b2Vec2(0, -self.definition.verticalImpulse*2);
        game.hero.body.ApplyImpulse(vec, self.body.GetWorldCenter());

        for (var f = self.body.GetFixtureList(); f; f = f.GetNext()) {
            var filter = f.GetFilterData();
            filter.maskBits = 0;
            f.SetFilterData(filter);
        }
    }, 1000);
};

function enemy(entity, definition){
    this.entity = entity;
    this.definition = definition;
    this.sprite = pixi.createEnemy(entity, definition);
    this.body = box2d.createRectangle(entity, definition);
    this.body.SetUserData(this);
    this.currentState = "run";
    this.currentVector = definition.center ? "center" : "right";
    this.body.SetFixedRotation(true);
    this.type = "enemy";

    if(entity.vX) this.body.SetLinearVelocity(new Box2D.Common.Math.b2Vec2(entity.vX, 0));
}
enemy.prototype.push = function () {
    this.sprite = this.sprite.changeState(this.currentVector, "pushed", this.sprite);
    this.sprite.position.y += (this.entity.height - this.sprite.height)/4;
    box2d.world.DestroyBody(this.body);
    this.pushed = true;
};
enemy.prototype.updatePosition = function () {
    if(this.pushed){
        if(this.sprite.alpha > 0) this.sprite.alpha -= 0.005;
        else{
            this.sprite.alpha = 0.0;
            this.sprite.destroy(true);
            this.died = true;
        }
    }
    else {
        var position = this.body.GetPosition();
        var angle = this.body.GetAngle();
        this.sprite.position.x = (position.x * box2d.scale);
        this.sprite.position.y = position.y * box2d.scale;
        this.sprite.rotation = angle;
    }
};
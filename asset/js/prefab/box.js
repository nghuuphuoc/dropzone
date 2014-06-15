var Box = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'boxes', frame);

    /**
     * @type {Play}
     */
    this._currentState = this.game.state.getCurrentState();

    this.name = 'box';
    //this.anchor.setTo(0.5, 0.5);

//    this.animations.add('fly');
//    this.animations.play('fly', 1, true);

    this.game.physics.p2.enable(this, true);
    this.body.velocity.y = 100;
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', 'box');

    this.t = 0;
    this.TIME_INTERVAL = 1/100;
    //this.timer = this.game.time.events.loop(this.TIME_INTERVAL, this.updatePosition, this);

    this.startX = x;
    this.startY = y;
    this.v0 = 40;
    this.g  = 9.8;

    this._boxCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.body.collides(this._boxCollisionGroup, this.boxHitSea, this);


//    this.timer = this.game.time.create(true);
//    this.timer.loop(this.TIME_INTERVAL, this.updatePosition, this);
//    this.timer.start();

    //this.body.onBeginContact.add(this.collideHandler, this);
};

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function() {
    //this.game.physics.p2.collide(this, this._currentState.getSea(), this.dropHandler, null, this);
//    this.game.physics.arcade.collide(this, this._playState.getWave(), this.dropHandler, null, this);


    //this.game.physics.arcade.collide(this, this._playState.getIsland(), this.dropHandler, null, this);
};

Box.prototype.dropHandler = function(box, target) {
    this._collided = true;
    console.log('----> collide...');
};

Box.prototype.boxHitSea = function(box, sea) {
    console.log('boxHitSea()');
};

Box.prototype.collideHandler = function(body, shapeA, shapeB, equation) {
    console.log('collideHandler()');
};

Box.prototype.updatePosition = function() {
//    if (this._collided || this.t > 50) {
//        return;
//    }
//
    //console.log('updatePosition()');

//    if (this.timer.ms % 10 == 0) {
//        this.frame = this.game.rnd.integerInRange(0, 2);
//    }

    this.t += this.TIME_INTERVAL;
    this.body.x = this.startX + this.v0 * this.t;
    this.body.y = this.startY + 0.5 * this.g * Math.pow(this.t, 2);
};

var Box = function(game, x, y, frame, playState) {
    Phaser.Sprite.call(this, game, x, y, 'boxes', frame);

    /**
     * @type {Play}
     */
    this._playState = playState;

    this.name = 'box';

    this.anchor.setTo(0.5, 0.5);
//    this.animations.add('fly');
//    this.animations.play('fly', 1, false);

//    this.game.physics.arcade.enableBody(this);
//    this.game.physics.arcade.gravity.y = 200;

    this.game.physics.p2.enable(this, true);
//    this.body.velocity.x = 100;
//    this.body.velocity.y = 100;

//    this.checkWorldBounds = false;
//    this.outOfBoundsKill = false;

    // P2JS
    //this.body.collideWorldBounds = true;

    this.t = 0;
    this.TIME_INTERVAL = 1/5;
    this.timer = this.game.time.events.loop(this.TIME_INTERVAL, this.updatePosition, this);

    this.startX = x;
    this.startY = y;
    this.v0 = 40;
    this.g  = 9.8;

//    this.timer = this.game.time.create(false);
//    this.timer.loop(this.TIME_INTERVAL, this.updatePosition, this);
//    this.timer.start();
};

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function() {
    //console.log(this.tint);
    //console.log('box update');

    //this.game.physics.arcade.collide(this, this._playState.getWave(), this.dropHandler, null, this);
//    this.game.physics.arcade.collide(this, this._playState.getWave(), this.dropHandler, null, this);


    //this.game.physics.arcade.collide(this, this._playState.getIsland(), this.dropHandler, null, this);
};

Box.prototype.dropHandler = function(box, target) {
    this._collided = true;
    console.log('----> collide...');
};

Box.prototype.updatePosition = function() {
//    if (this._collided || this.t > 50) {
//        return;
//    }
//
    if (this.timer.ms % 10 == 0) {
        this.frame = this.game.rnd.integerInRange(0, 2);
    }

    this.t += this.TIME_INTERVAL;
    this.x = this.startX + this.v0 * this.t;
    this.y = this.startY + 0.5 * this.g * Math.pow(this.t, 2);
};

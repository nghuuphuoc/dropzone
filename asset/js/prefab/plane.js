var Plane = function(game, x, y, frame, playState) {
    Phaser.Sprite.call(this, game, x, y, 'planes', frame);

    /**
     * @type {Play}
     */
    this._playState = playState;

    //    this.game.physics.arcade.enableBody(this);
//    this.body.collideWorldBounds = true;
//    this.game.physics.p2.enable(this);
//    this.body.setZeroVelocity();

//    this.game.physics.p2.enable(this, false);

    this._boxes = this.game.add.group();
//    this._boxes.enableBody = true;
//    this._boxes.physicsBodyType = Phaser.Physics.P2JS;

    this.anchor.setTo(0.5, 0.5);
    //this.animations.add('fly');
    //this.animations.play('fly', 1, false);
};

Plane.prototype = Object.create(Phaser.Sprite.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.dropBox = function() {
    this.frame = 1;

    /* Create new box */
    var box = new Box(this.game, this.x + 90, this.y + 20, 0, this._playState);
    this.game.add.existing(box);

    this._boxes.add(box);
};

Plane.prototype.update = function() {
    //this.game.physics.p2.collide(this._boxes);

    this.x += 2;
    if (this.x >= this.game.world.width) {
        this.x     = 0;
        this.frame = 0;
    }
};

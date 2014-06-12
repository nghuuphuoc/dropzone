var Play = function() {
    Phaser.State.call(this);
};

Play.prototype = Object.create(Phaser.State.prototype);
Play.prototype.constructor = Play;

Play.prototype.create = function() {
    /* Enable physics system */
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    //this.game.physics.arcade.gravity.x = 20;
    //this.game.physics.arcade.gravity.y = 20;

    this.game.add.sprite(0, 0, 'background');

    /* Add sky */
    this.game.add.sprite(0, 60, 'sky');
//        this.cloud = this.game.add.tileSprite(0, 60, this.game.width, 94, 'cloud');
//        this.cloud.autoScroll(100, 0);

    /* Add wave */
    this.game.add.sprite(0, 684, 'sea');

    this._wave = this.game.add.tileSprite(0, 684, this.game.width, 216, 'wave');
    this._wave.autoScroll(-200, 0);

    this.game.physics.arcade.enableBody(this._wave);
    this._wave.body.allowGravity = false;
    this._wave.body.immovable = true;

    //this.game.physics.p2.enable(this._wave);
    //this._wave.body.setZeroVelocity();


    // Add island
    this._island = this.game.add.sprite(800, 455, 'island');
    //this._island = new Island(this.game);

    /* Add plane */
    this._plane = new Plane(this.game, 100, 100, 0, this);
    this.game.add.existing(this._plane);

    /* Add keyboard controls */
    this.dropKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.dropKey.onDown.add(this._plane.dropBox, this._plane);

    // Keep the space bar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
};

Play.prototype.update = function() {
//    this.game.physics.arcade.collide(this.box, this.wave, function() {
//    }, null, this);
};


/* Getters */

Play.prototype.getWave = function() {
    return this._wave;
};

Play.prototype.getIsland = function() {
    return this._island;
};

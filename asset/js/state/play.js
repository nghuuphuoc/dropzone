var Play = function() {
    Phaser.State.call(this);
    /**
     * @type {number}
     */
    this._hit  = 0;

    /**
     * @type {number}
     */
    this._miss = 0;
};

Play.prototype = Object.create(Phaser.State.prototype);
Play.prototype.constructor = Play;

Play.STATUS_TEXT = 'Hit: {hit}    Miss: {miss}';

Play.prototype.create = function() {
    this._hit  = 0;
    this._miss = 0;

    var w = this.game.width,
        h = this.game.height;

    // Enable physics system
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.setImpactEvents(true);

    // Add background
    this.game.add.sprite(0, 0, 'background');

    // Add sky
    this.game.add.sprite(0, 60, 'sky');

    // Add sea
    //this._sea = this.game.add.sprite(this.game.world.centerX, h - 45, 'sea');
    this._sea = this.game.add.sprite(w/2, h - 90/2, 'sea');
    this._sea.name = 'sea';
    this.game.physics.p2.enable(this._sea, false);
    this._sea.body.static = true;

    // Add wave
    this.game.add.tileSprite(0, h - 90, w, 90, 'wave').autoScroll(-200, 0);

    // Add island
    this._island = this.game.add.sprite(w/2, h - 209/2 - 90, 'island');
    this._island.name = 'island';
    this.game.physics.p2.enable(this._island, true);
    this._island.body.static = true;
    this._island.body.clearShapes();
    this._island.body.loadPolygon('physicsData', 'island');

    // Add hit/miss title
    var score = Play.STATUS_TEXT.replace('{hit}', this._hit + '').replace('{miss}', this._miss + '');
    this._scoreText = this.game.add.bitmapText(w - 400, 10, 'cooper', score, 40);

    // Add plane
    this._plane = new Plane(this.game, 10, 100, 0);
    this.game.add.existing(this._plane);

    // Add keyboard controls
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(this._plane.dropBox, this._plane);

    this.escapeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.escapeKey.onDown.add(this.showConfig, this);

    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ESC]);
};

/**
 * Show the config form
 */
Play.prototype.showConfig = function() {
    this.game.playNextState('config');
};

Play.prototype.increaseScore = function(type) {
    switch (type) {
        case 'hit':
            this._hit++;
            break;
        case 'miss':
            this._miss++;
            break;
    }
    var score = Play.STATUS_TEXT.replace('{hit}', this._hit + '').replace('{miss}', this._miss + '');
    this._scoreText.setText(score);

    var settings = Config.load(), numBoxes = settings.numBoxes;
    if (this._hit + this._miss >= numBoxes) {
        // Game over
        this.game.state.start('gameOver');
    }
};

/**
 * Get the scores
 * It might be used to show in the GameOver screen
 * @returns {{hit: number, miss: number}}
 */
Play.prototype.getScore = function() {
    return {
        hit: this._hit,
        miss: this._miss
    }
};
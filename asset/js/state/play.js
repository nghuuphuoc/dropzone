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
    this._island = this.game.add.sprite(w - 272/2, h - 209/2 - 90, 'island');
    this._island.name = 'island';
    this.game.physics.p2.enable(this._island, true);
    this._island.body.static = true;
    this._island.body.clearShapes();
    this._island.body.loadPolygon('physicsData', 'island');

    // Add hit/miss title
    var score = Play.STATUS_TEXT.replace('{hit}', this._hit + '').replace('{miss}', this._miss + '');
    this._scoreText = this.game.add.bitmapText(w - 400, 10, 'cooper', score, 40);

    // Add plane
    this._plane = new Plane(this.game, 550, 100, 0);
    this.game.add.existing(this._plane);

    // Load settings
    var settings = Config.load();
    // Init the value for form
    for (var k in settings) {
        $('#config').find('input[name="' + k + '"]').val(settings[k]);
    }

    // Show the form
    var that = this;
    $('#config')
        .show()
        // Start button handler
        .find('button.start')
            .off('click')
            .on('click', function() {
                var settings = {};
                $('#config').find('input').each(function() {
                    settings[$(this).attr('name')] = $(this).val();
                });
                that.start(settings);
            })
            .end();
};

/**
 * Start dropping box
 */
Play.prototype.start = function(settings) {
    Config.save(settings);
    this._plane.dropBox();
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
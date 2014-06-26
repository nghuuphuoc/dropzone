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
    this._island = this.game.add.sprite(w - 272/2 - w * 1/3, h - 209/2 - 90, 'island');
    this._island.name = 'island';
    this.game.physics.p2.enable(this._island, false);
    this._island.body.static = true;
    this._island.body.clearShapes();
    this._island.body.loadPolygon('physicsData', 'island');

    // Add hit/miss title
    var score = Play.STATUS_TEXT.replace('{hit}', this._hit + '').replace('{miss}', this._miss + '');
    this._scoreText    = this.game.add.bitmapText(w - 400, 10, 'cooper', score, 30);
    this._timeText     = this.game.add.bitmapText(w - 400, 40, 'cooper', 'Times: 0s', 30);
    this._distanceText = this.game.add.bitmapText(w - 400, 70, 'cooper', 'Distance: 0m', 30);

    // Add plane
    this._plane = new Plane(this.game, 550, 100, 0);

    // Allow to drag the plane
    this._plane.inputEnabled = true;
    this._plane.input.enableDrag(true);
    console.log(this._plane.events);
    this._plane.events.onDragStop.add(this._onDragPlane);

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
                    settings[$(this).attr('name')] = parseFloat($(this).val());
                });
                that.start(settings);
            })
            .end();
};

/**
 * Called after dragging the plane
 *
 * @param {Plane} plane
 */
Play.prototype._onDragPlane = function(plane) {

};

/**
 * Start dropping box
 */
Play.prototype.start = function(settings) {
    // Save the settings
    Config.save(settings);

    // Reset status
    this._distanceText.setText('Distance: ___m');

    this._plane.dropBox();
};

/**
 * Get the scores
 * It might be used to show in the GameOver screen
 *
 * @returns {{hit: number, miss: number}}
 */
Play.prototype.getScore = function() {
    return {
        hit: this._hit,
        miss: this._miss
    }
};

/**
 * Update scores
 *
 * @param {String} type Can be 'hit' or 'miss'
 */
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
};

/**
 * Update the elapsed time
 *
 * @param {Number} time
 */
Play.prototype.updateTime = function(time) {
    this._timeText.setText('Time: ' + time + 's');
};

/**
 * Update distance from the box to island
 *
 * @param {Number} boxX Box x-coordinate
 */
Play.prototype.updateDistance = function(boxX) {
    var distance = (boxX - this._island.body.x) / 100;
    this._distanceText.setText(['Distance: ', distance > 0 ? '+' : '-', Math.abs(distance).toFixed(3), 'm'].join(''));
};

var Play = function() {
    Phaser.State.call(this);
};

Play.prototype = Object.create(Phaser.State.prototype);
Play.prototype.constructor = Play;

Play.prototype.create = function() {
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

    // Add plane
    this._plane = new Plane(this.game, 10, 100, 0);
    this.game.add.existing(this._plane);

    // Add keyboard controls
    this.dropKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.dropKey.onDown.add(this._plane.dropBox, this._plane);

    // Keep the space bar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
};

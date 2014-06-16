var Plane = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'planes', frame);
    this.anchor.setTo(0.5, 0.5);

    /**
     * @type {Play}
     */
    this._playState = this.game.state.getCurrentState();

    this._boxes = [];
};

Plane.prototype = Object.create(Phaser.Sprite.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.dropBox = function() {
    var settings = Config.load();
    if (this._boxes.length >= settings.numBoxes) {
        return;
    }

    this.frame = 1;

    // Create new box
    var box = new Box(this.game, this.x + 90, this.y + 20, 1, this);
    this.game.add.existing(box);
    this._boxes.push(box);

    if (this._boxes.length == settings.numBoxes) {
        this.frame = 0;
    }
};

Plane.prototype.update = function() {
    this.x += 2;
    if (this.x >= this.game.world.width) {
        this.x     = 0;
        this.frame = 0;
    }
};

Plane.prototype.setHitBox = function(box) {
    this._playState.increaseScore('hit');
};

Plane.prototype.setMissBox = function(box) {
    this._playState.increaseScore('miss');
};

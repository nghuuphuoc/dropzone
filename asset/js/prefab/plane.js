var Plane = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'planes', frame);
    this.anchor.setTo(0.5, 0.5);

    // The parachute index are S, T, E, M, G, C, S, M
    // which its frame index are 0, 1, 2, 3, 4, 5, 0, 3
    this._boxFrameIndex = 0;
    this._boxFrameMap   = [0, 1, 2, 3, 4, 5, 0, 3];
};

Plane.prototype = Object.create(Phaser.Sprite.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.dropBox = function() {
    this.frame = 1;

    // Create new box
    var box = new Box(this.game, this.x + 90, this.y + 50, this._boxFrameMap[this._boxFrameIndex], this);
    this.game.add.existing(box);

    this._boxFrameIndex++;
    if (this._boxFrameIndex >= this._boxFrameMap.length) {
        this._boxFrameIndex = 0;
    }
};

var Plane = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'planes', frame);
    this.anchor.setTo(0.5, 0.5);
};

Plane.prototype = Object.create(Phaser.Sprite.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.dropBox = function() {
    this.frame = 1;

    // Create new box
    var box = new Box(this.game, this.x + 90, this.y + 50, 1, this);
    this.game.add.existing(box);
};

var Plane = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'planes', frame);
    this.anchor.setTo(0.5, 0.5);
};

Plane.prototype = Object.create(Phaser.Sprite.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.dropBox = function() {
    this.frame = 1;

    // Create new box
    var box = new Box(this.game, this.x + 90, this.y + 20, 1);
    this.game.add.existing(box);
};

Plane.prototype.update = function() {
    this.x += 2;
    if (this.x >= this.game.world.width) {
        this.x     = 0;
        this.frame = 0;
    }
};

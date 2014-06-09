var Plane = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'planes', frame);

    this.anchor.setTo(0.5, 0.5);
    //this.animations.add('fly');
    //this.animations.play('fly', 1, false);

    this.game.physics.arcade.enableBody(this);
    //this.body.collideWorldBounds = true;
};

Plane.prototype = Object.create(Phaser.Sprite.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.drop = function() {
    console.log('dropping ...');
};

Plane.prototype.update = function() {

};

var Wave = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'wavessss');

    this.sea = this.game.add.sprite(0, 684, 'sea');

    console.log('----wave---');
  this.autoScroll(-200, 0);

  // enable physics on the ground sprite
  // this is needed for collision detection
  this.game.physics.arcade.enableBody(this);

  // we don't want the ground's body
  // to be affected by gravity or external forces
//  this.body.allowGravity = false;
//  this.body.immovable = true;
};

Wave.prototype = Object.create(Phaser.TileSprite.prototype);
Wave.prototype.constructor = Wave;

Wave.prototype.update = function() {
};

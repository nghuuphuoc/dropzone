var Game = function(width, height, mode, element) {
    Phaser.Game.call(this, width, height, mode, element);

    // Add game screens
    this.state.add('boot',    new Boot());
    this.state.add('preload', new Preload());
    this.state.add('menu',    new Menu());
    this.state.add('play',    new Play());

    this.state.start('boot');
};

Game.prototype = Object.create(Phaser.Game.prototype);
Game.prototype.constructor = Game;

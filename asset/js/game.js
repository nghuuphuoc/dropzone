var Game = function(width, height, mode, element) {
    Phaser.Game.call(this, width, height, mode, element);

    // Add game screens
    this.state.add('boot',    Boot);
    this.state.add('preload', Preload);
    this.state.add('menu',    Menu);
    this.state.add('play',    Play);

    this.state.start('boot');
};

Game.prototype = Object.create(Phaser.Game.prototype);
Game.prototype.constructor = Game;

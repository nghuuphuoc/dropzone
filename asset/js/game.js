var Game = function(width, height, mode, element) {
    Phaser.Game.call(this, width, height, mode, element);

    this._prevState = null;

    // Add game screens
    this.state.add('boot',    Boot);
    this.state.add('preload', Preload);
    this.state.add('menu',    Menu);
    this.state.add('config',  Config);
    this.state.add('play',    Play);

    this.state.start('boot');
};

Game.prototype = Object.create(Phaser.Game.prototype);
Game.prototype.constructor = Game;

Game.prototype.playPrevState = function() {
    if (this._prevState) {
        $(this.canvas).parent().show();
        this.state.start(this._prevState);
    }
};

Game.prototype.playNextState = function(state) {
    this._prevState = this.state.current;
    this.state.start(state);
};

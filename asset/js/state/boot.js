var Boot = function() {
    Phaser.State.call(this);
};

Boot.prototype = Object.create(Phaser.State.prototype);
Boot.prototype.constructor = Boot;

Boot.prototype.preload = function() {
    this.load.image('preloader', 'asset/img/preloader.gif');
};

Boot.prototype.create = function() {
    // Unless you specifically need to support multi touch I would recommend setting this to 1
    this.game.input.maxPointers = 1;

    //  Phaser will automatically pause if the browser tab the game is in loses focus
    this.stage.disableVisibilityChange = true;

    this.game.state.start('preload');
};

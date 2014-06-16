var GameOver = function() {
    Phaser.State.call(this);
};

GameOver.prototype = Object.create(Phaser.State.prototype);
GameOver.prototype.constructor = GameOver;

GameOver.prototype.create = function() {
    var w = this.game.width,
        h = this.game.height;

    // Add background
    this.game.add.sprite(0, 0, 'background');

    // Add game over title
    this._title = this.game.add.sprite(w/2, 200, 'gameOver');
    this._title.anchor.setTo(0.5, 0.5);

    // Add hit/miss title
    /**
     * @type {Play}
     */
    var playState = this.game.state.states['play'];
    var score = playState.getScore(),
        text  = this.game.add.bitmapText(w/2 - 100, 300, 'cooper', 'Hit: ' + score.hit + '\n Miss: ' + score.miss, 50);
    text.align = 'center';

    // Add buttons
    this._replayButton = new Phaser.Button(this.game, w/2 - 100, 500, 'buttons', this.onReplayClick, this, 1, 1, 1);
    this._replayButton.anchor.setTo(0.5, 0.5);

    this._menuButton = new Phaser.Button(this.game, w/2 + 100, 500, 'buttons', this.onMenuClick, this, 2, 2, 2);
    this._menuButton.anchor.setTo(0.5, 0.5);

    this.game.add.existing(this._replayButton);
    this.game.add.existing(this._menuButton);
};

/**
 * Replay
 */
GameOver.prototype.onReplayClick = function() {
    this.game.state.start('play');
};

/**
 * Go to the menu screen
 */
GameOver.prototype.onMenuClick = function() {
    this.game.state.start('menu');
};

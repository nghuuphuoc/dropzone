var Menu = function() {
    Phaser.State.call(this);
};

Menu.prototype = Object.create(Phaser.State.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.create = function() {
    var w = this.game.width,
        h = this.game.height;

    // Add background
    this.game.add.sprite(0, 0, 'background');

    // Add wave
    this.game.add.sprite(0, h - 90, 'sea');
    this.wave = this.game.add.tileSprite(0, h - 90, w, 90, 'wave');
    this.wave.autoScroll(-200, 0);

    // Create a title group
    this.titleGroup = this.game.add.group();

    this.title = this.game.add.sprite(w/2 - 500, 150, 'title');
    this.titleGroup.add(this.title);

    this.plane = this.game.add.sprite(w/2 + 80, 142, 'planes');
    this.titleGroup.add(this.plane);

    this.plane.animations.add('fly');
    this.plane.animations.play('fly', 10, true);

    // Animate the title group
    this.game.add.tween(this.titleGroup).to({ y: 10 }, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    // Add island
    this.game.add.sprite(w/2 - 224, h - 320, 'islandShadow');

    // Add Start button
    this._startButton = new Phaser.Button(this.game, w/2, h/2, 'buttons', this.onStartClick, this, 0, 0, 0);
    this._startButton.anchor.setTo(0.5, 0.5);

    this._configButton = new Phaser.Button(this.game, w/2, h/2 + 100, 'buttons', this.onConfigClick, this, 3, 3, 3);
    this._configButton.anchor.setTo(0.5, 0.5);

    this.game.add.existing(this._startButton);
    this.game.add.existing(this._configButton);
};

/**
 * Start the game
 */
Menu.prototype.onStartClick = function() {
    this.game.state.start('play');
};

/**
 * Show the config form
 */
Menu.prototype.onConfigClick = function() {
    this.game.playNextState('config');
};

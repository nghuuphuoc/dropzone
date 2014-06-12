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
    this.sea = this.game.add.sprite(0, h - 90, 'sea');
    this.wave = this.game.add.tileSprite(0, h - 90, w, 90, 'wave');
    this.wave.autoScroll(-200, 0);

    /* Create a title group */
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
    this.island = this.game.add.sprite(w/2 - 224, h - 320, 'island');

    // Add Start button
    this.startButton = this.game.add.button(w/2, h/2 - 50, 'startButton', this.onStartClick, this);
    this.startButton.anchor.setTo(0.5, 0.5);
};

/**
 * Start the game
 */
Menu.prototype.onStartClick = function() {
    this.game.state.start('play');
};

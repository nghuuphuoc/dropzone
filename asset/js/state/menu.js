function Menu() {

};

Menu.prototype = {
    preload: function() {
        // Add background
        this.background = this.game.add.sprite(0, 0, 'background');

        // Add cloud
        this.cloud = this.game.add.sprite(0, 60, 'cloud');

        // Add wave
        this.sea = this.game.add.sprite(0, 684, 'sea');
        this.wave = this.game.add.tileSprite(0, 684, this.game.width, 216, 'wave');
        this.wave.autoScroll(-200, 0);

        // Create a title group
        this.titleGroup = this.game.add.group();

        this.title = this.game.add.sprite(100, 150, 'title');
        this.titleGroup.add(this.title);

        this.plane = this.game.add.sprite(680, 142, 'planes');
        this.titleGroup.add(this.plane);

        this.plane.animations.add('fly');
        this.plane.animations.play('fly', 10, true);

        // Animate the title group
        this.game.add.tween(this.titleGroup).to({ y: 20 }, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

        // Add island
        this.island = this.game.add.sprite(506, 455, 'island');

        // Add Start button
        this.startButton = this.game.add.button(this.game.width / 2, this.game.height / 2 - 50, 'startButton', this.start, this);
        this.startButton.anchor.setTo(0.5, 0.5);
    },

    create: function() {

    },

    update: function() {

    },

    /**
     * Start the game
     */
    start: function() {

    }
};

function Play() {
};

Play.prototype = {
    create: function() {
        // Enable physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.arcade.gravity.x = 20;
        //this.game.physics.arcade.gravity.y = 20;

        // Add background
        this.background = this.game.add.sprite(0, 0, 'background');

        // Add sky
//        this.sky = this.game.add.sprite(0, 60, 'sky');
        //this.cloud = this.game.add.tileSprite(0, 60, this.game.width, 94, 'cloud');
        //this.cloud.autoScroll(100, 0);

        // Add wave
//        this.sea = this.game.add.sprite(0, 684, 'sea');
        this.wave = this.game.add.tileSprite(0, 684, this.game.width, 216, 'wave');
        //this.wave.autoScroll(-200, 0);
        this.game.physics.arcade.enableBody(this.wave);
        this.wave.body.allowGravity = false;

//        this.wave = new Wave(this.game, 0, 684, this.game.width, 216);

        // Add island
//        this.island = this.game.add.sprite(800, 455, 'island');

        // Add plane
//        this.plane = new Plane(this.game, 100, 100);
//        this.game.add.existing(this.plane);

         // Add keyboard controls
//        this.dropKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//        this.dropKey.onDown.add(this.plane.dropBox, this.plane);
//
//        // Keep the space bar from propogating up to the browser
//        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);


        this.box = new Box(this.game, 90, 20);
        this.game.add.existing(this.box);

//        this.box = this.game.add.sprite(90, 20, 'boxes');
    },

    update: function() {
        this.game.physics.arcade.collide(this.box, this.wave, function() {
            console.log('----');
        }, null, this);
    }
};

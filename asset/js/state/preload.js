function Preload() {
    this.asset = null;
    this.ready = false;
};

Preload.prototype = {
    preload: function() {
        this.asset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);

        this.load.image('background', 'asset/img/background.png');
    },

    create: function() {
        this.asset.cropEnabled = false;
    },

    update: function() {
        if (this.ready) {
            this.game.state.start('menu');
        }
    },

    onLoadComplete: function() {
        this.ready = true;
    }
};
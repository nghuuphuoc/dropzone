var Preload = function() {
    Phaser.State.call(this);

    this.asset = null;
    this.ready = false;
};

Preload.prototype = Object.create(Phaser.State.prototype);
Preload.prototype.constructor = Preload;

Preload.prototype.preload = function() {
    this.asset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadCompleted, this);
    this.load.setPreloadSprite(this.asset);

    this.load.image('background', 'asset/img/background.png');
    this.load.image('wave', 'asset/img/wave.png');
    this.load.image('sea', 'asset/img/sea.png');
    this.load.image('title', 'asset/img/title.png');
    this.load.image('plane', 'asset/img/plane.png');
    this.load.image('island', 'asset/img/island.png');
    this.load.image('startButton', 'asset/img/start.png');
    this.load.image('sky', 'asset/img/sky.png');
    this.load.image('cloud', 'asset/img/cloud.png');

    this.load.image('tree1', 'asset/img/tree1.png');
    this.load.image('tree2', 'asset/img/tree2.png');
    this.load.image('tree3', 'asset/img/tree3.png');
    this.load.image('island1', 'asset/img/island2.png');
    this.load.image('island2', 'asset/img/island2.png');

    this.load.spritesheet('planes', 'asset/img/planes.png', 494, 155, 4);
    this.load.spritesheet('boxes', 'asset/img/boxes.png', 110, 109, 3);
};

Preload.prototype.create = function() {
    this.asset.cropEnabled = false;
};

Preload.prototype.update = function() {
    if (this.ready) {
        this.game.state.start('menu');
        //this.game.state.start('play');
    }
};

Preload.prototype.onLoadCompleted = function() {
    this.ready = true;
};

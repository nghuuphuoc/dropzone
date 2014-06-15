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
    this.load.image('islandShadow', 'asset/img/islandShadow.png');
    this.load.image('button', 'asset/img/button.png');
    this.load.image('sky', 'asset/img/sky.png');
    this.load.image('cloud', 'asset/img/cloud.png');
    this.load.image('box', 'asset/img/box.png');
    this.load.image('island', 'asset/img/island.png');

    this.load.spritesheet('planes', 'asset/img/planes.png', 494, 155, 4);
    this.load.spritesheet('boxes', 'asset/img/boxes.png', 97, 108, 3);
    this.load.spritesheet('boxHitSea', 'asset/img/boxHitSea.png', 42, 42, 3);

    this.load.physics('physicsData', 'asset/img/sprites.json');
};

Preload.prototype.create = function() {
    this.asset.cropEnabled = false;
};

Preload.prototype.update = function() {
    if (this.ready) {
        //this.game.state.start('menu');
        this.game.state.start('play');
    }
};

Preload.prototype.onLoadCompleted = function() {
    this.ready = true;
};

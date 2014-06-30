var Preload = function() {
    Phaser.State.call(this);

    this._asset = null;
    this._ready = false;
};

Preload.prototype = Object.create(Phaser.State.prototype);
Preload.prototype.constructor = Preload;

Preload.prototype.preload = function() {
    var w = this.game.width,
        h = this.game.height;

    // Create loading asset
    this._asset = this.add.sprite(w/2, h/2, 'preloader');
    this._asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadCompleted, this);
    this.load.setPreloadSprite(this._asset);

    // Images
    this.load.image('background',   'asset/img/background.png');
    this.load.image('box',          'asset/img/box.png');
    this.load.image('cloud',        'asset/img/cloud.png');
    this.load.image('gameOver',     'asset/img/gameOver.png');
    this.load.image('island',       'asset/img/island.png');
    this.load.image('islandShadow', 'asset/img/islandShadow.png');
    this.load.image('plane',        'asset/img/plane.png');
    this.load.image('sea',          'asset/img/sea.png');
    this.load.image('sky',          'asset/img/sky.png');
    this.load.image('title',        'asset/img/title.png');
    this.load.image('wave',         'asset/img/wave.png');

    // Sprites
    this.load.spritesheet('boxes',     'asset/img/boxes.png',     97,  108,   3);
    this.load.spritesheet('boxHitSea', 'asset/img/boxHitSea.png', 42,  42,    3);
    this.load.spritesheet('buttons',   'asset/img/buttons.png',   167, 81,    6);
    this.load.spritesheet('planes',    'asset/img/planes.png',    497, 151.8, 5);

    // Fonts
    this.load.bitmapFont('cooper', 'asset/font/cooper.png', 'asset/font/cooper.fnt');

    // Physic data
    this.load.physics('physicsData', 'asset/img/sprites.json');
};

Preload.prototype.create = function() {
    this._asset.cropEnabled = false;
};

Preload.prototype.update = function() {
    if (this._ready) {
        //this.game.state.start('menu');
        this.game.state.start('play');
    }
};

Preload.prototype.onLoadCompleted = function() {
    this._ready = true;
};

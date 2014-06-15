var Plane = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'planes', frame);
    this.anchor.setTo(0.5, 0.5);

    /**
     * @type {Play}
     */
    this._currentState = this.game.state.getCurrentState();

    this._boxCollisionGroup = this.game.physics.p2.createCollisionGroup();

//    this._sea = this._currentState.getSea();
//    this._sea.body.collides(this._boxCollisionGroup, this.boxHitSea, this);
};

Plane.prototype = Object.create(Phaser.Sprite.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.dropBox = function() {
    this.frame = 1;

    // Create new box
    var box = new Box(this.game, this.x + 90, this.y + 20, 0);
    this.game.add.existing(box);

    //box.body.setCollisionGroup(this._boxCollisionGroup);
    //box.body.collides(this._boxCollisionGroup, this.boxHitSea, this);
};

Plane.prototype.boxHitSea = function(sea, box) {
    console.log(sea);
    console.log(box);
};

Plane.prototype.update = function() {
    this.x += 2;
    if (this.x >= this.game.world.width) {
        this.x     = 0;
        this.frame = 0;
    }
};

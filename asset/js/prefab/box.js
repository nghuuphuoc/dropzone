var Box = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'boxes', frame);

    this.name = 'box';
    //this.anchor.setTo(0.5, 0.5);

//    this.animations.add('fly');
//    this.animations.play('fly', 1, true);

    this.game.physics.p2.enable(this, true);
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', 'box');

    this.t = 0;
    this.TIME_INTERVAL = 1/10;
    //this._timer = this.game.time.events.loop(this.TIME_INTERVAL, this.updatePosition, this);

    this.startX = x;
    this.startY = y;
    this.v0 = 40;
    this.g  = 9.8;

    this._hitSea    = false;
    this._hitBox    = false;
    this._hitIsland = false;

    this.body.onBeginContact.add(this.boxHit, this);

    this._timer = this.game.time.create(true);
    this._timer.loop(this.TIME_INTERVAL, this.updatePosition, this);
    this._timer.start();


    this._needToUpdate = true;
};

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.boxHit = function(body, shapeA, shapeB, equation) {
    if (body && body.sprite.name) {
        console.log(body.sprite.name);
        switch (body.sprite.name) {
            case 'sea':
                // Box hits the sea
                this._hitSea = true;
                break;

            case 'box':
                // Box hits each other
                break;

            case 'island':
                // Box hits the island
                this._island = true;
                break;

            default:
                break;
        }
    }
};

Box.prototype.update = function() {
    if (!this._needToUpdate) {
        return;
    }

    if (this._hitSea) {
        this.body.y += 0.4;
        this.frame = 2;

        if (this.body.y > this.game.world.height + 20) {
            // TODO: Destroy the sprite
            // this.destroy();
            this.body.removeFromWorld();
            //this.body.destroy();
            this._needToUpdate = false;
        }
    }
};

Box.prototype.updatePosition = function() {
    if (this._hitSea) {
        //this.game.time.events.remove(this._timer);
        this._timer.destroy();
        this.body.clearShapes();

        this.body.y += 50;
        this.loadTexture('boxHitSea', 2);

        this.body.static = true;
        return;
    }

    if (this._hitIsland) {
        this._timer.destroy();
        return;
    }

    if (this._timer.ms % 50 == 0) {
        //this.frame = this.game.rnd.integerInRange(0, 2);
    }

    this.t += this.TIME_INTERVAL;
    this.body.x = this.startX + this.v0 * this.t;
    this.body.y = this.startY + 0.5 * this.g * Math.pow(this.t, 2);
};

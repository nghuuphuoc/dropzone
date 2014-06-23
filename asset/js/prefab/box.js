var Box = function(game, x, y, frame, plane) {
    Phaser.Sprite.call(this, game, x, y, 'boxes', frame);

    this.name = 'box';
    //this.anchor.setTo(0.5, 0.5);

//    this.animations.add('fly');
//    this.animations.play('fly', 1, true);

    /**
     * @type {Plane}
     */
    this._plane = plane;

    /**
     * @type {Play}
     */
    this._playState = this.game.state.getCurrentState();

    this.game.physics.p2.enable(this, false);
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', 'box');

    this._hitSea    = false;
    this._hitIsland = false;

    this.body.onBeginContact.add(this.boxHit, this);

    this.TIME_INTERVAL = 0.1;
    this._timer = this.game.time.create(true);
    this._timer.loop(this.TIME_INTERVAL, this.updatePosition, this);
    this._timer.start();

    this._needToUpdate = true;

    // To spy the box coordinate
    this._bitmap = this.game.add.bitmapData(this.game.world.width, this.game.world.height);
    this._bitmap.context.fillStyle = '#ffffff';
    this.game.add.sprite(0, 0, this._bitmap);

    /**
     * @type {Config.DEFAULT}
     */
    var settings = Config.load();
    this._ode = new ProjectileOde(x, 0, y, settings.vx0, settings.vy0, settings.vz0, 0);
    this._ode.setArea(settings.long * settings.width / 10000)
             .setCd(settings.cd)
             .setDensity(settings.density)
             .setMass(settings.mass)
             .setWindVx(settings.windVx)
             .setWindVy(settings.windVy);
};

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.boxHit = function(body, shapeA, shapeB, equation) {
    if (body && body.sprite.name) {
        switch (body.sprite.name) {
            case 'island':
                // Box hits the island
                this._hitIsland = true;
                break;

            case 'sea':
                // Box hits the sea
                this._hitSea = true;
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

    if (this._hitIsland || this._hitSea) {
        // Update distance from the box to the island
        this._playState.updateDistance(this.body.x);
    }

    if (this._hitIsland) {
        this.destroyBox();
        return;
    }

    if (this._hitSea) {
        this.body.y += 0.4;
        this.frame = 2;

        if (this.body.y > this.game.world.height + 20) {
            this.destroyBox();
        }
    }
};

/**
 * Destroy the box
 */
Box.prototype.destroyBox = function() {
    this._needToUpdate = false;
    this._timer.stop();
    this._timer.destroy();
    var that = this;

    // Since the last loop of timer might still call Box.prototype.update, I need to ensure the timer is really destroyed
    var t = setTimeout(function() {
        that.destroy();
        clearTimeout(t);
    }, 0);
};

/**
 * Update the box position after each interval time
 */
Box.prototype.updatePosition = function() {
    if (this._hitIsland) {
        this._timer.destroy();
        // Update the miss scores
        this._playState.increaseScore('hit');

        return;
    }

    if (this._hitSea) {
        this._timer.destroy();
        this.body.clearShapes();

        this.body.y += 50;
        this.loadTexture('boxHitSea', 2);

        // Update the miss scores
        this._playState.increaseScore('miss');
        this.body.static = true;

        return;
    }

    if (this._timer.ms % 50 == 0) {
        this.frame = this.game.rnd.integerInRange(0, 2);
    }

    // Update the box position
    this._ode.rungeKutta4(this.TIME_INTERVAL);
    var coordinate = this._ode.getCoordinate();
    this.body.x = coordinate.x;
    this.body.y = coordinate.z;

    // Update the elapsed time
    this._playState.updateTime(this._ode.getTime().toFixed(3));

    this._bitmap.context.fillStyle = '#FFFF00';
    this._bitmap.context.fillRect(coordinate.x, coordinate.z + 20, 2, 2);
};

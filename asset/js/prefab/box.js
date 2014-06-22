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

    this.game.physics.p2.enable(this, true);
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', 'box');

    this._hitSea    = false;
    this._hitBox    = false;
    this._hitIsland = false;

    this.body.onBeginContact.add(this.boxHit, this);

    this.t = 0;
    this.TIME_INTERVAL = 1;
    this._timer = this.game.time.create(true);
    this._timer.loop(this.TIME_INTERVAL, this.updatePosition, this);
    this._timer.start();

    this._needToUpdate = true;

    var settings = Config.load();
    this._ode = new ProjectileOde(6, x, 0, y, settings.vx0, settings.vy0, settings.vz0, 0);
    this._ode.setArea(0.001432);
    this._ode.setCd(1.05);
    this._ode.setDensity(1.225);
    this._ode.setMass(0.04);
    this._ode.setWindVx(-10);
    this._ode.setWindVy(0);
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

            case 'box':
                // Box hits each other
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

Box.prototype.updatePosition = function() {
    if (this._hitIsland) {
        this._timer.stop();
        this._timer.destroy();
        //this._plane.setHitBox(this);
        return;
    }

    if (this._hitSea) {
        this.game.time.events.remove(this._timer);
        this._timer.destroy();
        this.body.clearShapes();

        this.body.y += 50;
        this.loadTexture('boxHitSea', 2);

        //this._plane.setMissBox(this);
        this.body.static = true;
        return;
    }

    if (this._timer.ms % 50 == 0) {
        //this.frame = this.game.rnd.integerInRange(0, 2);
    }

    this.t += this.TIME_INTERVAL;
    this._ode.solve(this.TIME_INTERVAL);
    //console.log(this.t, this._ode.getVelocity(), this._ode.getCoordinate());

    var coordinate = this._ode.getCoordinate();
    console.log(this.t, coordinate);
    this.body.x = coordinate.x;
    this.body.y = coordinate.z;
};

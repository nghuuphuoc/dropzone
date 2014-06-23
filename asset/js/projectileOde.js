// Ode stands for Ordinary Differential Equations
var ProjectileOde = function(x0, y0, z0, vx0, vy0, vz0, time) {
    Ode.call(this, 6);

    this._s = time;
    this._q = [vx0, x0, vy0, y0, vz0, z0];

    // Drag coefficients
    // Should be 1.05–1.07 for cube
    this._cd = 1.05;

    this._windVx = 0;   // Wind X-velocity (m/s)
    this._windVy = 0;   // Wind Y-velocity (m/s)
};

// Gravity constant
ProjectileOde.G = 9.81;

ProjectileOde.prototype = Object.create(Ode.prototype);
ProjectileOde.prototype.constructor = ProjectileOde;

// Setters

ProjectileOde.prototype.setDensity = function(density) {
    this._density = density;
    return this;
};

ProjectileOde.prototype.setCd = function(cd) {
    this._cd = cd;
    return this;
};

ProjectileOde.prototype.setArea = function(area) {
    this._area = area;
    return this;
};

ProjectileOde.prototype.setMass = function(mass) {
    this._mass = mass;
    return this;
};

ProjectileOde.prototype.setWindVx = function(windVx) {
    this._windVx = windVx;
    return this;
};

ProjectileOde.prototype.setWindVy = function(windVy) {
    this._windVy = windVy;
    return this;
};

ProjectileOde.prototype.getVelocity = function() {
    return {
        vx: this._q[0],
        vy: this._q[2],
        vz: this._q[4]
    }
};

// Getters

ProjectileOde.prototype.getCoordinate = function() {
    return {
        x: this._q[1],
        y: this._q[3],
        z: this._q[5]
    }
};

/**
 * @returns {Number}
 */
ProjectileOde.prototype.getTime = function() {
    return this._s;
};

/**
 * Return the right-hand sides of the six first-order projectile ODEs
 * q[0] = vx = dxdt
 * q[1] = x
 * q[2] = vy = dydt
 * q[3] = y
 * q[4] = vz = dzdt
 * q[5] = z
 *
 * @param {Number} s
 * @param {Array[Number]} q
 * @param {Array[Number]} deltaQ
 * @param {Number} ds
 * @param {Number} scale
 */
ProjectileOde.prototype._calculateNextStep = function(s, q, deltaQ, ds, scale) {
    var newQ = [];
    for (var i = 0; i < 6; i++) {
        newQ[i] = q[i] + scale * deltaQ[i];
    }

    var vx = newQ[0] - this._windVx,
        vy = newQ[2] - this._windVy,
        vz = newQ[4],

        // Calculate the velocity
        // 1.0e-8 to avoid dividing by zero
        v  = Math.sqrt(vx * vx + vy * vy + vz * vz) + 1.0e-8,
        // Drag force
        fd = 0.5 * this._density * this._area * this._cd * v * v;

    return [
        -ds * fd * vx / (this._mass * v),
        ds * vx,
        -ds * fd * vy / (this._mass * v),
        ds * vy,
        ds * (ProjectileOde.G - (fd * vz / (this._mass * v))),
        ds * vz
    ];
};

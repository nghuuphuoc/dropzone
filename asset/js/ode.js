// Fourth-Order Runge-Kutta Solver
var Ode = function(numEquations) {
    // Number of equations
    this._numEquations = numEquations;

    // Array of dependent variables
    this._q = [];

    // Independent variable
    this._s = 0;
};

Ode.prototype.constructor = Ode;

Ode.prototype._calculateNextStep = function(s, q, deltaQ, ds, scale) {
    // Abstract method
};

Ode.prototype.rungeKutta4 = function(ds) {
    var s = this._s,
        q = this._q,

        dq1 = this._calculateNextStep(s, q, q, ds, 0.0),
        dq2 = this._calculateNextStep(s+0.5*ds, q, dq1, ds, 0.5),
        dq3 = this._calculateNextStep(s+0.5*ds, q, dq2, ds, 0.5),
        dq4 = this._calculateNextStep(s+ds, q, dq3, ds, 1.0);

    this._s = this._s + ds;

    for (var j = 0; j < this._numEquations; j++) {
        this._q[j] = this._q[j] + (dq1[j] + 2.0*dq2[j] + 2.0*dq3[j] + dq4[j])/6.0;
    }
};

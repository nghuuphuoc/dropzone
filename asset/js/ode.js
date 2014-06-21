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

Ode.prototype.getRightHandSide = function(s, q, deltaQ, ds, scale) {
    // Abstract method
};

Ode.prototype.solve = function(ds) {
    var dq1 = this.getRightHandSide(this._s, this._q, this._q, ds, 0.0),
        dq2 = this.getRightHandSide(this._s + 0.5 * ds, this._q, dq1, ds, 0.5),
        dq3 = this.getRightHandSide(this._s + 0.5 * ds, this._q, dq2, ds, 0.5),
        dq4 = this.getRightHandSide(this._s + ds, this._q, dq3, ds, 1.0);

    this._s += ds;
    for (var i = 0; i < this._numEquations; i++) {
        this._q[i] = this._q[i] + (dq1[i] + 2 * dq2[i]/3 + 2 * dq3[i] + dq4[i]) / 6;
    }

    //console.log(this._s);
    //console.log(this._q);
};

var Particle = function(mass, position) {
    this.mass = 0.0;
    this.age = 0.0;
    this.isDisposedOf = false;
    this.isFixed = false;
    this.isEnable = false;
    this.position = null;
    this.velocity = null;
    this.force = null;

    this.guid;
    this.init(mass, position);
};

Particle.prototype = {
    init: function(mass, position) {
        this.mass = mass;
        this.position = position;
        this.isFixed = false;
        this.isEnable = true;
        this.age = 0.0;
        this.isDisposedOf = false;
        this.velocity = new Vector3D(0.0, 0.0, 0.0);
        this.force = new Vector3D(0.0, 0.0, 0.0);

        this.guid = NumberFunc.getRandomInt(1, NumberFunc.MAX_VALUE);
    },
    moveTo: function(vector) {
        this.position.set(vector);
    },
    moveBy: function(vector)
    {
        this.position.add(vector);
    },
    setVelocity: function(vector) {
        this.velocity.set(vector);
    },
    addVelocity: function(vector) {
        this.velocity.add(vector);
    },
    setForce: function(vector) {
        this.force.set(vector);
    },
    makeFixed: function() {
        this.isFixed = true;
        this.velocity.clear();
    },
    isFree: function() {
        return !this.isFixed;
    },
    makeFree: function() {
        this.isFixed = false;
    },
    dispose: function() {
        this.isDisposedOf = true;
    },
    isDisposed: function() {
        return this.isDisposedOf;
    }
};
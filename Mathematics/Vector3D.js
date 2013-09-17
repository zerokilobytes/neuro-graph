/**
 * 
 * @returns {Vector3D}
 */
var Vector3D = function(x, y, z) {
    /// X coordinate of vector
    this.x = 0.0;

    /// Y coordinate of vector
    this.y = 0.0;

    /// Z coordinate of vector
    this.z = 0.0;

    this.init(x, y, z);
};

/**
 * Vector prototype
 * @type type
 */
Vector3D.prototype = {
    /**
     * Initializes a new instance of the Vector3D class
     * Parameters are values of the vector coordinates
     */
    init: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    },
    /**
     * Gets Z coordinate
     */
    getZ: function() {
        return this.z;
    },
    /**
     * Sets coordinate
     */
    setZ: function(z) {
        this.z = z;
    },
    getY: function() {
        return this.y;
    },
    setY: function(y) {
        this.y = y;
    },
    getX: function() {
        return this.x
    },
    /**
     * Sets all three coordinates of vector at a time
     */
    set: function(p) {
        this.x = p.x;
        this.y = p.y;
        this.z = p.z;
    },
    /**
     * Adds in place two vectors, coordinates by coordinates
     */
    add: function(p) {
        this.x += p.x;
        this.y += p.y;
        this.z += p.z;
        return this;
    },
    /**
     * Subtracts in place two vectors, coordinates by coordinates
     */
    subtract: function(p) {
        this.x -= p.x;
        this.y -= p.y;
        this.z -= p.z;
        return this;
    },
    /**
     *  Calculate the resultant of two vectors
     */
    plus: function(p) {
        return new Vector3D(this.x + p.x, this.y + p.y, this.z + p.z);
    },
    /**
     * Multiply vector coordinates by a constant
     */
    times: function(f) {
        return new Vector3D(this.x * f, this.y * f, this.z * f);
    },
    /**
     * Divides vector coordinates by a constant
     */
    over: function(f) {
        return new Vector3D(this.x / f, this.y / f, this.z / f);
    },
    /**
     * Calculate the resultant of two vectors
     */
    minus: function(p) {
        return new Vector3D(this.x - p.x, this.y - p.y, this.z - p.z);
    },
    /**
     *  Multiply in place vector coordinates by a constant
     */
    multiplyBy: function(f) {
        this.x *= f;
        this.y *= f;
        this.z *= f;
        return this;
    },
    /**
     * Calculate distance to given vector
     */
    distanceTo: function(p) {
        dx = this.x - p.x;
        dy = this.y - p.y;
        dz = this.z - p.z;
        return Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));
    },
    /**
     * Calculate distance to given coordinates
     */
    distanceTo:function(x, y, z) {
        dx = this.x - x;
        dy = this.y - y;
        dz = this.z - z;
        return 1.0 / Arithmetic.fastInverseSqrt((dx * dx) + (dy * dy) + (dz * dz));
    },
            /**
             * Multiply two vectors, coordinate by coordinate
             */
            dot: function(p) {
        return (this.x * p.x) + (this.y * p.y) + (this.z * p.z);
    },
    /**
     * Calculate vector length
     */
    length: function() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    },
    /**
     * Normalize a vector
     */
    unit: function() {
        var l = this.length();
        return (l !== 0.0) ? this.over(l) : new Vector3D();
    },
    /**
     * Resets vector to vector null
     */
    clear: function() {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
    },
    /**
     * Format vector for string output
     */
    toString: function() {
        return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    },
    /**
     * Calculate vertical product
     */
    cross: function(p) {
        return new Vector3D(
                (this.y * p.z) - (this.z * p.y),
                (this.z * p.x) - (this.x * p.z),
                (this.x * p.y) - (this.y * p.x));
    }
};
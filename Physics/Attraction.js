var Attraction = function(end1, end2, k, d) {
    this.strength = 0.0;
    this.minDist = 0.0;

    this.init(end1, end2, k, d);
};

Attraction.prototype = {
    init: function(end1, end2, k, d){
        Force.prototype.init.call(this);

        this.strength = k;
        this.minDist = d;
        this.end1 = end1;
        this.end2 = end2;
    },
    isOn: function() {
        return Force.prototype.isOn.call(this);
    },
    apply: function() {
        if (this.isOn()) {
            // Calculate distance between ends over the 3 dimensions
            var distX = this.end1.position.x - this.end2.position.x;
            var distY = this.end1.position.y - this.end2.position.y;
            var distZ = this.end1.position.z - this.end2.position.z;


            var oneOverDist = Arithmetic.fastInverseSqrt((distX * distX) + (distY * distY) + (distZ * distZ));
            var dist = 1.0 / oneOverDist;



            // Distance calculation is fast but not very precise, so : 
            if (dist !== 0.0) {

                distX *= oneOverDist;
                distY *= oneOverDist;
                distZ *= oneOverDist;

                // First part of the calculation for the attraction force
                var force = this.strength;


                // If distance is smaller thant set minum,
                if (dist < this.minDist) {
                    // limit the strength of attraction force
                    force /= (this.minDist * this.minDist);
                }
                else {
                    // else, apply usual formula
                    force *= oneOverDist * oneOverDist;
                }

                // Correct distances depending on force
                distX *= force;
                distY *= force;
                distZ *= force;

                // Add the a new force to both ends
                this.end1.force.add(new Vector3D(-distX, -distY, -distZ));
                this.end2.force.add(new Vector3D(distX, distY, distZ));
            }

        }
    },
    dispose: function() {
        return Force.prototype.dispose.call(this);
    },
    isDisposed: function() {
        return Force.prototype.isDisposed.call(this);
    }
};
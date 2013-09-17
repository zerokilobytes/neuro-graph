var Spring = function(end1, end2, sk, d, rl)
{
    this.springConstant;
    this.damping;
    this.restLength;
    this.strength;

    this.init(end1, end2, sk, d, rl);
};

Spring.prototype = {
    init: function(end1, end2, sk, d, rl)
    {
        Force.prototype.init.call(this);
        this.springConstant = sk;
        this.damping = d;
        this.restLength = rl;
        this.end1 = end1;
        this.end2 = end2;
    },
    currentLength: function()
    {
        return this.end1.position.distanceTo(this.end2.position);
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
            if (dist === 0.0)
            {
                // if actual distance is approximatively null, then distance is set to null for next step
                distX = 0.0;
                distY = 0.0;
                distZ = 0.0;
            }
            else
            {
                // else normalize the distance coordinate by coordinate with global distance
                distX *= oneOverDist;
                distY *= oneOverDist;
                distZ *= oneOverDist;
            }

            // Calculate the force of the spring (with usual physical formula)
            springForce = this.springConstant * (this.restLength - dist);

            // Calculate velocity differences between ends over the 3 dimensions
            speedX = this.end1.velocity.x - this.end2.velocity.x;
            speedY = this.end1.velocity.y - this.end2.velocity.y;
            speedZ = this.end1.velocity.z - this.end2.velocity.z;

            // Calculate the damping force of the spring (with usual physical formula)
            dampingForce = -this.damping * ((distX * speedX) + (distY * speedY) + (distZ * speedZ));

            // Resultant of forces
            r = springForce + dampingForce;

            // Corrects distances depending on forces
            distX *= r;
            distY *= r;
            distZ *= r;

            // If end1 is able to move, adds the a new force to it
            if (this.end1.isFree())
            {
                this.end1.force.add(new Vector3D(distX, distY, distZ));
            }

            // If end1 is able to move, adds the a new force to it
            if (this.end2.isFree())
            {
                this.end2.force.add(new Vector3D(-distX, -distY, -distZ));
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
var ParticleSystem = function(gx, gy, gz, somedrag)
{
    this.integrator = null;
    this.particles = [];
    this.springs = [];
    this.attractions = [];
    this.gravity;
    this.drag;

    this.init(gx, gy, gz, somedrag);
};

ParticleSystem.prototype = {
    init: function(gx, gy, gz, somedrag)
    {
        this.integrator = new Integrator(this);
        this.particles = [];
        this.springs = [];
        this.attractions = [];
        this.gravity = new Vector3D(0.0, 0.0, 0.0);
        this.drag = 0.0;
    },
    setGravity: function(vector)
    {
        this.gravity.set(vector);
    },
    setDrag: function(d) {
        this.drag = d;
    },
    /* tick: function() {
     this.cleanUp();
     this.integrator.step(1.0);
     },*/
    tick: function(t) {
        this.cleanUp();
        this.integrator.step(1.0);
    },
    makeParticle2: function(mass, x, y, z) {
        var p = new Particle(mass, new Vector3D(x, y, z));
        this.particles.push(p);
        this.integrator.allocateParticles();
        return p;
    },
    makeParticle: function(x, y, z) {
        var p = new Particle(PhysicsConstants.particleDefaultMass, new Vector3D(x, y, z));
        this.particles.push(p);
        this.integrator.allocateParticles();
        return p;
    },
    makeParticle3: function() {
        return this.makeParticle(PhysicsConstants.particleDefaultMass, 0.0, 0.0, 0.0);
    },
    makeSpring: function(end1, end2, sk, d, rl) {
        var s = new Spring(end1, end2, sk, d, rl);
        this.springs.push(s);
        return s;
    },
    makeAttraction: function(end1, end2, k, d) {
        var m = new Attraction(end1, end2, k, d);
        this.attractions.push(m);
        return m;
    },
    clear: function() {
        this.particles.clear();
        this.springs.clear();
        this.attractions.clear();
    },
    applyForces: function() {
        var p;
        for (var i = 0; i < this.particles.length; i++) {

            p = this.particles[i];
            p.force.add(this.gravity);

            p.force.add(new Vector3D(p.velocity.x * -this.drag, p.velocity.y * -this.drag, p.velocity.z * -this.drag));

            //console.log(new Vector3D(p.velocity.x * -this.drag, p.velocity.y * -this.drag, p.velocity.z * -this.drag));
        }

        var s;
        for (var i = 0; i < this.springs.length; i++) {
            s = this.springs[i];
            s.apply();
        }

        var a;
        for (var i = 0; i < this.attractions.length; i++) {
            a = this.attractions[i];
            a.apply();
        }
    },
    numberOfParticles: function()
    {
        return this.particles.length;
    },
    numberOfSprings: function()
    {
        return this.springs.length;
    },
    numberOfAttractions: function()
    {
        return this.attractions.length;
    },
    getParticle: function(i)
    {
        //console.log(this.particles[i].force);
        return this.particles[i];
    },
    getSpring: function(i)
    {
        return this.springs[i];
    },
    getSprings: function()
    {
        return this.springs;
    },
    setSprings: function()
    {
        return this.springs;
    },
    getAttraction: function(i)
    {
        return this.attractions[i];
    },
    getAttractions: function()
    {
        return this.attractions;
    },
    clearForces: function() {
        var p;
        for (p in this.particles) {
            p.force.clear();
        }
    },
    cleanUp: function()
    {
        for (var i = 0; i < this.particles.length; i++) {

            var p = this.particles[i];
            if (p.isDisposed())
            {
                console.log("p");
                console.log(p);
                this.particles.splice(i--, 1);
            }
        }

        for (var i = 0; i < this.springs.length; i++) {
            var s = this.springs[i];

            if (s.isDisposed())
            {
                this.springs.splice(i--, 1);
                console.log("s");
                console.log(s);
            }
        }

        for (var i = 0; i < this.attractions.length; i++) {
            var a = this.attractions[i];
            if (a.isDisposed())
            {
                var o = this.attractions.splice(i--, 1);
            }
        }
    }
};
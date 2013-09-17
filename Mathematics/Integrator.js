var Integrator = function(particleSystem) {
    /**
     * Particle System on which we want to calculate moves
     */
    this.sys;

    /**
     * List of original positions of all particles in the system,
     * necessary for the integration method
     */
    this.originalPositions = [];

    /**
     * List of original velocities of all particles in the system,
     * necessary for the integration method
     */
    this.originalVelocities = [];

    /**
     * List of k1 force coefficients of all particles in the system,
     * necessary for the integration method
     */
    this.k1Forces = [];

    /**
     * List of k1 velocity coefficients of all particles in the system,
     * necessary for the integration method
     */
    this.k1Velocities = [];

    /**
     * List of k2 force coefficients of all particles in the system,
     * necessary for the integration method
     */
    this.k2Forces = [];

    /**
     * List of k2 velocity coefficients of all particles in the system,
     * necessary for the integration method
     */
    this.k2Velocities = [];

    /**
     * List of k3 force coefficients of all particles in the system,
     * necessary for the integration method
     */
    this.k3Forces = [];

    /**
     * List of k3 velocity coefficients of all particles in the system,
     * necessary for the integration method
     */
    this.k3Velocities = [];

    /**
     * List of k4 force coefficients of all particles in the system,
     * necessary for the integration method
     */
    this.k4Forces = [];

    /**
     * List of k4 velocity coefficients of all particles in the system,
     * necessary for the integration method
     */
    this.k4Velocities = [];

    this.init(particleSystem);
};

Integrator.prototype = {
    /**
     * Initializes a new instance of the Integrator class
     */
    init: function(particleSystem) {
        this.sys = particleSystem;
    },
    /// <summary>
    /// Pre-allocate vectors for integration of particles' movements
    /// </summary>
    allocateParticles: function() {

        // for all particles added to the system
        // (difference between number of particles and actual size of vector),
        // add null vector to the 10 vector lists
        for (var i = 0; this.sys.numberOfParticles() > this.originalPositions.length; i++) {
            this.k4Velocities.push(new Vector3D());
            this.originalPositions.push(new Vector3D(0.0, 0.0, 0.0));
            this.originalVelocities.push(new Vector3D(0.0, 0.0, 0.0));
            this.k1Forces.push(new Vector3D(0.0, 0.0, 0.0));
            this.k1Velocities.push(new Vector3D(0.0, 0.0, 0.0));
            this.k2Forces.push(new Vector3D(0.0, 0.0, 0.0));
            this.k2Velocities.push(new Vector3D(0.0, 0.0, 0.0));
            this.k3Forces.push(new Vector3D(0.0, 0.0, 0.0));
            this.k3Velocities.push(new Vector3D(0.0, 0.0, 0.0));
            this.k4Forces.push(new Vector3D(0.0, 0.0, 0.0));
        }
    },
    // Here the problem is quite more complicated,
    // because position, velocity and resultant force on particle are thightly interwined
    step: function(deltaT) {
        // Necessary for further intermediary calculations
        var result;

        // Used in the following loops
        var p;

        // Locking the thread to ensure size of 10 vectors won't change
        // Supposingly number of particles is constant during function
        // 1) Get original position and velocity of each particle
        for (var i = 0; i < this.sys.numberOfParticles(); i++)
        {
            p = this.sys.getParticle(i);

            if (!p.isEnable)
            {
                continue;

            }

            // If the particle is able to move freely
            if (p.isFree())
            {

                // Set original position and velocity values to actual position and velocity of particle
                this.originalPositions[i].set(p.position);
                this.originalVelocities[i].set(p.velocity);
            }
            //console.log("Degub 1");
            //console.log(p.position);

            // Anyway, re-initialise forces applied to it
            p.force.clear();
        }
        // 2) Calculate forces for all system
        // depending on the original positions and velocities
        this.sys.applyForces();



        // 3) For each particle calculate k1 for force and velocity
        for (var i = 0; i < this.sys.numberOfParticles(); i++)
        {
            p = this.sys.getParticle(i);

            if (!p.isEnable) {
                continue;
            }

            if (p.isFree()) {
                this.k1Forces[i].set(p.force);
                this.k1Velocities[i].set(p.velocity);
            }

            p.force.clear();
        }

        // 4) For each particle, set new position and velocity,
        // depending on original values and k1 values
        for (var i = 0; i < this.sys.numberOfParticles(); i++)
        {
            p = this.sys.getParticle(i);

            if (!p.isEnable)
            {
                continue;
            }

            if (p.isFree())
            {
                var k1v = this.k1Velocities[i].times(0.5 * deltaT);
                k1v = k1v.plus(this.originalPositions[i]);
                p.position.set(k1v);

                var k1f = this.k1Forces[i].times(0.5 * deltaT / p.mass);
                k1f = k1f.plus(this.originalVelocities[i]);
                p.velocity.set(k1f);
            }
        }

        // 5) Calculate forces for all system
        // depending on new positions and velocities
        this.sys.applyForces();

        // 6) For each particle calculate k2 for force and velocity
        for (var i = 0; i < this.sys.numberOfParticles(); i++)
        {
            p = this.sys.getParticle(i);

            if (!p.isEnable)
            {
                continue;
            }

            if (p.isFree())
            {
                this.k2Forces[i].set(p.force);
                this.k2Velocities[i].set(p.velocity);
            }

            p.force.clear();
        }

        // 7) For each particle, set new position and velocity,
        // depending on original values and k2 values
        for (var i = 0; i < this.sys.numberOfParticles(); i++)
        {
            p = this.sys.getParticle(i);

            if (!p.isEnable)
            {
                continue;
            }

            if (p.isFree())
            {
                var k2v = this.k2Velocities[i].times(0.5 * deltaT);
                k2v = k2v.plus(this.originalPositions[i]);
                p.position.set(k2v);

                var k2f = this.k2Forces[i].times(0.5 * deltaT / p.mass);
                k2f = k2f.plus(this.originalVelocities[i]);
                p.velocity.set(k2f);
            }
        }

        // 8) Calculate forces for all system
        // depending on new positions and velocities
        this.sys.applyForces();

        // 9) For each particle calculate k3 for force and velocity
        for (var i = 0; i < this.sys.numberOfParticles(); i++)
        {
            p = this.sys.getParticle(i);

            if (!p.isEnable)
            {
                continue;
            }

            if (p.isFree())
            {
                this.k3Forces[i].set(p.force);
                this.k3Velocities[i].set(p.velocity);
            }
            p.force.clear();
        }

        // 10) For each particle, set new position and velocity,
        // depending on original values and k3 values
        for (var i = 0; i < this.sys.numberOfParticles(); i++)
        {
            p = this.sys.getParticle(i);

            if (!p.isEnable)
            {
                continue;
            }

            if (p.isFree())
            {
                var k1v = this.k3Velocities[i].times(deltaT);
                k1v = k1v.plus(this.originalPositions[i]);
                p.position.set(k1v);

                var k3v = this.k3Forces[i].times(deltaT / p.mass);
                k3v = k3v.plus(this.originalVelocities[i]);
                p.velocity.set(k3v);
            }
        }

        // 11) Calculate forces for all system
        // depending on new positions and velocities
        this.sys.applyForces();

        // 12) For each particle calculate k4 for force and velocity
        for (var i = 0; i < this.sys.numberOfParticles(); i++)
        {
            p = this.sys.getParticle(i);

            if (!p.isEnable)
            {
                continue;
            }

            if (p.isFree())
            {
                this.k4Forces[i].set(p.force);
                this.k4Velocities[i].set(p.velocity);
            }
        }

        // 13) For each particle, set final position and velocity,
        // depending on original values and k1, k2, k3 and k4 values
        for (var i = 0; i < this.sys.numberOfParticles(); i++) {
            p = this.sys.getParticle(i);

            if (!p.isEnable){
                continue;
            }

            if (p.isFree()){
                result = this.k1Velocities[i];
                result = result.plus(this.k2Velocities[i].times(2.0));
                result = result.plus(this.k3Velocities[i].times(2.0));
                result = result.plus(this.k4Velocities[i]);

                result = result.multiplyBy(deltaT / 6);
                result = result.add(this.originalPositions[i]);
                p.position.set(result);


                result = this.k1Forces[i];
                result = result.plus(this.k2Forces[i].times(2.0));
                result = result.plus(this.k3Forces[i].times(2.0));
                result = result.plus(this.k4Forces[i]);

                result = result.multiplyBy(deltaT / (6 * p.mass));
                result = result.add(this.originalVelocities[i]);
                p.velocity.set(result);
            }
            p.age += deltaT;
        }
    }
};
var PhysicsManager = function() {
    this.particleSystem;
    this.settings;
    this.timer;

    this.init();
};

PhysicsManager.prototype = {
    init: function(){
        this.particleSystem = new ParticleSystem();
        this.particleSystem.setGravity(new Vector3D(0.0, 0.0, 0.0));
        this.timer = null;
        this.settings = new Settings();
    },
    addNodePhysicRepresentation: function(x, y, z, node, model)
    {

        // if the node already exists and already has a physic representation then don't do anything, go back to where you come from.
        if (node.physicRepresentation !== null) {
            return;
        }

        // else we create a physic representation
        var particle = this.particleSystem.makeParticle(x, y, z);


        //var otherNode
        //console.log(particle);
        // create some space between the nodes 
        for (var i = 0; i < model.nodeList.length; i++) {
            var otherNode = model.nodeList[i];
            if (otherNode.physicRepresentation !== null) {

                var repulsion = this.particleSystem.makeAttraction(otherNode.physicRepresentation, particle, -1 * this.settings.repultionForce, PhysicsConstants.attractionEffectMinimalDistance);
                node.setRepulsion(otherNode, repulsion);
                otherNode.setRepulsion(node, repulsion);
            }
        }
        node.physicRepresentation = particle;
    },
    addEdgePhysicRepresentation: function(link)
    {
        if (link.physicRepresentation !== null) {
            link.physicRepresentation.strength = this.getSpringStrength(link);
            return;
        }

        // else we calculate the spring strength
        var springStrength = this.getSpringStrength(link);

        // create the physic representation
        link.physicRepresentation = this.particleSystem.makeSpring(link.relatedNode1.physicRepresentation, link.relatedNode2.physicRepresentation, springStrength, PhysicsConstants.springDamping, this.settings.linkRestLength);

        // delete useless repulsion
        var attraction = link.relatedNode2.getRepulsion(link.relatedNode1);
        attraction.dispose();
    },
    start: function() {
        // initialising the update timer
        // start timer
    },
    pause: function() {
        this.timer.stop();
    },
    resume: function() {
        this.timer.start();
    },
    settings_Changed: function(e) {
        // Set gravity as defined in user settings
        // this.particleSystem.setGravity(this.settings.gravity);

        // Set drag force
        this.particleSystem.setDrag(this.settings.dragForce);
        return;
        // change spring length at rest
        for (var spring in this.particleSystem.getSprings())
        {
            spring.restLength = this.settings.linkRestLength;
        }

        // change repulsion strength
        for (var repultion in this.particleSystem.getAttractions())
        {
            repultion.strength = -1 * this.settings.repultionForce;
        }
    },
    update: function(time) {
        this.particleSystem.tick(time);
    },
    getSpringStrength: function(link) {
        var springStrength;
        springStrength = link.strength / 100;
        springStrength *= PhysicsConstants.maximalSpringStrength - PhysicsConstants.minimalSpringStrength;
        springStrength += PhysicsConstants.minimalSpringStrength;
        return springStrength;
    }
};
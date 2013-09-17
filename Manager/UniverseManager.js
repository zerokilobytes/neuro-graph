
var UniverseManager = function(container) {
    this.settings;
    this.initializationFailed;
    this.random;
    this.javaScriptManager;
    this.keyManager;
    this.physicsManager;
    this.graphManager;
    this.canvasManager;
    this.assemblyManager;
    this.fileDownloadManager;

    this.init(container);
};

UniverseManager.prototype = {
    init: function(container) {
        this.graphManager = new GraphManager(container);
        this.initializeViewManager();
        this.canvasManager = new CanvasManager();
        this.physicsManager = new PhysicsManager(this);

        // creating the key manager
        this.keyManager = new KeyManager(this);

        // create and set the default settings
        this.settings = new Settings();

        // start the initialization process
        this.initializationFailed = false;

        // run sub-tasks
        this.graphManager.start();
        this.physicsManager.start();
        this.canvasManager.start();


    },
    createNode: function(id, title, type) {
        var node = this.graphManager.createNode(id, title, type);
        node.guid = NumberFunc.getRandomInt(1, NumberFunc.MAX_VALUE);
        var x = NumberFunc.getRandomArbitrary(1, 1200);
        var y = NumberFunc.getRandomArbitrary(1, 1200);
        var z = 0;

        // set the physic representation of our link
        this.physicsManager.addNodePhysicRepresentation(x, y, z, node, this.graphManager);

        // set view to node
        //this.viewManager.setViewToNode(node);

        return node;
    },
    createEdge: function(text, nodeFrom, nodeTo) {
        var link = null;

        var node1 = this.getNode(nodeFrom);
        var node2 = this.getNode(nodeTo);

        // link creation
        link = this.graphManager.createEdge(text, node1, node2);

        // create the link in the physics engine
        this.physicsManager.addEdgePhysicRepresentation(link);

        // create link in the graph
        //this.viewManager.setViewToLink(link);
        return link;
    },
    initializeViewManager: function() {

    },
    getNode: function(id) {
        return this.graphManager.getNode(id);
    },
    draw: function() {
        this.graphManager.draw();
    },
    update: function(time) {
        this.physicsManager.update(time);
        this.graphManager.update();
    }
};
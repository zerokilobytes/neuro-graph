var Node = function(property) {
    this.property = {x: 500, y: 500};
    this.content = null;
    this.vx = 0;
    this.vy = 0;

    this.linkList = [];
    this.styleName = "";
    this.physicRepresentation = null;
    this.groupID;
    this.type = "";
    this.title = "";
    this.repulsionsList = new Map();
    this.isSelected = false;
    this.isVisible = false;
    this.isExplored = false;
    this.url;
    this.isDeployed = false;
    this.isDisposable = true;
    this.actions = [];
    this.refreshRate = -1;
    this.downloadTime = new Date();
    this.drawingInformation = "</>";
    this.relativeSize = 1;
    this.guid = 0;
    this.isDisposed = false;
    this.isUpToDate;

    //EventHandler GUIDataChanged;
    //EventHandler SelectionChanged;

    this.init();
};

Node.prototype = {
    init: function() {
        this.content = new Kinetic.Circle({
            x: this.property.x,
            y: this.property.y,
            radius: 20,
            fill: 'red',
            stroke: 'gray',
            strokeWidth: 1,
            draggable: true
        });

        this.content.vx = 0;
        this.content.vy = 0;

        var that = this;

        this.content.on('dragstart', function() {
            that.physicRepresentation.makeFixed();
            console.log("dragstart");
        });
        this.content.on('dragend', function() {
            that.physicRepresentation.makeFree();
            console.log("dragend");
        });
        this.content.on('dragmove', function(e) {
            that.dragTo(new Vector3D(e.x, e.y, 0));
        });
        this.content.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        this.content.on('mouseout', function() {
            document.body.style.cursor = 'default';

        });
    },
    dispose: function() {
        if (this.isDisposable)
        {
            this.isDisposed = true;

            for (var i = 0; i < this.linkList.length; i++) {
                var element = this.linkList[i];
                element.dispose();
            }

            this.physicRepresentation.dispose();
        }
    },
    relatedNodeList: function()
    {
        var nodes = [];

        for (var i = 0; i < this.linkList.length; i++) {
            var link = this.linkList[i];
            nodes.push(link.getTheOppositeNode(this));
        }

        return nodes;
    },
    setRepulsion: function(node, repulsion)
    {
        // if there already was a repulsion force between the two nodes,
        // we need to turn it off.
        if (this.repulsionsList.get(node) !== undefined) {
            console.log("repulsion exists");
            console.log(repulsion);
            this.repulsionsList.get(node).dispose();
        }

        // sets the repulsion force
        // (as repulsionList is a dictionnary, the entry will be added if it doesn't already exist)
        this.repulsionsList.put(node, repulsion);
    },
    getRepulsion: function(node) {
        return this.repulsionsList.get(node);
    },
    setRelativeMass: function() {
        this.physicRepresentation.mass = PhysicsConstants.particleDefaultMass + Math.log(PhysicsConstants.particleDefaultMass * this.linkList.length);
    },
    getX: function() {
        return this.content.getPosition().x;
    },
    getY: function() {
        return this.content.getPosition().y;
    },
    setX: function(x) {
        this.content.setX(x);
    },
    setY: function(y) {
        this.content.setY(y);
    },
    getVX: function() {
        return this.vx;
    },
    getVY: function() {
        return this.vy;
    },
    setVX: function(vx) {
        this.vx = vx;
        return this;
    },
    setVY: function(vy) {
        this.vy = vy;
        return this;
    },
    setPosition: function(x, y, z) {
        this.content.setPosition(x, y);
        return this;
    },
    getPosition: function() {
        return this.content.getPosition();
    },
    isDragging: function() {
        return this.content.isDragging();
    },
    getContent: function() {
        return this.content;
    },
    dragTo: function(position) {
        this.physicRepresentation.position.set(position);
    },
    update: function() {
        if (!this.isDragging()) {
            var position = this.physicRepresentation.position;
            this.content.setPosition(position.x, position.y);
        }
    }
};
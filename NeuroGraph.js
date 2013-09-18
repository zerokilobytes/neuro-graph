var images = {};

var NeuroGraph = function(container, graphData) {
    var universe = null;

    function loop() {
        universe.update(null);
        universe.draw();

        requestAnimFrame(function() {
            loop();
        });
    }
    window.onload = function() {
        init();
        loop();
    };

    function init() {
        universe = new UniverseManager(container);
        GraphLoader.readXML(graphData, createNode, createEdge);
        universe.physicsManager.settings_Changed();
    }
    function createNode(element) {
        universe.createNode(element.id, "");
    }
    function createEdge(element) {
        universe.createEdge("", element.source, element.target);
    }
};


function loadImages(sources, callback) {
    var assetDir = 'images/';
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = assetDir + sources[src];
    }
}

var sources = {
    red: 'red.png',
    green: 'green.png',
    yellow: 'yellow.png',
    white: 'white.png'
};

loadImages(sources, function(resources) {
    images = resources;
    new NeuroGraph('$neuro_graph', "data/simple.graphml");
});
var NodeType = function(name) {
    this.name = "";
    this.isEnable;
    this.isVisible = false;

    this.init(name);
};

NodeType.prototype = {
    init: function(name) {
        this.name = name;
        this.isEnable = true;
        this.isVisible = true;
    }
};
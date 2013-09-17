var EdgeType = function(verb, from, to) {
    this.verb = "";
    this.from = "";
    this.to = "";
    this.isEnable = false;
    this.isVisible = false;
    this.name = "";

    this.init(verb, from, to);
};

EdgeType.protype = {
    init: function(verb, from, to)
    {
        this.verb = verb;
        this.from = from;
        this.to = to;
        this.isEnable = true;
        this.isVisible = true;
    },
    isRelatedTo: function(type)
    {
        return (type.name === this.from) || (type.Name === this.to);
    }
};
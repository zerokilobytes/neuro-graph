var Position = new function(x, y) {
    this.point = new Point(x, y);
};

Position.prototype = {
    getPoint: function(){
        return this.point;
    }
};
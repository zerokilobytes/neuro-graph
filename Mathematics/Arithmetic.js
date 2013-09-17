var Arithmetic = function() {
};

Arithmetic.prototype = {
};

Arithmetic.fastInverseSqrt = function(number) {
    //return 1.0 / Math.sqrt(number);
    var y = new Float32Array(1);
    var i = new Int32Array(y.buffer);
    var x2 = number * 0.5;
    y[0] = number;
    var threehalfs = 1.5;
    i[0] = 0x5f3759df - (i[0] >> 1);
    var number2 = y[0];
    return number2 * (threehalfs - (x2 * number2 * number2));
};
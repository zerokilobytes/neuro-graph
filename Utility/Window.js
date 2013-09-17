window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback)
            {
                window.setTimeout(callback, 1000 / 60);
            };
})();


/*window.requestAnimFrame = (function(callback)
 {
 return function(callback)
 {
 window.setTimeout(callback, 1000/60);
 };
 })();
 */
/*
 //Windows focus
 document.onfocusin = onFocus;
 document.onfocusout = onBlur;
 window.onfocus = onFocus;
 window.onblur = onBlur;
 */
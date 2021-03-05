// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// add global parameters here

const PARAMS = {
    //note game only designed for 0.75 scale, there is some dynamic scaling going on
    //in the program, but there are some bugs with collisions (bouncing of walls)
    DEBUG: false,
    SCALE: .75,
    PLAY: false,
    START: false,
    CONTROLS: false,
    PAUSE: false,
    GAMEOVER: false,
    STARTOVER: false,
    RESPAWN: false,
    VOLUME: 20,
    DIFFICULTY: 1,
    EASY : .5,
    NORMAL : 1,
    HARD : 2,
    SOULS: 0,
    XSPAWN : 0,
    YSPAWN : 0
};

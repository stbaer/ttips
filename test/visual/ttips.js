var ttips = require('../../');

// for testing
globals = {};
globals.ttips = ttips;

/*
var ttipElements = document.querySelectorAll('.ttip');
var ttips = [];

for (var i = 0; i < ttipElements.length; i++) {
    ttips[i] = new Ttip(ttipElements[i]);
}
*/
ttips.initialize();

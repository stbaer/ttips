var test = require('tape');
var Ttip = require('../../');
var elements = [];
var ttips = [];
var i;

var NR_OF_ELEMENTS = 3;

for (i = 0; i < NR_OF_ELEMENTS; i++) {
    elements[i] = document.createElement('div');
    elements[i].classList.add('ttip');
    document.body.appendChild(elements[i]);
}


function init() {
    for (i = 0; i < elements.length; i++) {
        ttips[i] = new Ttip(elements[i]);
    }
}

init();

test('Has a test suite', function(t) {
    t.plan(1);
    t.equal(1, 1, 'yes');
});

test('Tooltips created', function(t) {
    for (i = 0; i < elements.length; i++) {
        t.equal(typeof ttips[i], 'object', 'instance exists' );
    }
    t.end();
});

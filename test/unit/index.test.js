var test = require('tape');
var ttips = require('../../');
var elements = [];

var NR_OF_ELEMENTS = 3;

for (var i = 0; i < NR_OF_ELEMENTS; i++) {
    elements[i] = document.createElement('div');
    elements[i].classList.add('ttip');
    document.body.appendChild(elements[i]);
}

ttips.initialize();


test('Has a test suite', function(t) {
    t.plan(1);
    t.equal(1, 1, 'yes');
});

test('Tooltips created', function(t) {
    for (var i = 0; i < elements.length; i++) {
        t.equal(elements[i]._ttip , true, 'element initialized' );
    }
    t.end();
});

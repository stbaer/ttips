# ttips

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

> Tooltip module.

[![NPM](https://nodei.co/npm/ttips.png?downloads=true)](https://nodei.co/npm/ttips/)

## Usage

HTML:

Put a containter with a .ttip class behind the element that should trigger the tooltip *(previousElementSibling selects the tooltip target)*.
```html
<div>Tooltip target</div>
<div class="ttip">Tooltip content</div>

<!-- Position the tooltip via data-attribute, can be 'left', 'top' or 'right' and defaults to bottom -->
<div>Tooltip target</div>
<div class="ttip" data-ttip-position="left">Tooltip content</div>
```

JS:

```js
var Ttip = require('ttips'); // or use the standalone version from the dist folder

var ttipElements = document.querySelectorAll('.ttip');
var ttips = [];

for (var i = 0; i < ttipElements.length; i++) {
    ttips[i] = new Ttip(ttipElements[i]);
}
```

CSS:

Include *dist/css/ttips.min.css*, extend/change as needed.

## Building

You will need to have [node][node] and [gulp][gulp] setup on your machine.

Then you can install dependencies and build:

```js
npm i && npm run build
```

That will output the built distributables to `./dist`.

[node]:       http://nodejs.org/
[gulp]:       http://gulpjs.com/


## Licence

MIT

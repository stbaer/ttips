# ttips

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

> Simple and lightweight tooltip module. [Examples](http://stbaer.github.io/ttips)

*minified and gzipped about 1.8 kB js and 0.3 kB css*

## Install

`npm i ttips`

[![NPM](https://nodei.co/npm/ttips.png?downloads=true)](https://nodei.co/npm/ttips/)

## Usage

CSS:

Include *dist/css/ttips.min.css*, extend/change as needed.

HTML:

Put a containter with a *.ttip* class behind the element that should trigger the tooltip *(previousElementSibling selects the tooltip target)*.
```html
<div>Tooltip target</div>
<div class="ttip">Tooltip content</div>

<!-- Position the tooltip via data-attribute, can be 'left', 'top' or 'right' and defaults to bottom -->
<div>Tooltip target</div>
<div class="ttip" data-ttip-position="left">Tooltip content</div>
```

JS:

```js
var ttips = require('ttips'); // or use the standalone version from the dist folder

// initialize the tooltips
ttips.initialize();

// update the tooltips, e.g after a dom change
ttips.update();

// destroy ...
ttips.destroy();

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

# ttips

> Simple and lightweight tooltip module. [Examples](http://stbaer.github.io/ttips)

*minified and gzipped about 1.8 kB*

## Install

`npm i ttips`

[![NPM](https://nodei.co/npm/ttips.png?downloads=true)](https://nodei.co/npm/ttips/)

## Usage

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

// hide tooltip, does nothing if no tooltip is visible
ttips.hide();

// destroy ...
ttips.destroy();
```

## Building

```
npm i && npm run build
```

[node]: http://nodejs.org/


## Licence

MIT

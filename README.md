# ttips

> Simple and lightweight tooltip module. [Examples](http://stbaer.github.io/ttips)

*minified and gzipped about 1.8 kB*

## Install

`npm i ttips`

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

```
var ttips = require('ttips'); // or use standalone/ttips(.min).js

ttips.initialize();    // initialize the tooltips
ttips.update();        // update the tooltips, e.g after a dom change
ttips.hide();          // hide tooltip, does nothing if no tooltip is visible
ttips.destroy();       // destroy ...
```

## Building

```
npm i && npm run build
```


## Licence

MIT

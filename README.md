# ttips

[![Build Status](https://travis-ci.org/stbaer/ttips.svg?branch=master)](https://travis-ci.org/stbaer/ttips)
[![Inline docs](http://inch-ci.org/github/stbaer/ttips.svg?branch=master)](http://inch-ci.org/github/stbaer/ttips)
[![Dependency Status](https://david-dm.org/stbaer/ttips.svg)](https://david-dm.org/stbaer/ttips)

> Simple and lightweight tooltip module. 

[Docs and Examples](http://stbaer.github.io/ttips)

*minified ~ 3kb, minified and gzipped ~ 1kB*

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
import ttips from 'ttips'

ttips.initialize();    // initialize the tooltips
ttips.update();        // update the tooltips, e.g after a dom change
ttips.hide();          // hide tooltip, does nothing if no tooltip is visible
ttips.destroy();       // destroy ...
```


## Licence

MIT

# o-header [![CircleCI](https://circleci.com/gh/Financial-Times/o-header.png?style=shield&circle-token=41f2b7b7e669f2d4adb55ad97cf755d3ed4b93c3)](https://circleci.com/gh/Financial-Times/o-header)

Responsive header for FT branded sites

## Getting started guide

Install the module:

```
bower install --S o-header
```

Load the JS:

```js
var oHeader = require('o-header');

oHeader.init();
```

Load the CSS:

```scss
$o-header-is-silent: false;
@import 'o-header/main';
```

Load [o-fonts](https://github.com/Financial-Times/o-fonts) and set some default CSS properties to the document root:

```scss
html {
    font-family: "MetricWeb";
}
```

Copy the markup from [one of the demos](http://registry.origami.ft.com/components/o-header) in the registry, and paste it in a document

## API

### JavaScript

An o-header object must be constructed for every `<header>` you have on your page that uses this module.

```js
var Header = require('o-header');
var headerEl = document.querySelector('.o-header');
var header = new oHeader(headerEl);
```

Alternatively, a `o.DOMContentLoaded` event can be dispatched on the document to auto-construct an o-header object for each element with a `data-o-component="o-header"` attribute:

```js
require('o-header');
document.addEventListener("DOMContentLoaded", function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Sass

Currently, only non silent mode is supported.

### Markup

_There are intentionally no classes to switch between logged in and out as we don't want to do that in the client side. This is left up to the product._

Some elements inside the header require specific data attributes so the JavaScript can add some behaviour correctly. These are:

* data-o-header--no-js: Applied to the root element. This data attribute is removed when the JavaScript initialises
* data-o-header-mega: Applied to the root `<div>` of the mega menu
* data-o-header-search: Applied to the root `<div>` of the _enhanced_ search row. There are two search rows, one for enhanced, another for core

### Events

o-header fires the following event:

* `oHeader.MegaMenuShow`: When a mega menu is showed. The target of the event is the menu itself
* `oHeader.MegaMenuClose`: When a mega menu is closed. The target of the event is the menu itself

## Enhanced/Core expeirence

We use the [standard](http://origami.ft.com/docs/developer-guide/using-modules/#styles-for-fallbacks-and-enhancements) `o--if-js` and `o--if-no-js` classes to hide elements in enhanced and core experience respectively

## Upgrading from 5.x.x to 6.x.x

This is a complete change in the markup and usage of the module, so we advise to look at the markup in the demos and go over the readme. If any issues come up, please let us know.

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

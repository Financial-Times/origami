# o-header [![Circle CI](https://circleci.com/gh/Financial-Times/o-header.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-header)

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

Additionally, a second paramater can be passed to the header constructor or to the `.init()` function with a config object that has the following options:

* *headerClassName*: Class name set to the root element of your head. (Default: `o-header`)
* *editionswitchClassName*: Class name set to the root element of the edition switch. (Default: `o-header__edition-switch`)

### Sass

Currently, only non silent mode is supported.

### Markup

_There are intentionally no classes to switch between logged in and out as we don't want to do that in the client side. This is left up to the product._

Some elements inside the header require specific data attributes so the JavaScript can add some behaviour correctly. These are:

* data-o-header-search: Applied to the search `<form>`. Inside, it also requires an `<input>` element
* data-o-header-togglable: Applied to any toggle in the header
* data-o-header-togglable-nav: Applied to the `<button>` or other kind of element that will toggle the meganav
* data-o-header-togglable-search: Applied to the `<button>` or other kind of element that will toggle the search input
* data-o-header-suggestions: Applied to the root div of the bottom row of the header, as that's the container of the suggestions that are added via JS
* data-o-header-edition-switch-button: Applied to the `<button>` or other kind of element that will toggle the edition switch
* data-o-header-selectable: Applied to the `<button>` or other kind of element in the meganav section in the mobile view that will select it

Also, if using an _Edition Switch_, for accessibility reasons, the `<ul>` element requires `id="o-header__edition-switch-container"`.

Search and Menu `<a>` tags link to elements outside the header in core experience. We recommend having them in the footer.

### Events

o-header fires the following event:

* `oHeader.searchToggle`: When the search toggle is triggered with this property:
    - `isOpen`: Whether the search form is visible or not

## Enhanced/Core expeirence

We use the [standard](http://origami.ft.com/docs/developer-guide/using-modules/#styles-for-fallbacks-and-enhancements) `o--if-js` and `o--if-no-js` classes to hide elements in enhanced and core experience respectively

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

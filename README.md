# o-header [![CircleCI](https://circleci.com/gh/Financial-Times/o-header.png?style=shield&circle-token=41f2b7b7e669f2d4adb55ad97cf755d3ed4b93c3)](https://circleci.com/gh/Financial-Times/o-header)

Responsive header for FT branded sites

## Getting started guide

Install the module:

```
bower install --S o-header
```

Load the JS:

```js
const oHeader = require('o-header');

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
const Header = require('o-header');
const headerEl = document.querySelector('.o-header');
const header = new oHeader(headerEl);
```

Alternatively, a `o.DOMContentLoaded` event can be dispatched on the document to auto-construct an o-header object for each element with a `data-o-component="o-header"` attribute:

```js
require('o-header');
document.addEventListener("DOMContentLoaded", function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Sass

The 'base' of the image url can be set with the `$o-header-image-base-url` variable. e.g. setting

```
$o-header-image-base-url: 'https://my.image.service/foo';
```

will output an image logo url in the format `https://my.image.service/foo/v2/images/raw/ftlogo:....`

The 'version' of the image url can be set with the `$o-header-image-service-version` variable. e.g. setting

```
$o-header-image-service-version: "v1";
```

will output an image logo url in the format `https://my.image.service/foo/v1/images/raw/ftlogo:...`.

#### Silent mode ([docs](http://origami.ft.com/docs/syntax/scss/#silent-styles))

When using `o-header` in silent mode, we offer a series of helper mixins to output styles for different parts of the header.

##### oHeader

The header is made up of various features (e.g. `nav`, `search`, and `drawer`). To get everything, use the `oHeader()` mixin without arguments. To get only the stuff you need, you can pass in a list of features.

The list of features is as follows:

* `nav`: The primary nav, this is the nav that sits directly under the top section of the header.
* `search`: The search bar that appears when a user presses the search icon.
* `anon`: Styles for the row that appears when a user is not logged in.
* `sticky`: Styles that make the header stick to the top of the page when scrolling down.
* `simple`: Styles for the reduced slimmer header for article pages and subbrand pages.
* `transparent`: Styles for a header with no background colour and white text and logos. For use on dark backgrounds only.
* `subbrand`: Styles for the subbranded section of the header (eg Life&Arts).
* `megamenu`: Styles for the mega-menu that appears when users hover over a nav item.

###### Example

To get all of the CSS needed for the FT homepage you would call:

```
oHeader(('sticky', 'simple', 'anon', 'search', 'nav', 'megamenu'));
```

### Markup

_There are intentionally no classes to switch between logged in and out as we don't want to do that in the client side. This is left up to the product._

Some elements inside the header require specific data attributes so the JavaScript can add some behaviour correctly. These are:

* data-o-header--no-js: Applied to the root element. This data attribute is removed when the JavaScript initialises
* data-o-header--sticky: Applied to the sticky variation of the header
* data-o-header-mega: Applied to the root `<div>` of the mega menu
* data-o-header-search: Applied to the root `<div>` of the _enhanced_ search row. There are two search rows, one for enhanced, another for core
* data-o-header-drawer: Applied to the root `<div>` of the drawer
* data-o-header-subnav: Applied to the root `div` of the subnav menu
* data-o-header-subnav-wrapper: Applied to the inner wrapper `div` of the subnav menu so the JS can handle the scrolling

### Events

o-header fires the following event:

* `oHeader.MegaMenuShow`: When a mega menu is showed. The target of the event is the menu itself
* `oHeader.MegaMenuClose`: When a mega menu is closed. The target of the event is the menu itself

## Enhanced/Core experience

We use the [standard](http://origami.ft.com/docs/developer-guide/using-modules/#styles-for-fallbacks-and-enhancements) `o--if-js` and `o--if-no-js` classes to hide elements in enhanced and core experience respectively

## Migrating from 6.x.x to 7.x.x

V7 introduces new major versions of `o-colors`, `o-typography`, `o-buttons` and `o-visual-effects`. Updating to this new version will mean updating any other components that you have which are using `o-colors`, `o-typography`, `o-buttons`, or `o-visual-effects`. There are no other breaking changes in this release.


## Migrating from 5.x.x to 6.x.x

This is a complete change in the markup and usage of the module, so we advise to look at the markup in the demos and go over the readme. If any issues come up, please let us know.

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

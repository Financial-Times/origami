# Header [![Build Status](https://travis-ci.org/Financial-Times/o-ft-header.png?branch=version2)](https://travis-ci.org/Financial-Times/o-ft-header)

Responsive FT page header.

## Browser Support

Tested and working on:

|  Browsers  | Primary Experience | Core Experience |
|:----------:|:------------------:|:---------------:|
|   Chrome   |        35+         |       35+       |
|   Firefox  |        30+         |       30+       |
|   Safari   |        7+          |       7+        |
|   IE       |        9+          |       8+        |

Known issues:

* IE: Masthead not displaying properly
* IE8 doesn't support the `<nav>` and `<header>` element. Products need to use HTML5Shiv which is bundled in Modernizr. Also, it runs as core experience.

## Element containers

The header consists of the following content containers:

* Logo
* Primary: Left
* Primary: Centre
* Primary: Right
* Primary: Featured
* Secondary: Left
* Secondary: Right

Each content container can contain one of the following:

* Custom content (e.g) - brand-specific logo/title etc
* A title
* Navigation (_primary_ theme)
* Navigation (_secondary_ theme)
* Navigation (_tools_ theme)
* Breadcrumb

## Navigation

For navigation, this module uses [o-hierarchical-nav](https://github.com/Financial-Times/o-hierarchical-nav), so please check out its documentation to add it in your header.

There are three horizontal Navigation styles depending on the class you add to the `<nav>`:

* __Primary__: `o-ft-header__nav--primary-theme`
* __Secondary__: `o-ft-header__nav--secondary-theme`
* __Tools__: `o-ft-header__nav--tools-theme`

## Brands

To add your brand color, you need to set the `$o-ft-header-brand-color` variable. 

If you want mega-dropdowns to appear showing part of your branded secondary container, you would also need to add the class `.o-ft-header__mega-dropdown--primary` on your DOM element.

## Adjusting widths

The primary-left, primary-right, primary-featured and secondary-left need to have a fixed width for primary-centre to adjust appropiately. To change any the default widths, you would need to add the following variables to your stylesheet before importing this module's sass:

$o-ft-header-primary-left-width
$o-ft-header-secondary-left-width
$o-ft-header-primary-featured-width

## Javascript instantiation

An __o-ft-header__ object must be constructed for every `<header>` you have on your page that uses this module.

```javascript
var oFtHeader = require('o-ft-header');
var header = document.querySelector('.o-ft-header');
var ftHeader = new oFtHeader(header);
```

Alternatively, a `o.DOMContentLoaded` event can be dispatched on the `document` to auto-construct a __o-ft-header__ object for each element with a `data-o-component="o-ft-header"` attribute:

```javascript
document.addEventListener("DOMContentLoaded", function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

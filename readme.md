# Header [![Build Status](https://travis-ci.org/Financial-Times/o-ft-header.png?branch=version2)](https://travis-ci.org/Financial-Times/o-ft-header)

Responsive FT page header.

## Element containers

The header consists of the following content containers:

* Logo
* Primary: Left
* Primary: Centre
* Primary: Right
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

To add your brand color, you need to set the `$o-ft-header-brand-color` variable:

## Adjusting widths

The logo, the primary-left and the primary-right need to have a fixed width for primary-centre to adjust appropiately. A product might want to change the default width for the logo (75px), or for the primary-left (230px). In that case, you would need to add the following variables to your stylesheet before importing this module's sass:

$o-ft-header-logo-width

$o-ft-header-primary-left-width

## Javascript instantiation

An __o-ft-header__ object must be constructed for every `<header>` you have on your page that uses this module.

```javascript
var oFtHeader = require('o-ft-header');
var header = document.querySelector('.o-ft-header');
var ftHeader = new oFtHeader(header);
```

o-ft-buttons [![Build Status](https://travis-ci.org/Financial-Times/o-ft-buttons.png?branch=master)](https://travis-ci.org/Financial-Times/o-ft-buttons)
============

Standard FT-branded buttons.

This buttons module is a dependency of [forms module](https://github.com/Financial-Times/o-ft-forms).

Buttons come in two themes:

* __default__: monochrome
* __standout__: blue

and two sizes:

* __default__: 24px high
* __big__: 36px high

and have 4 different states:

* __standard__: without any interaction
* __hover__: when the mouse pointer is over 
* __active__: when it has focus, or the mouse button is pressed down on it
* __disabled__: when clicking it will have no effect

Button width is determined by its content.

## Browser support

The following browser features are used but will degrade gracefully:

* __border-radius__: older browsers will show square corners
* __web fonts__: older browsers will use websafe alternative fonts
* __sibling CSS selectors__: spacing between tabs or button groups may be incorrect on very old browsers

## Silent mode

When consuming this module in silent mode, the following mixins should be included to ensure that the fonts and icons are requested:

    @include oFtButtonsFontInclude();
    @include oFtButtonsIconInclude();
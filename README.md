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
* __selected__: marked as chosen
* __disabled__: when clicking it will have no effect

Button width is determined by its content.

## Browser support

The following browser features are used but will degrade gracefully:

* __CSS negation pseudo-class__:  (`not()`) is used for the hover states. Buttons will not have hover states in IE8 and earlier.
* __sibling CSS selectors__: spacing between tabs or button groups may be incorrect on very old browsers
* __border-radius__: older browsers will show square corners
* __web fonts__: older browsers will use websafe alternative fonts

## Silent mode

When consuming this module in silent mode, the following mixins should be included to ensure that the fonts and icons are requested:

    @include oFtButtonsFontInclude();
    @include oFtButtonsIconInclude();

SASS placeholders are provided to extend styles into your own selectors. For example:

    .my-product-button {
        @extend %o-ft-buttons;
    }

Look at the demo examples to see which placeholders you'll need. They're named the same as the CSS classes.
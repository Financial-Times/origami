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

## Mixins

Various SASS mixins are provided to obtain styles for buttons in all their states and variants.

All these mixins require as their first argument, a `$base-class` which is then modified in a predictable way for each variant and state.

The `$base-class` must be the same for all mixins included.

### Default button

These are the base styles that must be called in addition to any of the other mixins listed below.

Includes default button style, with _selected_, _disabled_ and `:hover` states.

E.g. `oFtButtonsButton(o-ft-buttons)` would output styles for the following selectors when used in non-silent mode:

* `.o-ft-buttons`
* `.o-ft-buttons--selected` and `.o-ft-buttons[aria-selected=true]`
* `.o-ft-buttons--disabled`, `.o-ft-buttons[aria-disabled=true]` and `.o-ft-buttons[disabled]`
* `.o-ft-buttons:hover`

Example SASS:

    @include oFtButtonsButton(my-button-class);

Example HTML:

    <button class="my-button-class">Standard</button>
    <button class="my-button-class my-button-class--selected">Selected</button>
    <button class="my-button-class my-button-class--disabled">Disabled</button>
    <button class="my-button-class" disabled>Disabled</button>

### Grouped buttons

Include grouped button styles. The second argument is for the container of the grouped buttons.

Example SASS:

    @include oFtButtonsButton(my-button-class);
    @include oFtButtonsButtonGroup(my-button-class, my-button-group-class);

Example HTML:

    <div class="my-button-group-class">
        <button class="my-button-class my-button-class--selected">John</button><!--
     --><button class="my-button-class">Paul</button><!--
     --><button class="my-button-class">George</button><!--
     --><button class="my-button-class">Ringo</button>
    </div>

### Pagination buttons

Include pagination buttons styles. The second argument is for the container of the pagination buttons.

Example SASS:

    @include oFtButtonsButton(my-button-class);
    @include oFtButtonsButtonPagination(my-button-class, my-button-pagination-class);

Example HTML:

    <div class="my-button-pagination-class">
        <button class="my-button-class my-button-class--selected">1</button><!--
     --><button class="my-button-class">2</button><!--
     --><button class="my-button-class">3</button><!--
     --><button class="my-button-class">4</button>
    </div>

### Tab buttons

Include tabbed buttons styles. The second argument is for the container of the tab buttons.

Example SASS:

    @include oFtButtonsButton(my-tab-class);
    @include oFtButtonsButtonTabs(my-tab-class, my-button-tab-class);

Example HTML:

    <div class="my-tabs-class">
        <button class="my-tab-class my-tab-class--selected">1</button><!--
     --><button class="my-tab-class">2</button><!--
     --><button class="my-tab-class">3</button><!--
     --><button class="my-tab-class">4</button>
    </div>

### Faux buttons _modifier_

Include the _faux_ button styles. The `--faux` modifier is, for example, for the _ellipsis_ that can be displayed amongst pagination buttons.

Example SASS:

    @include oFtButtonsButton(my-button-class);
    @include oFtButtonsButtonFaux(my-button-class);

Example HTML:

    <button class="my-button-class my-button-class--faux">...</button>

### Big button _modifier_

Include the _big_ button styles. The `--big` modifier will make a button larger.

Example SASS:

    @include oFtButtonsButton(my-button-class);
    @include oFtButtonsButtonBig(my-button-class);

Example HTML:

    <button class="my-button-class my-button-class--big">Big button</button>

### 'Standout' button _modifier_

Include the _standout_ button styles. The `--standout` modifier will change the button colour to make it more attention-grabbing.

Example SASS:

    @include oFtButtonsButton(my-button-class);
    @include oFtButtonsButtonStandout(my-button-class);

Example HTML:

    <button class="my-button-class my-button-class--standout">Standout button</button>

### Icons for use in buttons

Include icon styles for use in buttons. The following icons are available:

* `left`: left arrow
* `right`: right arrow
* `more`: ellipsis

Example SASS:

    @include oFtButtonsButton(my-button-class);
    @include oFtButtonsButtonIcons(my-button-class, $icon_class);

Example HTML:

    <span class="o-ft-buttons__icon o-ft-buttons__icon--left">
    <span class="o-ft-buttons__icon o-ft-buttons__icon--right">
    <span class="o-ft-buttons__icon o-ft-buttons__icon--more">

### Include all button styles

If you want to include all button styles but using a custom base class name, then you can use this:

    @include oFtButtonsAll($base-class)

This will include all of the above mixins usign the base class specified.

Where a mixin requires a second argument, the base class will be used, appended with something appropriate, for example:

* base class: `my-button-class`
* tabs class: `my-button-class__tabs`
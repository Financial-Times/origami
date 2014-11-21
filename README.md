o-ft-buttons [![Build Status](https://travis-ci.org/Financial-Times/o-ft-buttons.png?branch=master)](https://travis-ci.org/Financial-Times/o-ft-buttons)
============

Standard FT-branded buttons.

Buttons come in four themes:

* __default__: monochrome
* __uncolored__: 
* __inverse__: white
* __standout__: blue

and two sizes:

* __default__: 24px high
* __big__: 36px high

and have 6 different states:

* __standard__: without any interaction
* __hover__: when the mouse pointer is over 
* __focus__: it's the current target of keyboard input
* __selected__: marked as chosen
* __disabled__: when clicking it will have no effect
* __pressed__: for toggable buttons that are currently activated

Button width is determined by its content.

## Browser support

The following browser features are used but will degrade gracefully:

* __CSS negation pseudo-class__:  (`not()`) is used for the hover states. Buttons will not have hover states in IE8 and earlier.
* __sibling CSS selectors__: spacing between tabs or button groups may be incorrect on very old browsers
* __border-radius__: older browsers will show square corners
* __web fonts__: older browsers will use websafe alternative fonts

## Mixins

Various SASS mixins are provided to obtain styles for buttons in all their states and variants.

### Default button

These are the base styles that must be called in addition to any of the other mixins listed below.

Example SASS:

```scss
    .my-button-class {
        @include oFtButtons();
    }
```

Example HTML:

    <button class="my-button-class">Standard</button>

### Grouped buttons

Include grouped button styles. It accepts one argument:
    - Base buttons class

Example SASS:

```scss
    .my-button-group-class {
       @include oFtButtonsGroup(my-button-class); 
    }
```

Example HTML:

    <div class="my-button-group-class">
        <button class="my-button-class">John</button><!--
     --><button class="my-button-class">Paul</button><!--
     --><button class="my-button-class">George</button><!--
     --><button class="my-button-class">Ringo</button>
    </div>

### Pagination buttons

Include pagination buttons styles. It accepts one argument:
    - Base buttons class

Example SASS:

```scss
    .my-button-pagination-class {
       @include oFtButtonsPagination(my-button-class); 
    }
```

Example HTML:

    <div class="my-button-pagination-class">
        <button class="my-button-class">1</button><!--
     --><button class="my-button-class">2</button><!--
     --><button class="my-button-class">3</button><!--
     --><button class="my-button-class">4</button>
    </div>

### Big button _modifier_

Include the _big_ button styles.

Example SASS:

```scss
    .my-button-class--big {
        @include oFtButtonsBig();
    }
```

Example HTML:

    <button class="my-button-class my-button-class--big">Big button</button>

### 'Standout' button _modifier_

Include the _standout_ button styles.

Example SASS:

```scss
    .my-button-class--standout {
        @include oFtButtonsStandout();
    }
```

Example HTML:

    <button class="my-button-class my-button-class--standout">Standout button</button>

### 'Inverse' button _modifier_

Include the _inverse_ button styles.

Example SASS:

```scss
    .my-button-class--inverse {
        @include oFtButtonsInverse();
    }
```

Example HTML:

    <button class="my-button-class my-button-class--inverse">Inverse button</button>

### 'Uncolored' button _modifier_

Include the _uncolored_ button styles.

Example SASS:

```scss
    .my-button-class--uncolored {
        @include oFtButtonsUncolored();
    }
```

Example HTML:

    <button class="my-button-class my-button-class--uncolored">Uncolored button</button>

### Faux buttons _modifier_

The `--faux` modifier is now deprecated and will be removed in next major release.

### Icons for use in buttons

This is now deprecated and will be removed in next major release

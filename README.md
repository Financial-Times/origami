# o-buttons [![Build Status](https://travis-ci.org/Financial-Times/o-buttons.png?branch=master)](https://travis-ci.org/Financial-Times/o-buttons)

Standard FT-branded buttons.

Buttons come in four themes ([documentation](#theme-modifiers)):

* __default__: teal outline
* __standout__: solid teal
* __uncolored__: monochrome
* __inverse__: for use on dark backgrounds

and two sizes ([documentation](#size-modifiers)):

* __small__: 22px high
* __default__: 26px high
* __big__: 36px high

and have 7 different states:

* __standard__: without any interaction
* __hover__: when the mouse pointer is over 
* __focus__: it's the current target of keyboard input
* __active__: the pointer is pushing / tapping / clicking the button
* __selected__: marked as chosen
* __disabled__: when clicking it will have no effect
* __pressed__: for toggable buttons that are currently activated

Button width is determined by its content.

## Browser support

The following browser features are used but will degrade gracefully:

* __CSS negation pseudo-class__: (`not()`) is used for the hover states. Buttons will not have hover states in IE8 and earlier.
* __sibling CSS selectors__: spacing between tabs or button groups may be incorrect on very old browsers
* __border-radius__: older browsers will show square corners

## Mixins & silent mode

Various Sass mixins are provided to obtain styles for buttons in all their states and variants. Also, when `$o-buttons-is-silent: false;`, the module outputs a set of classes that are also documented in each section.

[Full documentation of mixins and variables](http://sassdoc.webservices.ft.com/v1/sassdoc/o-buttons)

### Default button

[View demo](http://build.origami.ft.com/files/o-buttons@2.0.3/demos/individual.html)

```html
<button class="o-buttons">Standard</button>
```

```scss
.my-button-class {
	@include oButtons();
}
```

### States

```html
<button class="o-buttons">Standard</button>
<button class="o-buttons" aria-selected="true">Selected</button>
<button class="o-buttons" aria-pressed="true">Pressed</button>
<button class="o-buttons" disabled>Disabled</button>
```

### Grouped buttons

[View demo](http://build.origami.ft.com/files/o-buttons/demos/grouped.html)

```html
<div class="o-buttons-group">
    <button class="o-buttons">John</button><!--
 --><button class="o-buttons">Paul</button><!--
 --><button class="o-buttons">George</button><!--
 --><button class="o-buttons">Ringo</button>
</div>
```

#### Or, using Sass:

```scss
.my-button-group-class {
	@include oButtonsGroup('my-button-class');
}
```

```html
<div class="my-button-group-class">
    <button class="my-button-class">John</button><!--
 --><button class="my-button-class">Paul</button><!--
 --><button class="my-button-class">George</button><!--
 --><button class="my-button-class">Ringo</button>
</div>
```


### Pagination buttons

[View demo](http://build.origami.ft.com/files/o-buttons/demos/pagination.html)

```html
<div class="o-buttons-pagination">
    <button class="o-buttons">1</button><!--
 --><button class="o-buttons">2</button><!--
 --><button class="o-buttons">3</button><!--
 --><button class="o-buttons">4</button>
</div>
```

#### Or, using Sass:

```scss
.my-button-pagination-class {
	@include oButtonsPagination(my-button-class);
}
```

```html
<div class="my-button-pagination-class">
    <button class="my-button-class">1</button><!--
 --><button class="my-button-class">2</button><!--
 --><button class="my-button-class">3</button><!--
 --><button class="my-button-class">4</button>
</div>
```

### Size modifiers

```html
<button class="o-buttons o-buttons--medium">Medium button (default)</button>
<button class="o-buttons o-buttons--big">Big button</button>
```

#### Or, using Sass:

```scss
.my-button-class {
	@include oButtons();
}
.my-button-class--big {
	@include oButtonsSize(big);
}

// Or…
.my-big-button {
	@include oButtons(big);
}
```

```html
<button class="my-button-class my-button-class--big">Big button</button>

<button class="my-big-button-class">Big button</button>
```

### Theme modifiers

View demos:

- [standout](http://build.origami.ft.com/files/o-buttons/demos/individual-standout.html)
- [uncolored](http://build.origami.ft.com/files/o-buttons/demos/individual-uncolored.html)
- [inverse](http://build.origami.ft.com/files/o-buttons/demos/individual-inverse.html)

```html
<button class="o-buttons o-buttons--standout">Standout button</button>
<button class="o-buttons o-buttons--uncolored">Uncolored button</button>
<button class="o-buttons o-buttons--inverse">Inverse button</button>
```

#### Or, using Sass:

```scss
.my-button-class {
	@include oButtons();
}
.my-button-class--standout {
	@include oButtonsTheme(standout);
}

// Or…
.my-standout-button {
	@include oButtons($theme: standout);
}
```

```html
<button class="my-button-class my-button-class--standout">Standout button</button>

<button class="my-standout-button">Standout button</button>
```

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

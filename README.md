# o-buttons [![CircleCI](https://circleci.com/gh/Financial-Times/o-buttons.png?style=shield&circle-token=c3d55d3f5d2edbde5999e6cf3f542d288bdae302)](https://circleci.com/gh/Financial-Times/o-buttons)

o-buttons is a collection of Sass files to allow you to create FT branded buttons.

## Table of contents

* [Requirements](#requirements)
* [Usage](#usage)
* [Browser support](#browser-support)
* [Licence](#licence)

## Requirements

Origami module code can be used in projects either via a `<link>` tag to the [build service](https://origami-build.ft.com/v2/), or, if you use bower, by adding the component as a dependency.

For the quick start guide to getting o-buttons into your project, see the [o-buttons registry page](http://registry.origami.ft.com/components/o-buttons#section-usage).

For more information about using Origami modules in a project, see the [Origami developer guide](http://origami.ft.com/docs/developer-guide/)

----

## Usage

Buttons come in the following themes ([documentation](#theme-modifiers)):

* __default__: teal outline
* __standout__: solid teal
* __uncolored__: monochrome
* __inverse__: for use on dark backgrounds

and the following sizes ([documentation](#size-modifiers)):

* __small__: 22px high
* __default__: 26px high
* __big__: 36px high

and have the following states:

* __standard__: without any interaction
* __hover__: when the mouse pointer is over
* __focus__: it's the current target of keyboard input
* __active__: the pointer is pushing / tapping / clicking the button
* __selected__: marked as chosen
* __disabled__: when clicking it will have no effect
* __pressed__: for toggleable buttons that are currently activated

Button width is determined by its content.

### Mixins, silent mode and classes

> Mixins and silent mode are only available if you're including o-buttons in your project using bower. If you're using o-buttons via the build service, you must use the o-buttons classes instead. Both are documented below.

Various Sass mixins are provided to obtain styles for buttons in all their states and variants. When `$o-buttons-is-silent: false;`, all classes for every combinatorial variation of theme and size will be generated.

[Full documentation of mixins and variables](http://sassdoc.webservices.ft.com/v1/sassdoc/o-buttons)

#### Default button

[View demo](https://origami-build.ft.com/v2/demos/o-buttons/individual)

```html
<button class="o-buttons">Standard</button>
```

```scss
.my-button-class {
	@include oButtons();
}
```

#### States

```html
<button class="o-buttons">Standard</button>
<button class="o-buttons" aria-selected="true">Selected</button>
<button class="o-buttons" aria-pressed="true">Pressed</button>
<button class="o-buttons" disabled>Disabled</button>
```

#### Grouped buttons

[View demo](https://origami-build.ft.com/v2/demos/o-buttons/grouped)

```html
<div class="o-buttons-group">
    <button class="o-buttons">John</button><!--
 --><button class="o-buttons">Paul</button><!--
 --><button class="o-buttons">George</button><!--
 --><button class="o-buttons">Ringo</button>
</div>
```

 Or, using Sass:

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


#### Pagination buttons

[View demo](https://origami-build.ft.com/v2/demos/o-buttons/pagination)

```html
<div class="o-buttons-pagination">
    <button class="o-buttons">1</button><!--
 --><button class="o-buttons">2</button><!--
 --><button class="o-buttons">3</button><!--
 --><button class="o-buttons">4</button>
</div>
```

Or, using Sass:

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

#### Size modifiers

```html
<button class="o-buttons o-buttons--medium">Medium button (default)</button>
<button class="o-buttons o-buttons--big">Big button</button>
```

Or, using Sass:

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

#### Theme modifiers

View demos:

- [standout](https://origami-build.ft.com/v2/demos/o-buttons/individual-standout)
- [uncolored](https://origami-build.ft.com/v2/demos/o-buttons/individual-uncolored)
- [inverse](https://origami-build.ft.com/v2/demos/o-buttons/individual-inverse)

```html
<button class="o-buttons o-buttons--standout">Standout button</button>
<button class="o-buttons o-buttons--uncolored">Uncolored button</button>
<button class="o-buttons o-buttons--inverse">Inverse button</button>
```

Or, using Sass:

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

#### Icons
[View demo](https://origami-build.ft.com/demos/o-buttons/icons)

o-buttons uses [o-ft-icons](https://github.com/Financial-Times/o-ft-icons/) for its icon-buttons.

```html
// Icon and text button.
<button class="o-buttons o-buttons-icon o-buttons-icon--arrow-left">Go left</button>


// Icon only button
<button class="o-buttons o-buttons-icon o-buttons-icon--icon-only o-buttons-icon--arrow-left">
	// accessible text fallback for the button. Not visible, only required for icon only buttons.
	<span class="o-buttons-icon__label">Go left</span>
</button>
```

Or, using Sass:

```scss
.my-button-class {
	@include oButtons();
}

.my-button-class--icon {
	// Generic sizing / padding for icon-buttons
	@include oButtonsBaseStyles;
}

.my-button-class--icon-star {
	// icon here can be *any* icon tag (eg arrow-left) in o-ft-icons
	@include oButtonsGetButtonForIconAndTheme(star, standout);
}
```
----

## Browser support

The following browser features are used but will degrade gracefully:

* __CSS negation pseudo-class__: (`not()`) is used for the hover states. Buttons will not have hover states in IE8 and earlier.
* __sibling CSS selectors__: spacing between tabs or button groups may be incorrect on very old browsers
* __border-radius__: older browsers will show square corners
* __SVG__: for icon buttons, the background-image property is used with an SVG for ie9+ with a PNG fallback for browsers that do not support SVG. For IE6, a text fallback is used because of the IE6 [multiple class bug](http://www.paulirish.com/2008/the-two-css-selector-bugs-in-ie6/).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

# o-ft-buttons [![Build Status](https://travis-ci.org/Financial-Times/o-ft-buttons.png?branch=master)](https://travis-ci.org/Financial-Times/o-ft-buttons)

Standard FT-branded buttons.

Buttons come in four themes:

* __default__: blue outline
* __uncolored__: monochrome
* __inverse__: white
* __standout__: solid blue

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

* __CSS negation pseudo-class__: (`not()`) is used for the hover states. Buttons will not have hover states in IE8 and earlier.
* __sibling CSS selectors__: spacing between tabs or button groups may be incorrect on very old browsers
* __border-radius__: older browsers will show square corners
* __web fonts__: older browsers will use websafe alternative fonts

## Mixins

Various Sass mixins are provided to obtain styles for buttons in all their states and variants. Also, when `$o-ft-buttons-is-silent: false;`, the module outputs a set of classes that are also documented in each section.

### Default button

These are the base styles that must be called in addition to any of the other mixins listed below.

Example Sass:

```scss
.my-button-class {
	@include oFtButtons();
}
```

Example HTML:

```html
<button class="my-button-class">Standard</button>
```

Silent mode off: `.o-ft-buttons`

### Grouped buttons

Include grouped button styles. It accepts one argument:
	- Base buttons class

Example Sass:

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

Silent mode off: `.o-ft-buttons-group`

### Pagination buttons

Include pagination buttons styles. It accepts one argument:
	- Base buttons class

Example Sass:

```scss
.my-button-pagination-class {
	@include oFtButtonsPagination(my-button-class);
}
```

Example HTML:

```html
<div class="my-button-pagination-class">
    <button class="my-button-class">1</button><!--
 --><button class="my-button-class">2</button><!--
 --><button class="my-button-class">3</button><!--
 --><button class="my-button-class">4</button>
</div>
```

Silent mode off: `.o-ft-buttons-pagination`

### Big button _modifier_

Include the _big_ button styles.

Example Sass:

```scss
.my-button-class--big {
	@include oFtButtonsSize(big);
}
```

Example HTML:

```html
<button class="my-button-class my-button-class--big">Big button</button>
```

Silent mode off: `.o-ft-buttons--big`

### 'Standout' button _modifier_

Include the _standout_ button styles.

Example Sass:

```scss
.my-button-class--standout {
	@include oFtButtonsTheme(standout);
}
```

Example HTML:

```html
<button class="my-button-class my-button-class--standout">Standout button</button>
```

Silent mode off: `.o-ft-buttons--standout`

### 'Inverse' button _modifier_

Include the _inverse_ button styles.

Example Sass:

```scss
.my-button-class--inverse {
	@include oFtButtonsTheme(inverse);
}
```

Example HTML:

```html
<button class="my-button-class my-button-class--inverse">Inverse button</button>
```

Silent mode off: `.o-ft-buttons--inverse`

### 'Uncolored' button _modifier_

Include the _uncolored_ button styles.

Example Sass:

```scss
.my-button-class--uncolored {
	@include oFtButtonsTheme(uncolored);
}
```

Example HTML:

```html
<button class="my-button-class my-button-class--uncolored">Uncolored button</button>
```

Silent mode off: `.o-ft-buttons--inverse`

### Deprecated

The `--faux` modifier is now deprecated and will be removed in next major release.
The `.o-ft-buttons__pagination` wasn't following the BEM convention properly and will be removed in next major release. Use `..o-ft-buttons-pagination` instead.
The `.o-ft-buttons__group` wasn't following the BEM convention properly and will be removed in next major release. Use `.o-ft-buttons-group` instead.

### Icons for use in buttons

This is now deprecated and will be removed in next major release

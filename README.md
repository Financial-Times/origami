# o-buttons [![CircleCI](https://circleci.com/gh/Financial-Times/o-buttons.png?style=shield&circle-token=c3d55d3f5d2edbde5999e6cf3f542d288bdae302)](https://circleci.com/gh/Financial-Times/o-buttons)

o-buttons provides Sass mixins and variables to create buttons.

- [Quick start](#quick-start)
- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
- [Troubleshooting](#troubleshooting)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)


## Quick start

o-buttons provides styling for:

- **Themes**: `o-buttons--{primary|secondary|inverse|mono|b2c}` or `@include oButtonsTheme($theme);`
	- **Custom themes**: [Via mixins only] `@include oButtonsCustomTheme($page-background-color, $accent-color);`
- **Sizes**: `o-buttons--{default|big}` or `@include oButtonsSize($size);`
- **Grouped buttons**: `o-buttons-group` or `@include oButtonsGroup;`
- **Pagination buttons**: `o-buttons-pagination` or `@include oButtonsPagination;`
- **Icon buttons**: `o-buttons-icon o-buttons-icon--{arrow-left| arrow-right}` or `@include oButtonsGetButtonForIconAndTheme($icon-name, $theme);`

You can combine these styles.

## Usage

For design guidelines, see the [registry](http://registry.origami.ft.com/components/o-buttons).

For detailed documentation on this component's mixins, see the [Sassdoc](http://codedocs.webservices.ft.com/v1/sassdoc/o-buttons)

### Markup

The button CSS will work on `<button>` or `<a>` elements. It is important for accessibility that if you intent to style an `<a>` as a button, you give it the correct [aria role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role).

### Sass

Mixins and [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles) are only available if you're including o-buttons in your project using bower. If you're using o-buttons via the [Build Service](https://www.ft.com/__origami/service/build/v2/), you must use the o-buttons classes instead. Both are documented below.

#### Default button

[View demos](http://registry.origami.ft.com/components/o-buttons)

```html
<!-- Default/Secondary theme, default size -->
<button class="o-buttons">Secondary</button>
```

Or, using Sass:

```scss
.my-button-class {
	@include oButtons();
}
```

```html
<!-- Default/Secondary theme, default size -->
<button class="my-button-class">Secondary</button>
```


#### States

```html
<!-- Default/Secondary theme, default size -->
<button class="o-buttons">Secondary</button>
<button class="o-buttons" aria-selected="true">Selected</button>
<button class="o-buttons" aria-pressed="true">Pressed</button>
<button class="o-buttons" disabled>Disabled</button>
```

#### Grouped buttons

[View demos](http://registry.origami.ft.com/components/o-buttons)

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

[View demos](http://registry.origami.ft.com/components/o-buttons)

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
<button class="o-buttons">Default-sized button</button>
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
[View demos](http://registry.origami.ft.com/components/o-buttons)

```html
<button class="o-buttons o-buttons--primary">Primary button</button>
<button class="o-buttons">Default/Secondary button</button>
<button class="o-buttons o-buttons--mono">Mono button</button>
<button class="o-buttons o-buttons--inverse">Inverse button</button>
<button class="o-buttons o-buttons--b2c">B2C button</button>

```

Or, using Sass:

```scss
.my-button-class {
	@include oButtons();
}
.my-button-class--secondary {
	@include oButtonsTheme(secondary);
}

// Or…
.my-secondary-button {
	@include oButtons($theme: secondary);
}
```

```html
<button class="my-button-class my-button-class--secondary">Secondary button</button>

<button class="my-secondary-button">Secondary button</button>
```

#### Custom themes

You can use the `oButtonsCustomTheme` mixin to create custom coloured buttons using the oColors color variables.

E.g. to create a `lemon` accented button on a `slate` background:

```scss
@include oButtonsCustomTheme(slate, lemon);
```

This will output styles for a slate coloured button that has lemon text and border, with a slate/lemon mixed hover state.

To create a `lemon` _filled_ button on a `slate` background, use the `colorizer` parameter and set to `primary`:

```scss
@include oButtonsCustomTheme(slate, lemon, primary);
```

This will output styles for a lemon coloured button that has slate text, with a slate/lemon mixed hover state.

#### Icons
[View demo](https://origami-build.ft.com/demos/o-buttons/icons)

o-buttons uses [fticons](https://registry.origami.ft.com/components/fticons/) via the [o-icons](https://github.com/Financial-Times/o-icons/) mixins for its icon-buttons.

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
	// icon here can be *any* icon tag (eg arrow-left) in fticons
	@include oButtonsGetButtonForIconAndTheme(star, secondary);
}

.my-button-class-icon__label {
	@include oButtonsIconButtonLabel;
}
```

```html
// Icon and text button.
<button class="my-button-class my-button-class--icon my-button-class--icon-star">star</button>


// Icon only button
<button class="my-button-class my-button-class--icon my-button-class--icon-star">
	// accessible text fallback for the button. Not visible, only required for icon only buttons.
	<span class="my-button-class-icon__label">star</span>
</button>
```


## Troubleshooting

In the past we've seen issues where adding styles to the `background` property of buttons with a low specificity selector can overwrite the `background-color` styles added by o-buttons, [see issue #76](https://github.com/Financial-Times/o-buttons/issues/76). This happens because o-buttons styles the `background-color` property on buttons to add color instead of the shorthand property, which allows for icons to be added to buttons using the remaining background properties.

To avoid this, use the `background-color` property instead of the shorthand `background` property if you wish to overwrite a buttons background-color.

## Migration Guide

### Migrating from v4 to v5

This major includes the new o-colors and updates the themes and sizes of buttons.

**Sizes** have been updated to `default` (`28px` min-height), and `big` (`40px` min-height) to correspond to the new baseline sizing introduced in the new o-typography. `Small` button size has been removed.

The following changes have been made to the **themes**:

- `Standard` is now `Secondary` and the default button style: use `o-buttons` or `o-buttons--secondary` classes
- `Standout` is now `Primary`: use `o-buttons--primary` class
- `Uncolored` is now `Mono`: use `o-buttons--mono` class

Inverse and B2C themes have remained the same.

Removes deprecated classnames:

```diff
-.o-buttons__pagination
+.o-buttons-pagination

-.o-buttons__group
+.o-buttons-group
```

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-buttons/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

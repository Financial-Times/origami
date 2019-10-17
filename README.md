# o-buttons [![CircleCI](https://circleci.com/gh/Financial-Times/o-buttons.png?style=shield&circle-token=c3d55d3f5d2edbde5999e6cf3f542d288bdae302)](https://circleci.com/gh/Financial-Times/o-buttons) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

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

### Themes

The `secondary` theme is the default `o-buttons` theme.

| Theme                   | Selector                               |
|-------------------------|----------------------------------------|
| secondary               |                                        |
| inverse                 | .o-buttons--inverse                    |
| mono                    | .o-buttons--mono                       |
| primary                 | .o-buttons--primary                    |
| primary-inverse         | .o-buttons--primary.o-buttons--inverse |
| primary-mono            | .o-buttons--primary.o-buttons--mono    |
| b2c                     | .o-buttons--b2b                        |

To apply a theme use one of the above selectors e.g. `o-buttons o-buttons--inverse`, or if using Bower and silent mode `@include oButtonsTheme($theme);`. Using Sass Mixins [custom themes](#custom-themes) are also supported.

### Sizes
`o-buttons--{default|big}` or `@include oButtonsSize($size);`

### Grouped buttons
`.o-buttons-group` or `@include oButtonsGroup;`

### Pagination buttons
`.o-buttons-pagination` or `@include oButtonsPagination;`

### Icon buttons
`.o-buttons-icon .o-buttons-icon--{arrow-left| arrow-right | other supported icon}` or `@include oButtonsIconButton($icon-name, $size, $theme);`

### Disabled
`o-buttons` styles buttons with the `disabled` attribute to show they are inactive. In some cases it is preferred to visually hide the button until it is active. For this case add the class `o-buttons--hide-disabled`.

```html
<!-- Visibly disabled because of the `disabled` attribute. -->
<button class="o-buttons" disabled>My Button</button>

<!-- Visually hidden because of the `disabled` attribute and `o-buttons--hide-disabled`.-->
<button class="o-buttons o-buttons--hide-disabled" disabled>My Button</button>
```

You can combine these styles.

## Usage

For design guidelines, see the [registry](http://registry.origami.ft.com/components/o-buttons).

For detailed documentation on this component's mixins, see the [Sassdoc](http://codedocs.webservices.ft.com/v1/sassdoc/o-buttons)

### Markup

The button CSS will work on `<button>` or `<a>` elements. It is important for accessibility that if you intend to style an `<a>` as a button, you give it the correct [aria role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role).

### Sass

Mixins, Custom themes and [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles) are only available if you're including o-buttons in your project using bower. If you're using o-buttons via the [Build Service](https://www.ft.com/__origami/service/build/v2/), you must use the o-buttons classes instead. Both are documented below.

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

There are named themes in `o-buttons`. `o-buttons` also allows developers to create custom themes using o-colors names.

```html
<button class="o-buttons o-buttons--primary">Primary button</button>
<button class="o-buttons">Default/Secondary button</button>
<button class="o-buttons o-buttons--mono">Mono button</button>
<button class="o-buttons o-buttons--inverse">Inverse button</button>
<button class="o-buttons o-buttons--b2c">B2C button</button>
```

More named themes are demonstrated [in the registry](http://registry.origami.ft.com/components/o-buttons).

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

oButtonsTheme also accepts a Map, which you can use to create your own themes. The Map can have the following keys:
- `background`: [String] - the background `o-colors` color for the place the button sits on.
- `accent`: [String] - the accent `o-colors` color for the button.
- `hover`: [String] - an optional parameter for the button hover state. It requires an `o-colors` color. Defaults to a mix of the `background` and `accent` colors.
- `colorizer`: [String] - an optional parameter for the button style. One of "primary" or "secondary". Defaults to secondary.


To create a `lemon` accented button on a `slate` background:

```scss
@include oButtonsTheme($theme: (background: 'slate', accent: 'lemon', colorizer: 'primary'));
```

This will output styles for a slate coloured button that has lemon text and border, with a slate/lemon mixed hover state.

To create a `lemon` _filled_ button on a `slate` background, use the `colorizer` parameter and set to `primary`:

```scss
@include oButtonsTheme($theme: (background: 'slate', accent: 'lemon', colorizer: 'primary'));
```

This will output styles for a lemon coloured button that has slate text, with a slate/lemon mixed hover state.

#### Icons
If you're using bower, you can create an icon button for **any** icon in [fticons](https://registry.origami.ft.com/components/fticons/).

If you're using the Build Service a limited number of button icons are available. Limiting the concrete classes keeps the compiled CSS bundle smaller, but if you need an icon button that we don't currently support then please open an issue. Build service icons currently include:
- arrow-left
- arrow-right
- upload
- tick
- plus
- warning
- arrow-down
- arrow-up
- grid
- list
- edit
- download
- search

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
.my-button-class--icon {
 @include oButtons();
 @include oButtonsIconButton($icon-name: star);
}

.my-button-class--icon-only {
 @include oButtons();
 @include oButtonsIconButton($icon-name: star, $is-icon-only: true);
}
```

```html
// Icon and text button.
<button class="my-button-class--icon">star</button>


// Icon only button
<button class="my-button-class--icon-only">
	<!-- accessible text fallback for the button. Not visible, only required for icon only buttons. -->
	<span class="my-button-class-icon__label">star</span>
</button>
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 6 | N/A | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
⚠ maintained | 5 | 5.16 | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.5 | - |
╳ deprecated | 3 | 3.1 | - |
╳ deprecated | 2 | 2.0 | - |
╳ deprecated | 1 | 1.8 | - |

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-buttons/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

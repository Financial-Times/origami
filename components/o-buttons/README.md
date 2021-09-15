# o-buttons

o-buttons provides Sass mixins and variables to create buttons.

- [Usage](#usage)
- [Markup](#markup)
- [Sass](#sass)
- [References](#references)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-buttons`.

## Markup

There are two types of buttons, primary buttons and secondary buttons.

| Type      | Selector              | Brand Support                |
|-----------|-----------------------|------------------------------|
| primary   | .o-buttons--primary      | master, internal, whitelabel |
| secondary | .o-buttons--secondary | master, internal, whitelabel |


```html
<button class="o-buttons o-buttons--primary">Submit</button>
<button class="o-buttons o-buttons--secondary">Cancel</button>
```

o-buttons CSS will work on `<button>` or `<a>` elements. It is important for accessibility that if you intend to style an `<a>` as a button, you give it the correct [aria role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role).

### Themes

A theme may be applied to a button to change its appearance. o-buttons provides some themes by default:

| Theme    | Selector             | Works With Types     | Brand Support    |
|----------|----------------------|----------------------|------------------|
| inverse  | .o-buttons--inverse  | primary, secondary   | master, internal |
| mono     | .o-buttons--mono     | primary, secondary   | master, internal |
| b2c      | .o-buttons--b2c      | primary              | master           |

```html
<button class="o-buttons o-buttons--primary o-buttons--inverse">Submit</button>
<button class="o-buttons o-buttons--secondary o-buttons--inverse">Cancel</button>
```

Sass users may create [custom themes](#custom-themes).

### Sizes

Any button may be made larger using the `o-buttons--big` modifier class.

```html
<button class="o-buttons o-buttons--primary o-buttons--big">Click Me</button>
```

### Icons

To add an icon to your button add the class `o-buttons-icon` and `o-buttons-icon--{icon-name}` to your button.

[Sass](#sass) users may output any icon from the [fticons](https://registry.origami.ft.com/components/fticons/) set. However if you're using the [Build Service](https://www.ft.com/__origami/service/build/) a limited number of button icons are available. Limiting the number of icons keeps the CSS bundle smaller, but if you need an icon button that we don't currently support then please contact the Origami team:
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
- refresh
- cross

```html
<button class="o-buttons o-buttons--secondary o-buttons-icon o-buttons-icon--arrow-down">Down Arrow</button>
<button class="o-buttons o-buttons--secondary o-buttons-icon o-buttons-icon--download">Download</button>
```

If you would like your button to display only an icon, add the class `o-buttons-icon--icon-only` and provide a visually hidden label for screen-reader users with `o-buttons-icon__label`.

```html
<button class="o-buttons o-buttons--secondary o-buttons-icon o-buttons-icon--arrow-down o-buttons-icon--icon-only">
	<span class="o-buttons-icon__label">
		Down Arrow
	</span>
</button>
```

### Groups

Wrap buttons with `.o-buttons-group` to group them together:

```html
<div class="o-buttons-group">
	<button class="o-buttons o-buttons--secondary" aria-selected="true">One</button>
	<button class="o-buttons o-buttons--secondary">Two</button>
	<button class="o-buttons o-buttons--secondary">Three</button>
</div>
```

### Pagination

For a pagination style wrap your buttons in `.o-buttons-pagination`. Most pagination usecases use an anchor `a` tags for links which look like buttons instead of a `button` tag. When using an anchor tag in pagination do not use the `aria-selected` data attribute. Instead use `aria-current="page"` to indicate the current page, this will highlight the button for the current page visually and to screen readers.

The following markup example shows pagination for 20 pages, where the 14th page is the current page. Following the [pagination rules](#pagination-rules) we recommend displaying no more than 7 pages and using the ellipsis element to show hidden results.

```html
<div class="o-buttons-pagination">
	<a href="#" class="o-buttons o-buttons--secondary o-buttons-icon o-buttons-icon--arrow-left o-buttons-icon--icon-only">
		<span class='o-buttons-icon__label'>Fewer results</span>
	</a>

	<a href="#" class="o-buttons o-buttons--secondary">1</a>
	<span class="o-buttons-pagination__ellipsis">...</span>
	<a href="#" class="o-buttons o-buttons--secondary">13</a>
	<a href="#" class="o-buttons o-buttons--secondary" aria-current="page">14</a>
	<a href="#" class="o-buttons o-buttons--secondary">15</a>
	<span class="o-buttons-pagination__ellipsis">...</span>
	<a href="#" class="o-buttons o-buttons--secondary">20</a>

	<a href="#" class="o-buttons o-buttons--secondary o-buttons-icon o-buttons-icon--arrow-right o-buttons-icon--icon-only">
		<span class='o-buttons-icon__label'>More results</span>
	</a>
</div>
```

#### Pagination Rules

The number of pages to display is not enforced by Origami. However we recommend the following:
- Show no more than 7 pages at a time. When there are more than 7 pages, hide more pages behind the pagination ellipsis in the following way. Given:
	- The selected page is below 3 show ellipsis with 3 pages either side.
	- The selected page is one of the last 2 pages show ellipsis with 3 pages either side.
	- The 3rd page is selected show 4 pages, the ellipsis, and 2 more pages.
	- The 3rd from last page is selected show 2 pages, the ellipsis, and 4 more pages.
	- The selected page is more than 3 from the first of last page show the first page, ellipsis, three pages, ellipsis, and the last page.

For an example see the [pagination demos in the Origami registry](https://registry.origami.ft.com/components/o-buttons@6.0.19#demo-pagination-layout).

#### Pagination Theme

A theme modifier such as `o-buttons--inverse` may be added to the buttons within a pagination block.

#### Pagination Size

Big buttons may also be used in a pagination style. Add the `o-buttons--big` modifier to each button and `o-buttons-pagination__ellipsis--big` to the ellipsis element.

```html
<div class="o-buttons-pagination">
	<a href="#" class="o-buttons o-buttons--big o-buttons--secondary o-buttons-icon o-buttons-icon--arrow-left o-buttons-icon--icon-only" disabled>
		<span class='o-buttons-icon__label'>Fewer results</span>
	</a>

	<a href="#" class="o-buttons o-buttons--big o-buttons--secondary" aria-current="page">1</a>
	<a href="#" class="o-buttons o-buttons--big o-buttons--secondary">2</a>
	<a href="#" class="o-buttons o-buttons--big o-buttons--secondary">3</a>
	<span class="o-buttons-pagination__ellipsis o-buttons-pagination__ellipsis--big">...</span>
	<a href="#" class="o-buttons o-buttons--big o-buttons--secondary">18</a>
	<a href="#" class="o-buttons o-buttons--big o-buttons--secondary">19</a>
	<a href="#" class="o-buttons o-buttons--big o-buttons--secondary">20</a>

	<a href="#" class="o-buttons o-buttons--big o-buttons--secondary o-buttons-icon o-buttons-icon--arrow-right o-buttons-icon--icon-only">
		<span class='o-buttons-icon__label'>More results</span>
	</a>
</div>
```

### Disabled

Avoid disabled buttons unless user research shows they improve your interface. Disabled buttons have [poor contrast which makes them difficult to read](#references). They also [do not give feedback to a user why they are disabled](#references).

To make a button disabled add the `disabled` attribute. To visually hide the disabled button until it is active add the class `o-buttons--hide-disabled`.

```html
<!-- Visibly disabled because of the `disabled` attribute. -->
<button class="o-buttons" disabled>My Button</button>

<!-- Visually hidden because of the `disabled` attribute and `o-buttons--hide-disabled`.-->
<button class="o-buttons o-buttons--hide-disabled" disabled>My Button</button>
```

## Sass

To output default o-buttons CSS make a single call to the primary mixin `oButtons`. It is recommended that you pass an options map as the first argument to include only the button styles you need. Without the options map, all o-buttons styles are included.

```scss
@include oButtons($opts: (
	'sizes': ('big'), // e.g .o-buttons--big
	'types': ('primary', 'secondary'), // e.g .o-buttons--primary
	'themes': ('mono', 'inverse', 'b2c'), // e.g .o-buttons--inverse
	'icons': ('arrow-left', 'arrow-right', 'search'), // any fticons, e.g .o-buttons-icons.o-buttons-icons--search
	'pagination': true, // .o-buttons-pagination
	'groups': true // .o-buttons-group
));
```

### Custom Themes

To create a new button theme call `oButtonsAddTheme` with the colour of your theme along with the types of buttons and icons you would like to use with your theme, if any.

- name: The name of your theme. This is used for the modifer class output `o-buttons--{name}`.
- opts: A map of options for your theme. Keys include `color` and `context`.
	- color: The main colour of your button. Any o-colors palette colour name.
	- context (optional): The background colour your button is placed on. Defaults to the page colour (paper for the master brand, white otherwise). This is used to confirm accessibility and in some cases changes the colour of the button.
- types: A list of button types your theme is used with.
- icons: A list of icons your theme is used with. Any [fticons](https://registry.origami.ft.com/components/fticons/) icon name.

```scss
/// .o-buttons--my-special-button
@include oButtonsAddTheme(
	$name: 'my-special-button',
	$opts: ('color': 'claret-80'),
	$types: ('primary', 'secondary'),
	$icons: ('arrow-up', 'arrow-down')
);
```

### Custom Markup

We recommend using `o-buttons` markup as this encourages CSS reuse and smaller bundle sizes. If you are unable to update your markup to use `o-buttons` classes, including those generated by `oButtonsAddTheme`, use `oButtonsContent`:

```scss
.my-button {
	@include oButtonsContent($opts: ('type': 'primary'));
}
```

```scss
.my-icon-button {
	@include oButtonsContent($opts: (
		'type': 'primary',
		'icon': 'arrow-right'
	));
}
```

```scss
.my-lemon-button {
	@include oButtonsContent($opts: (
		'type': 'primary',
		'theme': ('color': 'lemon')
	));
}
```

`oButtonsContent` has options to recreate all buttons, including for different sizes and icon only buttons. See the [o-buttons SassDoc](https://registry.origami.ft.com/components/o-buttons/sassdoc) for more details and examples.

## References

- Hampus Sethfors explains the issues with disabled buttons in more detail in an [axesslab.com article](https://axesslab.com/disabled-buttons-suck/). In the article Hampus suggests alternative design approaches for common uses of disabled buttons.

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 7 | N/A | [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7) |
⚠ maintained | 6 | 6.2 | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
╳ deprecated | 5 | 5.16 | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.5 | - |
╳ deprecated | 3 | 3.1 | - |
╳ deprecated | 2 | 2.0 | - |
╳ deprecated | 1 | 1.8 | - |


## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-buttons/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

# o3-button

o3-button includes button, button group, and pagination patterns. See our [design guidelines for usage information and brand support](https://origami-beta.ft.com/components/buttons/).

- [o3-button](#o3-button)
  - [Markup](#markup)
    - [Types](#types)
    - [Themes](#themes)
    - [Sizes](#sizes)
    - [Fluid, full width](#fluid-full-width)
    - [Icons](#icons)
    - [Groups](#groups)
    - [Pagination](#pagination)
    - [Disabled](#disabled)
  - [JSX](#jsx)
  - [Migration](#migration)
  - [Contact](#contact)
  - [Licence](#licence)

## Markup

o3-button supports [JSX templates for React users](#jsx), or direct HTML. We recommend using JSX where possible.

### Types

There are three types of buttons, primary, secondary, and ghost. When to use which button type is described in our [design guidelines](https://origami-beta.ft.com/components/buttons/).

| Type      | Selector              |
| --------- | --------------------- |
| primary   | .o3-button--primary   |
| secondary | .o3-button--secondary |
| ghost     | .o3-button--ghost     |

```html
<button class="o3-button o3-button--primary">Submit</button>
<button class="o3-button o3-button--secondary">Cancel</button>
<button class="o3-button o3-button--ghost">Options</button>
```

o3-button may be used with either `<button>` or `<a>` elements.

### Themes

A theme may be applied to a button to change its appearance using the `data-o3-theme`. See our [design guidelines](https://origami-beta.ft.com/components/buttons/) for a list of available themes for your brand. Examples include:

| Theme   | Data attribute          |
| ------- | ----------------------- |
| inverse | data-o3-theme="inverse" |
| mono    | data-o3-theme="mono"    |

Themes may be applied on a parent element, for all components within to inherit. E.g. for an FT Professional brand button, with inverse theme:

```html
<body data-o3-brand="professional" data-o3-theme="inverse">
	<button class="o3-button o3-button--primary">
		Inverse professional button
	</button>
</body>
```

Or, themes may be applied specifically to a single button:

```html
<body data-o3-brand="professional">
	<button class="o3-button o3-button--primary" data-o3-theme="inverse">
		Inverse professional button
	</button>
</body>
```

### Sizes

Apply the `o3-button--small` modifier class for a smaller button, as appropriate, inline with [design guidelines](https://origami-beta.ft.com/components/buttons/#small).

```html
<button class="o3-button o3-button--primary o3-button--small">Click me</button>
```

### Fluid, full width

Apply the `data-o3-fluid` data attribute to make buttons "fluid", and expand to the full width of their container. By default this applies only to small, mobile viewports. On larger viewports a fluid button's width is based on its content by default.

```html
<button class="o3-button o3-button--primary" data-o3-fluid>Click me</button>
```

For more control on when a button should be full width set the `--o3-button-fluid` CSS Custom Property. For example:

Force buttons to always be full width, given they are a direct child of a "my-button-container" element.

```css
.my-button-container > .o3-button {
	--o3-button-fluid: initial;
}
```

Make buttons full width using a [container query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries), given a "my-button-container" parent element that is less than `500px` wide.

```css
.my-button-container {
	container-type: inline-size;
}

@supports (container-type: inline-size) {
	@container (width < 500px) {
		.my-button-container > .o3-button {
			--o3-button-fluid: initial;
		}
	}
}
```

### Icons

#### Icon and label

To add an icon to your button add the class `o3-button-icon` and `o3-button-icon--{icon-name}`.

A limited number of button icons are available. Limiting the number of icons keeps the CSS bundle smaller.

If you need an icon button that we don't currently support, please contact the Origami team.

```html
<button
	class="o3-button o3-button--secondary o3-button-icon o3-button-icon--chevron-down"
>
	Chevron down arrow
</button>
<button
	class="o3-button o3-button--secondary o3-button-icon o3-button-icon--download"
>
	Download
</button>
```

#### Icon position

Button icons may be positioned to the right where the icon indicates direction or continuation. Add the `o3-button-icon--end` CSS modifier. See [button design guidelines](https://origami-beta.ft.com/components/buttons/) for more details.

```html
<button
	class="o3-button o3-button--primary o3-button-icon o3-button-icon--chevron-down o3-button-icon--end"
>
	Continue
</button>
```

#### Icon only

If you would like your button to display only an icon, add the class `o3-button-icon--icon-only` and provide a visually hidden label for screen-reader users with `o3-button-icon__label`.

```html
<button
	class="o3-button o3-button--secondary o3-button-icon o3-button-icon--chevron-down o3-button-icon--icon-only"
>
	<span class="o3-button-icon__label"> Chevron down arrow </span>
</button>
```

#### Custom icons

If you want to use icons not in the o3-button supported icons list talk to Origami team and we will direct you to existing icon or help you to adopt the new icon. Alternatively, your icon may make a suitable addition to our standard set.

After discussing together, we may decide a custom icon is the most appropriate option. In which case, set the `--o3-button-icon` custom property with a [URL encoded SVG](https://yoksel.github.io/url-encoder/) of your icon:

```css
.my-button-modifier-class {
	--o3-button-icon: url('data:image/svg+xml,[ENCODED_SVG_STRING]');
}
```

```html
<button
	class="o3-button o3-button--secondary o3-button-icon my-button-modifier-class"
>
	My custom icon button
</button>
```

### Groups

Wrap buttons in a container with `.o3-button-group` to group them together:

```html
<div class="o3-button-group">
	<button class="o3-button o3-button--secondary" aria-selected="true">
		One
	</button>
	<button class="o3-button o3-button--secondary">Two</button>
	<button class="o3-button o3-button--secondary">Three</button>
</div>
```

### Pagination

Our pagination pattern varies according to the space available to it, e.g. mobile vs. desktop devices.

We recommend using our JSX template where possible. Alternatively, you must re-implement pagination logic following our [pagination design guidelines](https://origami-beta.ft.com/patterns/pagination/).

`data-o3-button-show-when` is used to show/hide pagination elements according to the space available. Here is example markup for pagination with 10 pages, where the 5th page is selected.

```html
<div class="o3-button-pagination">
	<a
		href="#previous"
		class="o3-button o3-button--secondary o3-button-icon o3-button-icon--chevrons-left o3-button-icon--icon-only"
		><span class="o3-button-icon__label">previous</span></a
	><a
		href="#1"
		class="o3-button o3-button--secondary "
		data-o3-button-show-when="wide"
		>1</a
	><span data-o3-button-show-when="wide" class="o3-button-pagination__ellipsis"
		>...</span
	><a
		href="#4"
		class="o3-button o3-button--secondary "
		data-o3-button-show-when="wide"
		>4</a
	><a
		href="#5"
		class="o3-button o3-button--secondary "
		aria-current="page"
		data-o3-button-show-when="wide"
		>5</a
	><a
		href="#6"
		class="o3-button o3-button--secondary "
		data-o3-button-show-when="wide"
		>6</a
	><span data-o3-button-show-when="wide" class="o3-button-pagination__ellipsis"
		>...</span
	><a
		href="#10"
		class="o3-button o3-button--secondary "
		data-o3-button-show-when="wide"
		>10</a
	><a
		href="#1"
		class="o3-button o3-button--secondary "
		data-o3-button-show-when="narrow"
		>1</a
	><span
		data-o3-button-show-when="narrow"
		class="o3-button-pagination__ellipsis"
		>...</span
	><a
		href="#5"
		class="o3-button o3-button--secondary "
		aria-current="page"
		data-o3-button-show-when="narrow"
		>5</a
	><span
		data-o3-button-show-when="narrow"
		class="o3-button-pagination__ellipsis"
		>...</span
	><a
		href="#10"
		class="o3-button o3-button--secondary "
		data-o3-button-show-when="narrow"
		>10</a
	><a
		href="#next"
		class="o3-button o3-button--secondary o3-button-icon o3-button-icon--chevrons-right o3-button-icon--icon-only"
		><span class="o3-button-icon__label">next</span></a
	>
</div>
```

Again, we recommend using our JSX template where possible instead of re-implementing the logic described in our [pagination design guidelines](https://origami-beta.ft.com/patterns/pagination/).

### Disabled

Avoid disabled buttons unless user research shows they improve your interface, see our [buttons usage guidelines](https://origami-beta.ft.com/components/buttons/#usage-guidelines) for more.

To make a button disabled add the `disabled` attribute. To visually hide the disabled button until it is active add the class `o3-button--hide-disabled`.

```html
<!-- Visibly disabled because of the `disabled` attribute. -->
<button class="o3-button" disabled>My Button</button>

<!-- Visually hidden because of the `disabled` attribute and `o3-button--hide-disabled`.-->
<button class="o3-button o3-button--hide-disabled" disabled>My Button</button>
```

## JSX

For React users, Origami components now include JSX templates. Import JSX templates along with component CSS. JSX templates are exported as `cjs` (common JS) and `esm` (ECMAScript) modules, so depending on your system configuration, you may need to import the correct module type.

See [Storybook for full o3-button JSX documentation](https://o3.origami.ft.com?path=/docs/core-o3-button--jsx-documentation).

For example, for a primary button:

```jsx
import {Button} from '@financial-times/o3-button/cjs';

import '@financial-times/o3-button/css/[your brand].css';

<div data-o3-brand="[your brand]">
	<Button label="Hello" type="primary" />
</div>;
```

For pagination:

```jsx
import {ButtonPagination} from '@financial-times/o3-button/cjs';

import '@financial-times/o3-button/css/[your brand].css';

<div data-o3-brand="[your brand]">
	<ButtonPagination
		previousPager={{label: 'previous', href: '#previous'}}
		nextPager={{label: 'next', href: '#next'}}
		pages={[
			{href: '#1', current: false, number: 1},
			{href: '#2', current: false, number: 2},
			{href: '#3', current: false, number: 3},
			{href: '#4', current: false, number: 4},
			{href: '#5', current: true, number: 5},
			{href: '#6', current: false, number: 6},
			{href: '#7', current: false, number: 7},
			{href: '#8', current: false, number: 8},
			{href: '#9', current: false, number: 9},
			{href: '#10', current: false, number: 10},
		]}
		currentPageOnly={false}
	/>
</div>;
```

## Migration

|    State     | Major Version | Last Minor Release |                    Migration guide                    |
| :----------: | :-----------: | :----------------: | :---------------------------------------------------: |
|  ✨ active   |       3       |        N/A         | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
| ╳ deprecated |       2       |        2.0         | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated |       1       |        1.1         |                           -                           |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o3-button/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

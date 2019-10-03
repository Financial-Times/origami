# o-expander [![Build Status](https://circleci.com/gh/Financial-Times/o-expander.png?style=shield&circle-token=0342cb593ceeb278037288a5f7a4745990b9517b)](https://circleci.com/gh/Financial-Times/o-expander) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Accessible, content-aware component for expanding and collapsing content.

- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Options](#options)
- [Contact](#contact)
- [Licence](#licence)

## Markup

The  `o-expander` component has a content element `o-expander__content` (the DOM to expand and collapse) and toggle elements `o-expander__toggle` (the triggers to toggle the expander).

`o-expander__toggle` and `o-expander__content` can be put anywhere within `o-expander` as long as `o-expander__toggle` is not contained within `o-expander__content`. There are no restrictions on sibling markup.

```html
<div data-o-component="o-expander" class="o-expander">
    <div class="o-expander__content">
      <!-- Some content to expand and collapse. -->
    </div>
    <button class="o-expander__toggle">Toggle Content</button>
</div>
```

By default o-expander will collapse content on initialisation. To prevent this add the class `.o-expander__content--expanded`.

```diff
<div data-o-component="o-expander" class="o-expander">
-    <div class="o-expander__content">
+    <div class="o-expander__content o-expander__content--expanded">
      <!-- Some content to expand and collapse. -->
    </div>
    <button class="o-expander__toggle">Toggle Content</button>
</div>
```

### Height Expander

By default the expander is based on height. Set the `max-height` of your collapsed expander using a custom class like `my-example-expander` below. `o-expander` will remove your `max-height` when the toggle is clicked to expand the expander.

```diff
-<div data-o-component="o-expander" class="o-expander">
+<div data-o-component="o-expander" class="o-expander my-example-expander">
    <h2>Collapsing content based on its height</h2>
    <div class="o-expander__content">
      <!-- Some content to expand and collapse. -->
    </div>
    <button class="o-expander__toggle">Toggle Content</button>
</div>
```

```css
// Set the height to 30% the viewport width (this is for demo purposes and could
// be any height). Only apply a max-height when the expander has the
// `o-expander--initialized` class for progressive enhancement, so when
// JavaScript fails content isn't hidden.
.o-expander--initialized.my-example-expander {
  max-height: 30vh;
}
```

### Item Count Expander

The expander may also be based on the number of items within `o-expander__content`. For example, to show only two items within a list: Set `o-expander__content` on your collapsing list (`ul` or `ol`), and specify the number of items to collapse to with the `data-o-expander-shrink-to` data attribute.

```diff
-	<div data-o-component="o-expander" class="o-expander">
+	<div data-o-component="o-expander" class="o-expander" data-o-expander-shrink-to="2">
		<h2>Collapsing content to a number of items in a list</h2>
		<ul class="o-expander__content">
			<li>item</li>
			<li>item</li>
			<li>item</li> //hidden when collapsed
			<li>item</li> //hidden when collapsed
			<li>item</li> //hidden when collapsed
		</ul>
		<button class="o-expander__toggle">Toggle Content</button>
	</div>
```

By default the item count assumes a list. To expand based on other children, such as paragraph `p` elements set `data-o-expander-item-selector`. E.g.

```diff
-	<div data-o-component="o-expander" class="o-expander" data-o-expander-shrink-to="2">
+	<div data-o-component="o-expander" class="o-expander" data-o-expander-shrink-to="2" data-o-expander-item-selector="p">
		<h2>Collapsing content to a number of paragraphs</h2>
		<div class="o-expander__content">
			<p>item</p>
			<p>item</p>
			<p>item</p> //hidden when collapsed
			<p>item</p> //hidden when collapsed
			<p>item</p> //hidden when collapsed
		</div>
		<button class="o-expander__toggle">Toggle Content</button>
	</div>
```

### Hidden Expander

The expander may also toggle the visibility of `o-expander__content` entirely. Set `data-o-expander-shrink-to` to `hidden`.

```diff
-	<div data-o-component="o-expander" class="o-expander">
+	<div data-o-component="o-expander" class="o-expander" data-o-expander-shrink-to="hidden">
		<h2>Collapsing all content</h2>
		<div class="o-expander__content">
			<!-- Some content to entirely hide/show. -->
		</div>
		<button class="o-expander__toggle">Toggle Content</button>
	</div>
```

### Toggle Text

All expanders update toggle text when the expander is toggled. To customise default copy, set `data-o-expander-collapsed-toggle-text` and `data-o-expander-expanded-toggle-text` to set the text of your expander toggles when collapsed/expanded respectively.

```diff
-	<div data-o-component="o-expander" class="o-expander">
 	<div
+   data-o-component="o-expander"
+   class="o-expander"
+   data-o-expander-collapsed-toggle-text="Show more of this please!"
+   data-o-expander-expanded-toggle-text="Less of this please!">
		<div class="o-expander__content">
			<!-- Some content to expand -->
		</div>
    <!-- This toggle text will update when be "Show more of this please!" when the expander initialises. -->
    <!-- And "Less of this please!" when the user expands the expander. -->
		<button class="o-expander__toggle">Toggle</button>
	</div>
```

If you would not like toggle text to be updated set `data-o-expander-collapsed-toggle-text` to "aria". The toggle's `aria-expanded` will still be updated but its copy won't. If you would not like the toggle aria to update either set to "none".

```diff
-	<div data-o-component="o-expander" class="o-expander">
+	<div data-o-component="o-expander" class="o-expander" data-o-expander-collapsed-toggle-state="none">
		<div class="o-expander__content">
			<!-- Some content to expand -->
		</div>
    <!-- This toggle text will not change. -->
		<button class="o-expander__toggle">Toggle</button>
	</div>
```

## Sass


Default expander styles hide the toggle until the expander is initialised successfully, so no content is obscured if JavaScript fails. When toggled the expander hides and shows content immediately. To include all `o-expander` CSS use the `oExpander` mixin.

```scss
  @include oExpander();
```
If using the height expander, also set your `max-height`. See [Height Expander](#height-expander) for an example.

_For animation and other more complex styles don't include opinionated o-expander CSS. Instead create a [custom expander](#custom-expander) with totally custom styles._


## JavaScript

No JavaScript will run automatically unless you are using the Build Service. You must either construct an `o-expander` object or fire an o.DOMContentLoaded event, which `o-expander` listens for.

### Construction

If you have set up your expander declaratively, use the following to initialise all expanders on the page with the `data-o-component="o-expander"` attribute:
```js
import Expander from 'o-expander';
Expander.init();
```

Or initialise a specific declarative expander:
```js
import Expander from 'o-expander';
const myExpanderElement = document.querySelector('my-expander');
const myExpander = new Expander(myExpanderElement);
```

All declarative options set via [Markup](#markup) may also be passed as an `opts` object. See the [options section](#options) for a full list. e.g:
```js
import Expander from 'o-expander';
const myExpanderElement = document.querySelector('my-expander');
const myExpander = new Expander(myExpanderElement, {
  shrinkTo: 4,
  itemSelecor: 'p'
});
```

#### Options

All the following can be passed to JavaScript or may be set declaratively via [Markup](#markup) as data-attributes (hyphenated and prefixed by `o-expander` e.g. `data-o-expander-shrink-to="height"`):

- `shrinkTo` [`height`]: The expander collapse method, "height", "hidden", or a number of items.
- `itemSelector` [`li`]: A selector for items to count when  `shrinkTo` is set to a number, relative to `.o-expander__content`.
- `expandedToggleText` [`less|fewer`]: Toggle text for when the expander is collapsed. Defaults to "fewer", or "less" when `shrinkTo` is "height", or "hidden" when `shrinkTo` is "hidden".
- `collapsedToggleText` [`more`]: Toggle text for when the expander is collapsed. Defaults to "more", or "show" when `shrinkTo` is "hidden".
- `toggleState` [`all|aria|none`]: How to update the expander toggles: "all" to update text and aria-expanded attributes, "aria" to update only aria-expanded attributes, "none" to avoid updating toggles on click.

### Custom Expander

`o-expander` may be used to create a custom expander without `o-expander` CSS. This is useful if you need the functionality of `o-expander` but a custom UI. E.g. `o-expander` sets `display: none` on collapsible items by default, but you may wish to animate them.

To create a custom expander call the static `createCustom` method. The `createCustom` method accepts the [same options](#options) as the `init` method except `itemSelector`. Instead of `itemSelector` it accepts two extra objects, `selectors` and `classnames`, to customise all CSS selectors and classes.

```js
import Expander from 'o-expander';
const myExpanderElement = document.querySelector('my-expander');
const myCustomExpander = Expander.createCustom(myExpanderElement, {
  shrinkTo: 4,
  selectors: {
    toggle: '.my-expander__toggle', // The toggles within o-expander.
    content: '.my-expander__content', // The content within o-expander which is expandable.
    item: 'li', // The items within o-expander to count, when `shrinkTo` is set to a number.
  },
  classnames: {
    initialized: 'my-expander--initialized', // Added to the expander element when JS is initialised.
    inactive: 'my-expander--inactive', // Added to the expander element if the expander doesn't need to contract/expand.
    expanded: 'my-expander__content--expanded', // Added to the content element when expanded.
    collapsed: 'my-expander__content--collapsed', // Added to the content element when collapsed.
    collapsibleItem: 'my-expander__collapsible-item' // Added to item elements which are hidden when collapsed.
  }
});
```

See [o-exapnder JSDocs](https://registry.origami.ft.com/components/o-expander/jsdoc) for more details.

### Events

o-expander fires the following events, which always fire before any repainting/layout occurs

  * `oExpander.init` - fires when the expander has initialised
  * `oExpander.expand` - fires when the expander expands
  * `oExpander.collapse` - fires when the expander collapses

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 5 | N/A  | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
⚠ maintained | 4 | 4.7  | - |
╳ deprecated | 3 | 3.0  | - |
╳ deprecated | 2 | 2.0 | - |
╳ deprecated | 1 | 1.4 | - |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-expander/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

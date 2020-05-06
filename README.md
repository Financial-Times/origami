o-tooltip [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

o-tooltip is a component usually used for annotating or highlighting bits of user interface.

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage
o-tooltip has Sass and JavaScript to show and hide a tooltip which points at a target.

### Markup

This HTML demonstrates the declarative way to instantiate o-tooltip. If you are using the Build Service or firing your own `o.DOMContentLoaded` event, this is all you need to create a tooltip.

```html
<div class='demo-tooltip-target' id="declarative-tooltip-target">
	A bit of UI to annotate
</div>

<div data-o-component="o-tooltip"
	data-o-tooltip-position="below"
	data-o-tooltip-target="declarative-tooltip-target"
	data-o-tooltip-show-on-construction=true
	id="my-tooltip-element">
	<div class='o-tooltip-content'>
		Some text to go in the tooltip
	</div>
</div>
```

This HTML is an example of the imperative alternative:
```html
<div class='demo-tooltip-container'>
	<button class='o-buttons o-buttons--big imperative-tooltip-target'>
		Button description text/icon
	</button>
</div>
```

Attributes can be set declaratively, or passed in on instantiation in an options object. A full list of data attributes:
- `data-o-tooltip-target`: Required. An ID selector for the target of the tooltip (the thing it points to)
- `data-o-tooltip-position`: Optional. The preferred position of the tooltip relative to the target. Can be one of `above`, `below`, `left`, `right`. If there isn't room to render the tooltip where the option passed in would render it, this value is flipped (above becomes below, left becomes right). Defaults to below. You can also specify a different position per viewport width ('default', 'S', 'M', 'L', 'XL') eg data-o-tooltip-position-s="left". The position will fall back to the default in data-o-tooltip-position, otherwise 'below'.
- `data-o-tooltip-show-on-construction`: Optional. Boolean value. Set to true if you want the tooltip to be rendered immediately after it is constructed. Defaults to false.
- `data-o-tooltip-show-on-hover`: Optional. Boolean value. Set to true if you want to show and hide the tooltip based on the mouseover and mouseout events (respectively) of the target. Defaults to false.
- `data-o-tooltip-show-on-focus`: Optional. Boolean value. Set to true if you want to show and hide the tooltip based on the focusin and focusout events (respectively) of the target. Defaults to false.
- `data-o-tooltip-show-on-click`: Optional. Boolean value. Set to true if you want to show the tooltip upon clicking the target element. Defaults to false.
- `data-o-tooltip-toggle-on-click`: Optional. Boolean value. Set to true if you want to show and hide the tooltip by clicking on the target.
- `data-o-tooltip-show-after`: Optional. Integer value. Specify the number of seconds to wait before showing the tooltip. Only applies when `data-o-tooltip-show-on-construction` is set to `false`
- `data-o-tooltip-close-after`: Optional. Integer value. Specify the number of seconds to wait before closing the tooltip. Only applies when `data-o-tooltip-show-on-construction` is set to `true`
- `data-o-tooltip-z-index`: Optional. The z-index for the tooltip.
- `data-o-tooltip-animation-distance`: Optional. String with `px` suffix. Distance away from target to start and end animation. Defaults to '10px'.
- `data-o-tooltip-append-to-body`: Optional. Append the tooltip to the `body` element so it is positioned and sized according to the body rather than a parent element. By default the tooltip is appended as a sibling of the tooltip target. Defaults to `false`.

### JavaScript

No code will run automatically unless you are using the Build Service.
You must either construct an `o-tooltip` object or fire an `o.DOMContentLoaded` event, which oTooltip listens for.

#### Constructing an o-tooltip
If you have setup your tooltip declaratively, the following applies:
```js
import Tooltip from 'o-tooltip';
const tooltipEl = Document.getElementById('my-tooltip-element');
const tooltip = new Tooltip(tooltipEl);
```

Alternatively, if you want to construct a tooltip imperatively, you can instantiate o-tooltip by passing in your target element and an options object.

```js
import Tooltip from 'o-tooltip';
const tooltipEl = document.querySelector('.imperative-tooltip-element');
const opts = {
	target: 'tooltip-target-imperative',
	content: 'Click to save to somewhere',
	showOnConstruction: true,
	position: 'right'
}

const tooltip = new Tooltip(tooltipEl, opts);
```

Since this creates the tooltip from scratch, it is important to include any declarative attributes (as listed above) in the options object, in addition to:

- `content`: Required. String. This is the content that will be displayed in the tooltip.

#### Create tooltip directly in the body

There are situations when a tooltip cannot be displayed next to an element (i.e: the parent of the element has `overlow: hidden`). For these type of situations the tooltip can be instantiated using the `appendToBody` configuration property, which will force the tooltip element to be created just before `body` tag closing.

```js
import Tooltip from 'o-tooltip';
const tooltipEl = document.querySelector('.imperative-tooltip-element');
const opts = {
	target: 'tooltip-target-imperative',
	content: 'Click to save to somewhere',
	showOnConstruction: true,
	position: 'above',
	appendToBody: true
}
const tooltip = new Tooltip(tooltipEl, opts);
```

*Note! this property can only be used only when constructing the tooltip declaratively*

#### Firing an oDomContentLoaded event

```js
document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Sass

#### Mixin: `oTooltip`

The `oTooltip` mixin is used to output tooltip selectors and styles. This output includes all of the `.o-tooltip` classes:

```scss
@include oTooltip();
```

```css
.o-tooltip {
	/* styles */
}
.o-tooltip-content {
	/* styles */
}
/* etc. */
```

There is [full Sass documentation available in the Origami Registry](https://registry.origami.ft.com/components/o-tooltip/sassdoc).

## Migration Guide

| State | Major Version | Last Minor Release | Migration guide |
| :---: | :---: | :---: | :---: |
| ✨ active | 4 | N/A | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
| ⚠︎ maintained | 3 | 3.5 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
| ╳ deprecated | 2 | 2.3.7 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated | 1 | 1.1.1 | N/A |

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-tooltip/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

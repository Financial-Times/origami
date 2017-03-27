o-tooltip [![Circle CI](https://circleci.com/gh/Financial-Times/o-tooltip/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-tooltip/tree/master)
=================

o-tooltip is a component usually used for annotating or highlighting bits of user interface.

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

## Usage
o-tooltip has Sass and JavaScript to show and hide a tooltip which points at a target.

### Markup

This HTML demonstrates the declarative way to instantiate o-tooltip. If you are using the Build Service or firing your own `o.DOMContentLoaded` event, this is all you need to create a tooltip.

```html
<div class='demo-tooltip-target' id="tooltip-target">
	A bit of UI to annotate
</div>

<div data-o-component="o-tooltip"
  data-o-tooltip-position="below"
  data-o-tooltip-target="demo-tooltip-target"
  data-o-tooltip-show-on-construction=true>
	<div class='o-tooltip-content'>
		Some text to go in the tooltip
	</div>
</div>

```

Attributes can be set declaratively, or passed in on instantiation in an options object. A full list of data attributes:
- `data-o-tooltip-target`: Required. A CSS selector for the target of the tooltip (the thing it points to)
- `data-o-tooltip-position`: Optional. The preferred position of the tooltip relative to the target. Can be one of `above`, `below`, `left`, `right`. If there isn't room to render the tooltip where the option passed in would render it, this value is flipped (above becomes below, left becomes right). Defaults to below.
- `data-o-tooltip-show-on-construction`: Optional. Boolean value. Set to true if you want the tooltip to be rendered immediately after it is constructed. Defaults to false.
- `data-o-tooltip-show-on-hover`: Optional. Boolean value. Set to true if you want to show and hide the tooltip based on the mouseover and mouseout events (respectively) of the target. Defaults to false.
- `data-o-tooltip-show-on-click`: Optional. Boolean value. Set to true if you want to show the tooltip upon clicking the target element. Defaults to false.
- `data-o-tooltip-z-index`: Optional. The z-index for the tooltip.
- `data-o-tooltip-animation-distance`: Optional. String with `px` suffix. Distance away from target to start and end animation. Defaults to '10px'.

### JavaScript

No code will run automatically unless you are using the Build Service.
You must either construct an `o-tooltip` object or fire an `o.DOMContentLoaded` event, which oTooltip listens for.

#### Constructing an o-tooltip

```js
const oTooltip = require('o-tooltip');
let tooltipEl = Document.getElementById('myTooltipEl');
const oTooltip = new oTooltip(tooltipEl, '#targetID');
```

#### Firing an oDomContentLoaded event

```js
document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Sass

As with all Origami components, o-tooltip has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-tooltip-is-silent : false;` in your Sass before you've imported the o-tooltip Sass.

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-tooltip/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

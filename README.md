o-tooltip [![Circle CI](https://circleci.com/gh/Financial-Times/o-tooltip/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-tooltip/tree/master)
=================

o-tooltip is a component usually used for annotating or highlighting bits of user interface.

# TODO // todos here until v1 ships
- Finish README
- Tests
- pa11y demo


_A table of contents to help people find things_

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage
o-tooltip has styles and JavaScript to show and hide a tooltip.

### Markup

This HTML demonstrates the declarative way to instantiate o-tooltip. If you are using the Build Service or firing your own `o.DOMContentLoaded` event, this is all you need to create a tooltip.

```html
TBC

```

A full list of data attributes:

zIndex
arrowPosition
target (not optional)
TBC

### JavaScript

No code will run automatically unless you are using the Build Service.
You must either construct an `o-tooltip` object or fire the `o.DOMContentLoaded` event, which oComponent listens for.

#### Constructing an o-tooltip

```js
const oTooltip = require('o-tooltip');

const oTooltip = new oTooltip();
```

#### Firing an oDomContentLoaded event

```js
document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Sass

As with all Origami components, o-tooltip has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-tooltip-is-silent : false;` in your Sass after you've imported the o-tooltip Sass.


## Migration guide

### Migrating from o-overlay to o-tooltip


---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-tooltip/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

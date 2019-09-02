# o-toggle [![CircleCI](https://circleci.com/gh/Financial-Times/o-toggle.png?style=shield)](https://circleci.com/gh/Financial-Times/o-toggle) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This utility component adds toggle (show/hide) behaviour to a `<button>` or `<a>` tag and a target.

- [Quick start](#quick-start)
- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
- [Contact](#contact)
- [Licence](#licence)


## Quick start

Install the module:

```
bower install --S o-toggle
```

Load the JavaScript:

```js
const oToggle = require('o-toggle');

oToggle.init();
```

Add some markup:

```html
<button data-o-component="o-toggle" data-o-toggle-target=".my-toggle-target">My button</button>
<div class='my-toggle-target'>Some toggleable content</div>
```

## Usage

### JavaScript

An o-toggle object must be constructed for every element you have on your page that uses this module. You can do this for explicitly classed elements like so:

```js
const OToggle = require('o-toggle');
const toggleEl = document.querySelector('.o-toggle');
const toggle = new OToggle(toggleEl, {
        target: '.my-target',
        callback: function(state, event) {
            if (state === 'open') {
                console.log('Target opened');
            } else if (state === 'close') {
                console.log('Target closed');
            }
        }
    });
```

Alternatively, an `o.DOMContentLoaded` event can be dispatched on the document to auto-construct an o-toggle object for each element with a `data-o-component="o-toggle"` attribute:

```js
require('o-toggle');
document.addEventListener("DOMContentLoaded", function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

A second parameter can be passed to the oToggle constructor or to the `.init()` function with a config object that has the following options:

* *target*: HTMLElement or selector of the element that will be toggled
* *callback*: Function or content of a function as _string_ that will be executed every time a toggle happens. It has the following parameters:
    - State. 'open' or 'close'
    - Click event object if it comes from the event handler on the toggle

### Markup

All config options can also be passed as data attributes. These are:

* data-o-toggle-target: Selector of the element that will be toggled
* data-o-toggle-callback: Content of a function as _string_ that will be executed every time a toggle happens

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 7 | N/A | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.2 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-toggle/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

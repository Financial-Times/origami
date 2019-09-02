# o-toggle [![CircleCI](https://circleci.com/gh/Financial-Times/o-toggle.png?style=shield)](https://circleci.com/gh/Financial-Times/o-toggle) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This utility component adds toggle (show/hide) behaviour to a `<button>` or `<a>` tag and a target.

- [Markup](#markup)
- [JavaScript](#javascript)
- [Contact](#contact)
- [Licence](#licence)

## Markup

Add the toggle data attributes to your toggle such as a `<button>`, where the value of `data-o-toggle-target` is the CSS selector for the element you want to show/hide. E.g:

```html
<button data-o-component="o-toggle" data-o-toggle-target="#my-target">My button</button>
<div id='my-target'>Some toggleable content</div>
```

The data attribute `data-o-toggle-callback` may also be set to the content of a function as _string_ that will be executed every time a toggle happens. E.g:

<button data-o-component="o-toggle" data-o-toggle-target="#my-target" data-o-toggle-callback="console.log('toggled!');">
</button>
<div id='my-target'>Some toggleable content</div>

## JavaScript

As with other Origami components, all `o-toggle` instances on the page with the data attribute `data-o-component="o-toggle"` may be constructed with the `o.DOMContentLoaded` event.

```js
import 'o-toggle';
document.addEventListener("DOMContentLoaded", function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

Or by calling the `init` method:
```js
import Toggle from 'o-toggle';
Toggle.init();
```

Toggles may also be constructed individually without `data-o-component="o-toggle"`:

```js
import Toggle from 'o-toggle';
const toggleEl = document.querySelector('.o-toggle');
const toggle = new Toggle(toggleEl, {
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

A second parameter can be passed to the oToggle constructor or to the `.init()` function with a config object that has the following options:

- *target*: HTMLElement or selector of the element that will be toggled
- *callback*: Function or content of a function as _string_ that will be executed every time a toggle happens. It has the following parameters:
    - State. 'open' or 'close'
    - Click event object if it comes from the event handler on the toggle

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

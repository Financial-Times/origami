# o-toggle [![CircleCI](https://circleci.com/gh/Financial-Times/o-toggle.png?style=shield)](https://circleci.com/gh/Financial-Times/o-toggle) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This utility component adds toggle (show/hide) behaviour to a `<button>` or `<a>` tag and a target.

- [Markup](#markup)
- [JavaScript](#javascript)
- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

## Markup

Add the `data-o-component="o-toggle"` and `data-o-toggle-target` to your toggle element (e.g. `<button>`). Where the value of `data-o-toggle-target` is the CSS selector for the element you want to show/hide.

When the toggle is clicked a class `o-toggle--active` is toggled on the target as well as its `aria-hidden` attribute. Use these in your project to style the target according to if the toggle is on or off. Alternatively, add the class `o-toggle-display` (to totally hide the target) or `o-toggle-visibility` (to layout but visually hide the target) when the toggle is not active.

```html
<button data-o-component="o-toggle" data-o-toggle-target="#my-target">My button</button>
<div id='my-target' class="o-toggle o-toggle-display">Some toggleable content</div>
```

The data attribute `data-o-toggle-callback` may also be set to the name of a function as a _string_ that will be executed every time a toggle happens. E.g:

```html
<script>
    window.myToggleCallback = function(state, event) {
        if (state === 'open') {
            console.log('Target opened');
        } else if (state === 'close') {
            console.log('Target closed');
        }
    };
</script>
<button data-o-component="o-toggle" data-o-toggle-target="#my-target" data-o-toggle-callback="myToggleCallback">My button</button>
<div id='my-target' class="o-toggle o-toggle-display">Some toggleable content</div>
```

## Sass

Projects may choose to style active targets themselves using the `o-toggle--active` class or `aria-hidden` attribute. However to use the `o-toggle` helper classes `o-toggle-display` and `o-toggle-visibility` classes (see [Markup](#markup) call the mixin `@include oToggle()`:

```scss
@include oToggle();
```

Alternatively the classes may be included granularly with an `$opts` map:

```scss
@include oToggle($opts: ('display': true));
```
or
```scss
@include oToggle($opts: ('visibility': true));
```

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
✨ active | 2 | N/A | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.2 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-toggle/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

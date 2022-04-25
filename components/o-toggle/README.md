# o-toggle

This utility component adds toggle (show/hide) behaviour to a `<button>` or `<a>` tag and a target.

- [Usage](#usage)
- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-toggle`.

## Markup

Add the `data-o-component="o-toggle"` and `data-o-toggle-target` to your toggle button. Where the value of `data-o-toggle-target` is the CSS selector for the element you want to show/hide. Add the `o-toggle-target` class to your target. The target must directly follow the toggle button.

When the toggle is clicked, the `aria-expanded` attribute is toggled.

```html
<button
	data-o-component="o-toggle"
	data-o-toggle-target-id="my-target"
	type="button"
>
	My button
</button>
<div id="my-target" class="o-toggle">Some toggleable content</div>
```

## Sass

Call the mixin `@include oToggle()`:

```scss
@include oToggle();
```

## JavaScript

As with other Origami components, all `o-toggle` instances on the page with the data attribute `data-o-component="o-toggle"` may be constructed with the `o.DOMContentLoaded` event.

```js
import '@financial-times/o-toggle';
document.addEventListener('DOMContentLoaded', function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

Or by calling the `init` method:

```js
import Toggle from '@financial-times/o-toggle';
Toggle.init();
```

Toggles may also be constructed individually without `data-o-component="o-toggle"`:

```js
import Toggle from '@financial-times/o-toggle';
const toggleEl = document.querySelector('.o-toggle');
const toggle = new Toggle(toggleEl, {
	targetId: 'my-target',
});
```

A second parameter can be passed to the oToggle constructor or to the `.init()` function with a config object that has the following options:

- _targetId_: ID of the element that will be toggled

## Migration guide

|    State     | Major Version | Last Minor Release |                    Migration guide                    |
| :----------: | :-----------: | :----------------: | :---------------------------------------------------: |
|  ✨ active   |       4       |        N/A         | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
| ⚠ maintained |       3       |        3.2         | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
| ╳ deprecated |       2       |        2.1         | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated |       1       |        1.2         |                          N/A                          |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-toggle/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

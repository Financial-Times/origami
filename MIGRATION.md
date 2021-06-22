# Migration guide

## Migrating from v5 to v6

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/docs/tutorials/bower-to-npm/).

## Migrating from v4 to v5

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Polyfills

To support Internet Explorer include the `Element.prototype.classList` and `Array.from` polyfills in your project.

### Updated DOM Attributes

The data attribute `data-o-expander-js` has been replaced with the class `o-expander--initialized`. If your project is styling based on `[data-o-expander-js]`, update your css to use `.o-expander--initialized`.

Expanders with the `shrinkTo` (`data-shrink-to`) option set to a number, to toggle a collapsing list, will now have `aria-hidden` set on collapsed items. No changes should be required.

### Sass

The Sass mixins `oExpanderToggle` and `oExpanderContent` have been removed. Instead use `oExpander` to include all `o-expander` CSS. Classnames are no longer customisable with `oExpander`, update your markup and javascript to use `o-expander` classes instead. If this is not possible consider creating a [Custom Expander](./README.md#custom-expander) instead.

### JavaScript

The following functions are removed or now private, ensure your project doesn't call them:
- `toggleExpander` and `displayState`: use `toggle`, `collapse`, or `expand` methods instead.
- `ariaToggles`
- `configure`
- `emit`
- `hasStateDefined`
- `isRequired`

### Updated Options

The `countSelector` (`data-o-expander-count-selector`) is now `itemSelector` (`data-o-expander-item-selector`). The selector used to be relative to the expander but is now relative to the expander content element. Update the name and content of this option accordingly in your project. E.g. `data-o-expander-count-selector=".o-expander__content > li"` becomes `data-o-expander-item-selector="li"`.

The following options have been removed. Instead use default `o-expander` CSS selectors and styles. If you are unable to, i.e. due to custom styles or markup restrictions, use the new [Expander.createCustom](#./README.md#custom-expander) method to instantiate your expanders.

- `toggleSelector` (`data-o-expander-toggle-selector`)
- `rootClassName` (not set declaratively)
- `contentClassName` (not set declaratively)
- `toggleClassName` (not set declaratively)

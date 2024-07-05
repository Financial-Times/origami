# o-header

Responsive header for FT branded sites. See the [Origami Navigation Service](https://www.ft.com/__origami/service/navigation) to populate `o-header` markup with real navigation data.

- [Usage](#usage)
- [Markup](#markup)
- [JavaScript](#javascript)
- [Sass](#sass)
- [Browser Support](#browser-support)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-header`.

## Markup

As there are variations on the header, and the markup for each is specific and somewhat extensive, we recommend visiting the [component page](https://o2-core.origami.ft.com/?path=/story/components-o-header--header-primary&globals=backgrounds:!undefined) in Storybook to find the markup that is most suited to your product. The demo on the component page does not use real navigation data as it may become out of date. See the [Origami Navigation Service](https://www.ft.com/__origami/service/navigation) to populate `o-header` markup with real navigation data. The Origami Navigation Service is a JSON API which provides navigation structures for use across FT websites.

_There are intentionally no classes to switch between logged in and out as we don't want to do that in the client side. This is left up to the product._

Some elements inside the header require specific data attributes so the JavaScript can add some behaviour correctly. These are:

- data-o-header--no-js: Applied to the root element. This data attribute is removed when the JavaScript initialises
- data-o-header--sticky: Applied to the sticky variation of the header
- data-o-header-mega: Applied to the root `<div>` of the mega menu
- data-o-header-search: Applied to the root `<div>` of the _enhanced_ search row. There are two search rows, one for enhanced, another for core
- data-o-header-drawer: Applied to the root `<div>` of the drawer
- data-o-header-subnav: Applied to the root `div` of the subnav menu
- data-o-header-subnav-wrapper: Applied to the inner wrapper `div` of the subnav menu so the JS can handle the scrolling
- data-o-header-search-state: Optional, may be "open" or "close" to indicate the default visibility of the search bar.

## JavaScript

An o-header object must be constructed for every `<header>` you have on your page that uses this component.

```js
import oHeader from '@financial-times/o-header';
const headerEl = document.querySelector('.o-header');
const header = new oHeader(headerEl);
```

The o-header constructor accepts an optional options object, used to control certain behaviors:

- `searchState`: may be "open" or "close" to determine whether the header's search bar is immediately visible. By default, the search bar is hidden.

```js
import oHeader from '@financial-times/o-header';
const headerEl = document.querySelector('.o-header');
const header = new oHeader(headerEl, {searchBarOpen: true});
```

Alternatively, a `o.DOMContentLoaded` event can be dispatched on the document to auto-construct an o-header object for each element with a `data-o-component="o-header"` attribute:

```js
import '@financial-times/o-header';
document.addEventListener('DOMContentLoaded', function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Events

o-header fires the following events:

- `oHeader.MegaMenuShow`: When a mega menu is shown. The target of the event is the menu itself.
- `oHeader.MegaMenuClose`: When a mega menu is closed. The target of the event is the menu itself.
- `oHeader.Sticky`: When the header changes to or from sticky. The event detail will contain an `isActive` boolean indicated sticky or not. The target of the event is the menu itself.

## Sass

The header is made up of various features (e.g. `nav`, `search`, and `drawer`). To get everything, use the `oHeader()` mixin without arguments. To get only the stuff you need, you can pass in a list of options as the first argument.

The list of options is as follows:

- `top`: Styles for first header row including the logo and buttons for the drawer menu and search bar.
- `nav`: The primary nav, this is the nav that sits directly under the top section of the header.
- `search`: The search bar that appears when a user presses the search icon.
- `anon`: Styles for the row that appears when a user is not logged in.
- `sticky`: Styles that make the header stick to the top of the page when scrolling down.
- `simple`: Styles for the reduced slimmer header for article pages.
- `transparent`: Styles for an "inverse" header with no background colour and white text and logos. For use on dark backgrounds only. Does not support the navigation drawer currently (speak to Origami if you would like to use a drawer with this variant).
- `megamenu`: Styles for the mega-menu that appears when users hover over a nav item.
- `drawer`: Styles for the drawer menu which is used as the primary navigation on small screens.

To output styles for a feature only, excluding base header styles required by all features, pass `false` as the second argument.

E.g. To get all of the CSS needed for the FT homepage you would call:

```scss
@include oHeader(('sticky', 'simple', 'anon', 'search', 'nav', 'megamenu'));
```

## Browser Support

To use `o-header` setup a [core and enhanced experience](https://origami.ft.com/documentation/components/compatibility/#core--enhanced-experiences) within your project. `o-header` depends on the `o--if-js` and `o--if-no-js` classes.

## Migration guide

|    State     | Major Version | Last Minor Release |                     Migration guide                      |
| :----------: | :-----------: | :----------------: | :------------------------------------------------------: |
|  ✨ active   |      13       |        N/A         | [migrate to v13](MIGRATION.md#migrating-from-v12-to-v13) |
| ⚠ maintained |      12       |        N/A         | [migrate to v12](MIGRATION.md#migrating-from-v11-to-v12) |
| ⚠ maintained |      11       |        N/A         | [migrate to v11](MIGRATION.md#migrating-from-v10-to-v11) |
| ╳ deprecated |      10       |        N/A         | [migrate to v10](MIGRATION.md#migrating-from-v9-to-v10)  |
| ╳ deprecated |       9       |        N/A         |  [migrate to v9](MIGRATION.md#migrating-from-v8-to-v9)   |
| ╳ deprecated |       8       |        8.6         |  [migrate to v8](MIGRATION.md#migrating-from-v7-to-v8)   |
| ╳ deprecated |       7       |        7.8         |  [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7)   |
| ╳ deprecated |       6       |        6.14        |  [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6)   |
| ╳ deprecated |       5       |        5.0         |                            -                             |
| ╳ deprecated |       4       |        4.0         |                            -                             |
| ╳ deprecated |       3       |        3.0         |                            -                             |
| ╳ deprecated |       2       |        2.5         |                            -                             |
| ╳ deprecated |       1       |        1.1         |                            -                             |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-header/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

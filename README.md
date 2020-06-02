# o-date

o-date provides javascript utilities for formatting and updating dates in FT style. This component is mainly useful when you want your dates formatted to express relative time.

- [Markup](#markup)
- [JavaScript](#javascript)
- [Server-side](#server-side)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Markup

To provide the best non-JS fallback you should markup your dates as follows:

```html
<time data-o-component="o-date" class="o-date" datetime="{{iso8601String}}">{FT formatted date (including time if appropriate)}</time>
```

## JavaScript

To display dates in the standard relative time format, a `o.DOMContentLoaded` event can be dispatched on the `document` to auto-construct each element with a `data-o-component="o-date"` attribute:

```js
document.addEventListener('DOMContentLoaded', function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

You can also import `o-date` as a component.

```js
import ODate from 'o-date'
```

You can run `ODate.init()` once the DOM has loaded if you don't want to initialise other components at the same time.

Run `ODate.init(el)` on any elements containing dates that are added to the page after DOM load, and if you keep a reference to the returned object you can clean them up with `oDateItem.destroy()` to stop processing.

### o-date#format(date, tpl)

Returns a date formatted as a string

- `date`: A javascript `Date` object or a valid string to pass to the `Date` constructor
- `tpl`: A string specifying what format to output the date in:
  - `'datetime'`: formats the date in the standard FT long format, including the time. E.g. `May 15, 2014 8:10 am`
  - `'date'`: formats the date in the standard FT long format. E.g. `May 15, 2014`
  - Any other string using [widespread conventions](http://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html) for time/date placeholders, which will be replaced with values extracted from the date provided. See `./main.js` for an up to date list of supported formats. To avoid e.g. the `mm` in `common` being replaced with the month prefix with a double backslash `co\\mmon` i.e. *In most cases custom date formats should not be used, in favour of the standard FT date and datetime formats*

### o-date#timeAgo(date)

Returns the relative time since the given date, formatted as a human readable string e.g. `13 minutes ago`.

### o-date#ftTime(date)

Returns relative time or timestamp for a given date, in accordance with FT date formatting conventions.

- `date`: A javascript `Date` object or a valid string to pass to the `Date` constructor

### o-date#asTodayOrYesterdayOrNothing(date)

Returns `'yesterday'`, `'today'` or `''` for a given date. You can request this formatting for `o-date` components by adding `data-o-date-format="today-or-yesterday-or-nothing"`.

- `date`: A javascript `Date` object or a valid string to pass to the `Date` constructor

### o-date#init(el)

Within a given container element, converts dates to ftTime (see above) and periodically updates their values. Within the container all `<time>` elements with `o-date` in `data-o-component` will be updated. If a given `<time>` element contains an element with the class `o-date__printer` the relative time will be output here, otherwise it will replace the contents of the entire `<time>` element. Once the `<time>` element has been formatted by o-date, the attribute `data-o-date-js` is added, enabling conditional styling and/or hiding the date until it is correctly formatted.

- `el`: An `HTMLElement` within which to scan for `o-date` elements. If the element itself is a `<time>` element with `o-date` in `data-o-component`, then o-date will run directly on this element rather than querying for suitable elements within it.

If the `el` is a valid `<time>` element, the resulting o-date instance will be returned; otherwise, an array of created instances will be returned.

### o-date#destroy()

Call on any instances to stop processing date updates and release the item reference.

## Server-side

See the npm package [@financial-times/ft-date-format](https://github.com/Financial-Times/ft-date-format) for server-side date formatting. _Note: It's not recommended to output the 'time ago' server side as it will not be cacheable and will not update in the browser if the user leaves the page open for a prolonged period of time._

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 4 | N/A | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
⚠ maintained | 3 | 3.1 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.9 | - |
╳ deprecated | 1 | 1.2 | - |

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-date/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

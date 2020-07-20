# o-date

o-date formats `time` elements in the FT style, and supports formatting dates in relative time.

- [Markup](#markup)
- [JavaScript](#javascript)
- [Server-side](#server-side)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Markup

To render a human readable date in the FT format create a [time element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element). Add a standard `datetime` attribute in the [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601). Then add the `data-o-component="o-date"` attribute with a class `o-date`.

```html
<time data-o-component="o-date" class="o-date" datetime="2000-06-14T23:00:00.000Z">
</time>
```

_The rendered date will be a relative time or timestamp for a given date, in accordance with FT date formatting conventions E.g. `10 seconds ago`, `a minute ago`, `3 hours ago`, `yesterday`, `July 18 2020`._

### Core Experience

We recommend a human readable date is added to the `time` element to support a [core experience](https://origami.ft.com/docs/components/compatibility/#core--enhanced-experiences) without JavaScript:
```html
<time data-o-component="o-date" class="o-date" datetime="2000-06-14T23:00:00.000Z">
  June 15 2000
</time>
```
_Node.js applications could provide a core experience fallback using the [Financial-Times/ft-date-format](https://github.com/Financial-Times/ft-date-format) library._

### Format Options

Set the `data-o-date-format` attribute to customise how the `time` element is presented:
- `date-only`: only show the date, without relative or time information.
- `time-ago-no-seconds`: always display a relative time but if the relative time is under a minute display "Less than a minute ago" (e.g. `Less than a minute ago`, `10 minutes ago`, `an hour ago`, `4 hours ago`).
- `time-ago-limit-4-hours`: always display a relative time but hide the `time` element if the `datetime` is older than 4 hours (e.g. `4 seconds ago`, `10 minutes ago`, `4 hours ago`).
- `time-ago-abbreviated`: always display a relative time with units abbreviated (e.g. `4s ago`, `10m ago`, `1h ago`).
- `time-ago-abbreviated-limit-4-hours`: hide the `time` element when the `datetime` is older than 4 hours, otherwise render the same as `time-ago-abbreviated`.
- `today-or-yesterday-or-nothing`: display `today` if the `datetime` is today, `yesterday` if it was yesterday, or hide the `time` element if the `datetime` is older than yesterday.
- [custom format](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html): it is recommended to use a standard FT format but a [custom format](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html) may be used e.g. `h:mm a`.

### Copy Options

By default `o-date` will replace the contents of the `time` element with the formatted date. To include extra content alongside the formatted date add an element with the `o-date__printer` class. `o-date` will output the formatted date within the `o-date__printer` element and will not change other child elements.

For example to show a relative time followed by the actual time:

```html
<time data-o-component="o-date" class="o-date" data-o-date-format="time-ago-abbreviated" datetime="2020-07-18T19:01:05.033Z" data-o-date-format="time-ago-abbreviated">
    <span class="o-date__printer">
			<!-- show the abbreviated time ago here -->
			<!-- fallback to the date if o-date JavaScript fails  -->
      20 July 2020
		</span>
		<!-- always include the exact time -->
    <span>14:36</span>
</time>

```

## JavaScript

Instantiate o-date JavaScript in the [same way as other Origami components](https://origami.ft.com/docs/components/initialising/).

For example call the `init` method to initialise all `o-date` instances on the page:
```js
import ODate from 'o-date'
ODate.init();
```

Pass a specific element:
```js
import ODate from 'o-date'
const myDateElement = document.querySelector('#my-date');
ODate.init(myDateElement);
```

Or dispatch the `o.DOMContentLoaded` event to auto-construct all Origami components on the page, including each `o-date` element with a `data-o-component="o-date"` attribute:

```js
document.addEventListener('DOMContentLoaded', function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### o-date#destroy()

Call on any instances to stop processing date updates and release the item reference.

## Server-side

See the npm package [@financial-times/ft-date-format](https://github.com/Financial-Times/ft-date-format) for server-side date formatting. *Note: It's not recommended to output the 'time ago' server side as it will not be cacheable and will not update in the browser if the user leaves the page open for a prolonged period of time.*

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

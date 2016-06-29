# o-date [![Build Status](https://circleci.com/gh/Financial-Times/o-date.png?style=shield&circle-token=bfaf24c9b2d891efa96a820159e5e5780be4514d)](https://circleci.com/gh/Financial-Times/o-date)

o-date provides javascript utilities for formatting and updating dates in FT style. This component is mainly useful when you want your dates formatted to express relative time.

## Browser support

This module has been verified in Internet Explorer 8+, modern desktop browsers (Chrome, Safari, Firefox, ...) and mobile browsers (Android browser, iOS safari, Chrome mobile).

## Core experience

To provide the best non-js fallback you should markup your dates as follows

    <time data-o-component="o-date" class="o-date" datetime="{{iso8601String}}">{FT formatted date (including time if appropriate)}</time>

This module's `format` method will also run in node and can be used to populate your model with the appropriate formatted date string. It's not recommended to output the 'time ago' server side as it will not be cacheable and will not update in the browser if the user leaves the page open for a prolonged period of time.

## Enhanced experience

To display dates in the standard relative time format, a `o.DOMContentLoaded` event can be dispatched on the `document` to auto-construct each element with a `data-o-component="o-date"` attribute:

```javascript
document.addEventListener("DOMContentLoaded", function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

You can also run `require('o-date').init()` once the DOM has loaded if you don't want to initialise other modules at the same time.

Run `require('o-date').init(el)` on any elements containing dates that are added to the page after DOM load.

## API

### o-date#format(date, tpl)

Returns a date formatted as a string

* `date` A javascript `Date` object or a valid string to pass to the `Date` constructor
* `tpl`  A string specifying what format to output the date in:

     - 'datetime': formats the date in the standard FT long format, including the time e.g. May 15, 2014 8:10 am
     - 'date': formats the date in the standard FT long format e.g. May 15, 2014
     - Any other string using [widespread conventions](http://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html) for time/date placeholders, which will be replaced with values extracted from the date provided. See './main.js' for an up to date list of supported formats.
     To avoid e.g. the 'mm' in 'common' being replaced with the month prefix with a double backslash 'co\\mmon' i.e. *In most cases custom date formats should not be used, in favour of the standard FT date and datetime formats'*

### o-date#timeAgo(date)

Returns the relative time since the given date, formatted as a human readable string e.g. '13 minutes ago'.

### o-date#ftTime(date)

Returns relative time or timestamp for a given date, in accordance with FT date formatting conventions.

* `date` A javascript `Date` object or a valid string to pass to the `Date` constructor

### o-date#asTodayOrYesterdayOrNothing(date)

Returns ["yesterday"|"today"|""] for a given date. You can request this formatting for `o-date` components by adding `data-o-date-format="today-or-yesterday-or-nothing"`.

* `date` A javascript `Date` object or a valid string to pass to the `Date` constructor

### o-date#init(el)

Within a given container element, converts dates to ftTime (see above) and periodically updates their values. Within the container all `<time>` elements with `o-date` in `data-o-component` will be updated. If a given `<time>` element contains an element with the class `o-date__printer` the relative time will be output here, otherwise it will replace the contents of the entire `<time>` element. Once the `<time>` element has been formatted by o-date, the attribute `data-o-date-js` is added, enabling conditional styling and/or hiding the date until it is correctly formatted.

* `el` A `HTMLElement` within which to scan for `o-date` elements. If the element itself is a `<time>` element with `o-date` in `data-o-component`, then o-date will run directly on this element rather than querying for suitable elements within it.

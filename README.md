# o-date

o-date provides javascript utilities for formatting and updating dates in FT style

## API

### o-date#format(date, tpl)

Returns a date formatted as a string

* `date` A javascript `Date` object or a valid string to pass to the `Date` constructor
* `tpl`  - 'long': formats the date in the standard FT long format
         - 'short': formats the date in the standard FT short format
         - Any other string: time date placeholders will be replaced with values extracted from the date provided (see `main.js` for valid placeholder strings)

### o-date#timeAgo(date, fallback)

Returns the time since the given date, formatted as a human readable string e.g. '13 minutes ago'. 

* `date` A javascript `Date` object or a valid string to pass to the `Date` constructor
* `fallback` The date format to display once the date is further back in time than the threshold set using `o-date#setTimeAgoThreshold`. Accepts the same strings as `o-date#format tpl`

### o-date#setTimeAgoThreshold(unit) 

Sets the global cutoff between which dates will be displayed as formatted date strings and which will be shown using `o-date#timeAgo`

* `unit` 'years', 'months', 'days', 'hours' or 'minutes': e.g. if set to 'days' then once the time since a given date, when converted to a human readable string, would be measured in days it will revert to displaying a formatted date string

### o-date#initTimeAgo(container, date) 

Within a given container converts dates to use the time ago format and periodically updates their values. Elements that contain dates to be updated are identified by the class `o-date--updater` and should be `<time>` elements using the `datetime` attribute to store a valid datetime string. If an `o-date--updater` element contains an element with the class `o-date__printer` the time ago string will be output here, otherwise it will replac the contents of the element.

* `container` A `HTMLElement` which, if it has the class `o-date--updater`, will have it's contents converted using `o-date#timeAgo`, otherwise any `o-date--updater` elements it contains will be converted

### o-date#autoUpdate() 
Turns on autoupdating of `o-date--updater` elements

### o-date#unautoUpdate() 
Turns off autoupdating of `o-date--updater` elements
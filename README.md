# o-date

o-date provides javascript utilities for formatting and updating dates in FT style

## API

### o-date#format(date, tpl)

Returns a date formatted as a string

* `date` A javascript `Date` object or a valid string to pass to the `Date` constructor
* `tpl`  - 'full': formats the date in the standard FT long format, including the time
         - 'date': formats the date in the standard FT long format
         - 'shortDate': formats the date in the standard FT short format
         - Any other string: time date placeholders will be replaced with values extracted from the date provided (see `main.js` for valid placeholder strings)

### o-date#timeAgo(date)

Returns the time since the given date, formatted as a human readable string e.g. '13 minutes ago'. 

* `date` A javascript `Date` object or a valid string to pass to the `Date` constructor

### o-date#init(el, self) 

Within a given container element converts dates to display using the time ago format and periodically updates their values. Within the container all elements with the class `o-date` and all `<time>` elements will be updated, with the exception of those with the class `o-date--ignore`. If the element contains an element with the class `o-date__printer` the time ago string will be output here, otherwise it will replace the contents of the element.

* `container` A `HTMLElement` within which to scan for `.o-date` and `<time>` elements
* `self` Boolean: if true then `el` itself will have its value updated, rather than querying for suitable elements within it
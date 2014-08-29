# o-table [![Build Status](https://travis-ci.org/Financial-Times/o-table.png?branch=master)](https://travis-ci.org/Financial-Times/o-table)

Styling for tables.

## Browser support
|  Browsers  | Primary Experience | Core Experience |
|:----------:|:------------------:|:---------------:|
|   Chrome   |        35+         |       35+       |
|   Firefox  |        30+         |       30+       |
|   Safari   |        7+          |       7+        |
|   IE       |        9+          |       8+        |

Known issues:

* IE10 or below need the [polyfill service](http://polyfill.webservices.ft.com/)
* IE8 doesn't support the `wrap` function

## Markup

Simply add an `o-table` class to any table you wish to apply the styles to:

```html
<table class="o-table">
    ...
</table>
```

Where a `td` contains numeric data, or a `th` is for cells containing numeric data, also add a `data-type="numeric"` attribute:

```html
<table class="o-table">
    <tr>
        <th>Index</th>
        <th data-type="numeric">Value</th>
    </tr>
    <tr>
        <td>FTSE 100</td>
        <td data-type="numeric">6685.52</td>
    </tr>
    ...
</table>
```

Where table headings (`th`) are used as row headings, ` scope="row"` attributes must be set on the `th`:

```html
<table class="o-table">
    <tr>
        <th scope="row">FTSE 100</th>
        <td data-type="numeric">6685.52</td>
    </tr>
    ...
</table>
```

When they're are not present, browsers will implicitly wrap table contents in `tbody` tags, including the header row. It is therefore advisable (and when row-stripes are required, essential) to use `thead`, `tbody` (and if appropriate, `tfoot`) tags in your markup:

```html
<table class="o-table">
    <thead>
        <tr>
            <th>Index</th>
            <th data-type="numeric">Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>FTSE 100</td>
            <td data-type="numeric">6685.52</td>
        </tr>
        ...
    </tbody>
</table>
```

## Small screen rendering

Where there is not enough horizontal space for a table to fit, it can be made horizontally scrollable by wrapping it in an element with a class of `o-table-wrapper`:

```html
<div class="o-table-wrapper">
    <table class="o-table">
        ...
    </table>
</div>
```

This can also be done using the provided `wrap()` javascript function:

```javascript
var oTable = require('o-table');
oTable.wrap();
```

This function can be passed two arguments:

* target tables selector (default `.o-table`);
* wrapper CSS class (default `o-table-wrapper`);

For example, to wrap only tables within a certain part of the page, you can do this:

```javascript
var oTable = require('o-table');
oTable.wrap('.content-zone .o-table', 'o-table-custom-wrapper');
```

Note that tables matching the selector will not be wrapped, if they already have a parent node that has the wrapper class.

## Silent mode

If using __o-table__ in silent mode, `@extend` the placeholder `%o-table-base` into your own table class:

```sass
  .my-table {
    @extend %o-table-base;
  }
```

## Variant classes and placeholders

Additional classes may be added to the table root element to also apply the following styling options. They can be combined as required.

### Row stripes

Class: `o-table--row-stripes`, SASS placeholder: `%o-table-row-stripes`

A background colour will be set on the whole table, and alternate rows within the `tbody` will have their background colour set to a pink tint.

### Horizontal lines

Class: `o-table--horizontal-lines`, SASS placeholder: `%o-table-horizontal-lines`

Thin lines will be rendered under each `td` element giving the appearance of lines between rows.

### Vertical lines

Class: `o-table--vertical-lines`, SASS placeholder: `%o-table-vertical-lines`

Thin lines will be rendered to the left and right of each `td` element giving the appearance of lines between columns.
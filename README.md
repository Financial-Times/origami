# o-table [![Build Status](https://travis-ci.org/Financial-Times/o-table.png?branch=master)](https://travis-ci.org/Financial-Times/o-table)

___
Styling for tables.
___

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

## Variant classes

Additional classes may be added to the table root element to also apply the following styling options. They can be combined as required.

### Row stripes

Class: `o-table--row-stripes`

A background colour will be set on the whole table, and alternate rows within the `tbody` will have their background colour set to a pink tint.

### Horizontal lines

Class: `o-table--horizontal-lines`

Thin lines will be rendered under each `td` element giving the appearance of lines between rows.

### Vertical lines

Class: `o-table--vertical-lines`

Thin lines will be rendered to the left and right of each `td` element giving the appearance of lines between columns.
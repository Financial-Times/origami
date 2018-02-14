# o-table [![Build Status](https://circleci.com/gh/Financial-Times/o-table.png?style=shield&circle-token=6c1d4241aefb825cb3870d5294e09dd370240c64)](https://circleci.com/gh/Financial-Times/o-table)

Styling for tables.

- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
	- [JavaScript](#javascript)
- [Troubleshooting](#troubleshooting)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

### Markup

Add an `o-table` class to any table you wish to apply the styles to:

```html
<table class="o-table" data-o-component="o-table">
	...
</table>
```

Where a `td` contains numeric data, or a `th` is for cells containing numeric data, also add the class `.o-table__cell--numeric` and a `data-o-table-data-type="numeric"` attribute (the latter allows the column to be sorted correctly):

```html
<table class="o-table" data-o-component="o-table">
	<tr>
		<th>Index</th>
		<th data-o-table-data-type="numeric" class="o-table__cell--numeric">Value</th>
	</tr>
	<tr>
		<td>FTSE 100</td>
		<td data-o-table-data-type="numeric" class="o-table__cell--numeric">6685.52</td>
	</tr>
	...
</table>
```

Where table headings (`th`) are used as row headings, `scope="row"` attributes must be set on the `th`:

```html
<table class="o-table" data-o-component="o-table">
	<tr>
		<th scope="row">FTSE 100</th>
		<td data-o-table-data-type="numeric" class="o-table__cell--numeric">6685.52</td>
	</tr>
	...
</table>
```

When they're are not present, browsers will implicitly wrap table contents in `tbody` tags, including the header row. It is therefore advisable (and when row-stripes are required, essential) to use `thead`, `tbody` (and if appropriate, `tfoot`) tags in your markup:

```html
<table class="o-table" data-o-component="o-table">
	<thead>
		<tr>
			<th>Index</th>
			<th data-o-table-data-type="numeric" class="o-table__cell--numeric">Value</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>FTSE 100</td>
			<td data-o-table-data-type="numeric" class="o-table__cell--numeric">6685.52</td>
		</tr>
		...
	</tbody>
</table>
```

#### Disable sort on one or more columns

Adding `data-o-table-heading-disable-sort` to a table column heading will disable and hide the sort interface on that column heading. This is useful for columns of a table which do not provide sortable data, such as an edit button related to the data in its row.

```html
<table class="o-table" data-o-component="o-table">
	<thead>
		<tr>
			<th>Heading One</th>
			<th>Heading Two</th>
			<!-- do not show the actions column as sortable -->
			<th data-o-table-heading-disable-sort>Actions</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Item One</td>
			<td>Item Two</td>
			<td>
				<a href="#edit">edit</a>
			</td>
		</tr>
	</tbody>
</table>
```

#### Small screen rendering

Where there is not enough horizontal space for a table to fit, it can be made horizontally scrollable by wrapping it in an element with a class of `o-table-wrapper`:

```html
<div class="o-table-wrapper">
	<table class="o-table" data-o-component="o-table">
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

### Sass

#### Silent mode

If using __o-table__ in silent mode, use the mixin `oTableBase' in your table styles:

```sass
.my-table {
	@include oTableBase;
}
```

#### Variant classes and placeholders

Additional classes may be added to the table root element to also apply the following styling options. They can be combined as required.

#### Content styles

Class: `o-table__cell--content-secondary`, Mixin: `oTableCellContentSecondary`

Reduce the size of some text in a cell and display block to start a new line. The class should be applied to a `<span>` or `<div>` element inside of the table cell.

#### Row stripes

Class: `o-table--row-stripes`, Mixin: `oTableRowStripes`

A background colour will be set on the whole table, and alternate rows within the `tbody` will have their background colour set to a pink tint.

#### Horizontal lines

Class: `o-table--horizontal-lines`, Mixin: `oTableHorizontalLines`

Thin lines will be rendered under each `td` element giving the appearance of lines between rows.

#### Vertical lines

Class: `o-table--vertical-lines`, Mixin : `oTableVerticalLines`

Thin lines will be rendered to the left and right of each `td` element giving the appearance of lines between columns.

#### Responsive

There are three responsive options available for displaying data in a table.

##### Flat

Class: `o-table--responsive-flat`, Mixin: `oTableResponsiveFlat`

Using the Responsive Flat version will render the table to change at narrow viewpoints into a row-based table with each row having a duplicate of the table headers on the left side. This uses JavaScript to inject the headers into each row.

Please note that this option will not work in *Core* experience.

##### Scroll

Class: `o-table--responsive-scroll`, Mixin: `oTableResponsiveScroll`

On a narrow viewpoint the Responsive Scroll version will move the headers to the right hand side of the table, and be fixed. This allows the data to be displayed in a column format which would allow the user to swipe left or right going through the data.

##### Overflow

Class: `o-table--responsive-overflow`, Mixin: `oTableResponsiveOverflow`

On a narrow viewpoint, all this does is add an overflow which would allow the user to scroll through the data in a horizontal way. This is identical to the `oTableWrapper` behaviour.

### JavaScript

#### Sorting

Sorting table rows requires the JS part of this component, you can grab this via OBT or the Build Service.

Instantiating an o-table JS component will add click events on the columns to trigger sorting.

If using OBT:

``` js
const OTable = require('o-table');
OTable.init();
```
or
``` js
const OTable = require('o-table');
oTable = new OTable(document.body);
```

Sorting numbers works if the column has been declared as a numeric column via `data-o-table-data-type="numeric" class="o-table__cell--numeric"`.

##### Sorting declaratively
If you are wanting to sort by a custom pattern, you can apply the sorting values to each row as a data attribute:
`data-o-table-order=${sort-position}`. These values can be strings or integers.

``` html
<table class="o-table" data-o-component="o-table">
	<thead>
		<tr>
			<th>Things</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-o-table-order=2>snowman</td>
		</tr>
		<tr>
			<td data-o-table-order=3>42</td>
		</tr>
		<tr>
			<td data-o-table-order=1>pangea</td>
		</tr>
	</tbody>
</table>
```

## Troubleshooting

Known issues:

* IE10 or below need the [polyfill service](https://polyfill.io/)
* IE8 doesn't support the `wrap` function


## Migration guide

### How to upgrade from v4.x.x to v5.x.x?

This major takes the new o-colors and o-typography. Some of the colors and typography have changed slightly from v4 to v5. The font size and line heights of the table data has increased to sit in line with the new typography scale. Some of the colors have changed as there isn't an exact mapping from one color to the other in o-colors.

The `oTableCellContentPrimary` mixin (deprecated in v5) has been removed.
The concrete classes `.primary-data` and `.secondary-data` (deprecated in v5) have been removed.

### How to upgrade from v3.x.x to v4.x.x?

#### Important Changes

- In order to have sorting work correctly, tables need `thead` and `tbody` elements
- The Javascript module now returns an o-table constructor

#### Markup changes

- Wrap the headings in `thead`
- Add `data-o-component="o-table"` to the `table` element of any o-table components which require JS.

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-table/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

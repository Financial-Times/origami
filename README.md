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

#### Basic table

Add an `o-table` class to any table you wish to apply the styles to:

```html
<table class="o-table" data-o-component="o-table">
	...
</table>
```

Where table headings (`th`) are used as row headings, `scope="row"` attributes must be set on the `th`:

```html
<table class="o-table" data-o-component="o-table">
	<tbody>
		<tr>
			<th scope="row" role="rowheader">Item</th>
			<td>Holiday</td>
			<td>Lunch</td>
		</tr>
		<tr>
			<th scope="row" role="rowheader">Cost</th>
			<td>£123.45</td>
			<td>£7</td>
		</tr>
	</tbody>
	...
</table>
```

The table's `caption` element should include a header of the appropriate level and style for the table's context.

```html
<table class="o-table" data-o-component="o-table">
	<caption class="o-table__caption">
		<h2>My Table Caption</h2>
	</caption>
	<thead>
		...
	</thead>
	<tbody>
		...
	</tbody>
	...
</table>
```

The table's footer `tfoot` element may use the helper class `o-table-footnote` to display sources, disclaimers, etc.

```html
<table class="o-table" data-o-component="o-table">
	<tfoot>
		<tr>
			<td colspan=2 class="o-table-footnote">
				Source: The Origami team.
			</td>
		</tr>
	</tfoot>
	<thead>
		...
	</thead>
	<tbody>
		...
	</tbody>
	...
</table>
```

#### Disable sort

Table columns are sortable by default but may be disabled by adding `data-o-table-sortable="false"` to the table.
```html
<table class="o-table" data-o-component="o-table" data-o-table-sortable="false">
</table>
```

Or to disable sort per table column, add `data-o-table-heading-disable-sort` to the column's `th` element.
```html
<table class="o-table" data-o-component="o-table">
	<thead>
		<tr>
			<th>Heading One</th>
			<!-- do not show the actions column as sortable -->
			<th data-o-table-heading-disable-sort>Actions</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Item One</td>
			<td><a href="#edit">edit</a></td>
		</tr>
	</tbody>
</table>
```

#### Responsive options

There are three options for small viewports where the table does not fit.

1. [overflow](https://www.ft.com/__origami/service/build/v2/demos/o-table/responsive-overflow) - Scroll the whole table including headings horizontally. This option also supports an [expander](#expander).
2. [scroll](https://www.ft.com/__origami/service/build/v2/demos/o-table/responsive-scroll) - Flip the table so headings are in the first column and sticky, data is scrollable horizontally.
3. [flat](https://www.ft.com/__origami/service/build/v2/demos/o-table/responsive-flat) - Split each row into an individual item and repeat headings.

To enable these set `data-o-table-responsive` to the type of responsive table desired and add the classes for that type of table. Then wrap the table in `o-table-container`, `o-table-overlay-wrapper`, `o-table-scroll-wrapper`. E.g for an "overflow" table:

```html
<div class="o-table-container">
	<div class="o-table-overlay-wrapper">
		<div class="o-table-scroll-wrapper">
			<table class="o-table o-table--horizontal-lines o-table--responsive-overflow o-table--responsive-flat" data-o-component="o-table" data-o-table-responsive="overflow">
				...
			</table>
		</div>
	</div>
</div>
```

More examples are available in [the registry](https://registry.origami.ft.com/components/o-table).

#### Expander

The "overflow" style of responsive table ([see above](#responsive-options)) supports an expander to hide rows and offer a "show more" / "show fewer" button. To enable this feature set `data-o-table-expanded="false"` to the table. The number of rows to show when the table is not expanded can be configured with `data-o-table-minimum-row-count="20"` _(default: 20)_.

```html
<div class="o-table-container">
	<div class="o-table-overlay-wrapper">
		<div class="o-table-scroll--wrapper">
			<table class="o-table o-table--horizontal-lines o-table--responsive-overflow o-table--responsive-flat"
			data-o-component="o-table"
			data-o-table-responsive="overflow"
			data-o-table-expanded="false"
			data-o-table-minimum-row-count="10">
				...
			</table>
		</div>
	</div>
</div>
```

To add a footnote to an expandable table, for example with disclaimers or sources, add the footnote within the container and link to the table with an id and the `aria-describedby` attribute. If not working on an expandable table, [use the `tfoot` element instead](#basic-table).
```diff
<div class="o-table-container">
	<div class="o-table-overlay-wrapper">
		<div class="o-table-scroll--wrapper">
+			<table aria-describedby="demo-footnote">
				...
			</table>
		</div>
	</div>
+	<div id="demo-footnode" class="o-table-footnote">
+		Source: The Origami team's love of fruit.
+	</div>
</div>
```

#### Additional markup
- `o-table--compact` - Apply to the table for smaller typography and padding.
- `o-table--row-stripes` - Apply to the table for alternating stripes on the table rows.
- `o-table-footnote` - Style a `tfoot` element subtily for sources, disclaimers, etc.
- `o-table__cell--numeric` - Apply to numeric cells to align content to the right.
- `o-table__cell--vertically-center` - Apply to cells which should center vertically.

See more in the registry: [o-table demos](https://registry.origami.ft.com/components/o-table).

### Sass

#### Silent mode

If using `o-table` in silent mode, `@include oTable()` includes styles for all features. Alternatively styles may be included granularly with an `$opts` map.

Include all table features:
```scss
@include oTable();
```

Alternatively include base styles with only selected optional features. E.g. to include only the "overflow" responsive table and styles for table lines:
```scss
@include oTable($opts: (
	'responsive-overflow',
	'lines'
));
```

| Feature             | Description                                             | Brand support                |
|---------------------|---------------------------------------------------------|------------------------------|
| responsive-overflow | See [responsive options](#responsive-options).          | master, internal, whitelabel |
| responsive-flat     | See [responsive options](#responsive-options).          | master, internal, whitelabel |
| responsive-scroll   | See [responsive options](#responsive-options).          | master, internal, whitelabel |
| lines               | Styles for horizontal and vertical lines, plus borders. | master, internal, whitelabel |
| compact             | A table with smaller typography and padding.            | master, internal, whitelabel |
| stripes             | Alternating row stripe styles.                          | master, internal             |
| row-headings        | Row heading styles.                                     | internal                     |

### JavaScript

To manually instantiate `o-table`:

``` js
const OTable = require('o-table');
OTable.init();
```
or
``` js
const OTable = require('o-table');
oTable = new OTable(document.body);
```

This will return an instance of `BasicTable` (default), `OverflowTable`, `FlatTable`, or `ScrollTable` depending on the value of `data-o-table-responsive`. All four table types extend `BaseTable`.

Instantiation will add column sorting to all tables. It will also add scroll controls and, if configured, an [expander](#expander) to any `OverflowTable`. These can be configured with [data attributes](#disable-sort) or imperatively with an options object:

``` js
const OTable = require('o-table');
OTable.init(document.body, {
	sortable: true,
	expanded: true,
	minimumRowCount: 10,
});
```

#### Sorting

All `o-table` instances support sorting. Sorting on non-string values such as numbers works if the column type has been declared. E.g. for a column of numbers add the following to `o-table`:
`data-o-table-data-type="number"`.

Other data types for `data-o-table-data-type` include:

| type     | description                                                                                   | examples                                   |
|----------|-----------------------------------------------------------------------------------------------|--------------------------------------------|
| text     | The default, content is sorted as a stirng.                                                   | "Jane Doe", "John Smith"                   |
| date     | Supports the FT style of date and time, including abbreviation.                               | "Aug 17", "1.30am", "April 20 2014 1.30pm" |
| number   | Any number which may include number formatting and abbreviation.                              | "1,200", "100", "3.2", "1bn", "2tn"        |
| percent  | Any percentage with or without the symbol "%".                                                | "3.3%", "200%", "50%"                      |
| currency | Any currency, which may include number formatting, number abbreviation, and currency symbols. | "$84m", "£36bn", "HK$90bn", "Rp14.595"     |
| numeric  | A column which may be treated as numeric which does not fit a more specific type.             | "101 dalmatians"                           |

It is possible to add sort support for a custom data type. Alternatively, the behaviour of an existing type may be modified.

##### Custom sort (declarative)

If you are wanting to sort by a custom pattern, you can apply the sorting values to each row as a data attribute:
`data-o-table-sort-value=${sort-value}`. These values can be strings or integers.

For example to support a custom date format set `data-o-table-sort-value` to its UNIX Epoch.

``` html
<table class="o-table" data-o-component="o-table">
	<thead>
		<tr>
			<th data-o-table-data-type="date">Custom Date Formats</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-o-table-sort-value="1533081600">Wednesday, 1 August 2018</td>
		</tr>
		<tr>
			<td data-o-table-sort-value="1483228800">Jan 2017</td>
		</tr>
		<tr>
			<td data-o-table-sort-value="723168000">1st December 1992</td>
		</tr>
	</tbody>
</table>
```

Or to provide an arbitrary sort order:
``` html
<table class="o-table" data-o-component="o-table">
	<thead>
		<tr>
			<th>Things</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-o-table-sort-value=2>snowman</td>
		</tr>
		<tr>
			<td data-o-table-sort-value=3>42</td>
		</tr>
		<tr>
			<td data-o-table-sort-value=1>pangea</td>
		</tr>
	</tbody>
</table>
```

##### Custom sort (imperative)

Rather than specify `data-o-table-sort-value` [declaratively](#custom-sort-declarative), a formatter function may be provided client-side to generate sort values for a given data type.

For example we could add support for a custom data type `emoji-time`.

``` html
<table class="o-table" data-o-component="o-table">
	<thead>
		<tr>
			<th data-o-table-data-type="emoji-time">Emoji Time</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>🌑</td>
		</tr>
		<tr>
			<td>🌤️️</td>
		</tr>
		<tr>
			<td>🌑</td>
		</tr>
		<tr>
			<td>🌤️️</td>
		</tr>
	</tbody>
</table>
```

To do that call `setSortFormatterForType` with the custom data type and a formatter function.
The formatter accepts the table cell (HTMLElement) and returns a sort value (Number or String) for that cell.
In this case we add support for our custom type `emoji-time` by assigning the emoji a numerical sort value. This will effect all tables instantiated by `OTable`.

``` js
const OTable = require('o-table');
// Set a filter for custom data type "emoji-time".
// The return value may be a string or number.
OTable.setSortFormatterForType('emoji-time', (cell) => {
	const text = cell.textContent.trim();
	if (text === '🌑') {
		return 1;
	}
	if (text === '🌤️️') {
		return 2;
	}
	return 0;
});
OTable.init();
```

Which for an ascending sort, will result in:

```html
<table class="o-table" data-o-component="o-table">
	<thead>
		<tr>
			<th data-o-table-data-type="emoji-time" aria-sort="ascending">Emoji Time</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-o-table-sort-value=1>🌑</td>
		</tr>
		<tr>
			<td data-o-table-sort-value=1>🌑</td>
		</tr>
		<tr>
			<td data-o-table-sort-value=2>🌤️️</td>
		</tr>
		<tr>
			<td data-o-table-sort-value=2>🌤️️</td>
		</tr>
	</tbody>
</table>
```

#### Events

The following events are fired by `o-table`.

- `oTable.ready`
- `oTable.sorting`
- `oTable.sorted`

##### oTable.ready

`oTable.ready` fires when the table has been initialised.

The event provides the following properties:
- `detail.instance` - The initialised `o-table` instance _(FlatTable | ScrollTable | OverflowTable | BasicTable)_.

##### oTable.sorted

`oTable.sorted` indicates a table has finished sorting. It includes details of the current sort status of the table.

The event provides the following properties:
- `detail.sortOrder` - The sort order e.g. "ascending" _(String)_.
- `detail.columnIndex` - The index of the sorted column heading _(Number)_.
- `detail.instance` - The effected `o-table` instance _(FlatTable | ScrollTable | OverflowTable | BasicTable)_.

```js
document.addEventListener('oTable.sorted', (event) => {
	console.log(`The target table was just sorted by column "${event.detail.columnIndex}" in an "${event.detail.sortOrder}" order.`);
});
```

##### oTable.sorting

This event is fired just before a table sorts based on user interaction. It may be prevented to implement custom sort functionality. This may be useful to sort a paginated table server-side.

The event provides the following properties:
- `detail.sortOrder` - The sort requested e.g. "ascending" _(String)_.
- `detail.columnIndex` - The index of the column heading which will be sorted _(Number)_.
- `detail.instance` - The effected `o-table` instance _(FlatTable | ScrollTable | OverflowTable | BasicTable)_.

When intercepting the default sort the `sorted` method must be called with relevant parameters when the custom sort is completed.

```js
document.addEventListener('oTable.sorting', (event) => {
	// Prevent default sorting.
	event.preventDefault();
	// Update the table with a custom sort.
	console.log(`Update the table with sorted data here.`);
	// Fire the sorted event, passing along the column index and sort.
	event.detail.instance.sorted(event.detail.columnIndex, event.detail.sort);
});
```

##### Get The Sorted Column Heading From A Sort Event

`o-table` sort events provide a `columnIndex`. This index maps to a column heading. To retrieve the column heading use `getTableHeader`.

```js
document.addEventListener('oTable.sorting', (event) => {
	const table = event.detail.instance;
	const columnIndex = event.detail.columnIndex;
	// Get the table header from the column index.
	console.log(table.getTableHeader(columnIndex));
});
```

## Troubleshooting

Known issues:
* IE11 and below need the [polyfill service](https://polyfill.io/)

## Migration guide

### How to upgrade from v6.x.x to v7.x.x?
- To prevent errors in IE11, add support for `IntersectionObserverEntry` and `IntersectionObserver` with the [polyfill service](https://polyfill.io/).
- Data attribute `data-o-table-order` has been removed. To specify a custom sort order on `td` cells use `data-o-table-sort-value` instead.
- Markup updates:
	- Previous `o-table` demos omitted `thead` and `tbody` from `table`, including their child `tr` element. Ensure your table markup is correct and includes `thead` and `tbody`.
	- `o-table__caption--top` and `o-table__caption--bottom` have been removed. Remove these classes and add a heading within the caption (e.g. a `<h2>`) with appropriate styling.
	- `o-table-wrapper` is now `o-table-scroll-wrapper`
	- Responsive tables are now wrapped in a container div `o-table-container` and overlay div `o-table-overlay-wrapper`.
	- Responsive tables should now have their type specified via a data attribute e.g. `data-o-table-responsive="overflow"`.
```diff
+<div class="o-table-container">
+    <div class="o-table-overlay-wrapper">
+     	<div class="o-table-scroll-wrapper">
-    	<div class="o-table-wrapper">
-        	<table data-o-component="o-table" class="o-table--responsive-overflow">
+        	<table data-o-component="o-table" class="o-table--responsive-overflow" data-o-table-responsive="overflow">
-            	<caption class="o-table__caption o-table__caption--bottom">
+            	<caption class="o-table__caption">
-                	My Table Caption
+                	<h2>My Table Caption</h2>
             	</caption>
             	<!-- thead, tbody -->
        	</table>
    	</div>
+   </div>
+</div>
```
- Style updates:
	- The default bottom margin of `o-table` has been removed. Please apply the margin as needed, depending on the context of the table e.g. within typical body copy:
	```scss
		.o-table {
			margin-bottom: oTypographySpacingSize($units: 4);
		}
	```
- Mixin updates:
	- All `o-table` mixins have been made private except for a new mixin `@include oTable($opts)`. It accepts an feature list `$opts` to include `o-table` styles granularly. Replace previous mixins with one call to the [`oTable` mixin with an optional `$opts` flag](#silent-mode). Please [contact us](#contact) if this does not suit your product.
	- `oTableAll` has been replaced with `oTable`, which does not accept a class name `$classname`. Instead use the default `o-table` class name in your markup. As the mixin now output classes directly, they must not be wrapped in an `.o-table` class manually.
```diff
-.o-table {
-    @include oTableBase;
-    @include oTableResponsiveFlat;
-}
-.o-table-wrapper {
-    @include oTableWrapper;
-}
-.o-table-container {
-    @include oTableContainer;
-}

+ @include oTable($opts: ('responsive-flat'));
```
- JS updates:
	- `OTable` returns an instance of `BasicTable`, `FlatTable`, `ScrollTable`, `OverflowTable` on construction, according to the type of table. All extend from `BaseTable`.
	- Table properties removed or made private: `isResponsive`, `listeners`.
	- Table methods removed or made private:
		- `wrap`: for a responsive table manually wrap the table in a container and wrapper class.
		```html
		<div class="o-table-container">
			<div class="o-table-scroll-wrapper">
				<!-- table -->
			</div>
		</div>
		```
		- `sortRowsByColumn`: arguments are simplified `sortRowsByColumn(columnIndex, sortOrder)` over `sortRowsByColumn(index, sortAscending, isNumericValue, type)`, where `columnIndex` replaces `index` and `sortOrder` is "ascending" or "descending".
		- `removeEventListeners`
		- `dispatch`
- Events:
	- Event detail `detail.oTable` is now `detail.instance`.
	- Event detail `detail.sort` is now `detail.sortOrder`, the value is now "ascending" rather than "ASC", and "descending" rather than "DES".
	- The `oTable.sorting` event target is no longer the `th` of the column being sorted. To find the sorted column use [the event detail](#get-the-sorted-column-heading-from-a-sort-event) instead.
- Colour:
	- All [deprecated colour usecases](https://github.com/Financial-Times/o-table/blob/533811d7f8673a7576a31608df8cd71777ff39d5/src/scss/_deprecated.scss) have been removed, ensure `o-table` colours are not used in your project.

### How to upgrade from v5.x.x to v6.x.x?

- The v6 release updates the dependencies `o-colors` and `o-typography`. Ensure your project  builds successfully and upgrade dependencies if required.

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

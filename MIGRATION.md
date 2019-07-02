## Migration

### Migrating from v6 to v7
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
	- The default bottom margin of `o-table` has been removed. Please apply the margin as needed, depending on the context of the table e.g. [see o-spacing](https://registry.origami.ft.com/components/o-spacing):
	```scss
		.o-table {
			margin-bottom: oSpacingByName('s4');
		}
	```
	If it's not possible or practical to apply a custom margin, add the  `o-table-margin-bottom` class to the table (or table container, if you are using a responsive table).
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

### Migrating from v5 to v6

- The v6 release updates the dependencies `o-colors` and `o-typography`. Ensure your project  builds successfully and upgrade dependencies if required.

### Migrating from v4 to v5

This major takes the new o-colors and o-typography. Some of the colors and typography have changed slightly from v4 to v5. The font size and line heights of the table data has increased to sit in line with the new typography scale. Some of the colors have changed as there isn't an exact mapping from one color to the other in o-colors.

The `oTableCellContentPrimary` mixin (deprecated in v5) has been removed.
The concrete classes `.primary-data` and `.secondary-data` (deprecated in v5) have been removed.

### Migrating from v3 to v4

#### Important Changes

- In order to have sorting work correctly, tables need `thead` and `tbody` elements
- The Javascript module now returns an o-table constructor

#### Markup changes

- Wrap the headings in `thead`
- Add `data-o-component="o-table"` to the `table` element of any o-table components which require JS.

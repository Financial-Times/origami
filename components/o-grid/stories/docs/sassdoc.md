# o-grid Sass Documentation
## Mixins
### oGrid
Output o-grid styles. This mixin outputs all styles by default.
Pass an options argument to include styles granularly, see the
[README](https://registry.origami.ft.com/components/o-grid/readme) for more details.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | ('bleed': true, 'shuffle-selectors': true, 'friendly-selectors': true, 'surface': ('current-layout', 'layout-sizes'), 'rows': ('compact')) | |
#### Examples
##### Example 1
>Output all o-grid styles.</caption>

```caption
@include oGrid();
```
##### Example 2
>Output only basic grid styles.</caption>

```caption
@include oGrid($opts: ());
```
##### Example 3
>Output all o-grid styles except human friendly selectors.</caption>

```caption
@include oGrid($opts: (
	'bleed': true,
	'shuffle-selectors': true,
	'surface': ('current-layout', 'layout-sizes'),
	'rows': ('compact')
));
```
##### Example 4
>Output all o-grid styles except the styles required to surface layouts to o-grid JS.</caption>

```caption
@include oGrid($opts: (
	'bleed': true,
	'shuffle-selectors': true,
	'friendly-selectors': true,
	'surface': (),
	'rows': ('compact')
));
```
### oGridDebugInfo
Output debug information about the currently loaded layouts.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| layouts | Map | - |Map of layouts |
### oGridAddLayout
Add a layout (breakpoint). This can be used to add a new breakpoint to a
project, in addition to the default layouts (S, M, L, XL).



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| layout-name | String | - |Name of the layout (e.g. S) |
| layout-width | Number | - |Layout width in px |
| gutter-width | Number | null |Gutter width in px |
#### Examples
##### Example 1
```scss
@include oGridAddLayout($layout-name: P, $layout-width: 600px);
@include oGridAddLayout($layout-name: XXL, $layout-width: 1600px, $gutter-width: 30px);
```
### oGridRespondTo



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| from | String | - |one of $o-grid-layouts |
| until | String | - |one of $o-grid-layouts |
#### Examples
##### Example 1
```scss
// Turn the color of an element red at medium layout size and up
@include oGridRespondTo(M) {
	element {
		color: red;
	}
}
// Turn the color of an element blue until medium layout
element {
	@include oGridRespondTo($until: M) {
		color: blue;
	}
}
// Turn the color of an element green from small layout until medium layout
element {
	@include oGridRespondTo($from: S, $until: M) {
		color: green;
	}
}
```
### oGridColspan
Base column styles and responsive layout width



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| span | Number,Map | null | |
#### Examples
##### Example 1
Block has column styles

```scss
el { @include oGridColspan(); }
```
##### Example 2
4-column wide block

```scss
el { @include oGridColspan(4); }
```
##### Example 3
Half-width block

```scss
el { @include oGridColspan(1/2); }
```
##### Example 4
Block is full-width by default, 8-column wide on Medium layouts and hidden on Large layouts

```scss
el { @include oGridColspan((default: 12, M: 8, L: hide)); }
```
### oGridContainer
Grid container



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| grid-mode | String | $o-grid-mode | |
| bleed | Boolean | false | |
### oGridRow
Base row styles

### oGridRowCompact
Remove gutters from columns in a row



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| column-selector | string | "[o-grid-colspan |"] - CSS selector for row element |
### oGridResetRow
Remove row styles

### oGridCenter
Center column

### oGridUncenter
Uncenter column

### oGridResetColumn
Remove column styles

### oGridPull
Reorder visually: pull



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| columns | Number | - | |
### oGridPush
Reorder visually: push



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| columns | Number | - | |
### oGridOffset
Offset: add space before a column



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| columns | Number | - | |
### oGridSurfaceCurrentLayout
Surface the layout currently displayed to make it readable in JS.


#### Examples
##### Example 1
```js
// your-app/main.js
// Return the current layout (e.g. default, S, M, L, XL)
import oGrid from 'o-grid';
let currentLayout = oGrid.getCurrentLayout();
console.log(currentLayout);

// Return the current gutter (e.g. 10px, 20px)
import oGrid from 'o-grid';
let currentGutter = oGrid.getCurrentGutter();
console.log(currentGutter);
```
### oGridSurfaceLayoutSizes
Surface the projects layouts (breakpoints) to make it readable in JS.


#### Examples
##### Example 1
```js
// your-app/main.js
// Return the layouts (e.g. {"layouts": {"S": "490px","M": "740px","L": "980px","XL": "1220px"}})
import oGrid from 'o-grid';
let breakpoints = oGrid.getGridBreakpoints();
console.log(breakpoints);
```
## Functions
### oGridGutter (...)
Get the grid gutter at a given layout (breakpoint).



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| layout-name | String,null,Boolean | default |One of $o-grid-layouts breakpoints e.g. S, M, L... |
### oGridGetMaxWidthForLayout (...)
Get the max width of a layout (breakpoint).



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| layout-name | String | - |one of $o-grid-layouts |
| grid-mode | String | $o-grid-mode | |
#### Examples
##### Example 1
```scss
.my-large-container { width: oGridGetMaxWidthForLayout(L); }
```
### oGridColspan (...)
% width of an element in the grid



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| span | Number,String | - |Number of columns the element spans over |
| total-cols | Number | $o-grid-columns |Number of columns in the grid
 |
#### Examples
##### Example 1
```scss
.one-half   { width: oGridColspan(1/2); }      // 50%
.other-half { width: oGridColspan(one-half); } // 50%
.sidebar    { width: oGridColspan(5); }        // 41.66667%
.two-thirds { width: oGridColspan(2/3); }      // 66.66667%
.4-out-of-6 { width: oGridColspan(4, 6); }     // 66.66667%
```
## Variables
### o-grid-is-silent (`Bool`)
Silent mode


### o-grid-mode (`String - one of fluid (default), snappy, fixed`)
Grid mode
- fluid: full width up to the largest layout's width
- snappy: fluid width until the layout defined in $o-grid-start-snappy-mode-at (default: M),
          and then snaps into a larger fixed layout at each breakpoint
- fixed: always fixed-width with the layout defined by $o-grid-fixed-layout (default: L)


### o-grid-fixed-layout (`String - One of $o-grid-layouts`)
Layout to default to when the grid has a fixed width (not fluid)


### o-grid-start-snappy-mode-at (`String`)
When the grid start snapping between fixed-width layouts
in the case where a row has the `o-grid-row--snappy` class


### o-grid-columns (`Number (unitless)`)
Number of columns


### o-grid-min-width (`Number`)
Minimum width, in pixels


### o-grid-layouts (`Map`)
Layouts

Each layout is calculated following a specific column width,
in order to base breakpoints on the structure of the grid itself


### o-grid-gutters (`Map`)
Gutter sizes



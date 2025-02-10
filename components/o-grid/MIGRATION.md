## Migration Guide

### Migrating from v6 to o3-foundation

o-grid is now replaced by [o3-foundation](../o3-foundation/README.md).

One of the major changes in Origami 3 is the removal of Sass, we now use plain CSS for Origami components.

This guide will update to the latest version of o3-foundation (v3). Be sure to
check [o3-foundation's migration guide](../o3-foundation/MIGRATION.md) for any further updates.

Origami 3's grid makes use of [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) to provide responsive layouts. Replace o-grid utility classes with o3-foundation's grid classes and CSS Grid's `grid-column` property:

```html

<div class="o-grid-container">
	<div class="o-grid-row">
		<!-- two divs, spanning a total of 12 columns -->
		<div data-o-grid-colspan="8">A div, 8 columns wide</div>
		<div data-o-grid-colspan="4">Another div, 4 columns wide</div>
	</div>
</div>
```

Replace with:

```html
<div class="o3-grid">
        <!-- two divs, spanning a total of 12 columns -->
        <div style="grid-column: content-start / span 8;">A div, 8 columns wide</div>
        <div style="grid-column: span 4">Another div, 4 columns wide</div>
</div>
```

**Full bleed content**

Use the full bleed named grid lines to span content across whole page:

```html
<div class="o3-grid">
        <!-- two divs, spanning a total of 12 columns -->
        <div style="grid-column: bleed-left / bleed-right;">Header, spans across whole page</div>
</div>
```

#### Mixins

**oGridAddLayout**

There is no replacement in o3-foundation. See [advanced usage of grid](../o3-foundation/README.md#Advanced-usage-of-grid) to customise grid.

**oGridRespondT**

There is no replacement in o3-foundation. Use media queries to style at different breakpoints:

```css
@media screen and (max-width: 768px) {
    .my-element {
        color: blue;
    }
}

```
CSS Custom properties are currently unsupported in media queries, refer to our [grid css](../o3-foundation/src/css/components/grid.css) for breakpoints.

**oGridColSpan**

Style using `grid-column` in examples above. Use media queries to adjust column spans at different breakpoints.

**oGridContainer**

Replaced by `o3-grid` class, see example above for usage.

**oGridCenter and oGridUncenter**

There is no replacement in o3-foundation. Create your own styles where apropriate:

```css
.container-centered {
    margin-left: auto;
    margin-right: auto;
    float: none;
}
```

**oGridPull and oGridPush**

Elements using o3-foundation's grid will automatically reflow at smaller breakpoints. For finer control, make use of CSS Grid's properties and breakpoints:

```css
@media screen and (max-width: 768px) {
    /*Change the ordering of elements using the order property*/
    .my-first-grid-element {
        order: 1;
    }

    .my-second-grid-element {
        order: 0;
    }
}
```

```html
<div class="o3-grid">
  <div class="my-first-grid-element">Content</div>
  <div class="my-second-grid-element">Content</div>
</div>
```

The following mixins have no replacement:

* oGridOffset
* oGridResetColumn
* oGridRow
* oGridRowCompact
* oGridResetRow
* oGridSurfaceLayout
* oGridSurfaceLayoutSizes

#### JavaScript

o3-foundation currently does not provide any replacements for o-grid JavaScript.

#### Variables

The following variables have no replacement in o3-foundation:
 * $o-grid-mode
 * $o-grid-fixed-layout
 * $o-grid-start-snappy-mode-at
 * $o-grid-columns
 * $o-grid-min-width
 * $o-grid-layouts 
 * $o-grid-gutters

### Migrating from v5 to v6

V6 has dropped support for use through Bower.

If you were already using npm, no changes should be required.

If you have been using Bower or the Origami Build Service, follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

### Migrating from v4 to v5

### Sass

IE8 is no longer supported, remove uses of:
- `$o-grid-ie8-rules`
- `oGridTargetIE8`
- `oGridTargetModernBrowsers`

The following Sass mixins and variables have been removed. Replace them with a single call to `oGrid` with the relevant options. See [the README](./README.md) for more details:
- `oGridGenerate`
- `$o-grid-shuffle-selectors`
- `$o-grid-human-friendly-selectors`

```diff
-$o-grid-human-friendly-selectors: true;
-$o-grid-shuffle-selectors: true;
-@include oGridGenerate();
+@include oGrid($opts: (
+	'bleed': true,
+	'shuffle-selectors': true,
+	'friendly-selectors': true,
+	'rows': ('compact')
+));
```

The variable `$o-grid-debug-mode` has also been removed. Include the mixin `oGridDebugInfo` to output debug styles instead.

### JavaScript

- As IE8 is no longer supported and the method `setMinSupportedIeVersion` has been removed.

### Migrating from v3 to v4

#### Important Changes

- Layout sizes have slightly changed (M, L and XL are 10px wider).
- Gutter widths vary between layouts (default: 10px, M and above: 20px)

#### Markup/Sass changes

- Wrap top-level `<div class="o-grid-row">` into `<div class="o-grid-container">`.
- Search `oGridColumn` and replace with `oGridColspan`.
- The mixin `oGridColspan` from v3 outputs a bit more code. Use `oGridColspan($span, $width-only: true)` to only outputs widths. Note that with gzip this should not have any impact.
- `$o-grid-gutter` becomes `$o-grid-gutters` (plural) and now contains a map
- Change all `$o-grid-gutter` to `oGridGutter()`. e.g. `margin-left: $o-grid-gutter` becomes `margin-left: oGridGutter()`
- A few helpers have been removed because they weren't used.

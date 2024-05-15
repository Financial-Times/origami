# Migration Guide

### Migrating from v7 to o3-button

#### Themes

The `b2c` theme no longer exists. There is no direct replacement. If your project still uses this theme, please contact the Origami team for support.

The `ft-live` theme has not yet been implemented in `o3-button` as a brand. If you would like to migrate to `o3-button`, please contact the Origami team for support.

FT Professional is now implemented as a brand, rather than a theme. The theme `professional-inverse` therefore becomes `inverse`.

Brands are now applied using a parent data attribute `data-o3-brand`. Likewise, themes are applied using `data-o3-theme` – this may be placed on the on a parent element or the o3-button component directly.

E.g. An FT Professional brand button, brand and theme inherited from a parent element.

```html
<body data-o3-brand="professional" data-o3-theme="inverse">
	<button class="o3-button o3-button--primary">
		Inverse professional button
	</button>
</body>
```

E.g. A Core brand button, brand and theme inherited from a parent element.

```html
<body data-o3-brand="core" data-o3-theme="inverse">
	<button class="o3-button o3-button--primary">Inverse core button</button>
	<button class="o3-button o3-button--primary">Inverse core button</button>
</body>
```

E.g. A Core brand button, with theme specifically applied only to the button.

```html
<body data-o3-brand="core">
	<button class="o3-button o3-button--primary" data-o3-theme="inverse">
		Inverse core button
	</button>
</body>
```

#### Markup

`o3-button` includes a JSX template for React users. We recommend using JSX templates instead of copy-pasting HTML markup where possible, though both approaches are supported.

See [Storybook for full o3-button JSX documentation](https://o3.origami.ft.com?path=/docs/core-o3-button--jsx-documentation). If you choose not to use the `o3-button` JSX template, ensure you update your HTML following the [oButtons mixin guide](#oButtons).

#### Mixins

##### oButtons

###### Replace `o-buttons-*` classes.

Update your markup to use the `o3-button` JSX template ([o3-button JSX documentation](https://o3.origami.ft.com?path=/docs/core-o3-button--jsx-documentation)). Alternatively, replace `o-buttons` class prefixes with `o3-button` as described below.

If using the FT Professional brand, remove `professional` from modifier classes. FT Professional styles are now using the parent brand data attribute (e.g. `data-o3-brand="professional"`) shared by all new Origami components.

For example, an inverse button for the FT Professional brand becomes:

```diff
-<button class="o-buttons o-buttons--primary o-buttons--professional-inverse">Hello</button>
+<button class="o3-button o3-button--primary" data-o3-theme="inverse">Hello</button>
```

Grouped buttons become:

```diff
-<div class="o-buttons-group">
-    <button class="o-buttons o-buttons--secondary">button one</button>
-    <button class="o-buttons o-buttons--secondary">button two</button>
-    <button class="o-buttons o-buttons--secondary">button three</button>
-</div>
+<div class="o3-button-group">
+    <button class="o3-button o3-button--secondary">button one</button>
+    <button class="o3-button o3-button--secondary">button two</button>
+    <button class="o3-button o3-button--secondary">button three</button>
+</div>
```

Pagination has changed more significantly. To upgrade we recommend using the JSX template provided by `o3-buttons` ([JSX documentation](https://o3.origami.ft.com?path=/docs/core-o3-button--jsx-documentation)). E.g:

```jsx
<ButtonPagination
	previousPager={{label: 'previous', href: '#previous'}}
	nextPager={{label: 'next', href: '#next'}}
	pages={[
		{href: '#1', current: false, number: 1},
		{href: '#2', current: false, number: 2},
		{href: '#3', current: false, number: 3},
		{href: '#4', current: false, number: 4},
		{href: '#5', current: true, number: 5},
		{href: '#6', current: false, number: 6},
		{href: '#7', current: false, number: 7},
		{href: '#8', current: false, number: 8},
		{href: '#9', current: false, number: 9},
		{href: '#10', current: false, number: 10},
	]}
/>
```

Alternatively use our [pagination guidelines](https://origami-for-everyone.ft.com/patterns/pagination/) to reimplement pagination logic using standard `o3-button` markup. As well as `o-buttons` class prefix becoming `o3-button`, pagination now supports small viewports with data attributes `data-o3-button-show-when="wide"` and `data-o3-button-show-when="narrow"` used to hide/show pages on mobile devices.

##### oButtonsAddTheme

There is no direct replacement for `oButtonsAddTheme`. Adding new button themes is uncommon, and potentially counter to a consistent user experience. If your project uses `oButtonsAddTheme` please contact the Origami team for support. We will take one of three actions, in order of preference:

1. Recommend a standard button instead of your custom theme.
1. Add your custom theme to Origami.
1. Consider re-introducing custom theming.

##### oButtonsContent

`oButtonsContent` is used to create buttons with custom markup. Instead use standard `o3-button` markup. This will improve maintainability and help reduce your CSS bundle size. If you are unable to modify your markup, please contact Origami for support.

#### Functions

`oButtonsGetColor`: There is no direct replacement for the `oButtonsGetColor` function. If you need to align colours for other component with button themes please contact the Origami team for support.

#### Variables

`o-buttons-is-silent`: Follow the migration steps above to safely delete this variable. If set to `false` update your markup, as outlined in the [oButtons](#oButtons) mixin guide.

### Migrating from v6 to v7

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

## Migrating from v5 to v6

v6 of o-buttons simplifies the `o-buttons` interface, encourages CSS reuse, and makes custom buttons consistent with default buttons.

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Markup

If using the `o-buttons--b2c` theme class add a class for the button type also `o-buttons--primary`.

```diff
-<button class="o-buttons o-buttons--b2c">B2C theme</button>
+<button class="o-buttons o-buttons--primary o-buttons--b2c">B2C theme</button>
```

Buttons no longer default to the secondary type, the type modifier class `o-buttons--secondary` is required. There is no change required for the primary button:

```diff
<button class="o-buttons o-buttons--primary">Primary</button>
<button class="o-buttons o-buttons--primary o-buttons--inverse">Primary Inverse</button>

-<button class="o-buttons">Secondary</button>
+<button class="o-buttons o-buttons--secondary">Secondary</button>
-<button class="o-buttons o-buttons--inverse">Secondary Inverse</button>
+<button class="o-buttons o-buttons--secondary o-buttons--inverse">Secondary Inverse</button>
```

### Colour Usecases

All deprecated [colour usecases](https://github.com/Financial-Times/o-buttons/blob/v5.15.1/scss/_deprecated.scss#L98) have been removed. If your project needs to match the colour of a button use the `oButtonsGetColor` function instead.

```diff
-color: oColorsGetFor(o-buttons-primary-focus, text);
+color: oButtonsGetColor($state: 'focus', $property: 'text', $type: 'primary');
```

### Mixins

The `oButtons` mixin is now a primary mixin. It can output the CSS classes for all buttons and features. We recommend your project use a single call to `oButtons` with the appropriate options to include the default `o-buttons` CSS classes your project needs. E.g.

```diff
-.my-button {
-	@include oButtons;
-}
-
-.my-inverse-button {
-	@include oButtons($theme: inverse);
-}
+// Outputs styles for secondary buttons with the inverse theme:
+// .o-buttons.o-buttons--secondary
+// .o-buttons.o-buttons--secondary.o-buttons--inverse
+@include oButtons($opts: (
+    'types': ('secondary'),
+    'themes': ('inverse')
+));
```

If your project is unable to modify its markup to use default o-button classes replace `oButtons` with `oButtonsContent` instead. This is not recommended as it's likely to duplicate CSS and increase your bundle size e.g:

```diff
.my-big-button {
-	@include oButtons(big, primary);
+	@include oButtonsContent($opts: (
+        'type': 'primary',
+        'size': 'big',
+	));
}
```

The following mixins have been removed. Replace with a single `oButtons` call with the options you need and update your markup to use default o-buttons classes. Alternatively use `oButtonsContent` if markup changes are not possible:

- `oButtonsSize`
- `oButtonsTheme`
- `oButtonsCustomTheme`
- `oButtonsIcon`
- `oButtonsIconButton`
- `oButtonsGetButtonForIconAndTheme`
- `oButtonsBaseStyles`
- `oButtonsIconBaseStyles`

Replace calls for the following mixins with a single `oButtons` call with the options you need, and update your markup to use default o-buttons classes:

- `oButtonsGroup`
- `oButtonsPagination`

Replace `oButtonsIconButtonLabel` with the o-normalise mixin [oNormaliseVisuallyHidden](https://registry.origami.ft.com/components/o-normalise/sassdoc).

#### Themes

When adding a custom theme using mixins, the theme configuration has changed:

- `accent` is now `color`. This is the main button colour.
- `hover` has been removed. This is likely being used to replicate a primary button more closely and should no longer be needed, as the colour of the hover state is now calculated the same for custom and default buttons.
- `background` becomes `context` (optional). It signifies the background colour behind the button. It defaults to the page background (paper for the master brand, white otherwise).
- `colorizer` is no longer used. It is replaced by by specifying the button types the theme should support.

E.g. a custom theme using o-buttons markup (recommended):

```diff
-.my-button--my-primary-claret-theme {
-    @include oButtonsTheme($theme: (
-        background: "white",
-        accent: oColorsGetPaletteColor('claret-80'),
-        colorizer: 'primary'
-    ));
-}
-.my-button--my-secondary-claret-theme {
-    @include oButtonsTheme($theme: (
-        background: "white",
-        accent: oColorsGetPaletteColor('claret-80'),
-        colorizer: 'secondary'
-    ));
-}
+// outputs css classes:
+// .o-buttons--secondary.o-buttons--my-claret-theme
+// .o-buttons--primary.o-buttons--my-claret-theme
+@include oButtonsAddTheme (
+	$name: 'my-claret-theme',
+	$opts: ('color': 'claret-80'),
+	$types: ('primary', 'secondary')
+);
```

E.g. a custom theme using custom markup (where o-buttons css classes can't be used):

```diff
.my-button--my-claret-theme {
-    @include oButtonsTheme($theme: (
-        background: "white",
-        accent: oColorsGetPaletteColor('claret-80'),
-        colorizer: 'primary'
-    ));
+    @include oButtonsContent($opts: (
+        'type': 'primary',
+        'theme': (color: 'claret-80')
+    ));
}
```

### Functions

The `oButtonsGetColor` function has updated parameters to accept type and theme arguments separately.

```diff
-color: oButtonsGetColor($state: 'hover', $property: 'background', $theme: 'primary-inverse');
+color: oButtonsGetColor($state: 'hover', $property: 'background', $type: 'primary', $theme: 'inverse');
```

### Variables

The following variables are now removed or private and must not be used:

- `o-buttons-class` (class names are no longer customisable, unless using `oButtonsContent`)
- `o-buttons-font-family` (please contact Origami if you would like to customise the o-button font family)
- `o-buttons-font-weight` (please contact Origami if you would like to customise o-button weights)
- `o-buttons-sizes` (use the primary mixin `oButtons` to required sizes)
- `o-buttons-themes` (use the primary mixin `oButtons` to include required themes)
- `o-buttons-icons` (use the primary mixin `oButtons` to include required icons)

## Migrating from v4 to v5

This major includes the new o-colors and updates the themes and sizes of buttons.

**Sizes** have been updated to `default` (`28px` min-height), and `big` (`40px` min-height) to correspond to the new baseline sizing introduced in the new o-typography. `Small` button size has been removed.

The following changes have been made to the **themes**:

- `Standard` is now `Secondary` and the default button style: use `o-buttons` or `o-buttons--secondary` classes
- `Standout` is now `Primary`: use `o-buttons--primary` class
- `Uncolored` is now `Mono`: use `o-buttons--mono` class

Inverse and B2C themes have remained the same.

Removes deprecated classnames:

```diff
-.o-buttons__pagination
+.o-buttons-pagination

-.o-buttons__group
+.o-buttons-group
```

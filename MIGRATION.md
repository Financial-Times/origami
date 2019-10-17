## Migration Guide

### Migrating from v5 to v6

v6 of o-buttons simplifies the `o-buttons` interface, encourages CSS reuse, and makes custom buttons consistent with default buttons.

#### Markup

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
#### Colour Usecases

All deprecated [colour usecases](https://github.com/Financial-Times/o-buttons/blob/v5.15.1/scss/_deprecated.scss#L98) have been removed. If your project needs to match the colour of a button use the `oButtonsGetColor` function instead.

```diff
-color: oColorsGetFor(o-buttons-primary-focus, text);
+color: oButtonsGetColor($state: 'focus', $property: 'text', $type: 'primary');
```

#### Mixins

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

##### Themes

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

#### Functions

The `oButtonsGetColor` function has updated parameters to accept type and theme arguments separately.

```diff
-color: oButtonsGetColor($state: 'hover', $property: 'background', $theme: 'primary-inverse');
+color: oButtonsGetColor($state: 'hover', $property: 'background', $type: 'primary', $theme: 'inverse');
```

#### Variables

The following variables are now removed or private and must not be used:
- `o-buttons-class` (class names are no longer customisable, unless using `oButtonsContent`)
- `o-buttons-font-family` (please contact Origami if you would like to customise the o-button font family)
- `o-buttons-font-weight` (please contact Origami if you would like to customise o-button weights)
- `o-buttons-sizes` (use the primary mixin `oButtons` to required sizes)
- `o-buttons-themes` (use the primary mixin `oButtons` to include required themes)
- `o-buttons-icons` (use the primary mixin `oButtons` to include required icons)

### Migrating from v4 to v5

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

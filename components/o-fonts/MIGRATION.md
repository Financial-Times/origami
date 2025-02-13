## Migration guide

### Migrating from v5 to Origami 3

o-visual-effects is now replaced by [o3-foundation](../o3-foundation/README.md).

One of the major changes in Origami 3 is the removal of Sass, we now use plain CSS for Origami components.

This guide will update to the latest version of o3-foundation (v3). Be sure to
check [o3-foundation's migration guide](../o3-foundation/MIGRATION.md) for any further updates.

#### Including fonts

Fonts are now included when o3-foundation is imported. Usages of o-fonts mixins can be replaced with an import:

```diff
- @import '@financial-times/o-fonts/main';
+ @import '@financial-times/o3-foundation/[your-brand].css

- @include oFonts();
```

o3-foundation introduces [Variable Fonts](https://fonts.google.com/knowledge/introducing_type/introducing_variable_fonts). These fonts have flexible weight, spacing, and italic controls. We have introduced [typography tokens](README.md#Typography) to help keep usage of these properties consistent across the FT.

To use specific fonts weights, use an apropriate typography use case:

```diff
- @import '@financial-times/o-fonts/main';
+ @import '@financial-times/o3-foundation/[your-brand].css

- @include oFonts($opts: (
-	'recommended': true,
-	'metric': (
-		('weight': 'medium', 'style': 'normal')
-	)
- ));
```

```html
<h1 class="o3-type-body-highlight"> <!-- Sets a bolder font weight for body copy -->
  The Financial Times
</h1>
```

#### Font Loading

There is no way to overload the `font-display` property in Origami 3. By default, it remains `swap`. Please remove any usages of `$o-fonts-display`:

```diff
- $o-fonts-display: 'optional';
- @import '@financial-times/o-fonts/main';
+ @import '@financial-times/o3-foundation/[your-brand].css

- @include oFonts();
```

#### Custom font families

There is no replacement for `oFontsDefineCustomFont` in Origami 3. Define custom fonts in your code using plain CSS if needed:

```diff
- @include oFontsDefineCustomFont('MyFont, sans', (
- 	(weight: regular, style: normal),
- 	(weight: bold, style: normal)
- )) {
- 	@font-face {
- 		src: url('MyFont-Thin.woff2') format('woff2'), url('MyFont-Thin.woff') format('woff');
- 		font-family: MyFont;
- 		font-weight: 100;
- 		font-style: normal;
- 	}
- 	@font-face {
- 		src: url('MyFont-Bold.woff2') format('woff2'), url('MyFont-Bold.woff') format('woff');
- 		font-family: MyFont;
- 		font-weight: 700;
- 		font-style: normal;
- 	}
- }

+	@font-face {
+		src: url('MyFont-Thin.woff2') format('woff2'), url('MyFont-Thin.woff') format('woff');
+		font-family: 'MyFont';
+		font-weight: 100;
+		font-style: normal;
+	}
+	@font-face {
+		src: url('MyFont-Bold.woff2') format('woff2'), url('MyFont-Bold.woff') format('woff');
+		font-family: 'MyFont';
+		font-weight: 700;
+		font-style: normal;
+	}
```

#### Mixins

**oFontsGetFontFamilyWithFallbacks**

Replace with CSS custom properties:

```diff
- font-family: oFontsGetFontFamilyWithFallbacks(FinancierDisplayWeb);
+ font-family: var(--o3-font-family-financier-display)
```

**oFontsGetFontFamilyWithoutFallback**

Replace with CSS custom properties:

```diff
- font-family: oFontsGetFontFamilyWithoutFallbacks(FinancierDisplayWeb);
+ font-family: var(--o3-font-family-financier-display)
```

**oFontsVariantExists**

There is no replacement in Origami 3.

**oFontsVariantIncluded**

There is no replacement in Origami 3.

#### Variables

The following variables are not replaced in o3 foundation:

* $o-fonts-path
* $o-fonts-build-service-path
* $o-fonts-self-host-path
* $o-fonts-display
* 

### Migrating from v4 to v5

V5 has dropped support for use through Bower.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

### Migrating from v3 to v4

The Sass variable `$o-fonts-families` is now private. Use `oFonts` options to include fonts granularly and `oFontsDefineCustomFont` to register new fonts. Contact the Origami team if you need this variable for any other reason.

The Sass mixin `oFontsInclude` and deprecated mixin `oFontsIncludeAll` is now private. Replace with a single call to `oFonts` and the correct options.

```diff
-@include oFontsInclude(FinancierDisplayWeb);
-@include oFontsInclude(FinancierDisplayWeb, $weight: bold);
-@include oFontsInclude(MetricWeb);
-@include oFontsInclude(MetricWeb, $weight: semibold);
-@include oFontsInclude(MetricWeb, $weight: medium);
+@include oFonts($opts: (
+	'metric': (
+        ('weight': 'regular', 'style': 'normal'),
+        ('weight': 'semibold', 'style': 'normal'),
+        ('weight': 'medium', 'style': 'normal'),
+    ),
+	'financier-display': (
+        ('weight': 'regular', 'style': 'normal'),
+        ('weight': 'bold', 'style': 'normal'),
+    )
+));
```

The Sass mixin `oFontsSource` and function `oFontsUseAsset` have been removed. If you are unable to include your font with `oFonts` please contact the Origami team.

### Migrating from v2 to v3

v3 removes Benton, Miller, and FinancierTextWeb fonts. Ensure your project does not use these fonts.

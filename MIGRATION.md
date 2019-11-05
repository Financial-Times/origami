## Migration guide

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

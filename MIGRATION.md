# Migration guide

## Migrating from v2 to v3

### JavaScript

Custom classes have been removed, so you'll need to update your code to use the documented `o-banner` classes if you were setting any of these in `options`:

```
bannerClass,
bannerClosedClass,
outerClass,
innerClass,
contentClass,
contentLongClass,
contentShortClass,
actionsClass,
actionClass,
actionSecondaryClass,
buttonClass,
linkClass,
closeButtonClass,
```

In addition `theme` no longer accepts an array. Instead pass a single `theme` ('marketing', 'product') and a `layout` ('small', 'compact').

```diff
-const myBanner = new oBanner({
-    theme: ['small', 'marketing']
-});
+const myBanner = new oBanner({
+    theme: 'marketing',
+    layout: 'small'
+});
```

### Sass

The main sass mixin, `oBanner`, no longer takes a custom class as an argument. Themes have been split into layouts ('small', 'compact') and themes ('marketing', 'product'). These are passed as part of the `$opts` map, as so:

```scss
@include oBanner($opts: (
	'themes': ('small'),
	'layouts': ('compact'),
))
```

The `themes` option used to take a map or the word 'all', but as 'all' is the default, one can get that effect by not specifying anything.

```scss
@include oBanner()
```

All other mixins have been removed, you'll need to update your code to use the documented `o-banner` classes.

#### Colour Usecases

The following colour usecases have been removed. Please contact the Origami team if your project relied on these:
- o-banner
- o-banner-button
- o-banner-button-active
- o-banner-link
- o-banner-close
- o-banner-heading-rule
- o-banner-marketing
- o-banner-marketing-button
- o-banner-marketing-button-active
- o-banner-marketing-link
- o-banner-marketing-close
- o-banner-marketing-heading-rule
- o-banner-product
- o-banner-product-button
- o-banner-product-button-active
- o-banner-product-link
- o-banner-product-close
- o-banner-product-heading-rule


## Migrating from v1 to v2

V2 of o-banner removes and renames several themes. This includes the removal of associated mixins and variables. The removed themes are `marketing-primary` and `marketing-secondary`. This should be replaced with `marketing`. E.g. the following classes should change:

```diff
- <div class="o-banner o-banner--small o-banner--marketing-primary" …
+ <div class="o-banner o-banner--small o-banner--marketing" …
  …
```

```diff
- <div class="o-banner o-banner--small o-banner--marketing-secondary" …
+ <div class="o-banner o-banner--small o-banner--marketing" …
  …
```

As well as this, the default teal theme has been replaced with a white theme. The old default teal theme is now named `product`. E.g. to get the teal banner back:

```diff
- <div class="o-banner" …
+ <div class="o-banner o-banner--product" …
  …
```

# Migration guide

## Migrating from v2 to v3

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

The main sass mixin, `oBanner`, no longer takes a custom class as an argument, and the themes are passed as part of the `$opts` map, as so:

```
oBanner($opts: (
	'themes': ('small')
))
```

The `themes` option used to take a map or the word 'all', but as 'all' is the default, one can get that effect by not specifying anything.

All other mixins have been removed, you'll need to update your code to use the documented `o-banner` classes.

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

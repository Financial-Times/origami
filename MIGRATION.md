## Migration Guide

### Migrating from 3 to 4

The `$o-loading-themes` mixin is now private. If you are a whitelabel brand user and would like to customise the colours of `o-loading`, use the `oLoadingCustomize` mixin instead. See [o-loading Sassdoc](https://registry.origami.ft.com/components/o-loading/sassdoc?brand=whitelabel) for more details.

### Migrating from 2 to 3

V3 changes the internal structure of `o-loading`.

These mixins have been privatised and are no longer meant to be used within a product.
```diff
- oLoadingColor
+ _oLoadingTheme
- oLoadingSize
+ _oLoadingSize
```

In order to output styles, the available mixin is now:
```scss
@include oLoading($opts: (
	'themes': ('dark'),
	'sizes': ('small')
))
```

If you can't use `o-loading` classes, you can add styles to a specific element by using `oLoadingContent`:
```scss
.my-small-dark-loading-spinner {
	@include oLoadingContent($opts: (
		'theme': ('dark'),
		'size': ('small')
	));
}
```

There is also a new size available in `o-loading`, namely `mini`.

### Migrating from 1 to 2

V1 -> V2 introduces the new majors of o-colors. Updating to this new version will mean updating any other components that you have which are using o-colors. There are no other breaking changes in this release.

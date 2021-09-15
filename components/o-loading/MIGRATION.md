## Migration Guide

### Migrating from v4 to v5

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/docs/tutorials/bower-to-npm/).

### Migrating from v3 to v4

The `$o-loading-themes` variable is now private. If you are a whitelabel brand user and would like to customise the colours of `o-loading`, use the `oLoadingCustomize` mixin instead. See [o-loading Sassdoc](https://registry.origami.ft.com/components/o-loading/sassdoc?brand=whitelabel) for more details.

The `$o-loading-sizes` is also now private. If your project uses this to configure which sizes of `o-loading` to output, use the `oLoading` mixin instead, e.g.
```scss
@include oLoading($opts: (
	'themes': ('light'),
	'sizes': ('medium', 'large')
));
```
If your project uses `$o-loading-sizes` for any other reason, e.g. to customise the dimensions of `o-loading`, please contact the Origami team.

Finally the `$o-loading-animation-keyframes` variable is now private and should not be used.

#### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Migrating from v2 to v3

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

### Migrating from v1 to v2

V1 -> V2 introduces the new majors of o-colors. Updating to this new version will mean updating any other components that you have which are using o-colors. There are no other breaking changes in this release.

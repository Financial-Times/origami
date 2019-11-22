# Migration guide

## Migrating from v3 to v4

### Colours and Colour Usecases

All [o-teaser colours and colour usecases](https://github.com/Financial-Times/o-teaser/blob/v3.5.9/src/scss/_color-use-cases.scss) have been renamed to include an o-colors namespace. For example:
- `o-teaser` is now `o-teaser/base`
- `fast-ft` is now `o-teaser/fast-ft`
- `o-teaser-tag` is now `o-teaser/tag`
- `o-teaser-theme-opinion` is now `o-teaser/theme-opinion`
- etc.

```diff
- @include oColorsFor('o-teaser-tag', 'text');
+ color: oColorsByUsecase('o-teaser/tag', 'text');
```

The `commercial-content` colour has been removed. Include [o-labels](https://registry.origami.ft.com/components/o-labels) and use `o-labels/commercial-content` instead.

The deprecated `o-teaser-promoted-prefix` usecase has been removed. Include [o-labels](https://registry.origami.ft.com/components/o-labels) and use the `o-labels/commercial-content` colour instead.

### Markup

Deprecated classes have been removed:
- Replace `o-teaser--big-video` with `o-teaser--has-video`
- Replace `o-teaser__duration` with `o-teaser__tag-suffix`

### Sass

The Sass variables `$o-teaser-themes` and `$o-teaser-elements` are now private and must not be used.

All Sass mixins have been removed except `oTeaser` and `oTeaserHeading`. Instead of `oTeaserTag` use [oEditorialTypographyTag](https://github.com/Financial-Times/o-editorial-typography); instead of other mixins include styles using `oTeaser` and update your markup to use `o-teaser` classes.

The `oTeaser` mixin has also been updated. Its two arguments are now accepted within an options `$opts` map like other Origami components:

```diff
-@include oTeaser($elements: ('default', 'images'), $themes: ('small', 'large', 'video'));
+@include oTeaser($opts:(
+	'elements': ('default', 'images'),
+	'themes': ('small', 'large', 'video')
+));
```

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

## Migrating from v2 to v3

Version 3 uses a new major version of [o-labels](https://github.com/Financial-Times/o-labels/). Make sure your project is [compatible](https://github.com/Financial-Times/o-labels/blob/master/MIGRATION.md#migrating-from-v3-to-v4) with o-labels@4.0.0

## Migrating from v1 to v2

V1 -> V2 introduces the new major of o-colors, o-labels, and o-typography. Updating to this new version will mean updating any other components that you have which are using any of the updated major versions. There are no other breaking changes in this release.

### From `o-card` to `o-teaser`.

In most cases, migrating to `o-teaser` from `o-card` will be possible by simply replacing the `o-card` class prefix to `o-teaser`, i.e. `o-card__heading` becomes `o-teaser__heading`. However, there are some additional updates you will need to do, particularly around images and themes.

Images now require a containing element, with the `o-teaser__image` class on the `<img>` tag itself, see [Images](#images).

The `landscape` and `standout` themes have been removed, teasers are now responsive using `o-grid` and have a larger set of [themes](#themes).

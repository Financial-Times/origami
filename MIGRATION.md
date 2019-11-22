## Migration Guide

### Migrating from v2 to v3

Confirm the `o-teaser-collection__heading--inverse` modifier is used with `o-teaser-collection__heading`. I.e. `o-teaser-collection__heading o-teaser-collection__heading--inverse`. This was optional before.

`oTeaserCollection` has changed, it now outputs all `o-teaser-collection` css by default. See the [README](./README.md) for `oTeaserCollection` options to include css granularly.

#### Renamed Mixins
- `oTeaserCollectionHeading` has been renamed `oTeaserCollectionContentHeading` to indicate it has no top level selector. It now excepts an `$opts` map to include parts of the heading more granularly (such as styles for a child anchor tag). See the README for more details.

#### Removed Mixins

If your project uses these mixins replace with a single call to `oTeaserCollection` instead. See the README for `oTeaserCollection` options.
- oTeaserCollectionAssassination
- oTeaserCollectionStream
- oTeaserCollectionFrontPage
- oTeaserCollectionHeadingInverse
- oTeaserCollectionItems
- oTeaserCollectionItemStretched
- oTeaserCollectionNumbered
- oTeaserCollectionSpecial
- oTeaserCollectionBigStory
- oTeaserCollectionHorizontal
- oTeaserCollectionMidSlice
- oTeaserCollectionTopStandalone


`oTeaserCollectionHeadingLink` has also been removed. If your project is using this mixin to avoid outputting the heading border (divider) use `oTeaserCollectionContentHeading` without the `divider` or `sizes` option. This will output the base heading styles plus the child anchor styles, without the divider.
```diff
.my-heading {
-   // Custom styles replicating the collection heading.
-	@include oTypographySize(3);
-	a {
-		@include oTeaserCollectionHeadingLink;
-	}
+	@include oTeaserCollectionContentHeading($opts: ('anchor': true));
}
```

`oTeaserCollectionHeadingBorderTypography` has been removed. Replace with a call to `oTeaserCollectionContentHeading` without the `anchor` option.
```diff
.my-heading {
-   @include oTeaserCollectionHeadingBorderTypography;
+	@include oTeaserCollectionContentHeading($opts: (
+       'divider': true,
+       'sizes': ('full-width', 'half-width', 'small') // .my-heading--small, etc.
+   ));
}
```

#### Colour Usecases

The `o-teaser-collection-heading` background colour usecase has been removed, use the default o-colors `page` background usecase instead.

#### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Migrating from v1 to v2

- Deprecated classname `.o-teaser-collection--top-top-stories` has now been removed. __Resolution__ Please use `.o-teaser-collection--top-standalone` instead.
- Styles for `.o-teaser-collection--stream .o-teaser__action` have been removed.
- The o-colors and o-typography dependencies have been bumped to the latest major. These will create bower conflicts which should be resolved by updating to the newest release of o-colors and o-typography.

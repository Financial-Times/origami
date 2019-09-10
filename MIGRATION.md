## Migration Guide

### Migrating from v2 to v3

Confirm the `o-teaser-collection__heading--inverse` modifier is used with `o-teaser-collection__heading`. I.e. `o-teaser-collection__heading o-teaser-collection__heading--inverse`. This was optional before.

`oTeaserCollection` has changed, it now outputs all `o-teaser-collection` css by default. See the [README](./README.md) for `oTeaserCollection` options to include css granularly.

Removes the following mixins. If your project uses these mixins replace with a single call to `oTeaserCollection` instead. See the README for `oTeaserCollection` options.
- oTeaserCollectionAssassination
- oTeaserCollectionStream
- oTeaserCollectionFrontPage
- oTeaserCollectionHeadingInverse
- oTeaserCollectionItems
- oTeaserCollectionItemStretched
- oTeaserCollectionNumbered
- oTeaserCollectionSpecial
- oTeaserCollectionAssassination
- oTeaserCollectionBigStory
- oTeaserCollectionHorizontal
- oTeaserCollectionMidSlice
- oTeaserCollectionTopStandalone
- oTeaserCollectionStream
- oTeaserCollectionFrontPage

v3 updates its dependecy on `o-icons`. Confirm your project builds correctly and resolve any conflicts.

### Migrating from v1 to v2

- Deprecated classname `.o-teaser-collection--top-top-stories` has now been removed. __Resolution__ Please use `.o-teaser-collection--top-standalone` instead.
- Styles for `.o-teaser-collection--stream .o-teaser__action` have been removed.
- The o-colors and o-typography dependencies have been bumped to the latest major. These will create bower conflicts which should be resolved by updating to the newest release of o-colors and o-typography.

## Migration Guide

### Migrating from v2 to v3

v3 updates its dependecy on `o-icons`. Confirm your project builds correctly and resolve any conflicts.

### Migrating from v1 to v2

- Deprecated classname `.o-teaser-collection--top-top-stories` has now been removed. __Resolution__ Please use `.o-teaser-collection--top-standalone` instead.
- Styles for `.o-teaser-collection--stream .o-teaser__action` have been removed.
- The o-colors and o-typography dependencies have been bumped to the latest major. These will create bower conflicts which should be resolved by updating to the newest release of o-colors and o-typography.

# Migration Guide

### Migrating from v4 to v5

This major release introduces a new design language and visually breaking changes. This includes mobile optimised typography, icons, and buttons. It also removes peer dependencies from deprecated "o2" components.

To upgrade, replace the following "o2" components with their "o3" equivalent:

- [o-normalise](../o-normalise/MIGRATION.md)
- [o-spacing](../o-spacing/MIGRATION.md)
- [o-colors](../o-colors/MIGRATION.md)
- [o-icons](../o-icons/MIGRATION.md)
- [o-buttons](../o-buttons/MIGRATION.md)
- [o-typography](../o-typography/MIGRATION.md)
- [o-editorial-typography](../o-editorial-typography/MIGRATION.md)
- [o-big-number](../o-big-number/MIGRATION.md)
- [o-quote](../o-quote/MIGRATION.md)
- [o-fonts](../o-fonts/MIGRATION.md)

### Migrating from v3 to v4

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

## Migrating from v2 to v3

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Markup changes

The following CSS classes have been renamed:

- `o-visual-effects-shadow` is now `o-visual-effects-shadow-low`
- `o-visual-effects-shadow--ultralow` is now `o-visual-effects-shadow-ultralow`
- `o-visual-effects-shadow--mid` is now `o-visual-effects-shadow-mid`
- `o-visual-effects-shadow--high` is now `o-visual-effects-shadow-high`

### Sass changes

The following Sass mixin has been renamed:

- `oVisualEffectsShadowsElevation` is now `oVisualEffectsShadowContent`.

The following Sass variables have been renamed:

- `$o-visual-effects-transition-slide` is now `$o-visual-effects-timing-slide`
- `$o-visual-effects-transition-expand` is now `$o-visual-effects-timing-expand`
- `$o-visual-effects-transition-fade` is now `$o-visual-effects-timing-fade`

The Sass o-colors usecase `o-effects-shadows-elevation` has been replaced with the Sass variable `$o-visual-effects-shadow-color`.

## Migrating from v1 to v2

The following changes have been made to the mixins in o-visual-effects:

- `oEffectsBackgroundsPinStripe` removed.
- `oEffectsShadowsElevation` renamed to `oVisualEffectsShadowsElevation`.

# Migration Guide

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

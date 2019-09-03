## Migration Guide

### Migrating from v2 to v3

The following CSS classes have been renamed:
- `o-visual-effects-shadow` is now `o-visual-effects-shadow-low`
- `o-visual-effects-shadow--ultralow` is now `o-visual-effects-shadow-ultralow`
- `o-visual-effects-shadow--mid` is now `o-visual-effects-shadow-mid`
- `o-visual-effects-shadow--high` is now `o-visual-effects-shadow-high`

The following Sass variables have been renamed:
- `$o-visual-effects-transition-slide` is now `$o-visual-effects-timing-slide`
- `$o-visual-effects-transition-expand` is now `$o-visual-effects-timing-expand`
- `$o-visual-effects-transition-fade` is now `$o-visual-effects-timing-fade`

### Migrating from v1 to v2

The following changes have been made to the mixins in o-visual-effects:

- `oEffectsBackgroundsPinStripe` removed.
- `oEffectsShadowsElevation` renamed to `oVisualEffectsShadowsElevation`.

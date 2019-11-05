## Migration Guide

### Migrating from v1 to v2

`o-normalise` now depends on `o-colors`. Ensure your project builds successfully and upgrade `o-colors` if there is a conflict.

#### Primary Mixin

The following mixins have been removed or made private. Replace them with a single call to the `oNormalise` primary mixin, with appropriate options passed as an argument.

- `oNormaliseHTML`: set the 'body' option with 'font-smoothing', 'box-sizing', and 'focus' features.
- `oNormaliseLinks`: add 'links' to the 'elements' option.
- `oNormaliseText`: add 'text' to the 'elements' option.
- `oNormaliseImages`: add 'images' to the 'elements' option.
- `oNormaliseForms`: add 'forms' to the 'elements' option.

E.g.
```diff
- @include oNormaliseHTML();
- @include oNormaliseForms();
+ @include oNormalise((
+     'elements': ('forms'),
+     'body': ('font-smoothing', 'box-sizing', 'focus', 'reduce-motion')
+ ));
```

#### Reduced Motion

v2 introduces a `reduce-motion` option which removes transition duration, animation duration, and animation iteration on all elements for users who have a "prefers reduced motion option" set. Confirm your project functions as expected with the [prefers reduced motion setting on in your browser](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). If not remove the o-normalise `reduce-motion` option from your project in favour of a [custom solution](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) to reduced motion, or consider using `!important` to override `o-normalise`.

#### Removed Variables

- `$o-normalise-focus-color` has been removed. Use the [o-colors focus usecase](https://github.com/Financial-Times/o-colors) instead.
- `$o-normalise-grid-gutters` has been removed. Use [$o-grid-gutters](https://github.com/Financial-Times/o-grid#variables) instead.
- `$o-normalise-border-radius` has been removed. It was set to `0` so the border radius may be removed instead.

## Migration Guide

### Migrating from v1 to v2

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
+     'body': ('font-smoothing', 'box-sizing', 'focus')
+ ));
```

#### Renamed Mixins

The following mixins have been renamed to indicate they do not output a top level css selector:
- `oNormaliseClearfix` becomes `oNormaliseClearfixContent`.
- `oNormaliseVisuallyHidden` becomes `oNormaliseVisuallyHiddenContent`.
- `oNormaliseBoxSizing` becomes `oNormaliseBoxSizingContent`.

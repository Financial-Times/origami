
# Migration

## Migrating from v2 to v3

### ES Modules

v5 uses [ES Modules over CommonJS](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) syntax. We recommend to include `o-overlay` using the es modules syntax.

```diff
-const Overlay = require('o-overlay');
+import Overlay from 'o-overlay';
```

However to use the CommonJS syntax, without a plugin like [babel-plugin-transform-es2015-modules-commonjs](https://babeljs.io/docs/en/babel-plugin-transform-es2015-modules-commonjs), add `.default` to access `o-overlay` methods.

```diff
-const Overlay = require('o-overlay');
+const Overlay = require('o-overlay').default;
```

## Migrating from v1 to v2

- Arrows functionality has now been removed. __Resolution__ If you need an overlay with an arrow, please use [o-tooltip](http://github.com/financial-times/o-tooltip).
- A dependency on [o-icons](http://github.com/financial-times/o-icons) v4 or v5 has been introduced. This will break any builds that use o-icons <v3. __Resolution__: Ideally you should upgrade to o-icons v5, but if you still need to use the old icon set (in v4) then upgrading to o-icons v4 will also work.
- A dependency on [o-visual-effects](http://github.com/financial-times/o-visual-effects) v1 has been introduced. This will break any builds that use o-visual-effects <v1. __Resolution__: Update to v1 of o-visual-effects.
- A dependency on [o-normalise](http://github.com/financial-times/o-normalise) v1 has been introduced. This is not likely to introduce any conflicts as it is only v1.
- The mixin oOverlayCompactCloseIcon (deprecated in v1.3.0) has been removed. __Resolution__ Use the `@oOverlayCloseIcon` mixin.
- All extends (deprecated in v1.2.0) have been removed. __Resolution__: Use the mixins instead.
- The o-colors and o-visual-effects dependencies have been bumped to the latest major. These will create bower conflicts which should be resolved by updating to the newest release of o-colors and o-visual-effects.

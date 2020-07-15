
# Migration

## Migrating from v2 to v3

The method `whitelistProps` has been renamed to `filterProperties`.


```diff
-Tracking.prototype.utils.whitelistProps
+Tracking.prototype.utils.filterProperties
```

## Migrating from v1 to v2

o-tracking v2 has dropped support for ftdomdelegate v3, please ensure your project is not using ftdomdelegate v3 and can work with ftdomdelegate v4.

v2 also uses [ES Modules over CommonJS](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) syntax. We recommend to include `o-tracking` using the es modules syntax.

```diff
-const oTracking = require('o-tracking');
+import oTracking from 'o-tracking';
```

However to use the CommonJS syntax, without a plugin like [babel-plugin-transform-es2015-modules-commonjs](https://babeljs.io/docs/en/babel-plugin-transform-es2015-modules-commonjs), add `.default` to access `o-tracking` methods.

```diff
-const oTracking = require('o-tracking');
+const oTracking = require('o-tracking').default;
```

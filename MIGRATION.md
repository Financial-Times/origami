
# Migration

## Migrating from v2 to v3

The `Tracking.prototype.utils` object has been removed.

The methods `setDomain` and `getDomain` have been removed, o-tracking only works with the spoor domain, which is set automatically.

The `api_key` configuration settings has been removed, it is no longer required as it is not used by Spoor or o-tracking in anyway.

The deprecated `user.passport_id` data property has been removed.

`tracking.link` has been removed, it's replacement is `tracking.click`.
```diff
-tracking.link.init();
+tracking.click.init();
```

`tracking.developer` has been removed, it has been replaced by the configuration parameter `test`. Set `test` to `true` to turn send events in test mode.
```diff
-tracking.developer(true);
+tracking.init({
    test: true
});
```

The export interface now only has a single default export. All the named exports have been removed.

```diff
- import { tracking, link, init, page, event, updateConfig } from 'o-tracking';
+ import tracking from 'o-tracking';
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

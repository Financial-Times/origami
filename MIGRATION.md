
# Migration

## Migrating from v2 to v3

o-tracking now uses the Beacon API in all browsers which support it. In v2 this was an opt-in feature, now it is always enabled in browsers which support it. For browsers which do not support Beacon API o-tracking will revert to the XMLHTTPRequest API.

The `Tracking.prototype.utils` object has been removed.

The methods `setDomain` and `getDomain` have been removed, o-tracking only works with the spoor domain, which is set automatically.

The `api_key` configuration settings has been removed, it is no longer required as it is not used by Spoor or o-tracking in anyway.

The deprecated `user.passport_id` data property has been removed.

`tracking.link` has been removed, it's replacement is `tracking.click`.
```diff
-tracking.link.init();
+tracking.click.init();
```

The `tracking.developer` function has been removed, it has been replaced by a configuration parameter named `test`. Set the `test` configuration parameter to `true` to have similar behavior to the old `developer` mode.
```diff
-tracking.developer(true);
+tracking.init({
+    test: true
+});
```


The configuration parameter `no_send` has been removed, it has been replaced by a configuration parameter named `test`. The events will be sent but will be marked as test events, which Spoor will ignore.
```diff
-tracking.init({
-	no_send: true
-});
+tracking.init({
+    test: true
+});
The export interface now only has a single default export. All the named exports have been removed.

```diff
- import { tracking, link, init, page, event, updateConfig } from 'o-tracking';
+ import tracking from 'o-tracking';
```


Using cookies as a storage mechanism for queuing up events to send to Spoor has been removed. The only available storage mechanism is localStorage. o-tracking v3 will read already existing queued events in a cookie and transfer them to localStorage. The reason to remove the cookie based storage machanism is because we were getting users who had their cookie size become too large and it was effecting the performance of the website (cookies were getting to be 5kb in size).

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

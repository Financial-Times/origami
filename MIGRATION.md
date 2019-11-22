
# Migration

## Migrating from v4 to v5

### Updated dependencies

The dependencies for this component have all been updated to the latest major versions.
If you have any conflicts while installing this version, you'll need to first update
its dependencies. See [the Bower config for these](./bower.json).

### Markup

Button tabs no longer have a default theme. Add the CSS class `o-tabs--secondary` to your markup where `o-tabs o-tabs--buttontabs` has been used alone without a theme

### Mixins

- The `oTabs` mixin now includes all styles required for unstyled tabs and button tabs. See the [Sass documentation](README.md#sass) for information on the new parameters
- The `oTabsButtonTabs` mixin has been removed. These styles are included when you call the `oTabs` mixin
- The `oTabsButtonTabsTheme` mixin has been removed. You can include new themes in the `oTabs` mixin

### ES Modules

v5 uses [ES Modules over CommonJS](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) syntax. We recommend to include `o-tabs` using the es modules syntax.

```diff
-const Tabs = require('o-tabs');
+import Tabs from 'o-tabs';
```

However to use the CommonJS syntax, without a plugin like [babel-plugin-transform-es2015-modules-commonjs](https://babeljs.io/docs/en/babel-plugin-transform-es2015-modules-commonjs), add `.default` to access `o-tabs` methods.

```diff
-const Tabs = require('o-tabs');
+const Tabs = require('o-tabs').default;
```

## Migrating from v3 to v4

This major includes the new o-colors and o-buttons, and updates the themes and sizes of button tabs.

The following changes have been made to the **themes**:

- `Standout` is now `Primary`: use `oTabsButtonTabsTheme('primary')`
- `Uncolored` is now `Mono`: use `oTabsButtonTabsTheme('mono')`

As well as this, the JavaScript for o-tabs now relies on `String.prototype.trim`. This is present in modern browsers and can be polyfilled in others.

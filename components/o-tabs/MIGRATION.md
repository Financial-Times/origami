# Migration

## Migrating from v6 to v7

The html for o-tabs was changed to bring support for assistive technologies.

The component no longer uses `ul` and `li` elements and instead uses `div` and `a` elements.

```diff
-<ul data-o-component="o-tabs" class="o-tabs" role="tablist" data-o-tabs-update-url>
+<div data-o-component="o-tabs" class="o-tabs" role="tablist" data-o-tabs-update-url>
-	<li role="tab"><a href="#tabContent1">Tab 1</a></li>
+	<a role="tab" aria-controls="tabContent1" href="#tabContent1">Tab 1</a>
-	<li role="tab"><a href="#tabContent2">Tab 2</a></li>
+	<a role="tab" aria-controls="tabContent2" href="#tabContent2">Tab 2</a>
-	<li role="tab"><a href="#tabContent3">Tab 3</a></li>
+	<a role="tab" aria-controls="tabContent3" href="#tabContent3">Tab 3</a>
-</ul>
+</div>
```

E.G.

This is the old html:
```html
<ul data-o-component="o-tabs" class="o-tabs" role="tablist" data-o-tabs-update-url>
	<li role="tab"><a href="#tabContent1">Tab 1</a></li>
	<li role="tab"><a href="#tabContent2">Tab 2</a></li>
	<li role="tab"><a href="#tabContent3">Tab 3</a></li>
</ul>
```

And this is the new html:
```html
<div data-o-component="o-tabs" class="o-tabs" role="tablist" data-o-tabs-update-url>
	<a role="tab" href="#tabContent1">Tab 1</a>
	<a role="tab" href="#tabContent2">Tab 2</a>
	<a role="tab" href="#tabContent3">Tab 3</a>
</div>
```

## Migrating from v5 to v6

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

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

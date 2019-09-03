
# Migration

## Migrating from v4 to v5

- The `oTabs` mixin now includes all styles required for unstyled tabs and button tabs. See the [Sass documentation](README.md#sass) for information on the new parameters
- The `oTabsButtonTabs` mixin has been removed. These styles are included when you call the `oTabs` mixin
- The `oTabsButtonTabsTheme` mixin has been removed. You can include new themes in the `oTabs` mixin

## Migrating from v3 to v4

This major includes the new o-colors and o-buttons, and updates the themes and sizes of button tabs.

The following changes have been made to the **themes**:

- `Standout` is now `Primary`: use `oTabsButtonTabsTheme('primary')`
- `Uncolored` is now `Mono`: use `oTabsButtonTabsTheme('mono')`

As well as this, the JavaScript for o-tabs now relies on `String.prototype.trim`. This is present in modern browsers and can be polyfilled in others.

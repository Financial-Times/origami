
# Migration

## Migrating from v3 to v4

This major includes the new o-colors and o-buttons, and updates the themes and sizes of button tabs.

The following changes have been made to the **themes**:

- `Standout` is now `Primary`: use `oTabsButtonTabsTheme('primary')`
- `Uncolored` is now `Mono`: use `oTabsButtonTabsTheme('mono')`

As well as this, the JavaScript for o-tabs now relies on `String.prototype.trim`. This is present in modern browsers and can be polyfilled in others.

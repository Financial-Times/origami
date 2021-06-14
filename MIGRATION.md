## Migration

### Migrating from v3 to v4

V4 has dropped support for use through Bower. When using Sass, you will need to add `node_modules` to your `includePath` as well as either:
- Update your code to use the fully qualified package name, i.e.: `@import "@financial-times/o-brand/main"`, or
- Also `node_modules/@financial-times` to the Sass include path

### Migrating from v2 to v3

Deprecated features have been removed:
- `oBrandConfigureFor` (use `oBrandGet` with a `$from` argument).
- `oBrandOverride` (use `oBrandGet` with a `$from` argument).
- `$configure-for` argument of `oBrandGet`, use `$from` instead.
- `$override-config` argument of `oBrandGet`. Instead use your variable value directly or create a new brand variant using `oBrandDefine`.
- The `settings` brand configuration map has been replaced with a `supports-variants` list.

### Migrating from v1 to v2

The `oBrandGet` function has changed. The `$component` argument can be omitted when used with `oBrandConfigureFor` or `oBrandOverride`, and the `$force-variant` argument renamed `$configure-for`.


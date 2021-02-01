## Migration

### Migrating from v3 to v4

V4 has been updated to meet v2 of the Origami component specification, dropping support for Bower. Therefore this version of `o-brand` is only compatible with other Origami components which follow v2 of the component specification. To use `o-brand` ensure your component is following [v2 of the origami component specification](https://origami.ft.com/spec/v2/), including:
- Add `@financial-times/o-brand` as a peer dependency in `package.json`
- Rewrite your Sass `import` to use the full npm package name `@import '@financial-times/o-brand';`.

### Migrating from v2 to v3

Deprecated features have been removed:
- `oBrandConfigureFor` (use `oBrandGet` with a `$from` argument).
- `oBrandOverride` (use `oBrandGet` with a `$from` argument).
- `$configure-for` argument of `oBrandGet`, use `$from` instead.
- `$override-config` argument of `oBrandGet`. Instead use your variable value directly or create a new brand variant using `oBrandDefine`.
- The `settings` brand configuration map has been replaced with a `supports-variants` list.

### Migrating from v1 to v2

The `oBrandGet` function has changed. The `$component` argument can be omitted when used with `oBrandConfigureFor` or `oBrandOverride`, and the `$force-variant` argument renamed `$configure-for`.



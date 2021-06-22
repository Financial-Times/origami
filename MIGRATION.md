# Migration

## Migrating from v2 to v3

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/docs/tutorials/bower-to-npm/).

## Migrating from v1 to v2

If your project uses a meter of a custom colour, rename the CSS variables:
- `--o-meter-high-color` to `--o-meter-sub-optimum-color`
- `--o-meter-low-color` to `--o-meter-less-than-sub-optimum-color`

# Migration guide

## Migrating from v2 to v3

## Migrating from v1 to v2

- v2 brings in the new majors of `o-colors` and `o-typography` and introduces a new dependency on `o-icons`. Some of these components may result in bower conflicts if you're using other Origami components which require different versions. The solution to this is to update your other dependencies.
- v2 deletes the extends that were deprecated in v1. If you were using the extends, then you should update your code to the mixins.

## Migration

### Migrating from v2 to v3

V3 drops support for Bower and version 2 of the Origami Build Service.

If you were already using npm, no changes should be required.

If you have been using Bower or the Origami Build Service, follow [the migration guide on the Origami website](https://origami.ft.com/docs/tutorials/bower-to-npm/).

### Migrating from v1 to v2
v1 was released with Sass mixins and functions which do not conform to the Origami specification. v2 was released shortly after the release of v1 to correct these:
- `oSpaceByName` becomes `oSpacingByName`.
- `oSpaceByIncrement` becomes `oSpacingByIncrement`.
- `getBaselineValue` becomes `oSpacingGetBaselineValue`.

# Migration Guide

## Migrating from v2 to v3

This major release introduces a new design language and visually breaking changes. This includes mobile optimised typography, icons, and buttons. It also removes peer dependencies from deprecated "o2" components.

To upgrade, replace the following "o2" components with their "o3" equivalent:

- [o-normalise](../o-normalise/MIGRATION.md)
- [o-spacing](../o-spacing/MIGRATION.md)
- [o-colors](../o-colors/MIGRATION.md)
- [o-icons](../o-icons/MIGRATION.md)
- [o-buttons](../o-buttons/MIGRATION.md)
- [o-typography](../o-typography/MIGRATION.md)
- [o-editorial-typography](../o-editorial-typography/MIGRATION.md)
- [o-big-number](../o-big-number/MIGRATION.md)
- [o-quote](../o-quote/MIGRATION.md)
- [o-fonts](../o-fonts/MIGRATION.md)

## Migrating from v2 to v3

`o-editorial-layout` no longer applies typography styles. It has a more focused responsibility to layout typography and adjacent elements.

To upgrade use `o3-editorial-typography` to apply typography styles.

1. Search for any `oEditorialLayout` mixin use and identify the selector it applies to.
2. Then update your markup to use an `o3-editorial-typography` component.

css:

```diff
.my-heading {
    @include oEditorialLayoutHeading($level: 2);
}
```

html

```diff
-<h2 class="my-heading">Editorial Heading</h2>
+<h2 class="my-heading o3-editorial-typography-subheading">
+  Editorial Heading
+</h2>
```

## Migrating from v1 to v2

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

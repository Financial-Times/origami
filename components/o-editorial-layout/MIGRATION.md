# Migration

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

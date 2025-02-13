## Migration

### Migrating from v3 to o3-foundation@3

o-spacing is now replaced by [o3-foundation](../o3-foundation/README.md).

One of the major changes in Origami 3 is the removal of Sass, we now use plain CSS for Origami components.

This guide will update to o3-foundation@3. Be sure to
check [o3-foundation's migration guide](../o3-foundation/MIGRATION.md) for any further updates.

To migrate o-spacing, ensure o3-foundation is installed:

```bash
npm i --save @financial-times/o3-foundation
```

All spacing APIs in o-spacing have been replaced
with [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

#### Utility Classes

Replace utility class usages with a class referencing a CSS custom property. Refer to table below for mappings.

**HTML**

```diff
-    <div class="o-spacing-m12">
+    <div class="content">
        <h1>My Content</h1>
    </div>
```

**CSS**

```css
@import '@financial-times/o3-foundation/[your-brand].css';

.content {
    margin: var(--o3-spacing-xl);
}
```

#### CSS Custom Properties

Replace CSS custom properties with their new tokens. Refer to table below for mappings.

```diff
+ @import '@financial-times/o3-foundation';

.my-class {
-   margin: var(--o-spacing-s1);
+   margin: var(--o3-spacing-5xs);
}
```

#### Sass Mixins

Replace mixin uses with CSS Custom Properties. Refer to table below for mappings.

**oSpacingByName**

```diff
+ @import '@financial-times/o3-foundation/[your-brand].css'

.my-class {
-    padding: oSpacingByName('s1');
+    padding: var(--o3-spacing-5xs);
}
```

**oSpacingByIncrement**

```diff
+ @import '@financial-times/o3-foundation/[your-brand].css'

.my-class {
-    padding: oSpacingByIncrement('1');
+    padding: var(--o3-spacing-5xs);
}
```

**Utility class map**

| Name <br/>(Utility Classes, O2 CSS Custom Property, oSpacingByName) | oSpacingByIncrement | O3 CSS Custom Property                             | Value  |
|---------------------------------------------------------------------|:--------------------|----------------------------------------------------|--------|
| `s1`                                                                | `1`                 | `--o3-spacing-5xs`                                 | `4px`  |
| `s2`                                                                | `2`                 | `--o3-spacing-4xs`                                 | `8px`  |
| `s3`                                                                | `3`                 | `--o3-spacing-3xs`                                 | `12px` |
| `s4`                                                                | `4`                 | `--o3-spacing-2xs`                                 | `16px` |
| `s6`                                                                | `6`                 | `--o3-spacing-s`                                   | `24px` |
| `s8`                                                                | `8`                 | `--o3-spacing-m`                                   | `32px` |
| `m12`                                                               | `12`                | `--o3-spacing-xl`                                  | `48px` |
| `m16`                                                               | `16`                | `--o3-spacing-2xl`                                 | `64px` |
| `l18`                                                               | `18`                | none (use `--o3-spacing-2xl` or `--o3-spacing-3xl` | 72px   |
| `l24`                                                               | `24`                | `--o3-spacing-4xl`                                 | 96px   |

#### Variables

**$o-spacing-relative-units**

There is no direct replacement in o3-foundation, remove this variable and review your page visually to ensure there are no unexpected results.

**$o-spacing-names**

There is no direct replacement in o3-foundation. Use CSS Custom Properties mentioned above.

### Migrating from v2 to v3

V3 drops support for Bower and version 2 of the Origami Build Service.

If you were already using npm, no changes should be required.

If you have been using Bower or the Origami Build Service,
follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

### Migrating from v1 to v2

v1 was released with Sass mixins and functions which do not conform to the Origami specification. v2 was released
shortly after the release of v1 to correct these:

- `oSpaceByName` becomes `oSpacingByName`.
- `oSpaceByIncrement` becomes `oSpacingByIncrement`.
- `getBaselineValue` becomes `oSpacingGetBaselineValue`.

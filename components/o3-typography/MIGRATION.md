# Migration Guide

## Migrating after deprecation

o3-typography has been moved into [o3-foundation](https://github.com/Financial-Times/origami/tree/main/components/o3-foundation). To migrate, follow these steps:

Install or upgrade `o3-foundation` to v2.0.0:

```npm i --save @Financial-Times/o3-foundation@2.0.0```

Update imports to import from o3-foundation instead:

```css
-    @import "@financial-times/o3-typography/css/core.css";
+    @import "@financial-times/o3-foundation/css/core.css";
```

## Migrating from v1 to v2

Change class `.o3-typography-body` to `.o3-typography-body-standard`.
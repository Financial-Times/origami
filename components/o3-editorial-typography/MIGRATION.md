# Migration Guide

## Migrating from v2 to v3

### Remove editorial link use

Remove the `o3-editorial-typography-link` class and `Link` component. Link styles are applied by `o3-foundation`, against any anchor `a` element by default.

```diff
-	An article by <a class="o3-editorial-typography-link" href="https://ft.com/">The Financial Times</a>.
+	An article by <a href="https://ft.com/">The Financial Times</a>.
```

```diff
-import {Body, Link} from '@financial-times/o3-editorial-typography/cjs'; // or /esm
-
-<Body>
-	An article by
-	<Link href="https://ft.com/">The Financial Times</Link>.
-</Body>;
+	An article by <a href="https://ft.com/">The Financial Times</a>.
```

### Rename heading large

o3-editorial-typography v3 refines component naming according to the design team.

- We have renamed the `Headline` JSX component to `Heading`.
- The "headline large" heading is renamed "display".

Update your markup accordingly.

```diff
+<h1 class="o3-editorial-typography-display" data-o3-editorial-underline="true">
-<h1 class="o3-editorial-typography-headline-large" data-o3-editorial-underline="true">
    <span>Don’t settle for black and white</span>
</h1>
```

```diff
+<Heading underline={true} type="display">
-<Headline underline={true} type="headline-large">
  Don’t settle for black and white
</Headline>
```

## Migrating from v1 to v2

If you are using `v1.2.3`, there is nothing to do. If you are using `v1.2.2` or earlier, ensure you upgrade `@financial-times/o3-foundation` to `v2` first before updating `@financial-times/o3-editorial-foundation`.

A breaking change was accidentally released in v1.2.3 but went unnoticed for a significant period of time. As it may have been fixed by end users, it may not be something we can safely revert in a subsequent patch. A v2 major release followed without significant additional changes.

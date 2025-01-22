# Migration Guide

## Migrating from v2 to v3

### Replace heading components

We have deleted the UI `Heading` JSX component, and replaced it with more generic "title" typography use-cases. This reduces the total number of typography styles to choose from across "UI" (product) and "Editorial" (article) contexts. Please consult with the design team to decide the best match for your context.

```diff
-<h1 class="o3-typography-h1">Welcome to Origami</h1>
+<h1 class="o3-typography-use-case-title-lg">Welcome to Origami</h1>
```

```diff
-import { Heading } from '@financial-times/o3-foundation/cjs' // or esm;
-
-<Heading level={1}>Welcome to Origami</Heading>
+<h1 class="o3-typography-use-case-title-lg">Welcome to Origami</h1>
```

### Replace body and link components

We have deleted the UI `Body` JSX component, and replaced it with more generic "body-\*" typography use-cases. This reduces the total number of typography styles to choose from across "UI" (product) and "Editorial" (article) contexts. Please consult with the design team to decide the best match for your context.

Link styles are now applied to anchor tags by default.

Impacted classes include:

- `o3-typography-body-standard`
- `o3-typography-body-small`
- `o3-typography-body-big`
- `o3-typography-body-small-caps`
- `o3-typography-body-small-bold`

Which should be replaced with their closes matching use-case:

```diff
-<p class="o3-typography-body-standard">
-	Styling and usage guides can be seen on the
-	<a href="#" class="o3-typography-link">Origami</a> homepage.
-</p>
+<p class="o3-typography-use-case-body-base">
+	Styling and usage guides can be seen on the
+	<a href="#">Origami</a> homepage.
+</p>
```

```diff
-import {Link, Body} from '@financial-times/o3-foundation';
-
-<Body>
-	Styling and usage guides can be seen on the <Link href="#">Origami</Link>{' '}
-	homepage.
-</Body>;
+<p class="o3-typography-use-case-body-base">
+	Styling and usage guides can be seen on the
+	<a href="#">Origami</a> homepage.
+</p>
```

### Replace footer components

We have deleted the UI `Footer` JSX component, and replaced it with more generic "body-base" typography use-cases.

```diff
-import {Footer} from '@financial-times/o3-typography';
-
-<Footer>Copyright notice</Footer>;
+<footer class="o3-typography-use-case-body-base">Copyright notice</footer>
```

```diff
-<footer class="o3-typography-footer">Copyright notice</footer>
+<footer class="o3-typography-use-case-body-base">Copyright notice</footer>
```

### Replace caption components

We have deleted the UI `Caption` JSX component, and replaced it with more generic "detail" typography use-cases.

```diff
-import {Caption} from '@financial-times/o3-foundation/cjs'; // or esm;
-
-<Caption>This is a caption.</Caption>;
+<figcaption class="o3-typography-use-case-detail">This is a caption.</figcaption>
```

```diff
-<figcaption class="o3-typography-caption">This is a caption.</figcaption>
+<figcaption class="o3-typography-use-case-detail">This is a caption.</figcaption>
```

## Migrating from v1 to v2

v2 introduces changes to the scale for Metric2:

- `--o3-font-lineheight-metric2-10` and `--o3-font-size-metric2-10` has been removed.
- Scale for font size and line height has been offset by `-1`, meaning the value of scale `--o3-font-size-metric2-1` is
  now scale `--o3-font-size-metric2-0` and so on.
- Introduced `--o3-font-size-metric2-negative-3` scale.

Usages of `--o3-font-lineheight-metric2-10`
or `--o3-font-font-size-metric2-10` will break. Usages of any other token will visually break and require changes. The below table shows what CSS Custom Properties to replace when migrating to v2.

**Lineheight**

| v1 name                                   | v2 name                                   | value  |
| ----------------------------------------- | ----------------------------------------- | ------ |
| `--o3-font-lineheight-metric2-negative-2` | `--o3-font-lineheight-metric2-negative-3` | `16px` |
| `--o3-font-lineheight-metric2-negative-1` | `--o3-font-lineheight-metric2-negative-2` | `16px` |
| `--o3-font-lineheight-metric2-0`          | `--o3-font-lineheight-metric2-negative-1` | `20px` |
| `--o3-font-lineheight-1`                  | `--o3-font-lineheight-0`                  | `20px` |
| `--o3-font-lineheight-2`                  | `--o3-font-lineheight-1`                  | `24px` |
| `--o3-font-lineheight-3`                  | `--o3-font-lineheight-2`                  | `28px` |
| `--o3-font-lineheight-4`                  | `--o3-font-lineheight-3`                  | `32px` |
| `--o3-font-lineheight-5`                  | `--o3-font-lineheight-4`                  | `32px` |
| `--o3-font-lineheight-6`                  | `--o3-font-lineheight-5`                  | `40px` |
| `--o3-font-lineheight-7`                  | `--o3-font-lineheight-6`                  | `48px` |
| `--o3-font-lineheight-8`                  | `--o3-font-lineheight-7`                  | `56px` |
| `--o3-font-lineheight-9`                  | `--o3-font-lineheight-8`                  | `72px` |
| `--o3-font-lineheight-10`                 | `--o3-font-lineheight-9`                  | `84px` |

**Font Size**

| v1 name                             | v2 name                             | value  |
| ----------------------------------- | ----------------------------------- | ------ |
| `--o3-font-size-metric2-negative-2` | `--o3-font-size-metric2-negative-3` | `10px` |
| `--o3-font-size-metric2-negative-1` | `--o3-font-size-metric2-negative-2` | `12px` |
| `--o3-font-size-metric2-0`          | `--o3-font-size-metric2-negative-1` | `14px` |
| `--o3-font-size-metric2-1`          | `--o3-font-size-metric2-0`          | `16px` |
| `--o3-font-size-metric2-2`          | `--o3-font-size-metric2-1`          | `18px` |
| `--o3-font-size-metric2-3`          | `--o3-font-size-metric2-2`          | `20px` |
| `--o3-font-size-metric2-4`          | `--o3-font-size-metric2-3`          | `24px` |
| `--o3-font-size-metric2-5`          | `--o3-font-size-metric2-4`          | `28px` |
| `--o3-font-size-metric2-6`          | `--o3-font-size-metric2-5`          | `32px` |
| `--o3-font-size-metric2-7`          | `--o3-font-size-metric2-6`          | `40px` |
| `--o3-font-size-metric2-8`          | `--o3-font-size-metric2-7`          | `48px` |
| `--o3-font-size-metric2-9`          | `--o3-font-size-metric2-8`          | `64px` |
| `--o3-font-size-metric2-10`         | `--o3-font-size-metric2-9`          | `72px` |

```

```

# Migration Guide

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

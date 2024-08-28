# Migration Guide

## Migrating from v1 to v2

v2 introduces changes to the scale for Metric2:

* `--o3-font-lineheight-metric2-10` and `--o3-font-size-metric2-10` has been removed.
* Scale for font size and line height has been offset by `-1`, meaning the value of scale `--o3-font-size-metric2-1` is
  now scale `--o3-font-size-metric2-0` and so on.
* Introduced `--o3-font-size-metric2-negative-3` scale.

This version will not break unless you have used scale `--o3-font-lineheight-metric2-10`
or `--o3-font-font-size-metric2-10`. Usages of this will need to be updated to use

If you wish to retain the same font size and line height from v1, you will need to update your use of CSS Custom
Properties as seen in the tables below:

**Lineheight**

| v1 name                                   | v2 name                                   | value     |
|-------------------------------------------|-------------------------------------------|-----------|
| `--o3-font-lineheight-metric2-negative-2` | `--o3-font-lineheight-metric2-negative-3` | `1rem`    |
| `--o3-font-lineheight-metric2-negative-1` | `--o3-font-lineheight-metric2-negative-2` | `1rem`    |
| `--o3-font-lineheight-metric2-0`          | `--o3-font-lineheight-metric2-negative-1` | `1.25rem` |
| `--o3-font-lineheight-1`                  | `--o3-font-lineheight-0`                  | `1.25rem` |
| `--o3-font-lineheight-2`                  | `--o3-font-lineheight-1`                  | `1.5rem`  |
| `--o3-font-lineheight-3`                  | `--o3-font-lineheight-2`                  | `1.75rem` |
| `--o3-font-lineheight-4`                  | `--o3-font-lineheight-3`                  | `2rem`    |
| `--o3-font-lineheight-5`                  | `--o3-font-lineheight-4`                  | `2rem`    |
| `--o3-font-lineheight-6`                  | `--o3-font-lineheight-5`                  | `2.5rem`  |
| `--o3-font-lineheight-7`                  | `--o3-font-lineheight-6`                  | `3rem`    |
| `--o3-font-lineheight-8`                  | `--o3-font-lineheight-7`                  | `3.5rem`  |
| `--o3-font-lineheight-9`                  | `--o3-font-lineheight-8`                  | `4.5rem`  |
| `--o3-font-lineheight-10`                 | `--o3-font-lineheight-9`                  | `5.25rem` |

**Font Size**

| v1 name                             | v2 name                             | value      |
|-------------------------------------|-------------------------------------|------------|
| `--o3-font-size-metric2-negative-2` | `--o3-font-size-metric2-negative-3` | `0.625rem` |
| `--o3-font-size-metric2-negative-1` | `--o3-font-size-metric2-negative-2` | `0.75rem`  |
| `--o3-font-size-metric2-0`          | `--o3-font-size-metric2-negative-1` | `0.875rem` |
| `--o3-font-size-metric2-1`          | `--o3-font-size-metric2-0`          | `1rem`     |
| `--o3-font-size-metric2-2`          | `--o3-font-size-metric2-1`          | `1.125rem` |
| `--o3-font-size-metric2-3`          | `--o3-font-size-metric2-2`          | `1.25rem`  |
| `--o3-font-size-metric2-4`          | `--o3-font-size-metric2-3`          | `1.5rem`   |
| `--o3-font-size-metric2-5`          | `--o3-font-size-metric2-4`          | `1.75rem`  |
| `--o3-font-size-metric2-6`          | `--o3-font-size-metric2-5`          | `2rem`     |
| `--o3-font-size-metric2-7`          | `--o3-font-size-metric2-6`          | `2.5rem`   |
| `--o3-font-size-metric2-8`          | `--o3-font-size-metric2-7`          | `3rem`     |
| `--o3-font-size-metric2-9`          | `--o3-font-size-metric2-8`          | `4rem`     |
| `--o3-font-size-metric2-10`         | `--o3-font-size-metric2-9`          | `4.5rem`   |
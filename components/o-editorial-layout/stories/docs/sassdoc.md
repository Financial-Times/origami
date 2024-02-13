# o-editorial-layout Sass Documentation
## Mixins
### oEditorialLayout
Output All oEditorialLayout Features

### oEditorialLayoutHeading
Heading typography and margin.
A placeholder is used, which may effect the source order of your CSS.


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| level | number | - |The heading level 1-5. |
### oEditorialLayoutBody
Body typography and margin.

### oEditorialLayoutBodyWithoutTypography
Apply body typography layout, such as margin in relation to other elements,
without including typographic styles such as font size and family. Useful
when inheriting typographic styles from a parent element.

## Variables
### o-editorial-layout-load-fonts
If true, include fonts from o-fonts.

Defaults to the value of `$o-editorial-typography-load-fonts`. If you are
using o-typography or o-editorial-typography and have already indicated not
to load fonts, preferring to load fonts manually, this variable does not
need to be set. If you are not using `o-typography`, set this to false to
load fonts manually.


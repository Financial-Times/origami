# o-editorial-layout Sass Documentation

- [o-editorial-layout Sass Documentation](#o-editorial-layout-sass-documentation)
  - [Mixins](#mixins)
    - [oEditorialLayout](#oeditoriallayout)
    - [oEditorialLayoutHeading](#oeditoriallayoutheading)
    - [oEditorialLayoutBody](#oeditoriallayoutbody)
    - [oEditorialLayoutBodyWithoutTypography](#oeditoriallayoutbodywithouttypography)
  - [Variables](#variables)
    - [o-editorial-layout-load-fonts](#o-editorial-layout-load-fonts)

## Mixins

### oEditorialLayout

Output All oEditorialLayout Features

### oEditorialLayoutHeading

Heading typography and margin.
A placeholder is used, which may effect the source order of your CSS.

| Parameter | Type   | Default | Description            |
| --------- | ------ | ------- | ---------------------- |
| level     | number | -       | The heading level 1-5. |

### oEditorialLayoutBody

Body typography and margin.

### oEditorialLayoutBodyWithoutTypography

Apply body typography layout, such as margin in relation to other elements,
without including typographic styles such as font size and family. Useful
when inheriting typographic styles from a parent element.

## Variables

### o-editorial-layout-load-fonts

Deprecated. Previously: If true, include fonts from o-fonts. Fonts are now always included.

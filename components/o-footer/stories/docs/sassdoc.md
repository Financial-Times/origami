# o-footer Sass Documentation

- [o-footer Sass Documentation](#o-footer-sass-documentation)
  - [Mixins](#mixins)
    - [oFooter](#ofooter)

## Mixins

### oFooter

Output all o-footer styles including a navigation matrix, and two themes.

| Parameter | Type   | Default                                                       | Description                                                                                                                                                                                                                                                           |
| --------- | ------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| opts      | string | ('themes': ('light', 'dark'), 'margin': 40px, 'matrix': true) | a map of footer options. Keys include 'themes', a list of themes to support including "dark" and "light"; 'margin', a length to customise the footer's top margin; and 'matrix', a boolean value whether to support a complex footer with large navigation structure. |

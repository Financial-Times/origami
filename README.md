o-fonts [![Build Status](https://circleci.com/gh/Financial-Times/o-fonts.png?style=shield&circle-token=c29a1b0246bd3bbad4da8e024954af6c8dc04dca)](https://circleci.com/gh/Financial-Times/o-fonts) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

_Use `o-fonts` to include Origami provided fonts, or register supported custom fonts._

- [Fonts Available](#fonts-available)
- [Fonts Included By Default](#fonts-included-by-default)
- [Sass](#sass)
- [Contributing](#contributing)
- [Migration guide](#migration)
- [Contact](#contact)
- [Licence](#licence)


## Fonts Available

Any of the below fonts may be included with `o-fonts` using [SASS](#sass). But the [fonts included by default](#fonts-included-by-default) vary per brand.

| Weight   | FinancierDisplayWeb | MetricWeb |
|----------|:-------------------:|:---------:|
| thin     |                     |    ✓      |
| light    |           i         |    ✓ i    |
| regular  |         ✓ i         |    ✓ i    |
| medium   |           i         |    ✓      |
| semibold |           i         |    ✓      |
| bold     |         ✓           |    ✓ i    |
| black    |                     |           |

- **✓**: normal style available
- **i**: italic style available (if not, faux-italic will be displayed)

## Fonts Included By Default

Font faces included by default, if using the Origami Build Service or [including default fonts with SASS](#include-default-fonts), depends on your products chosen brand:

| Brand       | Fonts included by default (all weights and styles) |
|-------------|----------------------------------------------------|
| master      | FinancierDisplayWeb, MetricWeb                     |
| internal    | MetricWeb                                          |
| whitelabel  | _(none)_                                           |

## Sass

### Include Default Fonts

To include [default fonts for your brand](#fonts-included-by-default), call `oFonts`.

```scss
@import 'o-fonts/main';
@include oFonts();
```

You may also include specific fonts granularly using an options `$opts` map. The map has a key for each font `metric` or `financier-display`, which accepts a list of weight and styles to include.

For example to include font faces for `MetricWeb` in normal and semibold weights, and regular `FinancierDisplayWeb`:
```scss
@include oFonts($opts: (
	'metric': (
        ('weight': 'regular', 'style': 'normal'),
        ('weight': 'semibold', 'style': 'normal')
    ),
	'financier-display': (
        ('weight': 'regular', 'style': 'normal')
    )
));
```

### Font Loading

By default [font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) is set to `swap`. In supporting browsers a system font is shown until fonts are loaded. To update your font loading method set `$o-fonts-display` at the top of your Sass, before including any other component.

```scss
// Customise font loading.
$o-fonts-display: 'optional';
@import 'o-fonts/main';


@include oFonts();
```

### Use a custom font family

To register a custom font and supported variants, use the mixin `oFontsDefineCustomFont`.

In this example we register a custom font "MyFont" with sans fallback `MyFont, sans`. We configure this font to allow two variants (a normal style of either bold or regular weight). In the mixin content we include the `@font-face` declaration to load these fonts from our own source.
```scss
@include oFontsDefineCustomFont('MyFont, sans', (
    (weight: regular, style: normal),
    (weight: bold, style: normal)
)) {
    @font-face {
        src: url('MyFont-Thin.woff');
        font-family: MyFont;
        font-weight: 100;
        font-style: normal;
    }
    @font-face{
        src: url('MyFont-Bold.woff');
        font-family: MyFont;
        font-weight: 700;
        font-style: normal;
    }
};
```

### Get a font family for a font name

To get a `font-family` with web safe fallbacks for a font, use the `oFontsGetFontFamilyWithFallbacks` function.

```scss
$family: oFontsGetFontFamilyWithFallbacks(FinancierDisplayWeb); // FinancierDisplayWeb, sans-serif
```

### Get a font name from a font family

To get a font without fallbacks, use `oFontsGetFontFamilyWithoutFallbacks`:

```scss
$font: oFontsGetFontFamilyWithoutFallbacks('FinancierDisplayWeb, sans-serif'); // FinancierDisplayWeb
```

### Check a font of weight or style exists

To check if a font supports a weight/style use `oFontsVariantExists`.

```scss
$allowed: oFontsVariantExists('MetricWeb', 'bold', 'normal'); // true
$allowed: oFontsVariantExists('MetricWeb', 'black', 'italic'); // false
```

## Contributing

### Add a new font or font variant

Note: font files are contained in a separate, private repository ([o-fonts-assets](https://github.com/Financial-Times/o-fonts-assets)).

1. Open `src/scss/_variables.scss` and add the font family name (if it's an entirely new family) and the variant styles to the private `$_o-fonts-families` map.

2. Second, if adding an entirely new font, add a new option to the `oFonts` mixin. To include the new [font by default](#fonts-included-by-default) for only some brands assign a variable of default variants conditionally (see `$_o-fonts-default-financier-display-variants`).

3. Finally, update the demos (see `origami.json`).

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 4 | N/A | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
⚠ maintained | 3 | 3.3 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.3 | - |
╳ deprecated | 1 | 1.5 | - |

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-fonts/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

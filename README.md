o-fonts [![Build Status](https://circleci.com/gh/Financial-Times/o-fonts.png?style=shield&circle-token=c29a1b0246bd3bbad4da8e024954af6c8dc04dca)](https://circleci.com/gh/Financial-Times/o-fonts) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

_Use `o-fonts` to include Origami provided fonts, or register supported custom fonts._

- [Usage](#usage)
- [Recommended Fonts](#recommended-fonts)
- [Fonts Included By Default](#fonts-included-by-default)
- [All Available Fonts](#all-available-fonts)
- [Sass](#sass)
- [Contributing](#contributing)
- [Migration guide](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-fonts`.

## Recommended Fonts

Origami components use a limited set of recommended font faces which vary per brand. We recommend [Sass users](#sass) include only these recommended fonts and carefully consider performance implications before including another font. However a wider selection of fonts [are included by default](#fonts-included-by-default) so they are available to Build Service users. [Sass users](#sass) may choose to include only recommended fonts, or any of the [available fonts](#all-available-fonts).

### Master Brand Recommended Fonts

| Weight   | FinancierDisplayWeb | MetricWeb |
|----------|:-------------------:|:---------:|
| thin     |                     |           |
| light    |                     |           |
| regular  |                     |    ✓      |
| medium   |         ✓           |           |
| semibold |                     |    ✓      |
| bold     |         ✓           |           |
| black    |                     |           |

- **✓**: normal style available
- **i**: italic style available (if not, faux-italic will be displayed)

### Internal Brand Recommended Fonts

| Weight   | MetricWeb |
|----------|:---------:|
| thin     |           |
| light    |           |
| regular  |    ✓      |
| medium   |           |
| semibold |    ✓      |
| bold     |           |
| black    |           |

- **✓**: normal style available
- **i**: italic style available (if not, faux-italic will be displayed)

### Whitelabel Brand Recommended Fonts

_(None)_. Origami components make no font assumptions for whitelabel brands and default to a system font.

## Fonts Included By Default

A selection wider than [recommended fonts](#recommended-fonts) are included by default so they are available to Build Service users. Font faces included by default, if using the Origami Build Service or [including default fonts with SASS](#include-default-fonts), depend on your products chosen brand:

| Brand       | Fonts included by default ([all weights and styles available](#all-available-fonts)) |
|-------------|--------------------------------------------------------------------------------------|
| master      | FinancierDisplayWeb, MetricWeb                                                       |
| internal    | MetricWeb                                                                            |
| whitelabel  | _(none)_                                                                             |


## All Available Fonts

Any of the below fonts may be included with `o-fonts` using [SASS](#sass). Build Service users are limited to [fonts included by default](#fonts-included-by-default).

| Weight   | FinancierDisplayWeb | MetricWeb |
|----------|:-------------------:|:---------:|
| thin     |                     |    ✓      |
| light    |           i         |    ✓ i    |
| regular  |         ✓ i         |    ✓ i    |
| medium   |         ✓ i         |    ✓      |
| semibold |           i         |    ✓      |
| bold     |         ✓           |    ✓ i    |
| black    |                     |           |

- **✓**: normal style available
- **i**: italic style available (if not, faux-italic will be displayed)

## Sass

### Include Default Fonts

To include [all fonts for your brand](#fonts-included-by-default), call `oFonts`.

```scss
@import 'o-fonts/main';
@include oFonts();
```

To improve site performance, Origami components use a more limited set of font faces. To included only the recommended set of font faces, set `recommended: true` in the options `$opts` map.
```scss
@import 'o-fonts/main';
@include oFonts($opts: ('recommended': true));
```

You may also include specific fonts granularly using an options `$opts` map. The map has a key for each font `metric` or `financier-display`, which accepts a list of weight and styles to include.

For example to include recommended fonts used by Origami components and an extra font, `MetricWeb` in a medium weight, and regular `FinancierDisplayWeb`:
```scss
@include oFonts($opts: (
    'recommended': true,
	'metric': (
        ('weight': 'medium', 'style': 'normal')
    ),
	'financier-display': (
        ('weight': 'regular', 'style': 'normal')
    )
));
```

_Note: If your project has multiple Sass entry points call `oFontsVariantsIncluded` with the same options as `oFonts`, to tell `o-fonts` which font faces have been output._

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
        src: url('MyFont-Thin.woff2') format('woff2'), url('MyFont-Thin.woff') format('woff');
        font-family: MyFont;
        font-weight: 100;
        font-style: normal;
    }
    @font-face{
        src: url('MyFont-Bold.woff2') format('woff2'), url('MyFont-Bold.woff') format('woff');
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

### Check a font of weight or style has been included

To check if a font weight/style has been output in your project use `oFontsVariantIncluded`.

```scss
// including fonts in project
@include oFonts($opts: (
	'metric': (
        ('weight': 'medium', 'style': 'normal')
    ),
));


$included: oFontsVariantIncluded('MetricWeb', 'medium', 'normal'); // true
$included: oFontsVariantIncluded('MetricWeb', 'bold', 'normal'); // false
```

_Note: If your project has multiple Sass entry points call `oFontsVariantsIncluded` with the same options as `oFonts`, to tell `o-fonts` which font faces have been output._

## Contributing

### Add a new font or font variant

Note: font files are contained in a separate, private repository ([o-fonts-assets](https://github.com/Financial-Times/o-fonts-assets)).

1. Open `src/scss/_variables.scss` and update the `$o-fonts-path` variable to the release of [o-fonts-assets](https://github.com/Financial-Times/o-fonts-assets) which includes your new font.

2. Add the font family name (if it's an entirely new family) and the variant styles to the private `$_o-fonts-families` map.

3. If adding an entirely new font, add a new option to the `oFonts` mixin. To include the new [font by default](#fonts-included-by-default) or with [recommended fonts](#recommended-fonts)  (see `$_o-fonts-default` and `$_o-fonts-recommended`).

4. Finally, update the demos (see `origami.json`).

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 4 | N/A | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
⚠ maintained | 3 | 3.3 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.3 | - |
╳ deprecated | 1 | 1.5 | - |

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-fonts/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

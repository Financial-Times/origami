o-fonts [![Circle CI](https://circleci.com/gh/Financial-Times/o-fonts/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-fonts/tree/master)
=================

_Use `o-fonts` to include Origami provided fonts, or register supported custom fonts._

- [Fonts Available](#fonts-available)
- [Fonts Included By Default](#fonts-included-by-default)
- [Sass](#sass)
- [Contributing](#contributing)
- [Migration guide](#migration-guide)
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
| bold     |                     |    ✓ i    |
| black    |                     |           |

✓: normal style available
i: italic style available (if not, faux-italic will be displayed)

## Fonts Included By Default

Font faces included by default, if using the Origami Build Service or [including all fonts with SASS](#sass), depends on your products chosen brand:

| Brand       | Fonts included by default (all weights and styles) |
|-------------|:--------------------------------------------------:|
| master      | FinancierDisplayWeb, MetricWeb                     |
| internal    | MetricWeb                                          |
| whitelabel  | _(none)_                                           |

## Sass

### Include All Default Fonts

To include [all default fonts for your brand](#fonts-included-by-default), call `oFontsIncludeAll`.

```scss
@import 'o-fonts/main';
@include oFontsIncludeAll();
```

_If you want to include a font which is provided by Origami but not included by for your brand default, [specifically load the font](#loading-specific-web-fonts–provided-by-origami) separately._

### Loading specific web fonts provided by Origami

```scss
@import 'o-fonts/main';

// @font-face declarations for all Financier Display weights
@include oFontsInclude(FinancierDisplayWeb, light);
@include oFontsInclude(FinancierDisplayWeb, regular);
@include oFontsInclude(FinancierDisplayWeb, bold);

// @font-face declarations for Metric regular / italic
@include oFontsInclude(MetricWeb, $weight: regular, $style: italic);
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

### Specifying font families

To get a `font-family` with web safe fallbacks for a font, use the `oFontsGetFontFamilyWithFallbacks` function.

```scss
.my-class {
	font-family: oFontsGetFontFamilyWithFallbacks(FinancierDisplayWeb); // FinancierDisplayWeb, sans-serif
}
```

To get a font without the fallbacks, use `oFontsGetFontFamilyWithoutFallbacks`:

```scss
	$without-fallbacks: oFontsGetFontFamilyWithoutFallbacks('FinancierDisplayWeb, sans-serif'); // FinancierDisplayWeb
```

### Checking a weight or style is allowed

To check if a font supports a weight/style use `oFontsVariantExists`.

```scss
$allowed: oFontsVariantExists('MetricWeb', 'bold', 'normal'); // true
$allowed: oFontsVariantExists('MetricWeb', 'black', 'italic'); // false
```

## Contributing

### Adding new font variants

Note: font files are contained in a separate, private repository ([o-fonts-assets](https://github.com/Financial-Times/o-fonts-assets)).

1. Open `src/scss/_variables.scss` and add the font family name (if it's an entirely new family) and the variant styles to the `$o-fonts-families` map:

```scss
$o-fonts-families: (
	MetricWeb: (
		font-family: 'MetricWeb, sans-serif',
		variants: (
			(weight: lighter, style: normal),
			(weight: normal,  style: normal),
			(weight: bold,    style: normal)
		)
	),
	// …
);
```

2. Second, if adding an entirely new font, indicate brand support by adding the font name to `$_o-fonts-default-families`. This will determine when the [font is included by default](#fonts-included-by-default).

3. Finally, update the demos (see `origami.json`).

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-fonts/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

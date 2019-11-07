## Migration Guide

### Upgrading from v4 to v5

#### CSS Classes

`o-colors` no longer outputs CSS classes for palette colours or usecases. Sass users should use Sass functions to set colours instead. Build service users should use the palette's CSS Custom Properties (CSS Variables). If that is not possible due to browser support requirements please contact the Origami team.

Removed CSS classes for colour usecase:

- o-colors-focus-outline
- o-colors-page-background
- o-colors-box-background
- o-colors-link-text
- o-colors-link-hover-text
- o-colors-link-title-text
- o-colors-link-title-hover-text
- o-colors-tag-link-text
- o-colors-tag-link-hover-text
- o-colors-opinion-tag-link-text
- o-colors-opinion-tag-link-hover-text
- o-colors-title-text
- o-colors-body-text
- o-colors-muted-text
- o-colors-opinion-background
- o-colors-hero-background
- o-colors-hero-opinion-background
- o-colors-hero-highlight-background
- o-colors-section-life-arts-all
- o-colors-section-life-arts-alt-all
- o-colors-section-magazine-all
- o-colors-section-magazine-alt-all
- o-colors-section-house-home-all
- o-colors-section-house-home-alt-all
- o-colors-section-money-all
- o-colors-section-money-alt-all

Removed CSS classes for palette colours:

- o-colors-palette-paper
- o-colors-palette-claret
- o-colors-palette-oxford
- o-colors-palette-teal
- o-colors-palette-wheat
- o-colors-palette-sky
- o-colors-palette-slate
- o-colors-palette-velvet
- o-colors-palette-mandarin
- o-colors-palette-lemon
- o-colors-palette-candy
- o-colors-palette-wasabi
- o-colors-palette-jade
- o-colors-palette-crimson
- o-colors-palette-org-b2c
- o-colors-palette-org-b2c-dark
- o-colors-palette-org-b2c-light

#### Sass

The following colours have been removed from the palette:

- `inherit`. Replace `oColorsGetPaletteColor('inherit');` with `inherit`.
- `transparent`. Replace `oColorsGetPaletteColor('transparent');` with `transparent`.

Deprecated internal and whitelabel brand palette colours were removed. Please contact Origami if your product has a usecase for one of the removed colours:
- Internal brand: candy, wasabi, org-b2c, org-b2c-dark, org-b2c-light, paper, wheat, sky, velvet, mandarin, claret.
- Whitelabel brand: all colours except black and white have been removed.

#### Sass Mixins

The following mixins have changed:

- [oColors](#oColors) no longer outputs all colour usecase CSS classes.
- [oColorsSetColor](#oColorsSetColor) has updated arguments.
- [oColorsSetUseCase](#oColorsSetUseCase) has updated arguments.

The following mixins have been removed:
- [oColorsFor](#oColorsFor)

#### Sass Functions

The following functions have changed:
- [oColorsGetTextColor](#oColorsGetTextColor)

The following functions have been removed:
- [oColorsGetTint](#oColorsGetTint)
- [oColorsGetPaletteColor](#oColorsGetPaletteColor)
- [oColorsGetUseCase](#oColorsGetUseCase)
- [oColorsGetColorFor](#oColorsGetColorFor)
- [oColorsGetWCAGRating](#oColorsGetWCAGRating)
- [oColorsCheckContrast](#oColorsCheckContrast)
- [preciseFloor](https://github.com/Financial-Times/o-colors/blob/5c19b13c76e6ea7d3e0b0512511154bd6b049dbe/src/scss/tools/_color.scss#L92), replace with your own implementation.

#### Sass Variables

The following variables have been removed:

- `$o-colors-palette` has been removed. Use `oColorsSetColor` to add to the palette or customise a default o-colors palette colour; `oColorsByName` to fetch colors from the palette; or `oColorsGetPalette` to iterate over each colour in the palette.
- `$o-colors-tints` has been removed. Please contact the Origami team if you have a usecase for accessing this variable.
- `$o-colors-usecases` has been removed. Use `oColorsSetUseCase` to add to add a usecase or customise a default o-colors usecase; or `oColorsByUsecase` to fetch a colour for a usecase.

#### oColors

As `o-colors` [no longer outputs usecase CSS classes](#MIGRATION.md#migrating-from-v4-to-v5) the option 'usecase-classes' is removed from the `oColors` mixin.

```diff
@include oColors($opts: (
	'palette-custom-properties': true,
	'palette-classes': true,
-	'usecase-classes': true
));
```

#### oColorsGetTextColor

The name of the first argument of `oColorsGetTextColor` has changed. It was `$backgroundd` (with a double `d`) but it now spelled correctly as `$background`. E.g:

```diff
-	color: oColorsGetTextColor($backgroundd: 'paper');
+	color: oColorsGetTextColor($background: 'paper');
```

`oColorsGetTextColor` now errors if the contrast between the given background and text colour does not pass WCAG 2.1 level AA for [normal text](https://www.w3.org/TR/WCAG21/#contrast-minimum). Previously it would only throw a warning provided the contrast check passed for [large text](https://www.w3.org/TR/WCAG21/#dfn-large-scale). Accordingly, the third `$warnings` argument is now `$minimum-contrast`. This can be set to one of `aa-normal` (default), `aa-large`, `aaa-normal`, `aaa-large`, or `null` to remove the contrast check. To migrate update the third `$warnings` argument of `oColorsGetTextColor` to `$minimum-contrast`:
- **not set**: no changes are needed unless contrast errors are thrown. If an error is thrown set `$minimum-contrast` to `aa-large` if creating a colour for [large text](https://www.w3.org/TR/WCAG21/#dfn-large-scale), or `null` to ignore the contrast of the resulting text colour. Only ignore contrast errors for [incidental or logo text](https://www.w3.org/TR/WCAG21/#contrast-minimum), otherwise your project may be inaccessible.
- **true**: remove the argument, it's optional and checks contrast for [normal text](https://www.w3.org/TR/WCAG21/#contrast-minimum) by default. If a contrast error is thrown refer to the point "not set" above.
- **false**: set to `null` instead.

E.g. If generating a colour for [large text](https://www.w3.org/TR/WCAG21/#dfn-large-scale), error if the contrast between the background `paper` is lower than 3:1 (see [WCAG 2.1](https://www.w3.org/TR/WCAG21/#contrast-minimum))
```diff
-	color: oColorsGetTextColor('paper', 80, $warnings: false);
+	color: oColorsGetTextColor('paper', 80, $minimum-contrast: 'aa-large');
```

Or set to `null` to never error, e.g. for [incidental or logo text](https://www.w3.org/TR/WCAG21/#contrast-minimum), regardless of the contrast between the given background `paper` and the result:
```diff
-	color: oColorsGetTextColor($backgroundd: 'paper', $warnings: false);
+	color: oColorsGetTextColor($background': paper', $minimum-contrast: null);
```

#### oColorsGetUseCase

The mixin `oColorsGetUseCase` returns a colour name. It has been removed and there is no direct replacement, but `oColorsByUsecase` may be used to get the colour hex for a usecase:

```diff
-background-color: oColorsGetPaletteColor(oColorsGetUseCase('page', 'background'));
+background-color: oColorsByUsecase('page', 'background');
```

#### oColorsGetPaletteColor

`oColorsGetPaletteColor` is now `oColorsByName`. The `$name` argument has been renamed `$color-name` and it must be of type string. A second argument `$from` may also be given to get a colour set by a component or project other than o-colors.

To fetch a default `o-colors` colour.
```diff
-color: oColorsGetPaletteColor('paper');
+color: oColorsByName('paper');
```

To fetch a colour set by a component or project other that `o-colors`.
```diff
// Fetch the colour 'stormy' from the component 'o-example'.
-color: oColorsGetPaletteColor('o-example-story');
+color: oColorsByName('stormy', 'o-example');
```

Or with argument names:
```diff
// Fetch the colour 'stormy' from the component 'o-example'.
-color: oColorsGetPaletteColor($name: 'o-example-story');
+color: oColorsByName($color-name: 'stormy', $from: 'o-example');
```

#### oColorsSetColor

- The arguments of `oColorsSetColor` have changed.
- It now supports a colour deprecation message.
- It errors when overriding an existing palette colour which was not set by o-colors.

A project name must now be given explicitly, which is used to namespace the colour:
```diff
// Setting a custom colour 'pink' within a component or project 'o-example'.
- @include oColorsSetColor('o-example-pink', #ff69b4);
+ @include oColorsSetColor('o-example', 'pink', #ff69b4);
```

The color name argument no longer accepts a list to deprecate colours. Instead use the new `$opts` argument.
```diff
// Setting a  custom colour 'pink', which is deprecated.
- @include oColorsSetColor('o-example-pink', (#ff69b4, _deprecated));
+ @include oColorsSetColor('o-example', 'pink', #ff69b4, (deprecated: true));
```

A custom deprecation message may be given:
```diff
// Setting a  custom colour 'pink', which is deprecated, with a custom deprecation warning.
- @include oColorsSetColor('o-example-pink', (#ff69b4, _deprecated));
+ @include oColorsSetColor('o-example', 'pink', #ff69b4, (deprecated: 'reason for deprecation'));
```

#### oColorsSetUseCase

- The arguments of `oColorsSetUseCase` have changed.
- It may also deprecate the properties of a colour usecase more granularly.
- It errors when overriding an existing usecase which was not set by o-colors.

A project name must now be given explicitly, which is used to namespace the usecase, and properties are given with a map:
```diff
// Setting a custom usecase within a component 'o-example'.
// The usecase describes stripes, which have a background, text colour, and border.
-@include oColorsSetUseCase('o-example-stripe', 'text', 'white');
-@include oColorsSetUseCase('o-example-stripe', 'background', 'black');
-@include oColorsSetUseCase('o-example-stripe', 'border', 'black-50');
+@include oColorsSetUseCase('o-example', 'stripe', (
+	'text': 'white',
+	'background': 'black',
+	'border': 'black-50'
+));
```

To deprecate a usecase pass a second options argument:
```diff
-@include oColorsSetUseCase('o-example-stripe', 'text', 'white');
-@include oColorsSetUseCase('o-example-stripe', 'background', 'black');
-@include oColorsSetUseCase('o-example-stripe', 'border', 'black-50');
-@include oColorsSetUseCase('o-example-stripe', '_deprecated', 'There are no stripes anymore.');
+@include oColorsSetUseCase('o-example', 'stripe', (
+	'text': 'white',
+	'background': 'black',
+	'border': 'black-50'
+), ('deprecated': 'There are no stripes anymore.'));
```

#### oColorsFor

`oColorsFor` has been removed and should be replaced with separate calls to `oColorsByUsecase` for each property. By default `oColorsByUsecase` errors if a usecase isn't found, unless a `$fallback` colour has been given (which may be `null`). If the usecase doesn't exist and an error is thrown remove the property.

E.g. setting the page background colour from o-colors. In this example no properties have been given to the second argument of `oColorsFor`, so we replace with calls to `oColorsByUsecase` for all properties the usecase supports.
```diff
-@include oColorsFor(page);
+background: oColorsByUsecase('page', 'background');
```

E.g. setting multiple colour properties to match a 'row-stripe' from an example component o-example.
```diff
-@include oColorsFor(o-example-row-stripe, background border);
+background: oColorsByUsecase('row-stripe', 'background', $from: 'o-example');
+border: oColorsByUsecase('row-stripe', 'border', $from: 'o-example');
```

#### oColorsGetColorFor

`oColorsGetColorFor` has been removed and should be replaced with a call to `oColorsByUsecase`. By default `oColorsByUsecase` now errors if a usecase isn't found, unless a `$fallback` colour has been given (which may be `null`). If the usecase doesn't exist and an error is thrown remove the property.

E.g. when requesting the page background from o-colors:
```diff
-background: oColorsGetColorFor('page', 'background');
+background: oColorsByUsecase('page', 'background');
```

E.g. if no property is requested by `oColorsGetColorFor` explicitly choose one when migrating to `oColorsByUsecase` (one of 'text', 'background', 'border', or 'outline'):
```diff
-color: oColorsGetColorFor('section-life-arts');
+color: oColorsByUsecase('section-life-arts', 'text');
```

E.g. set fallback colours using `$fallback`:
```diff
-background-color: oColorsGetColorFor('page', 'background', $options: ('default': 'white'));
+background-color: oColorsByUsecase('page', 'background', $fallback: 'white');
```

#### oColorsGetContrastRatio

The arguments of `oColorsGetContrastRatio` have been renamed. `$col1` becomes `$color-a` and `$col2` becomes `$color-b`. As well as a CSS colour, palette colour names are now also accepted.

```diff
	$contrast: oColorsGetContrastRatio(#ffffff, #000000);
-	$contrast: oColorsGetContrastRatio($col1: oColorsGetPaletteColor('paper'), $col2: oColorsGetPaletteColor('teal'));
+	$contrast: oColorsGetContrastRatio($color-a: 'paper', $color-b: 'teal');
```

#### oColorsGetTint

Instead of `oColorsGetTint` use `oColorsGetTone`, with `$color-name` as the first argument instead of `$color`:

```diff
-$tint: oColorsGetTint('teal', 50);
+$tint: oColorsGetTone('teal', 50);

-$tint: oColorsGetTint($color: 'teal', 50);
+$tint: oColorsGetTone($color-name: 'teal', 50);
```

`oColorsGetTint` used to fallback to a mix if a tone is not supported but `oColorsGetTone` now errors. In this case call `oColorsMix` explicitly:

```diff
-$tint: oColorsGetTint('black', 50);
+$tint: oColorsMix('black', $percentage: 50);
```

#### oColorsCheckContrast

This function has been removed. If used, implement a custom check with [oColorsGetContrastRatio](#oColorsGetContrastRatio) instead.

#### oColorsGetWCAGRating

This function has been removed. If used, implement a custom check with [oColorsGetContrastRatio](#oColorsGetContrastRatio) instead.

### Upgrading from v3 to v4

o-colors v4.x.x updates the entire palette of colors and adds a lot more functionality through new mixins and functions. The palette has been reduced from over 60 colors to a base palette of around 20 colors. These colors can be manipulated using new mixins to get a wide range of on brand colors accessibility compliant colors.

In addition, new use cases have been added for `opinion`, `hero` and `highlight` branding.
The `product-brand` use case has been removed.

To migrate from v3.x.x to use v4.x.x you will need to update the palette colors you are requesting using `oColorsFor`, `oColorsSetUseCase`, and `oColorsGetPaletteColor`. To work out which color names you need to update, see the following table:

| Old name              | Switch to                        |
| --------------------- |----------------------------------|
| pink                  | paper                            |
| blue                  | oxford                           |
| dark-blue             | oxford-60                        |
| orange                | mandarin                         |
| grey-tint1            | black-30                         |
| grey-tint2            | black-40                         |
| grey-tint3            | black-50                         |
| grey-tint4            | black-70                         |
| grey-tint5            | black-80                         |
| pink-tint1            | black-5                          |
| pink-tint2            | black-10                         |
| pink-tint3            | black-20                         |
| pink-tint4            | black-30                         |
| pink-tint5            | black-50                         |
| red                   | crimson                          |
| green                 | jade                             |
| orange-tint1          | _consult a designer_             |
| brown-tint1           | _consult a designer_             |
| yellow-tint1          | _consult a designer_             |
| green-tint1           | _consult a designer_             |
| bluegreen-tint1       | _consult a designer_             |
| silver-tint1          | _consult a designer_             |
| purple-tint1          | _consult a designer_             |
| purple-tint2          | black-50 (_consult a designer_)  |
| red-tint1             | _consult a designer_             |
| red-tint2             | _consult a designer_             |
| red-tint3             | _consult a designer_             |
| red-tint4             | _consult a designer_             |
| red-tint5             | _consult a designer_             |
| blue-tint1            | _consult a designer_             |
| blue-tint2            | _consult a designer_             |
| blue-tint3            | _consult a designer_             |
| blue-tint4            | _consult a designer_             |
| blue-tint5            | _consult a designer_             |
| section-purple        | velvet                           |
| section-light-purple  | _consult a designer_             |
| section-blue          | blue-80                          |
| section-light-blue    | sky                              |
| section-green         | use `oColorsGetTint('jade', 65)` |
| section-light-green   | _consult a designer_             |
| section-red           | crimson                          |
| warm-1                | wheat                            |
| warm-2                | black-5                          |
| warm-3                | black-20                         |
| warm-4                | black-90                         |
| warm-5                | white-60                         |
| warm-6                | black-80 (_consult a designer_)  |
| cold-1                | black-70                         |
| cold-2                | black-80                         |
| cold-3                | black-90                         |
| blue-1                | oxford-30                        |
| blue-2                | _consult a designer_             |
| purple-1              | velvet                           |
| purple-2              | _consult a designer_             |
| teal-1                | teal-40                          |
| teal-2                | teal-80                          |
| claret-1              | claret                           |
| claret-2              | candy                            |
| claret-inverse        | claret-30                        |
| org-b2b               | org-b2c                          |
| org-b2c-dark          | org-b2c-dark                     |
| org-b2c-light         | org-b2c-light                    |

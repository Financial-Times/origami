## Migration Guide

### Migrating from v6 to o3-foundation@3

o-colors is now replaced by [o3-foundation](../o3-foundation/README.md).

One of the major changes in Origami 3 is the removal of Sass, we now use plain CSS for Origami components.

This guide will update to `o3-foundation@3`. Be sure to
check [o3-foundation's migration guide](../o3-foundation/MIGRATION.md) for any further updates.

#### Mixins

##### `oColors`

###### Replace `o-colors-*` classes.

`o3-foundation` provides [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) but no utility CSS classes. Instead, author your own CSS to apply the correct colours to either `background` or `color`.

| o-colors class           | o3-foundation CSS                                    |
| ------------------------ | ---------------------------------------------------- |
| o-colors-page-background | background: var(--o3-color-use-case-page-background) |
| o-colors-body-text       | color: var(--o3-color-use-case-body-text)            |
| o-colors-muted-text      | color: var(--o3-color-use-case-muted-text)           |

For example, to set a page background colour:

```scss
$o-brand: '[your-brand]';
@import '@financial-times/o-colors/main';
@include oColors();
```

```html
<body class="o-colors-page-background"></body>
```

Becomes:

```css
@import '@financial-times/o3-foundation/[your-brand].css';
body {
	background-color: var(--o3-color-use-case-page-background);
}
```

###### Replace `--o-colors-*` CSS Custom Properties.

Instead, use `o3-foundation` [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

| o-colors                   | o3-foundation                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| --o-colors-page-background | --o3-color-use-case-page-background                                                                                               |
| --o-colors-box-background  | Removed. Use the palette directly (core brand: --o3-color-palette-wheat; --o3-color-palette-slate-white-5 for the internal brand) |
| --o-colors-body-text       | --o3-color-use-case-body-text                                                                                                     |
| --o-colors-muted-text      | --o3-color-use-case-body-text                                                                                                     |
| --o-colors-link-text       | --o3-color-use-case-link-text                                                                                                     |
| --o-colors-link-hover-text | --o3-color-use-case-link-text-hover                                                                                               |

Some colour use-case CSS Custom Properties have no direct replacement. Instead use the colour palette directly, according to your brand.

| o-colors                  | o3-foundation (core)     | o3-foundation (internal)         |
| ------------------------- | ------------------------ | -------------------------------- |
| --o-colors-box-background | --o3-color-palette-wheat | --o3-color-palette-slate-white-5 |

For example, to set a page background colour:

```diff
body {
-	background-color: var(--o-colors-page-background)
+	background-color: var(--o3-color-use-case-page-background)
}
```

##### `oColorsSetColor`

There is no direct equivalent. Instead we recommend creating your own [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), prefixed with your project name.

E.g. if working on a project `ft-example-project` to define a custom `pink` colour:

```diff
-@include oColorsSetColor($color-name: 'ft-example-project/pink', $color-value: #ff69b4);
-color: oColorsGetByName('ft-example-project/pink');
+--ft-example-project-pink: #ff69b4;
+color: var(--ft-example-project-pink);
```

##### `oColorsSetUseCase`

There is no direct equivalent. Instead we recommend creating your own [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), prefixed with your project name.

E.g. if working on a project `ft-example-project` to define a custom usecase for a `card` `background` colour:

```diff
-@include oColorsSetUseCase('ft-example-project-card', (
-	'background': red,
-));
-background: oColorsByUsecase($usecase: 'ft-example-project-card', $property: background);
+--ft-example-project-card-background: red;
+background: var(--ft-example-project-card-background);
```

#### Functions

##### `oColorsByName`

Use `o3-foundation` CSS Custom Properties instead, `--o3-color-palette-[name]`.

```diff
-color: oColorsByName('ft-pink');
+color: var(--o3-color-palette-ft-pink);
```

See our [colour design guidelines](https://origami-for-everyone.ft.com/guides/colours/) for a full list of supported palette colours for your brand. Please contact the Origami team should you find a missing colour.

##### `oColorsByUsecase`

Use `o3-foundation` CSS Custom Properties instead, `--o3-color-use-case-[usecase]`.

| o-colors                                        | o3-foundation                                    |
| ----------------------------------------------- | ------------------------------------------------ |
| oColorsByUsecase('focus', 'outline');           | var(--o3-color-use-case-focus-outline-standard)  |
| oColorsByUsecase('page', 'background');         | var(--o3-color-use-case-page-background)         |
| oColorsByUsecase('page-inverse', 'background'); | var(--o3-color-use-case-page-inverse-background) |
| oColorsByUsecase('link', 'text');               | var(--o3-color-use-case-link-text)               |
| oColorsByUsecase('link-hover', 'text');         | var(--o3-color-use-case-link-text-hover)         |
| oColorsByUsecase('body', 'text');               | var(--o3-color-use-case-body-text)               |
| oColorsByUsecase('body-inverse', 'text');       | var(--o3-color-use-case-body-inverse-text)       |
| oColorsByUsecase('muted', 'text');              | var(--o3-color-use-case-muted-text)              |

Some colour use-cases have no direct replacement. Instead use the colour palette directly, according to your brand.

| o-colors                                                      | o3-foundation (core)              | o3-foundation (internal)               |
| ------------------------------------------------------------- | --------------------------------- | -------------------------------------- |
| oColorsByUsecase('box', 'background');                        | var(--o3-color-palette-wheat)     | var(--o3-color-palette-slate-white-5)  |
| oColorsByUsecase('link-title', 'text');                       | var(--o3-color-palette-black-80)  | var(--o3-color-palette-slate-white-15) |
| oColorsByUsecase('link-title-hover', 'text');                 | var(--o3-color-palette-black-70)  | var(--o3-color-palette-slate-white-15) |
| oColorsByUsecase('title', 'text');                            | var(--o3-color-palette-black)     | var(--o3-color-palette-slate)          |
| oColorsByUsecase('tag-link', 'text');                         | var(--o3-color-palette-claret)    | n/a                                    |
| oColorsByUsecase('tag-link-hover', 'text');                   | var(--o3-color-palette-claret-30) | n/a                                    |
| oColorsByUsecase('opinion-tag-link', 'text');                 | var(--o3-color-palette-oxford)    | n/a                                    |
| oColorsByUsecase('opinion-tag-link-hover', 'text');           | var(--o3-color-palette-oxford-30) | n/a                                    |
| oColorsByUsecase('opinion', 'background');                    | var(--o3-color-palette-sky)       | n/a                                    |
| oColorsByUsecase('hero', 'background');                       | var(--o3-color-palette-wheat)     | n/a                                    |
| oColorsByUsecase('hero-opinion', 'background');               | var(--o3-color-palette-oxford)    | n/a                                    |
| oColorsByUsecase('hero-highlight', 'background');             | var(--o3-color-palette-claret)    | n/a                                    |
| oColorsByUsecase('section-life-arts', \[any-property\]);      | var(--o3-color-palette-velvet)    | n/a                                    |
| oColorsByUsecase('section-life-arts-alt', \[any-property\]);  | var(--o3-color-palette-candy)     | n/a                                    |
| oColorsByUsecase('section-magazine', \[any-property\]);       | var(--o3-color-palette-oxford)    | n/a                                    |
| oColorsByUsecase('section-magazine-alt', \[any-property\]);   | var(--o3-color-palette-sky)       | n/a                                    |
| oColorsByUsecase('section-house-home', \[any-property\]);     | var(--o3-color-palette-jade)      | n/a                                    |
| oColorsByUsecase('section-house-home-alt', \[any-property\]); | var(--o3-color-palette-wasabi)    | n/a                                    |
| oColorsByUsecase('section-money', \[any-property\]);          | var(--o3-color-palette-crimson)   | n/a                                    |
| oColorsByUsecase('section-money-alt', \[any-property\]);      | var(--o3-color-palette-white)     | n/a                                    |

See our [colour design guidelines](https://origami-for-everyone.ft.com/guides/colours/) for a full list of supported colour usecases for your brand. Please contact the Origami team should you find a missing use-case, or would like to propose another.

E.g:

```diff
-color: oColorsByUsecase($usecase: 'page', $background: 'property');
+color: var(--o3-color-use-case-page-background);
```

```diff
-outline-color: oColorsByUsecase($usecase: 'focus', $background: 'outline');
+outline-color: var(--o3-color-use-case-focus-outline-standard);
```

##### `oColorsGetTone`

use `o3-foundation` CSS Custom Properties for tints (also known as tones), use these instead of `oColorsGetTone`.

E.g:

```diff
-background-color: oColorsGetTone($color-name: 'teal', $brightness: '100');
+background-color: var(--o3-color-palette-teal-100);
```

A limited set of tints are now available. See our [colour design guidelines](https://origami-for-everyone.ft.com/guides/colours/) for a full list of supported tints for your brand. If your tint value is no longer supported, please consult with a design team member or the Origami team to pick an alternative. Please reach out to the Origami team for support as needed.

```diff
-background-color: oColorsGetTone($color-name: 'claret', $brightness: '27');
+background-color: var(--o3-color-palette-claret-30);
```

##### `oColorsGetToneDetails`

There is no direct replacement for `oColorsGetToneDetails`. Please contact the Origami team for support if your product relies on this function.

##### `oColorsMix`

There is no direct replacement for `oColorsMix`. We recommend using the compiled value directly, with a CSS comment.

For example instead of this Sass:

```scss
color: oColorsMix('slate', 'white', 60);
```

Write instead the generated value `#7d7f85` and a comment to explain `/* mix: slate, white, 60 */`:

```css
color: #7d7f85; /* mix: slate, white, 60 */
```

We recommend this path as [we found there is little consistency in how these mixes are used](https://docs.google.com/document/d/1jbb33VDeSN1qG-oF3AyUhn3oBEgNOIldkkp0qe18Fto/edit). In the future we intend to review these mixes as we audit components and patterns. We are also open to introducing CSS based functionality to lighten or darken our palette colours (i.e. mix with black or white) or enable our colour palette to have transparency (i.e mix with `transparent`). Please contact the Origami team if you would like to request this feature.

##### `oColorsGetTextColor`

There is no direct replacement for `oColorsGetTextColor`. We recommend manually using the `o3-foundation` CSS Custom Property `--o3-color-use-case-body` for light backgrounds and `--o3-color-use-case-body-inverse` for dark backgrounds.

Please contact the Origami team for support if this is not possible or practical.

##### `oColorsColorBrightness`

There is no direct replacement for `oColorsColorBrightness`, we [recommend moving away from Sass logic](https://docs.google.com/document/d/1RuGduWdX0zGsgsp9C7lIhXgqEia6sWK900_3XVwYDIM/edit#heading=h.1f3yolavobef). Please contact the Origami team for support if you still rely on this Sass feature.

##### `oColorsColorLuminance`

There is no direct replacement for `oColorsColorLuminance`, we [recommend moving away from Sass logic](https://docs.google.com/document/d/1RuGduWdX0zGsgsp9C7lIhXgqEia6sWK900_3XVwYDIM/edit#heading=h.1f3yolavobef). Please contact the Origami team for support if you still rely on this Sass feature.

##### `oColorsGetContrastRatio`

There is no direct replacement for `oColorsGetContrastRatio`, we [recommend moving away from Sass logic](https://docs.google.com/document/d/1RuGduWdX0zGsgsp9C7lIhXgqEia6sWK900_3XVwYDIM/edit#heading=h.1f3yolavobef). Please contact the Origami team for support if you still rely on this Sass feature.

##### `oColorsGetPaletteDetails`

There is no direct replacement for `oColorsGetPaletteDetails`. Please contact the Origami team for support if your product relies on this function.

#### Variables

##### `o-colors-is-silent`

Follow the migration steps above to safely delete this variable. If set to `false` ensure you follow the steps outlined in the [oColors](#oColors) mixin guide.

### Migrating from v5 to v6

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/documentation/tutorials/bower-to-npm/).

### Upgrading from v4 to v5

#### CSS Classes

`o-colors` no longer outputs CSS classes for palette colours or all usecases. Sass users should use Sass functions to set colours instead. Build service users should use the palette's CSS Custom Properties (CSS Variables). If that is not possible due to browser support requirements please contact the Origami team.

Removed CSS classes for colour usecase:

```diff
- .o-colors-focus-outline
- .o-colors-link-text
- .o-colors-link-hover-text
- .o-colors-link-title-text
- .o-colors-link-title-hover-text
- .o-colors-tag-link-text
- .o-colors-tag-link-hover-text
- .o-colors-opinion-tag-link-text
- .o-colors-opinion-tag-link-hover-text
- .o-colors-title-text
- .o-colors-opinion-background
- .o-colors-hero-background
- .o-colors-hero-opinion-background
- .o-colors-hero-highlight-background
- .o-colors-section-life-arts-all
- .o-colors-section-life-arts-alt-all
- .o-colors-section-magazine-all
- .o-colors-section-magazine-alt-all
- .o-colors-section-house-home-all
- .o-colors-section-house-home-alt-all
- .o-colors-section-money-all
- .o-colors-section-money-alt-all
```

Removed CSS classes for palette colours:

```diff
- .o-colors-palette-paper
- .o-colors-palette-claret
- .o-colors-palette-oxford
- .o-colors-palette-teal
- .o-colors-palette-wheat
- .o-colors-palette-sky
- .o-colors-palette-slate
- .o-colors-palette-velvet
- .o-colors-palette-mandarin
- .o-colors-palette-lemon
- .o-colors-palette-candy
- .o-colors-palette-wasabi
- .o-colors-palette-jade
- .o-colors-palette-crimson
- .o-colors-palette-org-b2c
- .o-colors-palette-org-b2c-dark
- .o-colors-palette-org-b2c-light
```

#### Sass

The following colours have been removed from the palette:

- `inherit`. Replace `oColorsGetPaletteColor('inherit');` with `inherit`.

Deprecated internal and whitelabel brand palette colours were removed. Please contact Origami if your product has a usecase for one of the removed colours:

- Internal brand: candy, wasabi, org-b2c, org-b2c-dark, org-b2c-light, paper, wheat, sky, velvet, claret.
- Whitelabel brand: all colours except black and white have been removed.

Note: mandarin was removed from the internal brand in v5.0.0 but restored in v5.1.1.

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

- `$o-colors-palette` has been removed. Use `oColorsSetColor` to add to the palette or customise a default o-colors palette colour; `oColorsByName` to fetch colors from the palette; or `oColorsGetPaletteDetails` to iterate over each colour in the palette.
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

`oColorsGetPaletteColor` is now `oColorsByName`. The `$name` argument has been renamed `$color-name`.

To fetch a default `o-colors` colour.

```diff
-color: oColorsGetPaletteColor('paper');
+color: oColorsByName('paper');
```

To fetch a colour set by a component or project other that `o-colors` include the namespace followed by a forward slash.

```diff
// Fetch the colour 'stormy' from the component 'o-example'.
-color: oColorsGetPaletteColor('o-example-story');
+color: oColorsByName('o-example/stormy');
```

Or with argument names:

```diff
// Fetch the colour 'stormy' from the component 'o-example'.
-color: oColorsGetPaletteColor($name: 'o-example-story');
+color: oColorsByName($color-name: 'o-example/stormy');
```

#### oColorsSetColor

- The arguments of `oColorsSetColor` have changed.
- It errors when overriding an existing palette colour which was not set by o-colors.

A namespace, for your project or component, must now be given with a forward slash:

```diff
// Setting a custom colour 'pink' within a component 'o-example'.
- @include oColorsSetColor('o-example-pink', #ff69b4);
+ @include oColorsSetColor('o-example/pink', #ff69b4);
```

The color name argument no longer accepts a list to deprecate colours. Instead use the new `$opts` argument.

```diff
// Setting a  custom colour 'pink', which is deprecated.
- @include oColorsSetColor('o-example-pink', (#ff69b4, _deprecated));
+ @include oColorsSetColor('o-example/pink', #ff69b4, (deprecated: true));
```

#### oColorsSetUseCase

- The arguments of `oColorsSetUseCase` have changed.
- It errors when overriding an existing usecase which was not set by o-colors.

A namespace, for your project or component, must now be given with a forward slash.
And properties are given with a map:

```diff
// Setting a custom usecase within a component 'o-example'.
// The usecase describes stripes, which have a background, text colour, and border.
-@include oColorsSetUseCase('o-example-stripe', 'text', 'white');
-@include oColorsSetUseCase('o-example-stripe', 'background', 'black');
-@include oColorsSetUseCase('o-example-stripe', 'border', 'black-50');
+@include oColorsSetUseCase('o-example/stripe', (
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
+@include oColorsSetUseCase('o-example/stripe', (
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
+background: oColorsByUsecase('o-example/row-stripe', 'background');
+border: oColorsByUsecase('o-example/row-stripe', 'border');
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

| Old name             | Switch to                        |
| -------------------- | -------------------------------- |
| pink                 | paper                            |
| blue                 | oxford                           |
| dark-blue            | oxford-60                        |
| orange               | mandarin                         |
| grey-tint1           | black-30                         |
| grey-tint2           | black-40                         |
| grey-tint3           | black-50                         |
| grey-tint4           | black-70                         |
| grey-tint5           | black-80                         |
| pink-tint1           | black-5                          |
| pink-tint2           | black-10                         |
| pink-tint3           | black-20                         |
| pink-tint4           | black-30                         |
| pink-tint5           | black-50                         |
| red                  | crimson                          |
| green                | jade                             |
| orange-tint1         | _consult a designer_             |
| brown-tint1          | _consult a designer_             |
| yellow-tint1         | _consult a designer_             |
| green-tint1          | _consult a designer_             |
| bluegreen-tint1      | _consult a designer_             |
| silver-tint1         | _consult a designer_             |
| purple-tint1         | _consult a designer_             |
| purple-tint2         | black-50 (_consult a designer_)  |
| red-tint1            | _consult a designer_             |
| red-tint2            | _consult a designer_             |
| red-tint3            | _consult a designer_             |
| red-tint4            | _consult a designer_             |
| red-tint5            | _consult a designer_             |
| blue-tint1           | _consult a designer_             |
| blue-tint2           | _consult a designer_             |
| blue-tint3           | _consult a designer_             |
| blue-tint4           | _consult a designer_             |
| blue-tint5           | _consult a designer_             |
| section-purple       | velvet                           |
| section-light-purple | _consult a designer_             |
| section-blue         | blue-80                          |
| section-light-blue   | sky                              |
| section-green        | use `oColorsGetTint('jade', 65)` |
| section-light-green  | _consult a designer_             |
| section-red          | crimson                          |
| warm-1               | wheat                            |
| warm-2               | black-5                          |
| warm-3               | black-20                         |
| warm-4               | black-90                         |
| warm-5               | white-60                         |
| warm-6               | black-80 (_consult a designer_)  |
| cold-1               | black-70                         |
| cold-2               | black-80                         |
| cold-3               | black-90                         |
| blue-1               | oxford-30                        |
| blue-2               | _consult a designer_             |
| purple-1             | velvet                           |
| purple-2             | _consult a designer_             |
| teal-1               | teal-40                          |
| teal-2               | teal-80                          |
| claret-1             | claret                           |
| claret-2             | candy                            |
| claret-inverse       | claret-30                        |
| org-b2b              | org-b2c                          |
| org-b2c-dark         | org-b2c-dark                     |
| org-b2c-light        | org-b2c-light                    |

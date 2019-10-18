## Migration Guide

### Upgrading from v4 to v5

`o-colors` no longer outputs CSS classes for usecases. If your project used these classes instead use Sass mixins or CSS Custom Properties (Variables). If this isn't possible, e.g. due to browser support requirements, please contact the Origami team.

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

The following have been removed from the palette:

- `inherit`. Replace `oColorsByName('inherit');` with `inherit`.
- `transparent`. Replace `oColorsByName('transparent');` with `transparent`.

The following variables have changed:

- `$o-colors-palette` has been removed. Use `oColorsSetColor` to add to the palette or customise a default o-colors palette colour; `oColorsByName` to fetch colors from the palette; or `oColorsGetPalette` to iterate over each colour in the palette.
- `$o-colors-usecases` has been removed. Use `oColorsSetUseCase` to add to add a usecase or customise a default o-colors usecase; or `oColorsByUsecase` to fetch a colour for a usecase.

The following mixins have changed:

- `oColors` no longer outputs usecase CSS classes.
- `oColorsGetPaletteColor` is now [`oColorsByName`](#oColorsByName).
- [`oColorsSetColor`](#oColorsSetColor) has updated arguments.
- [`oColorsSetUseCase`](#oColorsSetUseCase) has updated arguments.
- `oColorsGetUseCase` is now [`oColorsByUsecase`](#oColorsByUsecase).

#### oColors

As `o-colors` [no longer outputs usecase CSS classes](#MIGRATION.md#migrating-from-v4-to-v5) the option 'usecase-classes' is removed from the `oColors` mixin.

```diff
@include oColors($opts: (
	'palette-custom-properties': true,
	'palette-classes': true,
-	'usecase-classes': true
));
```

#### oColorsByUsecase

`oColorsGetUseCase` is now `oColorsByUsecase`. By default `oColorsByUsecase` now errors if a usecase isn't found, unless a `$fallback` colour has been given (which may be `null`). A list of usecases are no longer accepted. `oColorsByUsecase` also has a new `$from` argument, to get usecases set by different component or projects.

If getting a usecase set by o-colors update the mixin name:
```diff
-background-color: oColorsGetUseCase('page', 'background');
+background-color: oColorsByUsecase('page', 'background');
```

Note `all` is no longer a valid property when getting a usecase. Instead use one of 'text', 'background', 'border', or 'outline'.
```diff
-color: oColorsGetUseCase('page', 'all');
+color: oColorsByUsecase('page', 'text');
```

If getting a usecase set by a different project or component use the `$from` argument:
```diff
-background-color: oColorsGetUseCase('o-example-row-stripe', 'background');
+background-color: oColorsByUsecase('row-stripe', 'background', 'o-example');
```

Or with argument names:
```diff
-background-color: oColorsGetUseCase('o-example-row-stripe', 'background');
+background-color: oColorsByUsecase($usecase: 'row-stripe', $property: 'background', $from: 'o-example');
```

If a missing usecase is acceptable set the `$fallback` argument to an alternative colour to use or `null` (Sass will remove any CSS properties which are set to `null`):
```scss
background-color: oColorsByUsecase($usecase: 'row-stripe', $property: 'background', $fallback: null); // background-color will not be set if the row-stripe background colour isn't found
color: oColorsByUsecase($usecase: 'row-stripe', $property: 'background', $fallback: 'black'); // black will be used if the row-stripe colour isn't found
```

#### oColorsByName

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

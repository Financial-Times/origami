# o-colors Sass Documentation
## Mixins
### oColors
Output `o-colors` CSS.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | - |The o-colors features to output. See the [readme](https://registry.origami.ft.com/components/o-colors) for a full list of options. |
#### Examples
##### Example 1
all `o-colors` styles.

```Output
@include oColors();
```
##### Example 2
only `o-colors` CSS custom properties ("CSS variables") for palette colours and usecases.

```Output
@include oColors($opts: (
	'palette-custom-properties': true,
	'usecase-custom-properties': true
));
```
##### Example 3
only `o-colors` classes for usecases.

```Output
@include oColors($opts: (
	'usecase-classes': true
));
```
### oColorsSetColor
Define a new palette color.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| color-name | String | - |The name of the colour e.g. 'o-example/paper'. |
| color-value | Color | - |The colour to set e.g. #ff69b4. |
| opts | Map | () |A map of options. Accepts a `deprecated` key with a message to deprecated a set colour e.g. `$opts: (deprecated: 'your deprecation message')`. |
#### Examples
##### Example 1
Add a custom palette color

```scss
@include oColorsSetColor($color-name: 'o-example/pink', $color-value: #ff69b4);
```
##### Example 2
Deprecate a set colour (removing a color from the palette is considered a breaking change and requires a major release).

```scss
@include oColorsSetColor (
	$color-name: 'o-example/pink',
	$color-value #ff69b4,
	$opts: (
		'allow-tones': true,
		'deprecated': 'your deprecation message'
	)
);
```
### oColorsSetUseCase
Add a custom use case property.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| usecase | String | - |The name of the usecase, e.g. 'page'. |
| colors | Map | - |A map of properties ('text', 'background', 'border', or 'outline') to a color. |
| opts | Map | () |A map of options. Accepts a `deprecated` key with a deprecation message for the usecase e.g. `$opts: (deprecated: 'your deprecation message')`, or a map to deprecate a specific property e.g. `(deprecated: (background: 'your deprecation message'))`. |
#### Examples
##### Example 1
a 'stripe' usecase with background, text, and border colour within a component 'o-example'.

```Setting
@include oColorsSetUseCase('o-example/stripe', (
	'text': 'white',
	'background': 'black',
	'border': 'black-50'
));
```
##### Example 2
a custom colour to a 'stripe' usecase with background.

```Setting
@include oColorsSetColor('o-example/my-pink', #ff69b4);
@include oColorsSetUseCase('o-example/stripe', (
	'background': 'o-example/my-pink',
));
```
##### Example 3
all usecase properties (removing a colour usecase is a breaking change).

```Deprecating
@include oColorsSetUseCase('o-example/stripe', (
	'text': 'white',
	'background': 'black',
	'border': 'black-50'
), (deprecated: 'o-example has no stripes anymore.'));
```
##### Example 4
particular usecase properties e.g. "border" (removing a usecase property is a breaking change).

```Deprecating
  @include oColorsSetUseCase('o-example/stripe', (
   		'text': 'white',
   		'background': 'black',
   		'border': 'black-50',
), ('deprecated': ('border': 'o-example stripes have no border anymore.')));
```
## Functions
### oColorsByName (...)
Return the CSS color for a palette color name.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| color-name | String | - |The name of the colour to get. |
### oColorsByUsecase (...)
Return the defined palette color for a use case / property combination



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| usecase | String | - |The name of the usecase, e.g. 'page'. |
| property | String | - |The usecase property e.g. 'text', 'background', 'border', 'outline' |
| fallback | String,Color,Null | - |The fallback if the usecase is not found. Either a colour, palette colour string, or `null` (note: the default is `false` to indicate no fallback). |
### oColorsGetTone (...)
Returns a brighter or darker tone of a colour, where the hue remains
the same but the saturation and luminance changes.

Not all our colours allow tones. If a colour cannot be toned an error is
thrown. You may however mix the colour with another supported colour.


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| color-name | String | - |the name of the color to be shaded |
| brightness | Number | - |the brightness value of the new color, 0-100 |
### oColorsGetToneDetails (...)
Figure out if a given colour is a tone. If it is a tone return the original
colour name and its tone brightness, otherwise return null.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| color | String | - |the palette colour or color name e.g. 'claret-80' |
#### Examples
##### Example 1
the tone brightness of 'claret-80'

```Get
$tone-details: oColorsGetToneDetails('claret-80');
$color-name: map-get($tone-details, 'color-name'); // claret
$brightness: map-get($tone-details, 'brightness'); // 80
```
### oColorsMix (...)
Returns a color based on the background context and base color
at the supplied percentage



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| color | String,Color | black |palette name of color |
| background | String,Color | paper |palette name of background color |
| percentage | Number | 60 |percentage opacity of the foreground color over the background |
### oColorsGetTextColor (...)
Returns a text color based on the background and
an opacity percentage the color should appear at



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| background | Color,String | - |the color or palette color name of the background the text will appear on |
| opacity | Number | 100 |the opacity percentage the text color should appear at |
| minimum-contrast | String,Null | 'aa-normal' |the minimum contrast ratio standard between the background and the returned text color, one of: aa-normal, aa-large, aaa-normal, aaa-large. See [WCAG 2.1 guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum). If the contrast ratio is too low to meet the selected guideline an error is thrown. Set to `null` to remove contrast checking and never throw an error. |
### oColorsColorBrightness (...)
Work out the brightness value in % of a color
From: https://gist.github.com/jlong/f06f5843104ee10006fe



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| color | Color | - |color value to get brightness from (either a CSS colour or o-colors palette colour name) |
### oColorsColorLuminance (...)
Returns the luminance of `$color` as a float (between 0 and 1)
1 is pure white, 0 is pure black.
From: https://css-tricks.com/snippets/sass/luminance-color-function/


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| color | String,Color | - |The colour to return a luminance for (either a CSS colour or o-colors palette colour name) |
### oColorsGetContrastRatio (...)
Calculate the contrast ratio between two colours.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| color-a | String,Color | - |first colour to compare (either a CSS colour or o-colors palette colour name) |
| color-b | String,Color | - |second colour to compare (either a CSS colour or o-colors palette colour name)
Based on the JS in https://github.com/LeaVerou/contrast-ratio/blob/gh-pages/contrast-ratio.js |
### oColorsGetPaletteDetails (...)
Get a list of palette colour details, including the colour name.

## Variables
### o-colors-is-silent (`Bool`)
Silent mode


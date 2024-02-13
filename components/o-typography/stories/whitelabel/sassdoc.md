# o-typography Sass Documentation
## Mixins
### oTypography
Output o-typography features.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | ('headings': (1, 2, 3, 4, 5, 6), 'wrapper': true, 'body': true, 'links': true, 'lists': ('ordered', 'unordered'), 'caption': true, 'footer': true, 'utilities': true) |The features of o-typography to output classes for. See the [README](https://registry.origami.ft.com/components/o-typography/readme) for more details. |
#### Examples
##### Example 1
all o-typography css classes.

```Output
@include oTypography();
```
##### Example 2
a granular selection of o-typography css classes. See the [README](https://registry.origami.ft.com/components/o-typography/readme) for a full list of options.

```Output
@include oTypography((
	'body': true,
	'headings': (1, 2, 3),
	'lists': ('unordered'),
));
```
### oTypographyCustomize
Helper for `whitelabel` brand variable customisation.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| variables | Map | - |Brand variables to customise |
#### Examples
##### Example 1
```scss
@include oTypographyCustomize((
    'heading-level-one': (
        'scale': 5,
        'scale-s': 7,
        'weight': 'semibold'
    ),
    'heading-level-two': (
        'scale': 6
    ),
    'heading-level-three': (
        'scale': 5
    ),
    'heading-level-four': (
        'scale': 4
    ),
    'heading-level-five': (
        'scale': 3
    ),
    'heading-level-six': (
        'scale': 2
    )
));
```
### oTypographySerif
Outputs typography styles for the Serif font.
Including: family, size, line-height, weight, style, and font sizes
for progressive font loading.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| scale | Null,Number | null |a scale number to output a font-size and line-height property |
| line-height | Null,Number | null |custom line-height value to use instead of the scale's default |
| weight | Null,String | null |output a font-weight property, e.g. 'bold', 'semibold' |
| style | Null,String | null |output a font-style property, e.g. 'italic' |
| include-font-family | Boolean | true |Set to false to exclude the font-family property from the output. This is useful when resizing typography, where the serif font-family is inherited from a parent element. |
| include-progressive | Boolean | true |Set to false to exclude styles used for progressive font loading (font-family and size fallbacks for loading fonts). |
#### Examples
##### Example 1
a font-family property only for the serif font.

```Output
@include oTypographySerif();
```
##### Example 2
font-family, font-size, and line-height for the serif font.

```Output
@include oTypographySerif($scale: 1);
```
##### Example 3
font-family, font-size, and line-height for the serif font. Set a custom line-height of 1.6.

```Output
@include oTypographySerif($scale: 1, $line-height: 1.6);
```
##### Example 4
font-family, font-size, line-height, and font-weight for the serif font.

```Output
@include oTypographySerif($scale: 1, $weight: 'bold');
```
##### Example 5
font-family, font-size, line-height, and font-style for the serif font.

```Output
@include oTypographySerif($scale: 1, $style: 'italic');
```
##### Example 6
serif font properties without font-family.

```Output
@include oTypographySerif($scale: 1, $style: 'italic', $include-font-family: false);
```
##### Example 7
serif font properties without sizes for the fallback font (without progressive font loading).

```Output
@include oTypographySerif($scale: 1, $style: 'italic', $include-progressive: false);
```
### oTypographyDisplay
Outputs typography styles for the Display font.
Including: family, size, line-height, weight, style, and font sizes
for progressive font loading.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| scale | Null,Number | null |a scale number to output a font-size and line-height property |
| line-height | Null,Number | null |custom line-height value to use instead of the scale's default |
| weight | Null,String | null |output a font-weight property, e.g. 'bold', 'semibold' |
| style | Null,String | null |output a font-style property, e.g. 'italic' |
| include-font-family | Boolean | true |Set to false to exclude the font-family property from the output. This is useful when resizing typography, where the display font-family is inherited from a parent element. |
| include-progressive | Boolean | true |Set to false to exclude styles used for progressive font loading (font-family and size fallbacks for loading fonts). |
#### Examples
##### Example 1
a font-family property only for the display font.

```Output
@include oTypographyDisplay();
```
##### Example 2
font-family, font-size, and line-height for the display font.

```Output
@include oTypographyDisplay($scale: 1);
```
##### Example 3
font-family, font-size, and line-height for the display font. Set a custom line-height of 1.6.

```Output
@include oTypographyDisplay($scale: 1, $line-height: 1.6);
```
##### Example 4
font-family, font-size, line-height, and font-weight for the display font.

```Output
@include oTypographyDisplay($scale: 1, $weight: 'bold');
```
##### Example 5
font-family, font-size, line-height, and font-style for the display font.

```Output
@include oTypographyDisplay($scale: 1, $style: 'italic');
```
##### Example 6
display font properties without font-family.

```Output
@include oTypographyDisplay($scale: 1, $style: 'italic', $include-font-family: false);
```
##### Example 7
display font properties without sizes for the fallback font (without progressive font loading).

```Output
@include oTypographyDisplay($scale: 1, $style: 'italic', $include-progressive: false);
```
### oTypographySans
Outputs typography styles for the Sans font.
Including: family, size, line-height, weight, style, and font sizes
for progressive font loading.




| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| scale | Null,Number | null |a scale number to output a font-size and line-height property |
| line-height | Null,Number | null |custom line-height value to use instead of the scale's default |
| weight | Null,String | null |output a font-weight property, e.g. 'bold', 'semibold' |
| style | Null,String | null |output a font-style property, e.g. 'italic' |
| include-font-family | Boolean | true |Set to false to exclude the font-family property from the output. This is useful when resizing typography, where the sans font-family is inherited from a parent element. |
| include-progressive | Boolean | true |Set to false to exclude styles used for progressive font loading (font-family and size fallbacks for loading fonts). |
#### Examples
##### Example 1
a font-family property only for the sans font.

```Output
@include oTypographySans();
```
##### Example 2
font-family, font-size, and line-height for the sans font.

```Output
@include oTypographySans($scale: 1);
```
##### Example 3
font-family, font-size, and line-height for the sans font. Set a custom line-height of 1.6.

```Output
@include oTypographySans($scale: 1, $line-height: 1.6);
```
##### Example 4
font-family, font-size, line-height, and font-weight for the sans font.

```Output
@include oTypographySans($scale: 1, $weight: 'bold');
```
##### Example 5
font-family, font-size, line-height, and font-style for the sans font.

```Output
@include oTypographySans($scale: 1, $style: 'italic');
```
##### Example 6
sans font properties without font-family.

```Output
@include oTypographySans($scale: 1, $style: 'italic', $include-font-family: false);
```
##### Example 7
sans font properties without sizes for the fallback font (without progressive font loading).

```Output
@include oTypographySans($scale: 1, $style: 'italic', $include-progressive: false);
```
### oTypographySetFont
Set a custom font.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| type | String | - |One of 'sans', 'serif', or 'display'. |
| family | String | - |The font family to set. |
#### Examples
##### Example 1
example shows setting a custom font "MySansFont" as the "sans" font.

```This
@include oTypographySetFont($type: 'sans', $family: 'MySansFont, sans');
```
### oTypographyDefineFontScale
Define the typographic scale for a given font. The font may be an existing or custom font.


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| family | String | - |The font name or family to apply a scale to. |
| scale | Map | - |A map of scale numbers as keys (-2 to 10), with list values of font size and line height "(-2: (12, 16), -1: (14, 16), 0: (16, 20))" etc... |
#### Examples
##### Example 1
example shows defining a custom font scale for a custom font "MySansFont". At scale "0" the font size will be 16px, and the line-height 20px.

```This
@include oTypographyDefineFontScale($family: 'MySansFont, sans', (
   -2: (12, 16),
   -1: (14, 18),
    0: (16, 20),
    1: (18, 24),
    2: (20, 26),
    3: (24, 32),
    4: (28, 36),
    5: (32, 42),
    6: (40, 52),
    7: (48, 62),
    8: (56, 72),
    9: (72, 94),
   10: (84, 110)
));
```
### oTypographyHeading
Output styles for page headings.


| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| level | Number | - |The heading level 1-5. |
#### Examples
##### Example 1
heading level 1 styles.

```Output
h1 {
	@include oTypographyHeading($level: 1);
}
```
##### Example 2
heading level 5 styles.

```Output
h5 {
	@include oTypographyHeading($level: 5);
}
```
### oTypographyBody
Body text styles

### oTypographySub
Subscript text

### oTypographySuper
Superscript text

### oTypographyLink
Output link styles.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| external | Boolean | false |This parameter is deprecated - we no longer output an icon for external links |
| theme | Map,String,Null | null |A custom theme to change the look of a link, with colours for properties `base` (the main link colour), `hover` (the links over colour), and optional `context` key. Context is the colour the link will be placed on, it defaults to the page background (paper for the core brand, white otherwise). |
| include-base-styles | Boolean | true |If set to false standard link styles will not be output, only additional styles required by a custom theme. |
#### Examples
##### Example 1
the styles for a standard link.

```Output
.my-link {
	@include oTypographyLink();
}
```
##### Example 2
a custom, claret coloured link to go on the default background colour (paper for the core brand, white otherwise).

```Output
.my-claret-link {
	@include oTypographyLink($theme: (
		'base': 'claret',
		'hover': 'claret-30',
	));
}
```
##### Example 3
a custom, lemon coloured link to go on a slate background.

```Output
.my-inverse-link {
	@include oTypographyLink($theme: (
		'base': 'lemon',
		'hover': 'lemon-30',
		'context': 'slate',
	));
}
```
### oTypographyList
Output styles for lists.
Styles child `li` elements. Apply to a
containing list element such as `ul` or `ol`.
Does not output font styles, these are
inherited (@see oTypographyBody).



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| type | String,Null | null |"ordered", "unordered", or null for just the base styles shared by all lists |
| include-base-styles | Boolean | true |set to false to exclude base styles which are shared by all list types |
#### Examples
##### Example 1
the styles for an unordered list.

```Output
.my-unordered-list {
	@include oTypographyList('unordered');
}
```
##### Example 2
the styles for an ordered and unordered list, sharing base list styles.

```Output
.my-list {
	@include oTypographyList();
}

.my-list--ordered {
	@include oTypographyList('ordered', $include-base-styles: false);
}

.my-list--unordered {
	@include oTypographyList('unordered', $include-base-styles: false);
}
```
### oTypographyFooter
Style for <footer> tags

### oTypographyCaption
Styles for photo or video credit/caption

## Functions
### oTypographyGetScale (...)
Returns a single list on the scale



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| index | Number | - |Number of the scale to return. |
| font | String | '' |The font to get the scale number for, as fonts may have different scales. Uses the default scale if not specified. |
### oTypographyMaxLineWidth (...)
Returns a maximum line width based on the given scale



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| optimal-characters-per-line | Number | - |number of the characters per line |
### oTypographyGetFontFamily (...)
Get font family for o-typography type i.e "sans", "serif", or "display".
Note: we do not recommend setting `font-family` this way. Instead use
mixins `oTypographySans`, `oTypographySerif`, `oTypographyDisplay` without
any arguments.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| type | String | - |One of 'sans', 'serif', or 'display'. |
## Variables
### o-typography-is-silent (`Bool`)
When silent mode is active, css classes will not be output

### o-typography-relative-units (`Bool`)
Use relative units (rem) or not (px) when outputting typographic styles.
When `true`, the user will be able to modify their font size using browser
settings.

For legacy reasons, this defaults to `false` (outputs px units).
Components and projects may need to be updated to support relative units.

### o-typography-load-fonts (`Bool`)
When true, webfonts will be downloaded

### o-typography-error-for-missing-fonts (`String, Null`)
The error message to throw if o-typography is used to apply a font face
which has not been included by the project. By default no error is thrown.

### o-typography-progressive-font-loading (`Bool`)
When true, progressive font fallbacks are output.

### o-typography-baseline-unit (`Number`)
Unitless size representing the baseline grid


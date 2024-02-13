# o-fonts Sass Documentation
## Mixins
### oFonts
Output all default font-face declarations for the current brand.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | - |the font faces to include, see the README or examples for more details. |
#### Examples
##### Example 1
all fonts for the current brand (core, internal, whitelabel).

```Include
@include oFonts();
```
##### Example 2
a limited set of recommended fonts for the current brand (core, internal, whitelabel).

```Include
@include oFonts($opts: ('recommended': true));
```
##### Example 3
a limited set of recommended fonts for the current brand, plus an extra FinancierDisplayWeb font.

```Include
@include oFonts($opts: (
	'recommended': true,
	'financier-display': (
		(weight: regular, style: normal)
	)
));
```
##### Example 4
only regular and semibold MetricWeb font faces.

```Include
@include oFonts($opts: ('metric': (
	(weight: regular, style: normal),
	(weight: semibold, style: normal),
)));
```
##### Example 5
only regular and bold FinancierDisplayWeb font faces.

```Include
@include oFonts($opts: ('financier-display': (
	(weight: regular, style: normal),
	(weight: semibold, style: normal),
)));
```
##### Example 6
only regular font faces for MetricWeb and FinancierDisplayWeb.

```Include
@include oFonts($opts: (
	'metric': ((weight: regular, style: normal)),
	'financier-display': ((weight: regular, style: normal))
));
```
##### Example 7
only black weighted font faces for MetricWeb, FinancierDisplayWeb, and FinancierTextWeb.

```Include
@include oFonts($opts: (
	'metric': ((weight: 'black', style: normal)),
	'financier-display': ((weight: 'black', style: normal)),
	'financier-text': ((weight: 'black', style: normal))
));
```
### oFontsDefineCustomFont
Output custom Font-face declarations and register the family and variants with o-fonts.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| font-family | String | - |The custom font family with fallback e.g. 'ComicSans, sans' |
| variants | Map | - |The variants (weight and style combinations) which are allowed in a nested map e.g. ((weight: bold, style: normal), (weight: regular, style: normal)) |
#### Examples
##### Example 1
example shows registering a custom font "MyFont" with "sans" fallback. The font allows regular or bold variants.

```This
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
### oFontsVariantsIncluded
Register which fonts have been output by already for your project.
This mixin is useful if a project calls the `oFonts` mixin is in a different
entry point.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | - |the font faces to included, see the README or examples for more details. |
#### Examples
##### Example 1
all fonts for the current brand (core, internal, whitelabel).

```Include
@include oFontsVariantsIncluded();
```
##### Example 2
a limited set of recommended fonts for the current brand (core, internal, whitelabel).

```Include
@include oFontsVariantsIncluded($opts: ('recommended': true));
```
##### Example 3
a limited set of recommended fonts for the current brand, plus an extra FinancierDisplayWeb font.

```Include
@include oFontsVariantsIncluded($opts: (
	'recommended': true,
	'financier-display': (
		(weight: regular, style: normal)
	)
));
```
##### Example 4
only regular and semibold MetricWeb font faces.

```Include
@include oFontsVariantsIncluded($opts: ('metric': (
	(weight: regular, style: normal),
	(weight: semibold, style: normal),
)));
```
##### Example 5
only regular and bold FinancierDisplayWeb font faces.

```Include
@include oFontsVariantsIncluded($opts: ('financier-display': (
	(weight: regular, style: normal),
	(weight: semibold, style: normal),
)));
```
##### Example 6
only regular font faces for MetricWeb and FinancierDisplayWeb.

```Include
@include oFontsVariantsIncluded($opts: (
	'metric': ((weight: regular, style: normal)),
	'financier-display': ((weight: regular, style: normal))
));
```
## Functions
### oFontsVariantExists (...)
Check if a font variant exists for a family.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| family | String | - |one of $_o-fonts-families |
| weight | String | regular |The font weight. |
| style | String | normal |The font style. |
### oFontsVariantIncluded (...)
Check if a font variant has been included
in your project with the `oFonts` mixin.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| family | String | - |one of $_o-fonts-families |
| weight | String | regular |The font weight. |
| style | String | normal |The font style. |
### oFontsGetFontFamilyWithFallbacks (...)
Get a font-family stack with the appropriate fallbacks



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| family | String | - | |
#### Examples
##### Example 1
```scss
font-family: oFontsGetFontFamilyWithFallbacks(FinancierDisplayWeb);
```
### oFontsGetFontFamilyWithoutFallbacks (...)
Removes a fonts fallbacks.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| family | String,List | - |Font family potentially with fallbacks. |
#### Examples
##### Example 1
```scss
$family: oFontsGetFontFamilyWithoutFallbacks('FinancierDisplayWeb, sans'); //FinancierDisplayWeb
```
### oFontsWeight (...)
Machine-readable CSS font-weight.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| keyword | String | - |Human-readable keyword e.g. 'semibold', 'regular', 'bold'. |
#### Examples
##### Example 1
```scss
font-weight: oFontsWeight(lighter);
```
## Variables
### o-fonts-is-silent (`Bool`)
Silent mode


### o-fonts-path (`String`)
Origami Build Service path to font files.


### o-fonts-build-service-path (`String`)
Origami Build Service path to font files.


### o-fonts-self-host-path (`String`)
Alternative path to self hosted font files, hosted on a service which does not 
conform to the Origami Build Service api. For example this is used by 
Financial-Times/ft-app to support offline fonts.


### o-fonts-display (`String, Null`)
The default `font-display` property of included font faces.
https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display



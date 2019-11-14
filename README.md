# o-colors [![Build Status](https://circleci.com/gh/Financial-Times/o-colors.png?style=shield&circle-token=0d3884dacba2fdd8aec8afbd2eaa84c79040ddd5)](https://circleci.com/gh/Financial-Times/o-colors) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

A component to manage colours. Includes the FT colour palette.

- [Markup](#markup)
- [CSS Custom Properties](#css-custom-properties)
- [Sass](#sass)
- [Migration guide](#migration)
- [Contact](#contact)
- [Licence](#licence)

### Markup

#### Colour Usecase Classes

A limited number of colour [usecases](#usecases) are available as CSS classes, including:
- `.o-colors-page-background`
- `.o-colors-box-background`
- `.o-colors-body-text`
- `.o-colors-muted-text`

```html
<body class="o-colors-page-background">
	<!-- default background colour set -->
	<!-- e.g. for the master brand `background: #fff1e5;` -->
</body>
```

More colours are available for build service users as [CSS Custom Properties](#css-custom-properties).

### CSS Custom Properties

#### Colour Palette Custom Properties

All palette colors, including default mixes and tones, are available as CSS Custom Properties (CSS Variables) in the format `--o-colors-[NAME]`.

See [all palette colours available](https://registry.origami.ft.com/components/o-colors) in the registry.

```css
.ft-pink {
	background: var(--o-colors-paper);
	color: var(--o-colors-black-80);
}
```

#### Colour Usecase Custom Properties

A limited number of colour [usecases](#usecases) are also available as CSS Custom Properties (CSS Variables), including:
- `--o-colors-page-background`
- `--o-colors-box-background`
- `--o-colors-body-text`
- `--o-colors-muted-text`
- `--o-colors-link-text`
- `--o-colors-link-hover-text`

```css
body {
	background: var(--o-colors-page-background);
}
```

### Sass

o-colors has a number of mixins and functions for you to access the color palette in your project. We recommend Sass projects use these mixins and functions directly. E.g. [oColorsByName](#oColorsByName) and [oColorsByUsecase](#oColorsByUsecase). However, it is also possible to output all o-colors CSS Custom Properties (CSS Variables) and classes using the `oColors` mixin.

```scss
@import 'o-colors/main';
@include oColors($opts: (
	'palette-custom-properties': true, // e.g. --o-colors-paper
	'usecase-custom-properties': true, // e.g. --o-colors-page-background
	'usecase-classes': true // e.g. .o-colors-page-background
));
```

#### Palette Colours

o-colors defines a colour palette (a set of named colours) which may be [previewed in the registry](https://registry.origami.ft.com/components/o-colors). Custom palette colours may be added to the palette to share them with dependencies.

Color Name | Brand Support |
---|---
black | master, internal, whitelabel
white | master, internal, whitelabel
oxford | master, internal
teal | master, internal
slate | master, internal,
lemon | master, internal,
jade | master, internal
crimson | master, internal
paper | master
claret | master
wheat | master
sky | master
velvet | master
mandarin | master
candy | master
wasabi | master
org-b2c | master
org-b2c-dark | master
org-b2c-light | master

There are additional colours in the palette by default including tones and mixes. [See the registry demos](https://registry.origami.ft.com/components/o-colors) for a full list.

#### Default Palette Colours

Get a default colour from the palette using `oColorsByName`.

```scss
.example {
	// Get a default o-colors palette colour.
	background: oColorsByName('paper');
}
```

#### Custom Palette Colours

To set a custom palette colour to share with other components call `oColorsSetColor`.
Colour names must be namespaced for the project or component using a forward slash.

```scss
// Set a custom palette colour within a component `o-example`.
@include oColorsSetColor(
	$color-name: 'o-example/myhotpink',
	$color-hex: #ff69b4
);

.example {
	// Get a custom palette colour from a component `o-example`.
	background: oColorsByName('o-example/myhotpink');
}
```

Removing a colour is considered a breaking change and requires a major release. To inform users a colour should not be used deprecate it by passing an `$opts` argument with a deprecation message.

```scss
// Deprecate a custom colour, which will be removed in a future major release.
@include oColorsSetColor(
	$color-name: 'o-example/myhotpink',
	$color-hex #ff69b4,
	$opts: ('deprecated': 'Use the default colour claret instead.')
);
```

See [o-colors SassDoc](https://registry.origami.ft.com/components/o-colors/sassdoc?brand=master#o-colors-mixin-ocolorssetusecase) for more details and examples.

#### Usecases

A [colour palette](#palette-colours) helps products use the same set of colours, but does not help them use the colours consistently. Therefore o-colors provides tools to return colours based on usecases. E.g. a colour for the page background or body text.

Usecase | Property | Brand Support |
---|---|---
page |                  background | master, internal, whitelabel
focus |                 outline | master, internal
box |                   background | master, internal
link |                  text | master, internal
link-hover |            text | master, internal
link-title |            text | master, internal
link-title-hover |      text | master, internal
title |                 text | master, internal
body |                  text | master, internal
muted |                 text | master, internal
tag-link |              text | master
tag-link-hover |        text | master
opinion-tag-link |      text | master
opinion-tag-link-hover |text | master
opinion |               background | master
hero |                  background | master
hero-opinion |          background | master
hero-highlight |        background | master
**Section colors** |
section-life-arts |     all | master
section-life-arts-alt | all | master
section-magazine |      all | master
section-magazine-alt |  all | master
section-house-home |    all | master
section-house-home-alt |all | master
section-money |         all | master
section-money-alt |     all | master

#### Default Usecases

To get a colour for a default usecase call `oColorsByUsecase`.

```scss
	html {
		// get the background colour for the page usecase
		background: oColorsByUsecase('page', 'background');
	}

	.paragraph {
		// get the text colour for the body usecase
		color: oColorsByUsecase('body', 'text');
	}
```

#### Custom Usecase

To create a new usecase call `oColorsSetUseCase`.

- `$usecase`:  The name of the usecase, e.g. 'page'. This must include a namespace for your component or project followed by a forward slash.
- `$colors`:  A map of properties ('text', 'background', 'border', or 'outline') to a palette color name.
- `$opts` (optional):
	- `deprecated`: A deprecation message for the usecase.

```scss
	// set colours for a "stripes" in o-example.
	@include oColorsSetUseCase('o-example/stripes', (
		'text': 'white',
		'background': 'black',
		'border': 'black-50'
	));
```

Removing a usecase is a breaking change and requires a major release. To inform users a usecase should not be used it should be deprecated. Deprecate a usecase by passing an `$opts` argument with a deprecation message.

Deprecate all usecase properties:
```scss
	// deprecate all usecase properties for the o-example custom usecase "stripes".
	@include oColorsSetUseCase('o-example', 'stripes', (
		'text': 'white',
		'background': 'black',
		'border': 'black-50'
	), ('deprecated': 'o-example has no stripes anymore, use a different colour'));
```

Deprecate individual usecase properties:
```scss
	// deprecate only the background property for the o-example custom usecase "stripes".
	@include oColorsSetUseCase('o-example', 'stripes', (
		'text': 'white',
		'background': 'black',
		'border': 'black-50'
	), ('deprecated': ('background': 'o-example stripes has no background anymore, use a different colour')));
```

#### Generated Text Colors

`oColorsGetTextColor` will return a light or dark text color based on the background and an opacity specified.

```scss
.example {
	background: oColorsByName('teal');
	// Get a text colour for a teal background
	color: oColorsGetTextColor('teal');
}
```

```scss
.example {
	background: oColorsByName('teal');
	// Get a text colour for a teal background,
	// with greater than usual opacity (80)
	color: oColorsGetTextColor('teal', 80);
}
```

The contrast of the background and resulting text colour is checked against [WCAG 2.1 guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum). If the contrast is too low an error is thrown. By default the contrast is checked for normal text at AA level. The contrast may be checked for [large text](https://www.w3.org/TR/WCAG21/#dfn-large-scale) or against stricter AAA recommendations (aa-normal, aa-large, aaa-normal, or aaa-large).

```scss
.example-large-text {
	background: oColorsByName('teal');
	// Get a text colour for a teal background,
	// enforce a lower level of contrast "large text".
	color: oColorsGetTextColor('teal', $minimum-contrast: 'aa-large');
}
```

Set `$minimum-contrast` to `null` to remove contrast checking. Only ignore contrast for [incidental or logo text](https://www.w3.org/TR/WCAG21/#contrast-minimum), otherwise your project may be inaccessible.

#### Mix colors

`oColorsMix` will mix two colors based on a percentage. This gives the impression of the base color appearing at the percentage opacity over the background color. `oColorsMix` will accept either a color value or the name of an o-colors palette color as arguments.

By default `oColorsMix` mixes with the page background colour usecase:
```scss
$color: oColorsMix($color: 'black', $percentage: 30); // same as black-30
```

But two colours may be given. For example to mix claret over slate at 20%:
```scss
$color: oColorsMix($color: 'claret', $background: 'slate', 20);
```

#### Tone Palette Colors

An o-colors tone is a palette colour with modified saturation and luminosity, to create a lighter or darker colour whilst retaining vibrancy.

Recommended tones are already in the colour palette, e.g. `teal-80` (see [default tones in the registry](https://registry.origami.ft.com/components/o-colors)). However for cases where a new tone is required use `oColorsGetTone`. It will return a new color based on a specified brightness.

```scss
.teal-tone-example {
	background-color: oColorsGetTone('teal', 80);
}
```

For design consistency not all colours are allowed to be toned. Only colours with default tones in the palette (e.g. teal, oxford, and claret) may be used. Other colours [may still be mixed](#mix-colors).

#### Colour Tools

o-colors provides other useful functions for working with colours, including:

- oColorsGetContrastRatio
- oColorsColorBrightness
- oColorsColorLuminance

See [o-colors SassDoc](https://registry.origami.ft.com/components/o-colors/sassdoc) for more details and examples.

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 5 | N/A | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
⚠ maintained | 4 | 4.10 | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.6 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.5 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.1 | [migrate to v1](MIGRATION.md#migrating-from-v0-to-v1) |
╳ deprecated | 0 | 0.2 | N/A |


## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-colors/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).


----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

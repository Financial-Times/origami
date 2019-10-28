# o-colors [![Build Status](https://circleci.com/gh/Financial-Times/o-colors.png?style=shield&circle-token=0d3884dacba2fdd8aec8afbd2eaa84c79040ddd5)](https://circleci.com/gh/Financial-Times/o-colors) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

A component to manage colours. Includes the FT colour palette.

- [Sass](#sass)
- [Markup](#markup)
- [CSS Variables](#css-variables)
- [Migration guide](#migration-guide)
	- [Upgrading from v3.x.x to v4.x.x](#upgrading-from-v3xx-to-v4xx)
- [Contact](#contact)
- [Licence](#licence)

### Markup

All palette colors, including default tints, are available as CSS Custom Properties (CSS Variables) in the format `--o-colors-[NAME]`. See the [demos in the registry](https://registry.origami.ft.com/components/o-colors) for all palette colours available.

```css
.ft-pink {
	background: var(--o-colors-paper);
	color: var(--o-colors-black-80);
}
```

### Sass

o-colors has a number of mixins and functions for you to access the color palette in your project. We recommend Sass projects use these mixins and functions directly. E.g. [oColorsByName](#oColorsByName) and [oColorsByUsecase](#oColorsByUsecase). However, it is also possible to output all o-colors CSS Custom Properties (CSS Variables) using the `oColors` mixin.

```scss
@import 'o-colors/main';
@include oColors($opts: (
	'palette-custom-properties': true
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
Colours are namespaced by the project/component name. To get a custom palette colour use the `$from` argument.

```scss
// Set a custom palette colour within a component `o-example`.
@include oColorsSetColor(
	$project-name: 'o-example',
	$color-name: 'myhotpink',
	$color-hex: #ff69b4
);

.example {
	// Get a custom palette colour from a component `o-example`.
	background: oColorsByName('myhotpink', $from: 'o-example');
}
```

Removing a colour is considered a breaking change and requires a major release. To inform users a colour should not be used deprecate it by passing an `$opts` argument with a deprecation message.

```scss
// Deprecate a custom colour, which will be removed in a future major release.
@include oColorsSetColor(
	$project-name: 'o-example',
	$color-name: 'myhotpink',
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

- `$project-name`: The name of the component or project setting this colour, e.g. 'o-example'.
- `$usecase`:  The name of the usecase, e.g. 'page'.
- `$colors`:  A map of properties ('text', 'background', 'border', or 'outline') to a palette color name.
- `$opts` (optional):
	- `deprecated`: A deprecation message for the usecase.

```scss
	// set colours for a "stripes" in o-example.
	@include oColorsSetUseCase('o-example', 'stripes', (
		'text': 'white',
		'background': 'black',
		'border': 'black-50'
	));
```

Get custom usecases using the `$from` argument:

```scss
.example {
	color: oColorsByUsecase('stripes', 'text', $from: 'o-example');
	background: oColorsByUsecase('stripes', 'background', $from: 'o-example');
	border: 1px solid oColorsByUsecase('stripes', 'border', $from: 'o-example');
}
````

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

```scss
.example-mix {
	border: 1px solid oColorsMix('paper', 'teal', 20);
}
```

#### Tint Palette Colors

Recommended colour tints such as `black-50`, `teal-80`, `claret-20`, are already in the colour palette. However for cases where a new tint is required use `oColorsGetTint`. It will return a tinted palette color based on a specified brightness.

For colours with default tints in the palette (e.g. teal, oxford and claret) the generated tint is a dynamic function of saturation and lightness. Note [in the registry demos](https://registry.origami.ft.com/components/o-colors) how these tints maintain vibrancy. For other colours the tint function falls back to a mix with black or white, for darker and lighter tints respectively. Given a colour with no hue (black or white) a mix with the page background usecase is returned.

```scss
.jade-tint-example {
	background-color: oColorsGetTint('jade', 90);
}
```

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

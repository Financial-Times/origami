# o-topper

This component is used for styling the topper sections of an article.
- [Usage](#usage)
- [Markup](#markup)
- [Sass](#sass)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-topper`.

## Markup

The basic markup structure for a topper will look something like this:

```html
<div class="o-topper o-topper--basic o-topper--color-o3-color-palette-paper">
	<div class="o-topper__content">
		<div class="o-topper__tags">
			<a href="https://www.ft.com/german-election" class="o-topper__topic">German election</a>
		</div>
		<h1 class="o-topper__headline">
			Merkel reaches ‘grand coalition’ breakthrough with Social Democrats
		</h1>
		<div class="o-topper__standfirst">Move raises hopes of end to political deadlock that has gripped Germany since September</div>
	</div>

	<div class="o-topper__background"></div>
</div>
```

Toppers support a wide array of [elements](#supported-elements) and can be customised using several [themes](#themes) and [background colors](#colors). For a full list of examples, including example markup, see [o-topper in the Registry](http://registry.origami.ft.com/components/o-topper).

### Supported elements

| Element                     | Use case                                                                                           |
|-----------------------------|----------------------------------------------------------------------------------------------------|
| `.o-topper__content`        | Main content area of topper. Required parent of all elements except `__visual` and `__background`. |
| `.o-topper__tags`           | Wrapper element for the article concept tag elements `__brand`, `__topic` and `__opinion-genre`.   |
| `.o-topper__brand`          | A concept tag that represents a brand, e.g. "The Big Read".                                        |
| `.o-topper__topic`          | A concept tag that represents a topic or generic concept.                                          |
| `.o-topper__opinion-genre`  | A concept tag that represents the abstract Opinion genre.                                          |
| `.o-topper__columnist`      | Wrapper element for `__columnist-name`. Should be placed below the headline and standfirst.        |
| `.o-topper__columnist-name` | Represents the columnist that wrote an Opinion genre article.                                      |
| `.o-topper__headline`       | The main headline of the article.                                                                  |
| `.o-topper__standfirst`     | A short introduction to the article.                                                               |
| `.o-topper__background`     | Element used to display the editorially-chosen colored background of the topper. Must be empty.    |
| `.o-topper__visual`         | Wrapper for the visual elements `__picture` and `__image`. Should be a `<figure>` tag.             |
| `.o-topper__picture`        | A `<picture>` tag visual element.                                                                  |
| `.o-topper__image`          | An `<img>` tag visual element, usually used as fallback for a `<picture>`.                         |
| `.o-topper__image-credit`   | Element showing credit/copyright for the `__picture` or `__image`, where no image caption is given. If an image caption is provided alongside credit/copyright information use `.o-topper__image-caption` instead. Should be a `<figcaption>` tag. |
| `.o-topper__image-caption`   | Element showing caption and credit/copyright together for the `__picture` or `__image`. Should be a `<figcaption>` tag. |

### Themes

These themes affect the layout and visual style of all elements. See the [demos](http://registry.origami.ft.com/components/o-topper) for examples.

```
.o-topper--basic
.o-topper--branded
.o-topper--opinion
.o-topper--full-bleed-image-left
.o-topper--full-bleed-offset
.o-topper--split-text-left
.o-topper--split-text-center
.o-topper--deep-landscape
.o-topper--deep-portrait
```

### Colors

These colors affect the background of the `.o-topper__background` and `.o-topper__visual` elements, and select a contrasting text color for all other elements.

```
.o-topper--color-o3-color-palette-paper
.o-topper--color-o3-color-palette-wheat
.o-topper--color-o3-color-palette-white
.o-topper--color-o3-color-palette-black
.o-topper--color-o3-color-palette-claret
.o-topper--color-o3-color-palette-oxford
.o-topper--color-o3-color-palette-slate
.o-topper--color-o3-color-palette-crimson
.o-topper--color-o3-color-palette-sky
.o-topper--color-o3-color-palette-matisse
```

### Modifiers

| Modifier                                | Use case                                                                                           |
|-----------------------------------------|----------------------------------------------------------------------------------------------------|
| `.o-topper__content--background-box`    | Create a background box around the element `.o-topper__content`. The background colour of the box  |
|                                         | will be defined based on the background of the topper                                              |

## Sass

To include all o-topper CSS include `oTopper`:

```scss
@import '@financial-times/o-topper/main';
@include oTopper();
```

To include o-topper styles granularly specify which elements, themes, and colours to output styles for using the options `$opts` argument:

```scss
@include oTopper($opts: (
	'themes': (
		'branded', // .o-topper--branded
		'opinion', // .o-topper--opinion
		'has-headshot', // .o-topper--has-headshot
		'full-bleed-offset',
		'split-text-left',
		'split-text-center',
		'full-bleed-image-center',
		'full-bleed-image-left',
		'package',
		'package-extra',
		'package-extra-wide',
		'package-special-report',
		'right-rail',
		'centered',
		'deep-landscape',
	),
	'elements': (
		'content', // .o-topper__content
		'visual', // .o-topper__visual
		'background', // .o-topper__background
		'headline',
		'headline--large',
		'summary',
		'standfirst',
		'summary--body',
		'tags',
		'columnist',
		'columnist-name',
		'brand',
		'topic',
		'read-next',
		'image',
		'image-credit',
		'image-caption'
	),
	'colors': (
		'o3-color-palette-white', // .o-topper--color-o3-color-palette-white
		'o3-color-palette-black', // .o-topper--color-o3-color-palette-black
		'o3-color-palette-claret',
		'o3-color-palette-oxford',
		'o3-color-palette-paper',
		'o3-color-palette-slate',
		'o3-color-palette-wheat',
		'o3-color-palette-crimson',
		'o3-color-palette-sky',
	)
));
```
## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 6 | N/A  | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
⚠ maintained | 5 | N/A  | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.0  | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.1  | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.7  | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.2  | - |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-teaser/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

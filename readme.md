# o-topper

This component is used for styling the topper sections of an article.

- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Migration Guide](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Markup

The basic markup structure for a topper will look something like this:

```html
<div class="o-topper o-topper--basic o-topper--color-paper">
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
| `.o-topper__image-credit`   | Element showing credit/copyright for the `__picture` or `__image`. Should be a `<figcaption>` tag. |

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
```

### Colors

These colors affect the background of the `.o-topper__background` and `.o-topper__visual` elements, and select a contrasting text color for all other elements. See [`o-colors`](http://registry.origami.ft.com/components/o-colors) for examples of the colors.

```
.o-topper--color-paper
.o-topper--color-wheat
.o-topper--color-white
.o-topper--color-black
.o-topper--color-claret
.o-topper--color-oxford
.o-topper--color-slate
.o-topper--color-crimson
.o-topper--color-sky
.o-topper--color-velvet
```

## Sass

To include all o-topper CSS include `oTopper`:

```scss
@import 'o-topper/main';
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
		'news-package',
		'right-rail',
		'centered',
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
		'image-credit'
	),
	'colors': (
		'white', // .o-topper--color-white
		'black', // .o-topper--color-black
		'claret',
		'oxford',
		'paper',
		'slate',
		'wheat',
		'crimson',
		'sky',
		'velvet'
	)
));
```

## JavaScript

### Mapping Content to Topper

This component exports a JavaScript helper from [`n-map-content-to-topper`](https://github.com/Financial-Times/n-map-content-to-topper). Use this helper to select the correct topper for an article given a JSON-formatteed FT article and flags.

**Note:** This helper is deeply tied to the FT.com content store, and includes hardcoded UUIDs and business logic.

```js
import { mapContentToTopper } from 'o-topper';

const topper = mapContentToTopper(ftArticle, flags);
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A  | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.7  | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.2  | - |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-teaser/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

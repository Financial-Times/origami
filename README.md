# o-teaser

This component is for displaying teasers which link through to articles.

- [Development](#development)
- [Markup](#markup)
- [Sass](#sass)
- [Migration guide](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Development

Install the [Origami build tools](https://github.com/Financial-Times/origami-build-tools/blob/master/README.md) to [build and run demos](https://github.com/Financial-Times/origami-build-tools/blob/master/README.md#developing-modules-locally)

## Markup

The basic markup structure for a teaser will look something like this:

```html
<div class="o-teaser o-teaser--small">
	<div class="o-teaser__content">
		<a href="#" class="o-teaser__tag">World</a>
		<h2 class="o-teaser__heading"><a href="#">Japan sells negative yield 10-year bonds</a></h2>
		<div class="o-teaser__timestamp">
			<time data-o-component="o-date" class="o-date" datetime="2016-02-29T12:35:48Z">2016-02-29T12:35:48Z</time>
		</div>
	</div>
</div>
```

Teasers support a wide array of [elements](#supported-elements) and can be customised using several [themes](#themes) and should be used as required. For a full list of examples including example markup, see [o-teaser in the Registry](http://registry.origami.ft.com/components/o-teaser).


### Images

To add an image to a teaser, you should use the following markup structure:

```html
<div class="o-teaser__image-container">
	<img src="{image-src}" class="o-teaser__image" alt="{alt text}"/>
</div>
```

To support lazy-loading of images you can use the `o-teaser__image-placeholder` element, as below:

```html
<div class="o-teaser__image-container">
	<div class="o-teaser__image-placeholder">
		<img src="{image-src}" class="o-teaser__image" alt="{alt text}"/>
	</div>
</div>
```


### Supported elements

The following elements are supported by default:

```css
.o-teaser__tag 						// Small coloured tag at the top of the teaser
.o-teaser__tag-suffix				// Small coloured content to come after the tag, such as timestamp or duration
.o-teaser__tag-prefix				// A container for content before the tag
.o-teaser__heading 					// Main heading of the teaser
.o-teaser__standfirst 				// A short piece of content
.o-teaser__image-container			// Wrapper element for an image
.o-teaser__image       				// An image for the teaser
.o-teaser__headshot					// Author's headshot image
.o-teaser__timestamp 				// A styled timestamp for the teaser
.o-teaser__related 				 	// A list of related content links
.o-teaser__related-item 			// A single item of a related content list
```


## Sass

To include styles for all teasers call `oTeaser`:
```scss
@import 'o-teaser/main';

@include oTeaser();
```

Teasers are made up of various elements (e.g. heading, standfirst, timestamp) and a series of themes (e.g. small, large, video). Pass a list of `elements` and `themes` in an options `$opts` argument to include only the styles you need:

```scss
@include oTeaser($opts:(
	'elements': ('default', 'images'),
	'themes': ('small', 'large', 'video')
));
```

Elements are specified via groups, they include:

- `default` - all basic text elements, including: heading, standfirst, meta, and tag.
- `images` - all image element styles
- `promoted` - promoted by and paid post element styles
- `related-items` - styling for the related items elements
- `timestamp` - styles for the timestamp and live post styles

[Themes](#themes) include:

- `small` - styling for [small teasers](#small-teasers)
- `large` - styling for [large teasers](#large-teasers)
- `standard` - outputs the opinion and inverse themes
- `video` - outputs the [video teaser](#video-teasers) styles
- `audio` - outputs the [audio teaser](#audio-teasers) styles
- `top-stories` - outputs all top stories teaser styles and variations
- `hero` - outputs all [hero](#hero-teasers) teaser styles and variations

### Themes

`o-teaser` has a selection of themes to help highlight content and provide a diverse layout. Themes are separated into 3 types of layout, each with their own modifiers to add different variations on the styles.

#### Small teasers

Uses the `o-teaser--small` modifier.

[View example on the Registry](http://registry.origami.ft.com/components/o-teaser#demo-small)

Additional modifiers:

- `stacked`: moves the image to the top of the teaser
- `opinion`: changes the tag colour to blue
- `live`: change background to red and position of elements to make the teaser stand out

#### Large teasers

Uses the `o-teaser--large` modifier.

[View example on the Registry](http://registry.origami.ft.com/components/o-teaser#demo-large)

Additional modifiers:

- `opinion`: adds a blue background
- `highlight`: adds a claret background

#### Hero teasers

Uses the `o-teaser--hero` modifier.

[View example on the Registry](http://registry.origami.ft.com/components/o-teaser#demo-hero)

Additional modifiers:

- `centred`: centres the image and text
- `opinion`: adds a blue background
- `highlight`: adds a claret background
- `stretched`: makes the teaser take up the full height of the available space and anchors the standout and timestamp content to the bottom of the teaser.

#### Video teasers

Uses the `o-teaser--video` modifier.

[View example on the Registry](http://registry.origami.ft.com/components/o-teaser#demo-video)

#### Video teasers

Uses the `o-teaser--audio` modifier.

[View example on the Registry](http://registry.origami.ft.com/components/o-teaser#demo-audio)


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 5 | N/A  | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
⚠ maintained | 4 | 4.0  | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.5  | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.5  | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.9 | - |

----

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-teaser/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).


----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

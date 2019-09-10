o-teaser-collection [![Circle CI](https://circleci.com/gh/Financial-Times/o-teaser-collection/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-teaser-collection/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

This component is for displaying collections of [o-teasers](http://registry.origami.ft.com/components/o-teaser).

- [Markup](#markup)
- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Markup

The basic markup structure for a teaser collection will look something like this:

```html
<div class="o-teaser-collection">
	<h2 class="o-teaser-collection__heading">
		<a class="o-teaser-collection__heading-link" href="#">UK</a>
	</h2>

	<!-- Teasers go here -->
</div>
```

Teaser collections can be arranged using [o-grid](http://registry.origami.ft.com/components/o-grid), or by using the `o-teaser-collection__items` and `o-teaser-collection__item` classes. These classes are designed to work on list elements, as seen in the `o-teaser-collection--numbered` example:

```html
<div class="o-teaser-collection o-teaser-collection--numbered">
	<h2 class="o-teaser-collection__heading o-teaser-collection__heading--full-width">Most read</h2>
	<ol class="o-teaser-collection__items">
		<li class="o-teaser-collection__item">
			teaser goes here
		</li>
		<li class="o-teaser-collection__item">
			teaser goes here
		</li>
	</ol>
</div>
```

Teaser Collections can be customised using several [modifier classes](#options).

## Sass

To include all styles call the `oTeaserCollection` mixin.

```scss
@include oTeaserCollection();
```

### Options

`o-teaser-collection` css may be included granularly by passing options to the `oTeaserCollection` mixin.

```scss
@include oTeaserCollection($opts: (
	'collections': ('special'), // o-teaser-collection--special
	'headings': ('inverse'), // o-teaser-collection__heading--inverse
	'items': ('stretched') // o-teaser-collection__item--stretched
));
```

Options include:

| Key                 | Possible Values                                                                                                                       | Classes Output  |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| collections         | 'horizontal', 'special', 'numbered', 'big-story', 'assassination', 'assassination-related', 'mid-slice', 'stream', 'top-standalone'   | `o-teaser-collection--[option]`. Apply to `o-teaser-collection`, e.g. `class="o-teaser-collection o-teaser-collection--horizontal"`                                  |
| headings            | 'inverse', 'full-width', 'half-width', 'small'                                                                                        | `o-teaser-collection__heading--[option]`. Apply to `o-teaser-collection__heading`, e.g. `class="o-teaser-collection__heading o-teaser-collection__heading--inverse"` |
| items               | 'stretched'                                                                                                                           | `o-teaser-collection__item--[option]`. Apply to `o-teaser-collection__item`, e.g. `o-teaser-collection__item o-teaser-collection__item--stretched`                   |


Use `o-teaser-collection--numbered` to number the list of teasers in the collection, see an [example in the registry](http://registry.origami.ft.com/components/o-teaser-collection).

Use `o-teaser-collection--special` to add a darker background across the full width of the containing relative element, see an [example in the registry](http://registry.origami.ft.com/components/o-teaser-collection).


### Headings

To include heading styles output `o-teaser-collection__heading` classes using the `oTeaserCollection` mixin as described above. If your component or project would like to replicate only some parts of the heading style use `oTeaserCollectionContentHeading`.

For example, to replicate only the basic heading style pass an empty map:
```scss
.my-heading {
	@include oTeaserCollectionContentHeading($opts: ());
}
```

To replicate the header fully, but without the size modifiers such as `o-teaser-collection__heading--full-width`:
```scss
.my-heading {
	@include oTeaserCollectionContentHeading($opts: (
		'anchor': true, // Include child anchor styles `.my-heading > a`
		'divider': true, // Include the top border styles.
		'sizes': () // Do not output size modifiers such as `.my-heading--small`.
	));
}
```

`oTeaserCollectionContentHeading` options include:

| Key       | Possible Values                                 | Description                                                                  |
|-----------|-------------------------------------------------|-------------------------------------------------------------------------------|
| anchor    | Boolean                                         | Output styles for a nested anchor tag, for a collection heading with a link.  |
| divider   | Boolean                                         | Output styles for a divider (border) above the collection heading.            |
| sizes     | 'inverse', 'full-width', 'half-width', 'small'  | Output modifier classes for different sizes headings e.g. `my-heading--small`.|


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.3 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.2 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-teaser-collection/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).


----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

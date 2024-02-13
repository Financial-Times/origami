# o-teaser-collection Sass Documentation
## Mixins
### oTeaserCollection
Output all o-teaser-collection styles. Accepts an options map to include features granularly.
See the [README](https://registry.origami.ft.com/components/o-teaser-collection/readme) for more details of all available options.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | ('collections': ('horizontal', 'special', 'numbered', 'big-story', 'assassination', 'assassination-related', 'mid-slice', 'stream', 'top-standalone'), 'headings': ('inverse', 'full-width', 'half-width', 'small'), 'items': ('stretched')) | |
#### Examples
##### Example 1
include all o-teaser-collection styles.

```To
@include oTeaserCollection();
```
##### Example 2
include all o-teaser-collection styles with only the "big story" modifier.

```To
@include oTeaserCollection($opts: (
	'collections': ('big-story', 'special'), // e.g. o-teaser-collection--special
	'headings': ('inverse'), // i.e. o-teaser-collection__heading--inverse
	'items': ('stretched') // i.e. o-teaser-collection__item--stretched
));
```
### oTeaserCollectionContentHeading
Styles used witin o-teaser-collection__heading, including size modifiers.



| Parameter | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| opts | Map | ('anchor': true,'divider': true,'sizes': ('full-width', 'half-width', 'small')) | |
#### Examples
##### Example 1
all heading styles.

```Include
.my-collection-heading {
	@include oTeaserCollectionContentHeading();
}
```
##### Example 2
the standard heading styles but do not style any child anchor element, and do not output modifier classes for different sized headings.

```Include
.my-collection-heading {
	@include oTeaserCollectionContentHeading($opts: (
		'anchor': false,
		'divider': true,
		'sizes': ()
	));
}
```
##### Example 3
a modifier class for a "small" collection heading.

```Output
.my-collection-heading {
	@include oTeaserCollectionContentHeading($opts: (
		'anchor': true,
		'divider': true,
		'sizes': ('small') // .my-collection-heading--small
	));
}
```

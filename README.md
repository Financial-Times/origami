o-teaser-collection [![Circle CI](https://circleci.com/gh/Financial-Times/o-teaser-collection/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-teaser-collection/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

This component is for displaying collections of [o-teasers](http://registry.origami.ft.com/components/o-teaser).

- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

### Markup

The basic markup structure for a teaser collection will look something like this:

```html
<div class="o-teaser-collection">
	<h2 class="o-teaser-collection__heading">
		<a class="o-teaser-collection__heading-link" href="#">UK</a>
	</h2>

	<!-- Content goes here -->
</div>
```

Content for teaser collections can be arranged using [o-grid](http://registry.origami.ft.com/components/o-grid), or by using the `o-teaser-collection__items` and `o-teaser-collection__item` classes. These classes are designed to work on list elements, as seen in the `o-teaser-collection--numbered` example:

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

Teaser Collections can be customised using several [themes](#themes), for a full list of examples including example markup, see [o-teaser-collection in the Registry](http://registry.origami.ft.com/components/o-teaser-collection).

### Sass:

As with all Origami components, o-teaser-collection has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than incorporating its mixins into your own Sass) set `$o-teaser-collection-is-silent : false;` in your Sass before you import the o-teaser-collection Sass:

```sass
$o-teaser-collection-is-silent: false;
@import 'o-teaser-collection/main';
```

#### Using Sass mixins

The `o-teaser-collection` styles are also available via Sass mixins. To include all styles for teaser collections, you can do:

```sass
@include oTeaserCollection;
```

By default the `oTeaserCollection` mixin includes both [themes](#themes), to include a single theme or no themes you can pass an argument to the mixin:

```sass
@include oTeaserCollection('');
@include oTeaserCollection('numbered');
```

#### Themes

`o-teaser-collection` has two themes along with the standard collections styles.

Use `o-teaser-collection--numbered` to number the list of teasers in the collection, see an [example in the registry](http://registry.origami.ft.com/components/o-teaser-collection#demo-numbered).

Use `o-teaser-collection--special` to add a darker background across the full width of the containing relative element, see an [example in the registry](http://registry.origami.ft.com/components/o-teaser-collection#demo-special).


## Migration guide

### Upgrading from v1.x.x to v2.x.x

- Deprecated classname `.o-teaser-collection--top-top-stories` has now been removed. __Resolution__ Please use `.o-teaser-collection--top-standalone` instead.
- Styles for `.o-teaser-collection--stream .o-teaser__action` have been removed.
- The o-colors and o-typography dependencies have been bumped to the latest major. These will create bower conflicts which should be resolved by updating to the newest release of o-colors and o-typography.

### Deprecated v1 styles

The classname `.o-teaser-collection--top-top-stories` is deprecated and will be removed in v2, please use `.o-teaser-collection--top-standalone` instead.

The following styles are also deprecated and will be removed in v2:

```sass
.o-teaser-collection--stream .o-teaser__action {
	position: absolute;
	right: 0;
	top: 0;
}
```


----

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-teaser-collection/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).


----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

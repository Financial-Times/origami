o-editorial-layout [![Circle CI](https://circleci.com/gh/Financial-Times/o-editorial-layout/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-editorial-layout/tree/master)[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

_Typography styles and layout for editorial content._

- [Markup](#markup)
- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

o-editorial-layout builds on [o-editorial-typography](https://registry.origami.ft.com/components/o-editorial-typography) to provide margin and layout for editorial typography for specific contexts such as an article page.

o-editorial-layout currently provides margins between typographical elements, asides, and figures. It could be expanded to include the layout of article pages themselves.

### Markup

Headings 1-5 are provided with their margin with the class `o-editorial-layout-heading-level-[level]`:

```html
<h1 class="o-editorial-layout-heading-level-1">Heading level 1</h1>
<h2 class="o-editorial-layout-heading-level-2">Heading level 2</h2>
<h3 class="o-editorial-layout-heading-level-3">Heading level 3</h3>
<h4 class="o-editorial-layout-heading-level-4">Heading level 4</h4>
<h5 class="o-editorial-layout-heading-level-5">Heading level 5</h5>
```

For paragraphs use the `o-editorial-layout-body` class:

```html
<p class="o-editorial-layout-body">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
```

Adjacent `figure`, `aside`, and `div` elements will have margin applied.

A wrapper class `o-editorial-layout-wrapper` may be used to style child elements based on their semantic meaning. This includes headings, paragraphs, lists, figure captions, footers, blockquotes, and more. See a [full example in the wrapper registry](https://registry.origami.ft.com/components/o-editorial-layout). Only direct children, and in some cases the children of paragraph elements, are styled.

```html
<div class="o-editorial-layout-wrapper">
	<h1>heading 1</h1>
	<h2>heading 2</h2>

	<p><a href="#">Lorem ipsum dolor sit amet consectetur</a> adipisicing elit.</p>

	<blockquote>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, quaerat!</p>
		<footer><cite>Lorem, ipsum dolor.</cite></footer>
	</blockquote>

	<p><em>Some italic copy</em> adipisci consectetur.</p>

	<p>Quas<sup>sup</sup> and dolorem<sub>sub</sub> harum tempora omnis.</p>

	<ol>
		<li>Lorem ipsum&#xA0;adipiscing elit.</li>
		<li>Sed feugiat turpis at massa tristique.</li>
		<li>Curabitu r accumsan elit luctus.</li>
	</ol>
</div>
```

### Sass

Include all o-editorial-layout styles by including the `oEditorialLayout` mixin.

```scss
@import "o-editorial-layout/main";

@include oEditorialLayout();
```

To include just the styles you need we recommend setting the options `$opts` argument.

For example to include only heading levels 1-3 and body copy styles.
```scss
@include oEditorialLayout($opts: (
	'body': true,
	'headings': (1, 2, 3),
	'wrapper': true
));
```

We recommend including styles with `oEditorialLayout` and using default markup to reduce duplicated CSS in your project. However you may also use `oEditorialLayoutHeading` and `oEditorialLayoutBody` to apply styles to your own markup _(note: placeholders are used, which ay effect the source order of your CSS)_.

For example to output a heading:
```scss
.my-h2-with-margin {
    @include oEditorialLayoutHeading(2);
}
```

See the [o-editorial-layout Sassdoc](https://registry.origami.ft.com/components/o-editorial-layout/sassdoc) for more details.

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-editorial-typography/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

o-editorial-typography [![Circle CI](https://circleci.com/gh/Financial-Times/o-editorial-typography/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-editorial-typography/tree/master)[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

_Typography styles for editorial content._

- [Markup](#markup)
- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

[o-typography](https://registry.origami.ft.com/components/o-typography) provides fundamental typographic tooling and styles for user interfaces. o-editorial-typography builds on that with typography for editorial content including headlines, tags, and bylines. It makes no assumption about where the editorial typography will be used -- it could be a page, another component, or email for example -- so no default margins are provided. To apply typography and layout editorial typography within an article see [o-editorial-layout](https://registry.origami.ft.com/components/o-editorial-layout).

### Markup

#### Headings

Headings 1-6 are provided with the class `o-editorial-typography-heading-level-[level]`:

```html
<h1 class="o-editorial-typography-heading-level-1">Heading level 1</h1>
<h2 class="o-editorial-typography-heading-level-2">Heading level 2</h2>
<h3 class="o-editorial-typography-heading-level-3">Heading level 3</h3>
<h4 class="o-editorial-typography-heading-level-4">Heading level 4</h4>
<h5 class="o-editorial-typography-heading-level-5">Heading level 5</h5>
```

Heading level 1 is a suitable for most cases but for more emphasis use `o-editorial-typography-headline` instead.
```html
<h1 class="o-editorial-typography-headline">Don&rsquo;t settle for black and white</h1>
```

#### Body

For paragraphs use the `o-editorial-typography-body` class:

```html
<p class="o-editorial-typography-body">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
```

#### Lists

There are styles for both ordered and unordered lists. Use the class `o-editorial-typography-list` along with `o-editorial-typography-list--ordered` or `o-editorial-typography-list--unordered`.

So lists may be used in different contexts they inherit font properties such as size and family. It's therefore required to apply font styles to a parent element. E.g. this could be done with `o-editorial-typography-body`.

```html
<div class="o-editorial-typography-body">
    <ul class="o-editorial-typography-list o-editorial-typography-list--unordered">
        <li>Lorem ipsum&nbsp;adipiscing elit.</li>
        <li>Sed feugiat turpis at massa tristique.</li>
        <li>Curabitu r accumsan elit luctus.</li>
    </ul>
</div>
```

```html
<div class="o-editorial-typography-body">
    <ol class="o-editorial-typography-list o-editorial-typography-list--ordered">
        <li>Lorem ipsum&nbsp;adipiscing elit.</li>
        <li>Sed feugiat turpis at massa tristique.</li>
        <li>Curabitu r accumsan elit luctus.</li>
    </ol>
</div>
```

#### Topic Tag

Reference categories of content with topic tags. A topic tag is usually an anchor but does not have to be if there is no page to link to.

No font size is set so the tag may be used in different contexts.

```html
<a class="o-editorial-typography-topic" href="#">Topic Link</a>
<span class="o-editorial-typography-topic">Topic Without Link</span>
```

#### Author Tag

Style an author tag using the class `o-editorial-typography-author`. An author tag is usually an anchor but does not have to be if there is no author page to link to.

```html
<a class="o-editorial-typography-author" href="#">Joe Doe</a>
<span class="o-editorial-typography-author">Joe Doe</span>
```

#### Timestamp

`o-editorial-typography-timestamp` styles a timestamp. It does not set font size or family so may be used in different contexts, such as an article byline or comments section.

```html
<time class="o-editorial-typography-timestamp" datetime="2019-10-11T20:51:54Z" title="October 11 2019 9:51 pm" aria-label="October 11 2019">October 11 2019</time>
```

#### Byline

A story byline may be styled using `o-editorial-typography-byline`. It's often used along with author and timestamp styles.

```html
<div class="o-editorial-typography-byline">
    <a class="o-editorial-typography-author" href="#">Joe Doe</a>
    in London
    <time class="o-editorial-typography-timestamp" datetime="2019-10-11T20:51:54Z" title="October 11 2019 9:51 pm" aria-label="October 11 2019">October 11 2019</time>
</div>
```

#### Captions

Style captions using `o-editorial-typography-caption`.

```html
<figure>
    <img alt="" src="#">
    <figcaption class="o-editorial-typography-caption">
        ©Lorem John Doe
    </figcaption>
</figure>
```

### Sass

Include all o-editorial-typography styles by including the `oEditorialTypography` mixin.

```scss
@import "o-editorial-typography/main";

@include oEditorialTypography();
```

To include just the styles you need we recommend setting the options `$opts` argument.

For example to include only heading levels 1-3 and body copy styles.
```scss
@include oEditorialTypography($opts: (
	'body': true,
	'headings': (1, 2, 3)
));
```

This example shows all options:
```scss
@include oEditorialTypography($opts: (
	'body': true,
	'lists': ('ordered', 'unordered'),
	'caption': true,
	'headline': true,
	'headings': (1, 2, 3, 4, 5),
	'standfirst': true,
	'author': true,
	'topic': true,
	'byline': true,
	'timestamp': true
));
```

We recommend including styles with `oEditorialTypography` and using default markup to reduce duplicated CSS in your project. However you may also use typography mixins provided if you are unable to update your markup to `o-editorial-typography` classes. Mixins include:

- `oEditorialTypographyHeadline`
- `oEditorialTypographyHeading`
- `oEditorialTypographyBody`
- `oEditorialTypographyList`
- `oEditorialTypographyCaption`
- `oEditorialTypographyStandfirst`
- `oEditorialTypographyByline`
- `oEditorialTypographyTimestamp`
- `oEditorialTypographyTag`
- `oEditorialTypographyDecorated`


For example to output a heading:
```scss
.my-h2 {
    @include oEditorialTypographyHeading(2);
}
```

Or a topic tag:
```scss
.my-topic-tag {
    @include oEditorialTypographyTag('topic');
}
```

See the [o-editorial-typography Sassdoc](https://registry.origami.ft.com/components/o-editorial-typography/sassdoc) for full details and more examples.

#### Font Loading

Calling `oEditorialTypography` will output font faces to download custom Financial Times fonts. However IE11 may download fonts which are not used. To include font faces more granularly based on your use set `$o-editorial-typography-load-fonts: false` and use [o-fonts](https://registry.origami.ft.com/components/o-fonts). This is not required if your project also uses o-typography and has already set [$o-typography-load-fonts](https://registry.origami.ft.com/components/o-typography).

```scss
// configure $o-editorial-typography-load-fonts to not include fonts
$o-editorial-typography-load-fonts: false;
// import dependencies
@import 'o-editorial-typography/main';
// include css for select fonts manually
@include oFontsInclude(MetricWeb, semibold);
@include oFontsInclude(FinancierDisplayWeb, regular);
@include oFontsInclude(FinancierDisplayWeb, bold);
// include css for all editorial typography
@include oEditorialTypography();
```

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-editorial-typography/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

# o-typography [![Build Status](https://circleci.com/gh/Financial-Times/o-typography.png?style=shield&circle-token=9ca314332de2a9b6a80eb8477e097d9acbc96e0b)](https://circleci.com/gh/Financial-Times/o-typography)

Typographical styles for FT branded sites - font families, weight, colors, sizes and vertical rhythm. The module provides styles for headings, titles, leads and body content.

----

- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
		- [Mixins](#mixins)
		- [Responsive font scales](#responsive-font-scales)
		- [Progressive loading web fonts](#progressive-loading-web-fonts)
		- [Baseline grid mixins](#baseline-grid-mixins)
- [Troubleshooting](#troubleshooting)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)


## Usage

o-typography uses a single typographic scale for use with all fonts. The scale consists of font-size and line-height combinations, as shown below:

| Scale | Font size | Line height |
|------ |---------- |------------ |
|    -2 |      12px |        16px |
|    -1 |      14px |        16px |
|     0 |      16px |        20px |
|     1 |      18px |        20px |
|     2 |      20px |        24px |
|     3 |      24px |        28px |
|     4 |      28px |        32px |
|     5 |      32px |        32px |
|     6 |      40px |        40px |
|     7 |      48px |        48px |
|     8 |      56px |        56px |
|     9 |      72px |        72px |
|    10 |      84px |        84px |

This scale makes up all typographic styles available through o-typography. It is available when using Sass through the [typography mixins](#mixins).

### Markup

#### Using CSS classes

The predefined CSS classes in o-typography are available when using the [build service](https://www.ft.com/__origami/service/build/v2/) or in [Sass](#sass) when silent-mode is set to `false`.

All classes provided by o-typography come prefixed with 'o-typography-'; for example `o-typography-headline`. Classes do not depend on specific HTML, but we encourage developers to use semantic elements.

Example:

```html
<h2 class="o-typography-heading-level-2">Heading medium</h2>
```

See the [demos](http://registry.origami.ft.com/components/o-typography#section-demos) for a full list of the classes provided and their effects.

#### Wrappers

Wrappers reduce the need for developers to apply styles to specific elements. By using a wrapper, body styles get applied to the HTML element and descendent typographic elements: h1, h2, h3, h4, h5, p, a, blockquote, footer, strong, em, small, sup, sub, ul, ol, li.

Example:

```html
<div class="o-typography-wrapper">
	<h2>Heading medium</h2>
	<p>Body block with <strong>styled inline text</strong>.</p>
	<h3>Heading small</h3>
	<p>Body block with <em>styled inline text</em>.</p>
</div>
```

### Sass

As with all Origami components, o-typography has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using the mixins with your own Sass) set `$o-typography-is-silent : false;` in your Sass before you import the o-typography Sass.

**Note: Including fonts**

By default, when silent mode is set to `false`, o-typography will download the FT webfonts. To suppress this, set `$o-typography-load-fonts` to `false`:

```sass
$o-typography-is-silent: false;
$o-typography-load-fonts: false;

@import 'o-typography/main';
```

When silent mode is set to `true`, o-typography does not load web fonts. Products should load web fonts themselves using **[o-fonts](https://github.com/financial-times/o-fonts).**

#### Mixins

The Sass in o-typography provides several types of mixin for use in your project. In the following sections they are in order of most to least preferred method.

##### Use Case mixins

The module has a small number of common typographic use cases that are available as mixins.

```scss
.article {
	p,
	blockquote {
		@include oTypographyBody;
	}
}
```

For wrappers ([see wrapper section](#wrappers)):

```scss
.article__body {
	@include oTypographyBodyWrapper;
}
```

Mixins exist for all the same styles as pre-defined classes, named with a camelCased version of the class name.

##### Type mixins

If you want to output only the font-family, font-size, and line-height, with no extra styles, use the type mixins.

Sass:

```sass
h1 {
	@include oTypographyDisplay($scale: 7);
}
```

Output:

```css
h1 {
	font-family: FinancierTextDisplay, serif;
	font-size: 48px;
	line-height: 48px;
}
```

These mixins take three arguments:

- **scale**: The number on the font scale you want to output. Value can be a map to specify [responsive font scales](#responsive-font-scales)
- **line-height**: An override value for the line-height.
- **progressive**: Whether to output progressive font loading styles. `true` by default.

For example, to override the line-height for the serif font using `1` on the font scale, you would do:

```sass
.content p {
	@include oTypographySerif($scale: 1, $line-height: 28px, $progressive: false);
}
```

Output:

```css
.content p {
	font-family: Georgia, serif;
	font-size: 18px;
	line-height: 28px;
}
```

##### Font Scale mixin

If you want to output only the font-size and line-height from the font scale, you can use the `oTypographySize` mixin.

Example:

```sass
h1 {
	@include oTypographySize($scale: 8);
}
```

Output

```css
h1 {
	font-size: 56px;
	line-height: 56px;
}
```

As with the [type mixins](#type-mixins), the `oTypographySize` mixin can accept a second parameter of `$line-height` to override the default value from the font scale.

#### Responsive font scales

Sometimes there is a need for font sizes to adapt at different breakpoints. To allow for this, wherever there is a `$scale` argument in a mixin, you can provide a map of scales for each breakpoint. Breakpoints defined by the [o-grid](https://github.com/Financial-Times/o-grid) breakpoint sizes.

For example, to use the Sans font at scale `0` at `default`, then `1` at `medium`, and finally `2` at `x-large` you can do:

```sass
p {
	@include oTypographySans( $scale: (default: 0, M: 1, XL: 2) );
}
```

Output:

```css
p {
	font-family: MetricWeb, sans-serif;
	font-size: 16px;
	line-height: 24px;
}

@media (min-width: 46.25em) {
	p {
		font-size: 18px;
		line-height: 28px;
	}
}

@media (min-width: 76.25em) {
	p {
		font-size: 20px;
		line-height: 24px;
	}
}
```

You can also use this method and override line-heights in the scale at the same time. In this case, provide a scale size and line height as a list in the map:

Example:

```sass
p {
	@include oTypographySans( $scale: (default: (0, 1em), M: (1, 1em), XL: (2, 1em)) );
}
```

Output:

```css
p {
	font-family: MetricWeb, sans-serif;
	font-size: 16px;
	line-height: 1em;
}

@media (min-width: 46.25em) {
	p {
		font-size: 18px;
		line-height: 1em;
	}
}

@media (min-width: 76.25em) {
	p {
		font-size: 20px;
		line-height: 1em;
	}
}
```

#### Progressive loading web fonts

One of the drawbacks of using web fonts is some browsers hide the text while the font is downloading (Flash of Invisible Text, aka FOIT). A common pattern for avoiding this is to use a system fallback font initially. Then, once the web font has loaded, remove a class from the html element used to display the fallback font. The CSS would look a little like this:

```css
p {
	font-family: FinancierDisplayWeb, serif;
	font-size: 20px;
	line-height: 24px;
}

.font-loading-serif p {
	font-family: serif;
	font-size: 18px;
}
```

o-typography provides ways of loading fonts progressively through both the [Build Service](https://www.ft.com/__origami/service/build/v2/) and when building your product manually. In both cases to use the fallback font while the web font is loading, you'll have to add loading classes to your html element:

```html
<html class="o-typography--loading-sans o-typography--loading-sansBold o-typography--loading-display o-typography--loading-displayBold">
```

**With the build service:**

Include both the CSS and JavaScript for o-typography in your project. While ensuring you have the loading classes for each font you wish to load on your html element.

**With a manual build process:**

If you build your projects using Sass, styles for progressively loading fonts are output by default when using the [use case mixins](#use-case-mixins) or [type mixins](#type-mixins). If you need to output fallback styles manually, you can do so with the `oTypographyProgressiveFontFallback` mixin.

Example:

```sass
h1 {
	@include oTypographySize(1);
	@include oTypographyProgressiveFontFallback('display', 1);
}
```

Output:

```css
h1 {
	font-size: 18px;
	line-height: 28px;
}

.o-typography--loading-display h1 {
	font-size: 16.2px;
	font-family: serif;
}
```

To enable loading fonts progressively when manually building your project, you will also need to include the o-typography [JavaScript](#javascript) in your project.

#### Baseline grid mixins

Along with font sizing o-typography provides mixins for working with a baseline grid. The baseline grid defaults to `4px`, stored in `$o-typography-baseline-unit`.

There are 2 mixins and a function provided for working with the baseline grid. Each mixin or function takes arguments used as multipliers of the `$o-typography-baseline-unit` variable.

- `oTypographyMargin($top, $bottom)` - (mixin) output top and bottom margins
- `oTypographyPadding($top, $bottom)` - (mixin) output top and bottom padding
- `oTypographySpacingSize($units)` - (function) returns a pixel value

Usage:

```sass
h1 {
	@include oTypographyMargin($top: 3, $bottom: 5);
	@include oTypographyPadding($top: 0, $bottom: 5);
	border-bottom: oTypographySpacingSize($units: 2) solid #000;
}
```

Output:

```css
h1 {
	margin-top: 12px;
	margin-bottom: 20px;
	padding-top: 0;
	padding-bottom: 20px;
	border-bottom: 8px solid #000;
}
```

#### Custom link mixin

Links in o-typography have a custom underline which uses borders. As well as the default link mixin (`oTypographyLink`), we expose `oTypographyLinkCustom` which allows you to output link styles with your own colors.

This mixin accepts four arguments, all of which must be valid o-colors palette colors:

- **baseColor**: The base text color of the link. This is mixed with `backgroundColor` to create the underline color.
- **hoverColor**: The text color of the link when it's hovered or focused.
- **backgroundColor**: The color of the background the link will sit on. Defaults to `paper`.
- **outlineColor**: The outline color of the link when it receives focus. Defaults to `teal`.

Example usage:

```scss
.my-custom-link {
	@include oTypographyLinkCustom(
		$baseColor: 'claret',
		$hoverColor: 'claret-30'
	);
}

.dark-background .my-custom-link {
	@include oTypographyLinkCustom(
		$baseColor: 'lemon',
		$hoverColor: 'lemon-30',
		$backgroundColor: 'slate'
	);
}
```

### JavaScript

o-typography uses JavaScript to [progressively load fonts](#progressive-loading-web-fonts) to prevent a flash of invisible content (FOIC) if the web-fonts are taking a long time to load.

Unless you're using the Build Service no JS will run automatically. You must either construct an o-typography object or fire the `o.DOMContentLoaded` event, which oTypography listens for.

**Constructing o-typography**

```js
const oTypography = require('o-typography');

const otypography = new oTypography();
```

**Firing an oDomContentLoaded event**

```js
document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

Both methods will trigger the font loading scripts. This will remove the loading classes from the html enabling [progressive font loading](#progressive-loading-web-fonts).

## Troubleshooting

### Fonts not loading in IE11
This is likely due to a misconfigured `Vary` header. In IE11 if the `Vary` header contains the name of a header which the browser is not aware of E.G. `FT-Site`, then it will cancel downloading the fonts part way through recieving the response yet still report the response as having a 200 HTTP status code. The solution to this is to remove the erroneous `Vary` header values or to remove the `Vary` header altogether. You can read more about how IE handles the `Vary` header on [MSDN](https://blogs.msdn.microsoft.com/ieinternals/2009/06/17/vary-with-care/).

### Fonts not loading in any brower
This is likely due to the server sending the fonts having misconfigured Cross Origin Resource Sharing (CORS). The solution to this is to set the header `Access-Control-Allow-Origin` with the value `*` for any font requests.


## Migration guide

### Migrating from v4 to v5

V5 of o-typography is a complete overhaul of the typographic system for FT products. The update includes:

- introducing a **new typographic scale**, replacing the type matrix system in the previous version. This affects the [mixins and sizes](#mixins-and-sizes) provided by the API.
- new use cases, updated to reflect the latest master brand styles. These are available via new [CSS classes](#css-classes) and mixins.
- removing access to the `FinancierText` font family and replace serif font with `Georgia`.

#### Mixins and sizes

To help you migrate from the v4 mixins to the v5 mixins. We have provided a [table recommending the mixins and font scale](migrating-v4-v5.md) you should use when migrating from v4 to v5.

The following mixins are now renamed:

```diff
- oTypographySerifDisplayBold
+ oTypographyDisplayBold

- oTypographySerifDisplay
+ oTypographyDisplay

- oTypographySansDataBold
+ oTypographySansBold

- oTypographySansData
+ oTypographySans

- font-size
+ oTypographySize

- oTypographyProgressiveFont
+ oTypographyProgressiveFontFallback

- oTypographyFallbackFontSize
+ _oTypographyProgressiveFontFallbackSize

- oTypographyHeading1
+ oTypographyHeadline

- oTypographyHeading2
+ oTypographyHeadingLevel2

- oTypographyHeading3
+ oTypographyHeadingLevel3

- oTypographyHeading4
+ oTypographyHeadingLevel4

- oTypographyHeading5
+ oTypographyHeadingLevel5

- oTypographyLinkTopic
- oTypographyLinkTopicMedium
+ oTypographyTopic
```

v5 also removes the following mixins:

```diff
- oTypographySansSize
- oTypographySansBoldSize
- oTypographySansDataSize
- oTypographySansDataBoldSize
- oTypographySansDataItalicSize
- oTypographySerifSize
- oTypographySerifBoldSize
- oTypographySerifItalicSize
- oTypographySerifDisplaySize
- oTypographySerifDisplayBoldSize
- oTypographySerifDisplayItalicSize
```

#### CSS classes

v5 introduces several changes to the CSS classes that are available. Whether using the build service or Sass with silent mode switched off you will need to update to the new classnames. The following diff shows removed class and what classname you should use instead, if available.

```diff
- .o-typography-block
+ .o-typography-body

- .o-typography-lead
- .o-typography-lead--small
+ .o-typography-standfirst

- o-typography-heading1
+ o-typography-headline

- o-typography-heading2
+ o-typography-heading-level-2

- o-typography-heading3
+ o-typography-heading-level-3

- o-typography-heading4
+ o-typography-heading-level-4

- o-typography-heading5
+ o-typography-heading-level-5

- .o-typography-link-topic
- .o-typography-link-topic--medium
+ .o-typography-topic

- .o-typography-body-wrapper
+ .o-typography-wrapper


// The following classnames do not have like-for-like replacements
- .o-typography-flyline
- .o-typography-subhead
- .o-typography-subhead--standard
- .o-typography-subhead--crosshead
- .o-typography-aside__title
- .o-typography-aside__title--large
- .o-typography-aside__headline
- .o-typography-aside__headline--small
- .o-typography-aside__headline--large
- .o-typography-aside__body
- .o-typography-aside__body--small
- .o-typography-aside-wrapper
```

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-typography/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

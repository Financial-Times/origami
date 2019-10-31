# o-typography [![Build Status](https://circleci.com/gh/Financial-Times/o-typography.png?style=shield&circle-token=9ca314332de2a9b6a80eb8477e097d9acbc96e0b)](https://circleci.com/gh/Financial-Times/o-typography) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Typographical styles for FT branded sites. The component provides typographical fundamentals such as font scales, vertical rhythm, and font fallbacks. Plus styles for UI including links, headings, and titles. Other components build on o-typography to provide for more specific usecases such as [editorial typography](https://github.com/Financial-Times/o-editorial-typography), [quotes](https://github.com/Financial-Times/o-quote/), or [big numbers](https://github.com/Financial-Times/o-big-number/).

----

- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Troubleshooting](#troubleshooting)
- [Migration guide](#migration)
- [Contact](#contact)
- [Licence](#licence)


By default, o-typography uses a single typographic scale for use with all fonts. The scale consists of font-size and line-height combinations, as shown below:

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

_Note: The whitelabel branded version of o-typography has a different default scale. The font sizes are the same, but the line-height is 1.2x the font size at every scale._

This scale makes up all typographic styles available through o-typography. It is available when using Sass through the [typography mixins](#mixins).

## Markup

Predefined CSS classes in `o-typography` are available when using the [build service](https://www.ft.com/__origami/service/build/v2/), and can be included optionally via [Sass](#sass).

Classes do not depend on specific HTML, but we encourage developers to use semantic elements.

E.g.
```html
<h1 class="o-typography-heading-level-1">Heading level 1</h1>
<h2 class="o-typography-heading-level-2">Heading level 2</h2>
<p class="o-typography-body">Some body copy.</p>
<a class="o-typography-link" href="#" >Some link.</a>
<!-- etc. -->
```

`o-typography` also provides wrapper classes. These reduce the need for developers to apply styles to specific elements. By using a wrapper, body styles get applied to the HTML element and descendent typographic elements: h1, h2, h3, h4, h5, p, a, footer, strong, em, small, sup, sub, ul, ol, li.

Example:

```html
<div class="o-typography-wrapper">
	<h1>Heading level 1</h1>
	<h2>Heading level 2</h2>
	<p>Some body copy.</p>
	<a href="#">Some link.</a>
</div>
```

See the [demos](http://registry.origami.ft.com/components/o-typography) for a full list of the classes provided and their effects.

### Progressive Loading Web Fonts

One of the drawbacks of using web fonts is some browsers hide the text while the font is downloading (Flash of Invisible Text, aka FOIT). The [font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) property may be used within font faces to show a system font fallback initially. Then either swap immediately when the font has loaded or on the next page load.

However `font-display` is not supported by Internet Explorer or mobile Safari 10, so `o-typography` provides a custom implementation which works by removing a class from the html element used to display the fallback font. Using this approach we're able to support older browsers and adjust the size of the fallback font so it looks more similar to our custom font. The CSS would look a little like this:

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

#### Disable Progressive Loading

If you do not want to use `o-typography` progressive font loading set `$o-typography-progressive-font-loading: false;` at the top of your project before importing components:

```scss
// configure o-typography to not include progressive font fallback css
$o-typography-progressive-font-loading:: false;
// import dependencies
@import 'o-typography/main';
@import 'o-fonts/main';
```

#### Setup Progressive Loading

To setup `o-typography` progressive font loading include both its CSS and JavaScript in your project. While ensuring you have the loading classes for each font you wish to load on your html element:

```html
<html class="o-typography--loading-sans o-typography--loading-sans-bold o-typography--loading-display o-typography--loading-display-bold">
```

The fallback font will be switched for the custom font on each page load, as o-typography JavaScript detects the font has loaded and removes the above CSS classes. This causes a visual "flash". To prevent that add the following JavaScript snippet in the `head` of your page:

```js
  var rootElement = document.querySelector('html')
  if (/(^|\s)o-typography-fonts-loaded=1(;|$)/.test(document.cookie)) {
    var fontLabels = ['sans', 'sans-bold', 'display', 'display-bold']
    for (var i = 0; i < fontLabels.length; i++) {
      rootElement.className = rootElement.className.replace('o-typography--loading-' + fontLabels[i], '')
    }
  }
```

If you build your projects using Sass, styles for progressively loading fonts are output by default when using the [use case mixins](#use-case-mixins) or [type mixins](#type-mixins).

### Sass

To include all typography classes use the `oTypography` mixin:

```scss
@include oTypography();
```

To include typography styles granularly pass an options argument with the features to include:

```scss
@include oTypography($opts: (
	'wrapper'
));
```

| Feature          | Description                                                                                                                                                                                                                               | Brand support                |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| headings         | Heading classes. E.g. `o-typography-heading-level-1`, `o-typography-heading-level-2`, etc.                                                                                                                                                | master, internal, whitelabel |
| wrapper          | A class `o-typography-wrapper` which styles children elements based on semantics including headings, paragraphs, lists, links, and more e.g. `<h1>`, `<p>`, `<li>`, `<a>`, `<figcaption>`                                                 | master, internal, whitelabel |
| body             | A class for standard body copy, such as paragraphs.                                                                                                                                                                                       | master, internal, whitelabel |
| links            | A class for anchor tags, including a septate class to indicate external links.                                                                                                                                                            | master, internal, whitelabel |
| lists            | Classes to style lists, ordered or unordered.                                                                                                                                                                                             | master, internal, whitelabel |
| caption          | A class to style captions.                                                                                                                                                                                                                | master, internal, whitelabel |
| footer           | A class to style footers.                                                                                                                                                                                                                 | master, internal, whitelabel |
| utilities        | A collection of classes to modify typography including weight, style, superscript, and subscript.                                                                                                                                         | master, internal, whitelabel |

[See the demos](http://registry.origami.ft.com/components/o-typography) for a full list of the CSS classes provided by these features.

**Note: Including fonts**

Calling `oTypography` will output font faces to download custom Financial Times fonts. However IE11 may download fonts which are not used. To include font faces more granularly based on your use of o-typography set `$o-typography-load-fonts: false` and use [o-fonts](https://registry.origami.ft.com/components/o-fonts).

```scss
// configure o-typography to not include fonts
$o-typography-load-fonts: false;
// import dependencies
@import 'o-typography/main';
@import 'o-fonts/main';
// include css for select fonts manually
@include oFontsInclude(MetricWeb, regular);
@include oFontsInclude(FinancierDisplayWeb, regular);
@include oFontsInclude(FinancierDisplayWeb, bold);
// include css for all typography
@include oTypography();
```

The Sass in o-typography also provides several mixins for use in your project. To explore all functions/mixins see the [SassDoc documentation](sassdoc) in the registry.

### Use Case Mixins

To avoid duplicated CSS we recommend using default o-typography classes output by [oTypography](#sass). Where you are unable to use o-typography markup, Sass mixins may be used to output styles for usecases such as headings, body copy, and links.

See [o-typography SassDoc](https://registry.origami.ft.com/components/o-typography/sassdoc) for a full list of mixins including more details and examples. Also see [editorial typography](https://github.com/Financial-Times/o-editorial-typography), [quotes](https://github.com/Financial-Times/o-quote/), and [big numbers](https://github.com/Financial-Times/o-big-number/) for more specific typography usecases.

#### oTypographyHeading

Use `oTypographyHeading` to output styles for heading levels 1-6.

```scss
h2 {
	@include oTypographyHeading($level: 2);
}
```

#### oTypographyBody

Use `oTypographyBody` to output styles for body copy such as paragraph text.

```scss
p {
	@include oTypographyBody();
}
```

#### oTypographyLink

Use `oTypographyLink` to output styles for links.

```scss
a {
	@include oTypographyLink();
}
```

Set the `$external` argument to to indicate the link leads to a different website with an icon.

```scss
.my-external-link {
	@include oTypographyLink($external: true);
}
```

To create a custom link style set the `$theme` argument. Where `$theme` is a map of configuration including:

- **base**: an [o-colors](https://registry.origami.ft.com/components/o-colors) palette colour name for the link
- **hover**: an [o-colors](https://registry.origami.ft.com/components/o-colors) palette colour name for link on hover

```scss
.my-custom-link {
	@include oTypographyLink($theme: ('base': 'claret', 'hover': 'claret-30'));
}
```

#### oTypographyList

`oTypographyList` outputs styles for lists such as `ul` or `ol` elements and styles child `li` elements. It does not output specific font styles such as font size, weight, etc. Font styles are instead inherited from the parent element.

`oTypographyList` by default outputs only shared styles between all list types. To output all styles for a list type set the  `$type` argument to either `unordered` or `ordered`.

E.g. to output styles for an unordered list:
```scss
.my-unordered-list {
	@include oTypographyList('unordered');
}
```

Use `$include-base-styles` to avoid duplicating shared styles between list types:
```scss
.my-list {
	@include oTypographyList();
}

.my-list--ordered {
	@include oTypographyList($type: 'ordered', $include-base-styles: false);
}

.my-list--unordered {
	@include oTypographyList($type: 'unordered', $include-base-styles: false);
}
```

#### oTypographyCaption

`oTypographyCaption` outputs styles for credit/captions, e.g. for photo or video elements.

```scss
caption {
	@include oTypographyCaption();
}
```

#### oTypographyFooter

`oTypographyFooter` outputs styles for footer elements.

```scss
footer {
	@include oTypographyFooter();
}
```

#### oTypographySub and oTypographySuper

`oTypographySub` and `oTypographySuper` provide styles for sans-serif subscript and superscript elements.

```scss
sup {
	@include oTypographySuper;
}

sub {
	@include oTypographySub;
}
```

### Type Mixins

If you want to output only the font-family, font-size, and line-height, with no extra styles, use the type mixins.

- `oTypographySans` - Typically for UI elements.
- `oTypographySerif` - Typically for editorial body copy.
- `oTypographyDisplay` - Typically for editorial headings.

These mixins take arguments:

- **scale**: The number on the font scale from -2 to 10, or a map of scales to specify the scale responsively at different breakpoints. This sets a font-size and line height according to the font scale.
- **line-height**: The line-height value to set. Defaults to the line-height for the chosen `scale` or `null` if no scale is chosen.
- **weight**: The weight value to set, e.g. `regular`, `semibold`, `bold`. `null` by default.
- **style**: The style value to set, `normal` or `italic`. `null` by default.
- **include-font-family**: Whether to output the `font-family` property. `true` by default.
- **include-progressive**: Whether to output progressive font loading styles. `true` by default.


Output a font-family property only for the serif font.
```scss
@include oTypographySerif();
```

Output font-family, font-size, and line-height for the sans font.
```scss
@include oTypographySans($scale: 1);
```

Output font-family, font-size, and line-height for the serif font responsively. The scale is 0 by default, 1 on a medium display, 2 on an extra large display.
```scss
@include oTypographySerif($scale: ('default': 0, 'M': 1, 'XL': 2));
```

Output font-family, font-size, and line-height for the display font. Set a custom line-height of 1.6.
```scss
@include oTypographyDisplay($scale: 1, $line-height: 1.6);
```

Output font-family, font-size, line-height, font-weight, and font-style for the serif font.
```scss
@include oTypographySerif($scale: 1, $weight: 'bold', $style: 'italic');
```

Output sans font properties without the font-family property. This is useful if modifying the scale of existing typography where the font family is inherited and does not need repeating.
```scss
@include oTypographySans($scale: 1, $style: 'italic', $include-font-family: false);
```

Output serif font properties without sizes for the fallback font (without progressive font loading).
```scss
@include oTypographySerif($scale: 1, $style: 'italic', $include-progressive: false);
```

### Line Width Capping

If you need to cap the line width, o-typography provides a function which limits that value based on the size of the font and an optimal amount of characters per line (65~). Limiting the line length of typography improves readability.

```scss
max-width: oTypographyMaxLineWidth();
```

### Use A Custom Font

To set a custom font, [first register the font using o-fonts](https://registry.origami.ft.com/components/o-fonts).

Then set the custom font using `oTypographySetFont` before calling any other `o-typography` mixins. It accepts a font type (sans, serif, or display) and the custom font family.

```scss
// Set custom sans font.
@include oTypographySetFont($type: 'sans', $family: 'MySansFont, sans');
// The custom sans font is now output by other `o-typography` mixins such as `oTypography`.
@include oTypography();
```

### Use A Custom Font Scale

`o-typography` supports multiple fonts scales, so each font may use a different scale. To register a custom scale use `oTypographyDefineFontScale`. The mixin accepts the font family the scale is for and the scale map (a map of scale numbers to font size/line height).

If defining a scale for a custom font, first [set the custom font](#use-a-custom-font).

```scss
$example-custom-font-family: 'MySansFont, sans';
$example-custom-font-scale: (
   -2: (12, 16), // $scale: ($font-size, $line-height)
   -1: (14, 16),
    0: (16, 20),
    1: (18, 20),
    2: (20, 24),
    3: (24, 28),
    4: (28, 32),
    5: (32, 32),
    6: (40, 40),
    7: (48, 48),
    8: (56, 56),
    9: (72, 72),
   10: (84, 84),
);

@include oTypographyDefineFontScale($example-custom-font-family, $example-custom-font-scale);
```

### Customisation

`o-typography` provides mixins to [set a custom font](#use-a-custom-font) and a [custom font scale](#use-a-custom-font-scale). If your project uses the `whitelabel` brand, `o-typography` provides the option to customise typography further with the `oTypographyCustomize` mixin.

With `oTypographyCustomize` you can change the size of heading levels and update the colour of `o-typography`'s blockquote. In the below example, we update the size of `h1` and `h2` headings, and change the blockquote colour to `hotpink`. For a full list of brand variables which may be customised, see the [oTypographyCustomize SassDoc](https://registry.origami.ft.com/components/o-typography/sassdoc?brand=whitelabel#mixin-oTypographyCustomize).

```scss
$o-brand: whitelabel;
@import 'o-typography/main';

// 1. Set a custom font.
// See "Use A Custom Font".

// 2. Set a custom typographic scale.
// See "Use A Custom Font Scale".

// 3. Customise typography variants.
@include oTypographyCustomize((
    'blockquote-color': hotpink, // Update the blockquote border color to hotpink.
    'heading-level-one': (
        'scale': 7, // Update the size of h1.
    ),
    'heading-level-two': (
        'scale': 6 // Update the size of h2 (up to h6 is supported heading-level-six).
    )
));

// 4. Output typography styles.
h1 {
	@include oTypographyHeading($level: 1);
}

h2 {
	@include oTypographyHeading($level: 2);
}
```

## JavaScript

o-typography uses JavaScript to [progressively load fonts](#progressive-loading-web-fonts) to prevent a flash of invisible content (FOIC) if the web-fonts are taking a long time to load.

Unless you're using the Build Service no JS will run automatically. You must either construct an o-typography object or fire the `o.DOMContentLoaded` event, which oTypography listens for.

**Constructing o-typography**

```js
import oTypography from 'o-typography';

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

### Fonts not loading in any browser
This is likely due to the server sending the fonts having misconfigured Cross Origin Resource Sharing (CORS). The solution to this is to set the header `Access-Control-Allow-Origin` with the value `*` for any font requests.


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 6 | N/A | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
⚠ maintained | 5 | 5.12 | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.3 | - |
╳ deprecated | 3 | 3.3 | - |
╳ deprecated | 2 | 2.0 | - |
╳ deprecated | 1 | 1.16 | - |


---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-typography/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
For more see the [demos in the registry](registry).

[registry]: https://registry.origami.ft.com/components/o-typography/
[sassdoc]: https://registry.origami.ft.com/components/o-typography/sassdoc

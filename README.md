# o-typography [![Build Status](https://circleci.com/gh/Financial-Times/o-typography.png?style=shield&circle-token=9ca314332de2a9b6a80eb8477e097d9acbc96e0b)](https://circleci.com/gh/Financial-Times/o-typography) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Typographical styles for FT branded sites - font families, weight, colors, sizes and vertical rhythm. The component provides styles for headings, titles, leads and body content.

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

`o-typography` also provides wrapper classes. These reduce the need for developers to apply styles to specific elements. By using a wrapper, body styles get applied to the HTML element and descendent typographic elements: h1, h2, h3, h4, h5, p, a, blockquote, footer, strong, em, small, sup, sub, ul, ol, li.

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

### Progressive loading web fonts

One of the drawbacks of using web fonts is some browsers hide the text while the font is downloading (Flash of Invisible Text, aka FOIT). A common pattern for avoiding this is to use a system fallback font initially. Then, once the web font has loaded, remove a class from the html element used to display the fallback font.

The CSS would look a little like this:

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

Include both the CSS and JavaScript for o-typography in your project. While ensuring you have the loading classes for each font you wish to load on your html element:

```html
<html class="o-typography--loading-sans o-typography--loading-sansBold o-typography--loading-display o-typography--loading-displayBold">
```

If you build your projects using Sass, styles for progressively loading fonts are output by default when using the [use case mixins](#use-case-mixins) or [type mixins](#type-mixins).

### Sass

To include all typography classes use the `oTypography` mixin:

```sass
	@include oTypography();
```

To include typography styles granularly pass an options argument with the features to include:

```sass
	@include oTypography($opts: (
		'wrapper'
	));
```

| Feature          | Description                                                                                                                                                                                                                               | Brand support                |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| headings         | Heading classes. E.g. `o-typography-heading-level-1`, `o-typography-heading-level-2`, etc. For the master brand these are currently article-style headings, but standard sans-serif headings for internal and whitelabel brands.          | master, internal, whitelabel |
| wrapper          | A class `o-typography-wrapper` which styles children elements based on semantics including headings, paragraphs, lists, links, and more e.g. `<h1>`, `<p>`, `<li>`, `<a>`, `<figcaption>`                                                 | master, internal, whitelabel |
| body             | A class for standard body copy, such as paragraphs.                                                                                                                                                                                       | master, internal, whitelabel |
| links            | A class for anchor tags, including a seperate class to indicate external links.                                                                                                                                                           | master, internal, whitelabel |
| lists            | Classes to style lists, ordered or unordered.                                                                                                                                                                                             | master, internal, whitelabel |
| caption          | A class to style captions.                                                                                                                                                                                                                | master, internal, whitelabel |
| footer           | A class to style footers.                                                                                                                                                                                                                 | master, internal, whitelabel |
| blockquote       | A class to style blockquotes, including child paragraphs and footer.                                                                                                                                                                      | master, internal, whitelabel |
| utilities        | A collection of classes to modify typography including weight, style, superscript, and subscript.                                                                                                                                         | master, internal, whitelabel |
| product-headings | Non-article heading classes, sans-serif. E.g. `o-typography-product-heading-level-1`                                                                                                                                                      | master, internal(deprecated) |
| product-wrapper  | A class `o-typography-wrapper--product`, which acts like the wrapper feature described above, but with non-article/product headings.                                                                                                      | master, internal(deprecated) |
| article          | This outputs article classes such as for collection headings, topic, author name, standfirst, timestamp, and big number.                                                                                                                  | master                       |
| big-number       | Outputs a class to style a big number `o-typography-big-number`.                                                                                                                                                                          | master                       |
| collection       | Outputs a class to style a collection header `o-typography-collection-heading`. Previously used within articles but now a candidate for potential deprecation.                                                                            | master                       |
| read-next        | Outputs a class `o-typography-read-next` to style the heading in an article's aside. This is a candidate for potential deprecation.                                                                                                       | master                       |

[See the demos](http://registry.origami.ft.com/components/o-typography) for a full list of the CSS classes provided by these features.

**Note: Including fonts**

By calling the mixin `oTypography`, or if silent mode is off (set to `false`), `o-typography` will download FT webfonts. To suppress this, set `$o-typography-load-fonts` to `false`:

```sass
$o-typography-load-fonts: false;
@import 'o-typography/main';
@include oTypography();
```

If silent mode is on (set to `true`) and the main mixin `oTypography()` is **not** used, `o-typography` does not load web fonts. In this case products should load web fonts themselves using **[o-fonts](https://github.com/financial-times/o-fonts).**

The Sass in o-typography also provides several mixins for use in your project. To explore all functions/mixins see the [SassDoc documentation](sassdoc) in the registry.

### Use Case mixins

The module has common typographic use cases that are available as mixins, rather than using `o-typography` classes output with the main `oTypography()` mixin.

E.g:

- `oTypographyHeadline`
- `oTypographyHeadingLevel1`
- `oTypographyHeadingLevel2`
- `oTypographyBody`
- `oTypographyLink`
- `oTypographyCaption`
- `oTypographyBlockquote`
- ...

```scss
.article {
	blockquote {
		@include oTypographyBlockquote;
	}
}
```

See more usecase mixins in the registry [SassDoc documentation](sassdoc).

### Type mixins

If you want to output only the font-family, font-size, and line-height, with no extra styles, use the type mixins.

- `oTypographySerif`
- `oTypographyDisplay`
- `oTypographySans`
- `oTypographyDisplayBold`
- `oTypographySansBold`
- `oTypographySerifBold`
- `oTypographySerifItalic`
- ...

These mixins take three arguments:

- **scale**: The number on the font scale you want to output. Value can be a map to specify responsive font scales.
- **line-height**: An override value for the line-height.
- **progressive**: Whether to output progressive font loading styles. `true` by default.

Sass:

```scss
.example {
	// Outputs font-family, line-height, and font-size for the given scale, with a fallback font for progressive font loading.
	@include oTypographySans($scale: 7);
}
```

```scss
.example {
	// Outputs font-family, font-size for the given scale, the custom line-height, and no fallback font.
	@include oTypographySans($scale: 1, $line-height: 28px, $progressive: false);
}
```

```scss
.example {
	// Responsive font scales are also supported
	// In this example the scale is 0, then 1 on a medium display, 2 on an extra large display.
	@include oTypographySans($scale: (default: 0, M: 1, XL: 2) );
}
```

See more type mixins in the registry [SassDoc documentation](sassdoc).

### Font Scale mixin

If you want to output only the font-size and line-height from the font scale, you can use the `oTypographySize` mixin.

```scss
.example {
	@include oTypographySize($scale: 8);
}
```

It can also accept a second parameter of `$line-height` to override the default value from the font scale.

```scss
.example {
	@include oTypographySize($scale: 8, $line-height: 1.4);
}
```

As with the [type mixins](#type-mixins), the `oTypographySize` mixin can accept a map for a responsive scale.

```scss
.example {
	@include oTypographySize($scale: (default: 0, M: 1, XL: 2));
}
```

To provide a custom line height for each individual breakpoint pass the scale as a list, where the custom line height is the second item. In this example the scale is `0` and line-height is `1.4` by default. On large `XL` screens the scale is `2` and the line-height is `1.2`.

```scss
.example {
	@include oTypographySize($scale: (default: (0, 1.4), XL: (2, 1.2)));
}
```

There is also a function that will cap line width based on the scale and the characters per line:

- `oTypographyMaxLineWidth($scale, $character-per-line)` - (function) returns a pixel value.

### Spacing

**`o-typography` spacing Sass is now deprecated, use [o-spacing](https://github.com/Financial-Times/o-spacing) Sass instead.**

Before [o-spacing](https://github.com/Financial-Times/o-spacing) `o-typography` provided spacing Sass for placing elements within our baseline grid. The baseline grid defaults to `4px`, and is stored in `$o-typography-baseline-unit`.

There are 2 mixins and a function provided for working with the baseline grid. Each mixin or function takes arguments used as multipliers of the `$o-typography-baseline-unit` variable.

- `oTypographyMargin($top, $bottom)` - (mixin) output top and bottom margins
- `oTypographyPadding($top, $bottom)` - (mixin) output top and bottom padding
- `oTypographySpacingSize($units)` - (function) returns a pixel value

These are now deprecated in favour of [o-spacing](https://github.com/Financial-Times/o-spacing) Sass. See more details about spacing in the registry [SassDoc documentation](sassdoc).

### Custom link mixin

Links in o-typography have a custom underline which uses borders. As well as the default link mixin (`oTypographyLink`), we expose `oTypographyLinkCustom` which allows you to output link styles with your own colors.

For a link that launches another window / tab, use oTypographyLinkExternal.

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

### Line Width capping

If you need to cap the line width, o-typography provides a function which limits that value based on the size of the font and an optimal amount of characters per line (65~).

```scss
	max-width: oTypographyMaxLineWidth($scale: 1);
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
	@include oTypographyHeadingLevel1();
}

h2 {
	@include oTypographyHeadingLevel2();
}

blockquote {
	p {
		@include oTypographyBlockquote;
	}

	footer {
		@include oTypographyFooter;
	}
}
```

## JavaScript

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

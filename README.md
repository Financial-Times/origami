
# o-syntax-highlight [![Circle CI](https://circleci.com/gh/Financial-Times/o-syntax-highlight/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-syntax-highlight/tree/master)

A syntax highlighter for Origami-supported documentation that wraps [PrismJs](https://github.com/PrismJS/prism).

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
		- [Construction](#construction)
		- [Sass](#sass)
- [Troubleshooting](#troubleshooting)
- [Contact](#contact)
- [Licence](#licence)

## Usage

This component provides accessible syntax highlighting for Javascript, JSON, HTML, CSS, Sass and SCSS.
_If there are any languages you would like to highlight that we don't currently support, please open an issue and we will provide it._

o-syntax-highlight uses the following colours, on a `slate-white-5` background (`#f4f4f5`). It is compliant with the contrast for [WCAG AA](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html). In order to meet the criteria for AAA at 14px+, the colours would be far too dark to distinguish syntax highlighting effectively.

Color | Hex | Ratio | 14px+ | 18px+  or 14px **bold**
---|---|---|---|---
`black-crimson-25` | `#a50f2d` | [7.06](https://contrast-ratio.com/#%23a50f2d-on-%23f4f4f5) | AAA | AAA
`black-jade-30` | `#006b36` | [6.05](https://contrast-ratio.com/#%23006b36-on-%23f4f4f5) | AA | AAA
`black-lemon-55` | `#736a0c` | [5.03](https://contrast-ratio.com/#%23736a0c-on-%23f4f4f5) | AA | AAA
`crimson-jade-80` | `#a31f0f` | [6.92](http://contrast-ratio.com/#%23a31f0f-on-%23f4f4f5) | AA | AAA
`grey-55` | `#737373` | [4.31](http://contrast-ratio.com/#%23737373-on-%23f4f4f5) | AA | AAA
`grey-70` | `#4d4d4d` | [7.69](http://contrast-ratio.com/#%234d4d4d-on-%23f4f4f5) | AAA | AAA
`oxford` | `#0f5499` | [6.95](http://contrast-ratio.com/#%230f5499-on-%23f4f4f5) | AA | AAA
`oxford-jade-60` | `#097a7f` | [4.65](http://contrast-ratio.com/#%23097a7f-on-%23f4f4f5) | AA | AAA
`oxford-lemon-80` | `#3f7280` | [4.86](http://contrast-ratio.com/#%233f7280-on-%23f4f4f5) | AA | AAA
`oxford-crimson-50` | `#6e2a4d` | [9.09](http://contrast-ratio.com/#%6e2a4d-on-%23f4f4f5) | AAA | AAA

### Markup

o-syntax-highlight works with a single class. As long as this class is present in a wrapper that holds the code you wish to highlight, it will tokenise and colorise the syntax according to your preference. The semantically correct way of declaring a code block is to place a `<code>` inside a `<pre>`. That is what o-syntax-highlight looks for when it is tokenising the code block.

**`<pre>` is whitespace sensitive, so it is important to follow the markup to get the correct spacing for your syntax.**

Every language has its own set of styles — in order to highlight html for example, you would need:
```html
<div class="demo" data-o-component='o-syntax-highlight'>
	<pre>
		<code class="o-syntax-highlight--json">
<!-- everything in this element will be highlighted, including this comment! -->
"object": {
	"string": "string",
	"array": [
		"name",
		"names"
	],
	"object" : {
		"nested": "html"
	}
	"numbers": 1
}</code>
		</pre>
	</div>
```

The same is true for all other available languages:
- Javascript: `o-syntax-highlight--js` _or_ `o-syntax-highlight--javascript`
- HTML: `o-syntax-highlight--html`
- CSS: `o-syntax-highlight--css`
- SCSS/SASS: `o-syntax-highlight--scss` _or_ `o-syntax-highlight--sass`
- JSON: `o-syntax-highlight--json`
- DIFF: `o-syntax-highlight--diff`

It is worth pointing out that the wrapper can hold any html elements. So long as all of the code blocks within the wrapper are written as described above, o-syntax-highlight will ignore everything else.
```html
<div class="demo" data-o-component='o-syntax-highlight'>
	<div class="example">
		<p></p>
		<p></p>
	</div>

	<pre>
		<code class="o-syntax-highlight--json">
<!-- everything in this element will be highlighted, including this comment! --></code>
	</pre>

	<button type="button" name="button">Button</button>
</div>
```

However, when highlighting `HTML`, there is a caveat.
Because of the way in which the `<code>` tag works, if you want to highlight markup **which has already been declared**, you will have to replace and `<` with `&lt;` in order for the markup to be read as a string instead of actual HTML.

For example:
```
<pre>
	<code class="o-syntax-highlight--html">
&lt;html>
	&lt;head>
		&lt;!-- links and scripts -->
	&lt;/head>
	&lt;body>
		&lt;div class="some-class"&lt;/div>
	&lt;/body>
&lt;/html></code>
</pre>
```

### JavaScript

No code will run automatically unless you are using the Build Service.
You must either construct an `o-syntax-highlight` object or fire the `o.DOMContentLoaded` event, which oComponent listens for.

#### Construction

In order to use `o-syntax-highlight` with already declared markup, you can use:
```js
const oSyntaxHighlight = require('o-syntax-highlight');
oSyntaxHighlight.init();
```

If you are initialising the component imperatively, you will need to supply a string of code that you want to highlight, and an options object that defines the language of that code. To tokenise the string you will need be explicit about the element that will hold the highlighted syntax:

```js
const oSyntaxHighlight = require('o-syntax-highlight');
const highlighter = new oSyntaxHighlight('code to highlight', { language: 'html'});

myElement.innerHTML = highlighter.tokenise();
```

### Sass
As with all Origami components, o-syntax-highlight has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-syntax-highlight-is-silent: false;` in your Sass before you import the o-syntax-highlight Sass.

You can't choose your own classnames, but you can choose to load specific language styles as follows:
```scss
	@include oSyntaxHighlightBase();
	@include oSyntaxHighlightJSON();
```

The same is applicable for the other languages:
- Javascript: `oSyntaxHighlightJS()`
- HTML: `oSyntaxHighlightHTML()`
- CSS: `oSyntaxHighlightCSS()`
- SCSS/SASS: `oSyntaxHighlightSCSS()`
- JSON: `oSyntaxHighlightJSON()`
- DIFF: `oSyntaxHighlightDIFF()`

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-syntax-highlight/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

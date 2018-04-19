
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

o-syntax-highlight uses the following colours, on a light grey background (#f2f2f2). It is compliant with WCAG AA. In order to meet the criteria for AAA at 14px+, the colours would be far too dark to distinguish syntax highlighting effectively.

Color | Hex | Ratio | 14px+ | 18px+  or 14px **bold**
---|---|---|---|---
`black-mandarin-35` | `#a65821` | [4.64](http://contrast-ratio.com/#%23a65821-on-%23f2f2f2) | AA | AAA
`black-crimson-35` | `#a50f2d` | [6.93](http://contrast-ratio.com/#%23#a50f2d-on-%23f2f2f2) | AA | AAA
`claret-lemon-75` | `#b34634` | [4.88](http://contrast-ratio.com/#%23b34634-on-%23f2f2f2) | AA | AAA
`grey-55` | `#737373` | [4.23](http://contrast-ratio.com/#%23737373-on-%23f2f2f2) | AA | AAA
`grey-70` | `#4d4d4d` | [7.55](http://contrast-ratio.com/#%234d4d4d-on-%23f2f2f2) | AAA | AAA
`oxford` | `#0f5499` | [6.82](http://contrast-ratio.com/#%230f5499-on-%23f2f2f2) | AA | AAA
`oxford-jade-60` | `#097a7f` | [4.57](http://contrast-ratio.com/#%23097a7f-on-%23f2f2f2) | AA | AAA
`oxford-sky-80` | `#3571ad` | [4.55](http://contrast-ratio.com/#%233571ad-on-%23f2f2f2) | AA | AAA
`velvet-candy-60` | `#9b5191` | [4.71](http://contrast-ratio.com/#%239b5191-on-%23f2f2f2) | AA | AAA

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
``

The same is applicable for the other languages:
- Javascript: `oSyntaxHighlightJS()`
- HTML: `oSyntaxHighlightHTML()`
- CSS: `oSyntaxHighlightCSS()`
- SCSS/SASS: `oSyntaxHighlightSCSS()`

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-syntax-highlight/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

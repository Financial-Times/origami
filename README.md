# o-syntax-highlight

A syntax highlighter for Origami-supported documentation that wraps [PrismJs](https://github.com/PrismJS/prism).

- [Overview](#overview)
- [Markup](#markup)
- [JavaScript](#javascript)
	- [Construction](#construction)
- [Sass](#sass)
- [Troubleshooting](#troubleshooting)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Overview

This component provides accessible syntax highlighting for `bash`, `diff`, Javascript, JSON, YAML/YML, HTML, CSS and Sass/SCSS.
_If there are any languages you would like to highlight that we don't currently support, please open an issue and we will provide it._

## Markup

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
- YAML: `o-syntax-highlight--yaml`
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

## JavaScript

No code will run automatically unless you are using the Build Service.
You must either construct an `o-syntax-highlight` object or fire the `o.DOMContentLoaded` event, which oComponent listens for.

### Construction

In order to use `o-syntax-highlight` with already declared markup, you can use:
```js
import oSyntaxHighlight from 'o-syntax-highlight';
oSyntaxHighlight.init();
```

If you are initialising the component imperatively, you will need to supply a string of code that you want to highlight, and an options object that defines the language of that code. To tokenise the string you will need be explicit about the element that will hold the highlighted syntax:

```js
import oSyntaxHighlight from 'o-syntax-highlight';
const highlighter = new oSyntaxHighlight('code to highlight', { language: 'html'});

myElement.innerHTML = highlighter.tokenise();
```

## Sass

You can include highlighting for all languages by calling:

```scss
@include oSyntaxHighlight();
```

You can also be more specific about which languages you would like styling output for by using an `$opts` map:
```scss
	@include oSyntaxHighlight($opts: (
		'languages': (
			'html',
			'json'
		)
	));
```
`o-syntax-highlight` accepts the following options:
- 'bash'
- 'css'
- 'diff'
- 'html'
- 'js' _or_ 'javascript'
- 'json'
- 'scss' _or_ 'sass'
- 'yaml'


## Troubleshooting

### How do I use Marked to convert Markdown files to HTML with o-syntax-highlight code blocks?

When using [Marked](https://www.npmjs.com/package/marked) it is possible to override its default renderer so you can create custom output for code blocks. To get `o-syntax-highlight` compatible output see the [example in this Github issue](https://github.com/Financial-Times/o-syntax-highlight/issues/49).

## Migration guide

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.1 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.6.4 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-syntax-highlight/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).


## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

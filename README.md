o-cookie-message [![Circle CI](https://circleci.com/gh/Financial-Times/o-cookie-message/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-cookie-message/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

The cookie message and behaviour approved by the FT's legal team.
All FT websites must have a cookie message. Using o-cookie-message will ensure your site is compliant.

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
	- [Customising o-cookie-message HTML](customising-o-cookie-message-html)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Markup

Use the following HTML to get a full width banner with the legal approved cookie message.

```diff
<div data-o-component="o-cookie-message"></div>
```
If you would like to construct an alternative cookie message, declare `data-o=cookie-message-theme="alternative"` on the div in the markup above, with the same JavaScript.

## JavaScript

No code will run automatically unless you are using the Build Service.

You must either construct an `o-cookie-message` object or fire the `o.DOMContentLoaded` event, which oCookieMessage listens for.

### Constructing an o-cookie-message

There are two available variations of o-cookie-message: `standard` and `alternative`.

If you would like to initialise a `standard` cookie message, you will need to implement the following:

```js
const oCookieMessage = require('o-cookie-message');

const cookieMessage = new oCookieMessage();
```

If you would like to initialise a `alternative` cookie message without declaring the data attribute in the markup, you will need to implement the following:

```js
const oCookieMessage = require('o-cookie-message');
const cookieMessage = new oCookieMessage(null, { theme: 'alternative' });
```


### Firing an oDomContentLoaded event

```js
document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Events

You may listen to three events that bubble out from the oCookieMessage DOM element:-

- `oCookieMessage.view` is emitted when the component has finished initialising and is displayed in the window.
- `oCookieMessage.act` is emitted when the user accepts cookies and gives consent.
- `oCookieMessage.close` is emitted when the component is removed from the DOM.

## Sass

As with all Origami components, o-cookie-message has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than incorporating its mixins into your own Sass) set `$o-cookie-message-is-silent : false;` in your Sass before you import the o-cookie-message Sass:

```sass
$o-cookie-message-is-silent: false;
@import 'o-cookie-message/main';
```

The above code will include both style options that come with o-cookie-message; [`standard`](https://registry.origami.ft.com/components/o-cookie-message#demo-approved-cookie-banner) and [`alternative`](https://registry.origami.ft.com/components/o-cookie-message#demo-approved-alternative-cookie-banner). If you would like to incorporate just one style, you can include it by _not_ setting the component to silent, and then using this mixin with the name of the theme you want to display:

```sass
@import 'o-cookie-message/main';

@include oCookieMessage($class: 'my-cookie-message', $theme: alternative);
```

## Customising o-cookie-message HTML

The default behaviour for this component is to populate any div with a `data-o-component` attribute of `o-cookie-message` with some HTML and a cookie message approved by the FT legal team.

If you need a different message, this can be added with HTML of your choosing. For example:
```html
<div data-o-component="o-cookie-message">
	<header>
		<h1>My Cookies</h1>
	</header>
	<p>A message about those specific cookies, here.</p>
</div>
```
o-cookie-message will incorporate that HTML into its content, and build the rest of the banner normally.

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-cookie-message/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

o-cookie-message [![Circle CI](https://circleci.com/gh/Financial-Times/o-cookie-message/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-cookie-message/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

The cookie message and behaviour approved by the FT's legal team.
All FT websites must have a cookie message. Using o-cookie-message will ensure your site is compliant.

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

Use `@include oCookieMessage()` to include styles for all themes.

Themes may be included granularly with an $opts map.

Include all themes:

```
@include oCookieMessage();
```

Include only the [`standard`](https://registry.origami.ft.com/components/o-cookie-message#demo-approved-cookie-banner) theme:

```
@include oCookieMessage($opts: (
  $themes: ('standard')
));
```

Include only the [`alternative`](https://registry.origami.ft.com/components/o-cookie-message#demo-approved-alternative-cookie-banner) theme:

```
@include oCookieMessage($opts: (
  $themes: ('alternative')
));
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

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 5 | N/A | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
⚠ maintained | 4 | 4.7 | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.3 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.2 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.2 | - |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-cookie-message/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

# o-cookie-message

The cookie message and behaviour approved by the FT's legal team.
All FT websites must have a cookie message. Using o-cookie-message will ensure your site is compliant.

- [Usage](#usage)
- [Markup](#markup)
- [JavaScript](#javascript)
- [Sass](#sass)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-cookie-message`.

## Markup

Use the following HTML to get a full width banner with the legal approved cookie message.

```html
<div data-o-component="o-cookie-message"></div>
```

Optionally add a theme attribute to change the colours of the cookie message `data-o=cookie-message-theme="alternative"`, see [`the registry demos`](https://registry.origami.ft.com/components/o-cookie-message#demo-approved-alternative-cookie-banner) for an example.

### Custom Cookie Message

To display custom cookie message content with default buttons, add child HTML along with associated `aria-labelledby` and `aria-describedby` attributes:
```html
<div
	role="dialog"
	aria-labelledby="demo-label-element-id"
	aria-describedby="demo-description-element-id"
	data-o-component="o-cookie-message"
	class="o-cookie-message">
	<!-- custom cookie message copy / html here -->
	<!-- include ids for the aria labelledby and describedby attributes -->
	<!-- e.g. -->
	<h2 id="demo-label-element-id">Custom Cookie Message</h2>
	<p id="demo-description-element-id">We use cookies because...</p>
</div>
```

### Core Experience Cookie Message

To support a core experience without JavaScript, add the full `o-cookie-message` markup as below. Update the anchors `redirect` query param with your sites URL, preferably the current page the cookie message is displayed on. This is used to send users back after setting cookie preferences in a core experience (where JavaScript is unavailable).

```html
<div
	role="dialog"
	aria-labelledby="o-cookie-message-label"
	aria-describedby="o-cookie-message-description"
	data-o-component="o-cookie-message"
	class="o-cookie-message">
	<div class="o-cookie-message__outer">
		<div class="o-cookie-message__inner">
			<div class="o-cookie-message__content">
				<div class="o-cookie-message__heading">
					<h2 id="o-cookie-message-label">Cookies on the FT</h2>
				</div>
				<p id="o-cookie-message-description">
					We use
					<a href="http://help.ft.com/help/legal-privacy/cookies/"
						class="o-cookie-message__link o-cookie-message__link--external"
						target="_blank"
						rel="noopener">cookies</a>
					for a number of reasons, such as keeping FT Sites reliable and secure, personalising content and
					ads, providing social media features and to analyse how our Sites are used.
				</p>
			</div>

			<div class="o-cookie-message__actions">
				<div class="o-cookie-message__action">
					<a href="https://consent.ft.com/__consent/consent-record-cookie?redirect=#" class="o-cookie-message__button">
						Accept &amp; continue
					</a>
				</div>

				<div class="o-cookie-message__action o-cookie-message__action--secondary">
					<a href="https://www.ft.com/preferences/manage-cookies?redirect=#" class="o-cookie-message__link">Manage cookies</a>
				</div>
			</div>
		</div>
	</div>
</div>
```

## JavaScript

No code will run automatically unless you are using the Build Service.

You must either construct an `o-cookie-message` object or fire the `o.DOMContentLoaded` event, which oCookieMessage listens for.

### Constructing an o-cookie-message

There are two available variations of o-cookie-message the default (standard) cookie message and `alternative`.

If you would like to initialise a standard cookie message, you will need to implement the following:

```js
import oCookieMessage from 'o-cookie-message';

const cookieMessage = new oCookieMessage();
```

If you would like to initialise a `alternative` cookie message without declaring the data attribute in the markup, you will need to implement the following:

```js
import oCookieMessage from 'o-cookie-message';
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

Themes may be included granularly with an `$opts` map.

Include all themes:

```scss
@include oCookieMessage();
```

Include only the [default cookie message](https://registry.origami.ft.com/components/o-cookie-message#demo-approved-cookie-banner):

```scss
@include oCookieMessage($opts: (
	'themes': ()
));
```

_Note: "standard" used to be required as a theme option to output the default theme, this is now output by default without any themes set._

Include the [`alternative` cookie message theme](https://registry.origami.ft.com/components/o-cookie-message#demo-approved-alternative-cookie-banner):

```scss
@include oCookieMessage($opts: (
	'themes': ('alternative')
));
```

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

o-message [![Circle CI](https://circleci.com/gh/Financial-Times/o-message/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-message/tree/master)
=================

o-message is a messaging component used for alerting and informing. It can include variants on the type of message it delivers, but currently only covers 'alert' type messages.

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
		- [Construction](#construction)
		- [Options](#options)
	- [Sass](#sass)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage
`o-message` uses Sass and Javascript to show and hide a message component.
It can be initialised declaratively if markup is provided on the page, or it can be initialised imperatively when using the [manual build process](http://origami.ft.com/docs/developer-guide/modules/building-modules/).

By default, `o-message` initialises an alert message, which provides information in response to a user action. It currently has three states, 'success', 'neutral' and 'error', and relies on the markup (or configuration) to determine  other variants of behaviour and style.


### Markup

This is an example of the declarative way of instantiating an error message that spans **across a viewport**. The 'alert' and 'alert-bleed' message types have been designed to sit below a header.

```html
<div class="o-message o-message--alert o-message--error" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__highlight">Something went wrong!
				<span class="o-message__detail">The quick brown fox did not jump over the lazy dogs.</span>
			</p>
			<div class="o-message__actions">
				<a href="#" class="o-message__action--primary">Button</a>
				<a href="#" class="o-message__action--secondary">Text link</a>
			</div>
		</div>
	</div>
</div>
```
_Note: these message types are responsive. At different viewport sizes the message element hides the following elements:_
- `<span class="o-message__detail">`
- `<a class="o-message__action--secondary">`

The 'alert-inner' message type has almost exactly the same markup, with an optional addition of information, and does not have the option to close the message.
This message type has been designed to fit within another element on the page. It does not hide elements at any viewport.

```html
<div class="o-message o-message--alert-inner o-message--success" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__highlight">Hooray!
				<span class="o-message__detail">The quick brown fox jumped over the lazy dogs!</span>
			</p>
			<p class="o-message__additional-info">Did you know that that sentence uses all of the letters in the alphabet at least once?</p>

			<div class="o-message__actions">
				<a href="#" class="o-message__action--primary">Button</a>
				<a href="#" class="o-message__action--secondary">Text link</a>
			</div>
		</div>
	</div>
</div>
```

### JavaScript
No code will run automatically unless you are using the Build Service. You must either construct an `o-message` object or fire an o.DOMContentLoaded event, which `o-message` listens for. There are currently three variants of `o-message` that you can use: `alert`, `alert-bleed` and `alert-inner`. All of these variants require a status of either `success`, `error` or `neutral`.

#### Construction
In the case your message has been set up declaratively:

If you are using default o-message classes, use the following to initialise your message.
```js
const oMessage = require('o-message');
oMessage.init();
```

If you are applying your own classes to your message, you can use the following:
```js
const oMessage = require('o-message');
const messageElement = document.getElementById('my-message');
const importantMessage = new oMessage(messageElement));
```
The second argument that `oMessage` accepts is an [options object](#options), which can be used to change a message's style and functionality.

If you're setting up a message without existing DOM elements, `oMessage` will construct an element for you when it is set up like this:

```js
const oMessage = require('o-message');
const importantMessage = new oMessage(null, {
	type: 'alert-bleed',
	status: 'error',
	content: {
		highlight: 'Something has gone wrong.'
		detail: 'The quick brown fox did not jump over the lazy dogs.'
	}
});
```

#### Options
`o-message` allows for several configuration options that will change the type of message and its visual styling.

The only required options are listed in the example _above_. These are:
- `type`: String. The o-message variant. The available variants are 'alert', 'alert-bleed' and 'alert-inner'.
- `status`: String. Alert variants require a status, and the options are 'success', 'neutral' and 'error'.
- `content`: Object. Holds the following values for text properties:
	- `highlight`: String. The highlighted text in a message. Defaults to `null`
	-	`detail`: String. The detail about the nature of a message.

The following options are not required, and all have a default value:

- `autoOpen`: Boolean. Whether to open the message automatically, defaults to `true`.
- `messageClass`: String. The base class name for the component's elements, defaults to `o-message`.
- `parentElement`: String. This determines the element that the message will be appended to. If none is declared, it will automatically append to the body, or an element with the data attribute `data-o-component=o-message`, defaults to `null`.
- `content`: Object. Holds the following values for text properties:
	-	`additionalInfo`: String. More information about the message –  only applies to an `alert-inner` message. Defaults to `null`
- `actions`: Object. Holds the following values for text properties:
	-	`primary`:  Object. Holds the following values for button properties:
		- `text`: String. text value of the button. Defaults to `null`
		- `url`: String. The URL the button links to. Defaults to `#`
	- `secondary`: Object. Holds the following values for link properties:
		- `text`: String. text value of the link. Defaults to `null`
		- `url`: String. The URL the link links to. Defaults to `#`
- `close`: Boolean. Whether or not to display the close button. Defaults to `true` for regular messages, to `false` for inline messages.

_Note: `o-message` constructs a close button for 'alert' and 'alert-bleed' by default, and will not build one for 'alert-inner', as this specific message type shouldn't be dismissible'

### Sass
As with all Origami components, o-message has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-message-is-silent: false;` in your Sass before you import the o-message Sass.

o-message includes mixins that you can use if you'd rather _not_ have origami classnames in your page. These are only available if you're _not_ using the Build Service:

```sass
@include oMessage($class: 'my-banner', $type: 'alert-inner', $status: 'success');
```

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-component-boilerplate/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

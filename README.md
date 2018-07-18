o-message [![Circle CI](https://circleci.com/gh/Financial-Times/o-message/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-message/tree/master)
=================

o-message is a messaging component used for alerting and informing. It can include variants on the type of message it delivers.

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
		- [Construction](#construction)
		- [Options](#options)
	- [Sass](#sass)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage
`o-message` uses Sass and Javascript to show and hide a message component.
It can be initialised declaratively if markup is provided on the page, or it can be initialised imperatively when using the [manual build process](http://origami.ft.com/docs/developer-guide/modules/building-modules/).

`o-message` can initialise three types of messages: **alert**, **notice**, and **action**.

Messages are styled correctly using any combination of types and states that have a  ✓ in the table below:

types ↓ \| states  →|`success` | `neutral` | `error` | `inform` | `inform-inverse` | `warning` | `warning-light` |
---|:---: |:---:|:---:|:---:|:---:|:---:| :---:|
`alert`| ✓ | ✓ |  ✓ | ✕ | ✕ | ✕ | ✕ |
`alert-bleed`| ✓ | ✓ | ✓ | ✕ | ✕ | ✕ | ✕ |
`alert-inner`| ✓ | ✓ | ✓ | ✕ | ✕ | ✕ | ✕ |
`notice`| ✕ | ✕ | ✕ | ✓ | ✕ | ✓ | ✓ |
`notice-bleed`| ✕ | ✕ | ✕ | ✓ | ✕ | ✓ | ✓ |
`notice-inner`| ✕ | ✕ | ✕ | ✓ | ✕ | ✓ | ✓ |
`action`| ✕ | ✕ | ✕ | ✓ | ✓ | ✕ | ✕ |
`action-bleed`| ✕ | ✕ | ✕ | ✓ | ✓ | ✕ | ✕ |

By default, `o-message` initialises with the markup for an `alert` type.

### Markup

This is an example of the declarative way of instantiating an error message that spans **across a viewport**. The 'alert' and 'alert-bleed' message types have been designed to sit below a header.

```html
<div class="o-message o-message--alert o-message--error" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content-main">
				<span class="o-message__content-highlight">Something went wrong!</span>
				<span class="o-message__content-detail">The quick brown fox did not jump over the lazy dogs.</span>
			</p>
			<div class="o-message__actions">
				<a href="#" class="o-message__actions__primary">Button</a>
				<a href="#" class="o-message__actions__secondary">Text link</a>
			</div>
		</div>
	</div>
</div>
```

The 'alert-inner' message type has almost exactly the same markup, with an optional addition of information.
This message type has been designed to fit within another element on the page.

```html
<div class="o-message o-message--alert-inner o-message--success" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content-main">
				<span class="o-message__content-highlight">Hooray!</span>
				<span class="o-message__content-detail">The quick brown fox jumped over the lazy dogs!</span>
			</p>
			<p class="o-message__content-additional">Did you know that that sentence uses all of the letters in the alphabet at least once?</p>

			<div class="o-message__actions">
				<a href="#" class="o-message__actions__primary">Button</a>
				<a href="#" class="o-message__actions__secondary">Text link</a>
			</div>
		</div>
	</div>
</div>
```

Alternatively you can embolden any text within a paragraph, and use the markup like this:
```html
<div class="o-message o-message--alert-inner o-message--success" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content-main">
				The quick brown fox <span class="o-message__content-highlight">definitely</span> jumped over the lazy dogs!</span>
			</p>
			<p class="o-message__content-additional">Did you know that that sentence uses all of the letters in the alphabet <span class="o-message__content-highlight">at least</span> once?</p>

			<div class="o-message__actions">
				<a href="#" class="o-message__actions__secondary">Text link</a>
			</div>
		</div>
	</div>
</div>
```

Notice message types are styled similarly to the alert type messages (both for a fit under a header, or inside another element).
The differences are that they do not have an icon and don't support additional content.

```html
<div class="o-message o-message--notice-inner o-message--success" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content-main">The quick brown fox jumped over the lazy dogs!</p>

			<div class="o-message__actions">
				<a href="#" class="o-message__actions__primary">Button</a>
				<a href="#" class="o-message__actions__secondary">Text link</a>
			</div>
		</div>
	</div>
</div>
```

Both notices and alerts may be presented without actions (e.g. without buttons or links).

Action message types are like notice messages but designed to sit within a page's content rather than above it. They should have one prefered action.

```html
<div class="o-message o-message--action o-message--inform" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content-main">The quick brown fox jumped over the lazy dogs!</p>

			<div class="o-message__actions">
				<a href="#" class="o-message__actions__primary">Button</a>
			</div>
		</div>
	</div>
</div>
```

### JavaScript
No code will run automatically unless you are using the Build Service. You must either construct an `o-message` object or fire an o.DOMContentLoaded event, which `o-message` listens for.

`oMessage` can build two types of messages:  an alert message and a notice message.
Both message types have three variants, namely `alert`, `alert-bleed`, `alert-inner`, `notice`, `notice-bleed` and `notice-inner`.

All variants require a status.
The available options for `alert` are `success`, `error` or `neutral`.
The available options for `notice` are `inform`, `warning` or `warning-light`.
The available options for `action` are `inform` or `inform-inverse`.

#### Construction
In the case your message has been set up declaratively:

If you are using default o-message classes, use the following to initialise your message.
```js
const oMessage = require('o-message');
oMessage.init();
```

`oMessage` will initialise its element with a close button by default. With a declaratively set up message, this can be avoided by adding `data-close: false` to the message element.

If you are applying your own classes to your message, you can use the following:
```js
const oMessage = require('o-message');
const messageElement = document.getElementById('my-message');
const importantMessage = new oMessage(messageElement));
```
The second argument that `oMessage` accepts is an [options object](#options), which can be used to change a message's style and functionality.

If you're setting up a message without existing DOM elements, `oMessage` will construct an element for you when it is set up like this, as long as your markup contains an element with the data attribute `data-o-component=o-message`

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

The following options are not required, and all have a default value:

- `autoOpen`: Boolean. Whether to open the message automatically, defaults to `true`.
- `messageClass`: String. The base class name for the component's elements, defaults to `o-message`.
- `parentElement`: String. This determines the element that the message will be appended to. If none is declared, it will automatically append to the body, or an element with the data attribute `data-o-component=o-message`, defaults to `null`.
- `content`: Object. Holds the following values for text properties:
	- `highlight`: String. The highlighted text in a message. Defaults to `null`
	- `detail`: String. The detail about the nature of a message.
	- `additionalInfo`: String. More information about the message –  only applies to an `alert-inner` message. Defaults to `null`
- `actions`: Object. Holds the following values for text properties:
	- `primary`:  Object. Holds the following values for button properties:
		- `text`: String. text value of the button. Defaults to `null`
		- `url`: String. The URL the button links to. Defaults to `#`
	- `secondary`: Object. Holds the following values for link properties:
		- `text`: String. text value of the link. Defaults to `null`
		- `url`: String. The URL the link links to. Defaults to `#`
- `close`: Boolean. Whether or not to display the close button. Defaults to `true`.

### Sass
As with all Origami components, o-message has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-message-is-silent: false;` in your Sass before you import the o-message Sass.

o-message includes mixins that you can use if you'd rather _not_ have origami classnames in your page. These are only available if you're _not_ using the Build Service:

```sass
@include oMessage($class: 'my-banner', $types: 'alert-inner', $status: 'success');
```

You can also initialise multiple types and states of message by providing a list of types and a list of states:

```sass
@include oMessage($types: ('alert-inner', 'notice-bleed'), $status: ('success', 'inform'))
```

## Migration Guide

#### Migrating from v1 to v2

This major includes a change in markup and a new type of message, namely the 'notice' message.
The following changes have been made to the markup:
```diff
<div class="o-message o-message--alert o-message--error" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
-			<p class="o-message__highlight">Something went wrong!
+			<p class="o-message__content-main">
+				<span class="o-message__content-highlight">Something went wrong!</span>
-				<span class="o-message__detail">The quick brown fox did not jump over the lazy dogs.</span>
+				<span class="o-message__content-detail">The quick brown fox did not jump over the lazy dogs.</span>
			</p>
+			<p class="o-message__additional-info">Did you know that that sentence uses all of the letters in the alphabet at least once?</p>
-			<p class="o-message__content-additional">Did you know that that sentence uses all of the letters in the alphabet at least once?</p>

			<div class="o-message__actions">
-				<a href="#" class="o-message__action--primary">Button</a>
+				<a href="#" class="o-message__actions__primary">Button</a>
-				<a href="#" class="o-message__action--secondary">Text link</a>
+				<a href="#" class="o-message__actions__secondary">Text link</a>
			</div>
		</div>
	</div>
</div>
```

And these mixins have been replaced with placeholders:

```diff
- oMessageAlertContentMain
+ %o-message-alert-notice-content-main

- oMessageAlertInnerContainer
+ %o-message-inner-alert-notice-container

- oMessageAlertInnerContent
+ %o-message-alert-notice-content-main
```

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-component-boilerplate/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

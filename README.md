o-message [![Circle CI](https://circleci.com/gh/Financial-Times/o-message/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-message/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

`o-message` is a messaging component used for alerting, informing or making calls to action.

- [Message Types](#message-types)
- [Markup](#markup)
- [JavaScript](#javascript)
	- [Construction](#construction)
	- [Options](#options)
- [Sass](#sass)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

`o-message` uses Sass and Javascript to show and hide a message component.

It can be initialised declaratively if markup is provided on the page, or it can be initialised imperatively when using the [manual build process](http://origami.ft.com/docs/developer-guide/modules/building-modules/).

### Message Types
`o-message` provides three types of messages: **action**, **alert**, and **notice**.

- An **action** message should be used as a static call to action, that is not necessarily a response to a user's interaction with a product (e.g. requesting feedback in general).

- An **alert** message should be used as feedback to a users interaction with a product (e.g. payment declined warning)

- A **notice** message should be used to provide information or warnings about a product. (e.g. beta version of a product).

You can find a demo for each of the messages above in the [Origami registry](https://registry.origami.ft.com/components/o-message).

A default message is designed to span across a page in whatever container it is placed in.
An 'inner' message is meant to sit within a smaller container, as it stacks information, instead.

In addition to layout, messages can accept another variation: state.
However, not every message accepts every state, or every layout, and not every message works for every brand. Please check the table below against the needs of your product. If you need a message that is not available to you, please [get in touch](#contact) with the Origami team.

| | state support | layout support | brand support
---|:---|:---|:---
**action message** | `inform`, `inform-inverse` | default | internal, whitelabel
**alert message** | `success`, `neutral`, `error` | default, inner | all
**notice message** | `inform`, `warning`, `warning-light` | default, inner | master: `inform` state only <br> internal: all states <br> whitelabel: `inform` state only


### Markup

All messages have the same markup. What will style them differently are the following modifiers:

- `type`: one of `o-message--action`, `o-message--alert`, `o-message--notice`
- `state`: one of `o-message--success`, `o-message--neutral`, `o-message--error`, `o-message--warning`, `o-message--warning-light`, `o-message--inform`, `o-message--inform-inverse`
- `layout`: currently only `o-message--inner`

_Note: as mentioned in the description of the [message types](#message-types), not all states will work for all message types. In addition to that, the layout modifier only applies to `alert` and `notice` type messages._

This example illustrates the basic markup for a successful alert message:

```html
<div class="o-message o-message--alert o-message--success" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content-main">
				<span class="o-message__content-highlight">Oops.</span>
		</div>
	</div>
</div>
```

You can add more information about the message with the following markup:

```diff
<div class="o-message o-message--alert o-message--success" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content-main">
				<span class="o-message__content-highlight">Oops.</span>
+				<span class="o-message__content-detail">
+					Something went wrong!
+					The quick brown fox did not jump over the lazy dogs.
+				</span>
			</p>
		</div>
	</div>
</div>
```

And you can also add actions, such as a button and/or a link to your message:

```diff
<div class="o-message o-message--alert o-message--success" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content-main">
				<span class="o-message__content-highlight">Oops.</span>
				<span class="o-message__content-detail">
					Something went wrong!
					The quick brown fox did not jump over the lazy dogs.
				</span>
			</p>
+			<div class="o-message__actions">
+				<a href="#" class="o-message__actions__primary">Button</a>
+				<a href="#" class="o-message__actions__secondary">Text link</a>
+			</div>
		</div>
	</div>
</div>
```

If you have applied the `o-message--inner` modifier to your message, you can add additional, entirely optional, content:

```diff
-<div class="o-message o-message--alert o-message--error" data-o-component="o-message">
+<div class="o-message o-message--alert o-message--inner o-message--error" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content-main">
				<span class="o-message__content-highlight">Oops.</span>
				<span class="o-message__content-detail">
					Something went wrong!
					The quick brown fox did not jump over the lazy dogs.
				</span>
			</p>
+			<p class="o-message__content-additional">
+				Did you know that that sentence uses all of the letters in the alphabet at least once?
+			</p>
			<div class="o-message__actions">
				<a href="#" class="o-message__actions__primary">Button</a>
				<a href="#" class="o-message__actions__secondary">Text link</a>
			</div>
		</div>
	</div>
</div>
```

For any message, you can highlight any portion of copy within a paragraph by using the markup like this:
```html
<div class="o-message o-message--alert o-message--success" data-o-component="o-message">
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content-main">
				The quick brown fox did <span class="o-message__content-highlight">not</span> jump over the lazy dogs.
			</p>
		</div>
	</div>
</div>
```

For **action messages only**, you can centralise the text with a specific class (`.o-message__content--center-align`):
```diff
<div class="o-message o-message--action o-message--inform" data-o-component="o-message">
	<div class="o-message__container">
-		<div class="o-message__content">
+		<div class="o-message__content o-message__content--center-align">
			<p class="o-message__content-main">
				This will be a call to action. Feedback, please.
			</p>
		</div>
	</div>
</div>
```

### JavaScript
No code will run automatically unless you are using the Build Service. You must either construct an `o-message` object or fire an o.DOMContentLoaded event, which `o-message` listens for.

#### Construction
If you have set up your message declaratively, use the following to initialise your message.
```js
import Message from 'o-message';
Message.init();
```

`Message` will initialise its element with a close button by default. With a declaratively set up message, this can be avoided by adding `data-close="false"` to the message element.

If you're setting up a message without existing DOM elements, `Message` will construct an element for you. As long as your markup contains an element with the data attribute `data-o-component=o-message`, you can initialise a message with specific [options](#options).

```js
import Message from 'o-message';
const importantMessage = new Message(null, {
	type: 'alert',
	status: 'error',
	content: {
		highlight: 'Something has gone wrong.',
		detail: 'The quick brown fox did not jump over the lazy dogs.'
	}
});
```

#### Options
`o-message` allows for several configuration options that will change the type of message and its visual styling.

The only required options are listed in the example _above_. These are:
- `type`: String. The o-message variant. The available variants are 'action', 'alert' and 'notice'.
- `status`: String. All messages require a status, and you must supply one that combines with the type of message you've chosen, as listed in the [message types](#message-types)
- `content.detail`: String. The detail about the nature of a message.

The following options are not required, and all have a default value:

- `autoOpen`: Boolean. Whether to open the message automatically, defaults to `true`.
- `parentElement`: String. This determines the element that the message will be appended to. If none is declared, it will automatically append to the body, or an element with the data attribute `data-o-component=o-message`, defaults to `null`.
- `content`: Object. Holds the following values for text properties:
	- `highlight`: String. The highlighted text in a message. Defaults to `null`
	- `additionalInfo`: String. More information about the message –  only applies to a message with an `inner` layout. Defaults to `null`
- `actions`: Object. Holds the following values for text properties:
	- `primary`:  Object. Holds the following values for button properties:
		- `text`: String. text value of the button. Defaults to `null`
		- `url`: String. The URL the button links to. Defaults to `null`
		- `openInNewWindow`: Boolean. Decides if the action should open with `target="_blank`. Defaults to `false`
	- `secondary`: Object. Holds the following values for link properties:
		- `text`: String. text value of the link. Defaults to `null`
		- `url`: String. The URL the link links to. Defaults to `null`
		- `openInNewWindow`: Boolean. Decides if the action should open with `target="_blank`. Defaults to `false`
- `close`: Boolean. Whether or not to display the close button. Defaults to `true`.

For example, to configure the `close` icon to not display:

```diff
import Message from 'o-message';
const importantMessage = new Message(null, {
	type: 'alert',
	status: 'error',
	content: {
-		highlight: 'Something has gone wrong.',
+		highlight: 'Something has gone very wrong.',
		detail: 'The quick brown fox did not jump over the lazy dogs.'
	},
+	close: false
});
```

### Sass

You can include all styles and variations for every message type by calling:
```scss
@include oMessage();
```

You can also be more specific about which message styles and variations you would like to output by using an `$opts` map:

```scss
@include oMessage($opts: (
	'types': ('action', 'notice'),
	'states': ('inform', 'warning'),
	'layouts': ('inner')
));
```

Options include:

| Feature             | Description                                                                                                                                 |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| types               | The message to support (e.g. alert, notice, action) see [message types](#message-types).                                                    |
| state               | The kinds of messages to support (e.g. 'inform', 'warning', 'error') see [message types](#message-types).                                   |
| layouts             | By default messages should span the page, to support messages within content pass the 'inner' option. See [message types](#message-types).  |


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.4 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-message/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

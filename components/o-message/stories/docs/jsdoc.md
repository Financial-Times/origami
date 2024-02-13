## Classes

<dl>
<dt><a href="#Message">Message</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#MessageOptions">MessageOptions</a> : <code>object</code></dt>
<dd><p>An object of options to configure a message instance.</p>
</dd>
<dt><a href="#MessageOptions">MessageOptions</a> : <code>object</code></dt>
<dd><p>An object of options to configure a message instance.</p>
</dd>
</dl>

<a name="Message"></a>

## Message
**Kind**: global class  
**Access**: public  

* [Message](#Message)
    * [new Message(messageElement, options)](#new_Message_new)
    * _instance_
        * [.render()](#Message+render) ⇒ <code>void</code>
        * [.open()](#Message+open) ⇒ <code>void</code>
        * [.close()](#Message+close) ⇒ <code>void</code>
    * _static_
        * [.getDataAttributes(messageElement)](#Message.getDataAttributes) ⇒ <code>object</code>
        * [.init(rootElement, opts)](#Message.init) ⇒ [<code>Message</code>](#Message) \| [<code>Array.&lt;Message&gt;</code>](#Message)

<a name="new_Message_new"></a>

### new Message(messageElement, options)
Initialises an `o-message` component.


| Param | Type | Description |
| --- | --- | --- |
| messageElement | <code>HTMLElement</code> | [undefined] - The `o-message` element (optional). |
| options | [<code>MessageOptions</code>](#MessageOptions) | An options object for configuring the message. |

**Example**  
```js
To construct all elements on the page with the `data-o-component="o-message"` attribute.
     Message.init();
```
**Example**  
```js
To construct a specifc o-message on the page.
			const myMessageElement = document.querySelector('.my-message');
     const myMessage = new Message(myMessageElement, {});
```
**Example**  
```js
To construct a message which does not already exist on the page.
     const errorAlert = new Message(null, {
			type: 'alert',
			state: 'error',
			content: {
				highlight: 'Something has gone wrong.',
				detail: 'The quick brown fox did not jump over the lazy dogs.'
			}
     });
```
<a name="Message+render"></a>

### message.render() ⇒ <code>void</code>
Render the message.

**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message+open"></a>

### message.open() ⇒ <code>void</code>
Open the message.

**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message+close"></a>

### message.close() ⇒ <code>void</code>
Close the message.

**Kind**: instance method of [<code>Message</code>](#Message)  
<a name="Message.getDataAttributes"></a>

### Message.getDataAttributes(messageElement) ⇒ <code>object</code>
Get the data attributes from the messageElement. If the message is being set up
declaratively, this method is used to extract the data attributes from the DOM.

**Kind**: static method of [<code>Message</code>](#Message)  
**Returns**: <code>object</code> - - An object of options defined via data attributes on the message element  

| Param | Type | Description |
| --- | --- | --- |
| messageElement | <code>HTMLElement</code> | The message element in the DOM |

<a name="Message.init"></a>

### Message.init(rootElement, opts) ⇒ [<code>Message</code>](#Message) \| [<code>Array.&lt;Message&gt;</code>](#Message)
Initialise message component.

**Kind**: static method of [<code>Message</code>](#Message)  
**Returns**: [<code>Message</code>](#Message) \| [<code>Array.&lt;Message&gt;</code>](#Message) - The newly constructed message component or components  

| Param | Type | Description |
| --- | --- | --- |
| rootElement | <code>HTMLElement</code> \| <code>string</code> | The root element to intialise a message in, or a CSS selector for the root element |
| opts | [<code>MessageOptions</code>](#MessageOptions) | Options for customizing the message |

<a name="MessageOptions"></a>

## MessageOptions : <code>object</code>
An object of options to configure a message instance.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The o-message type e.g. 'action', 'alert' and 'notice'. |
| state | <code>string</code> | The o-message state e.g. `success`, `neutral`, `error`, `inform-inverse`. |
| autoOpen | <code>boolean</code> | [true] - Whether to show the message automatically. |
| parentElement | <code>string</code> | [null] - The element to append the message to. If none is declared it will leave any existing message elements in place or append to the body when creating a new message element. |
| content | <code>object</code> | Configuration for the message copy. |
| content.detail | <code>string</code> | Copy for of the message e.g "Thing saved to the place you requested.". |
| content.highlight | <code>string</code> | [null] - Highlighted copy to prepend the main message copy "Success!". |
| content.additionalInfo | <code>string</code> | [null] - More copy with additional information – only applies to a message with an `inner` layout. |
| [actions] | <code>Object</code> | Links to display on the message. |
| [actions.primary] | <code>Object</code> | Show a link in the style of a primary button within the message. |
| actions.primary.text | <code>string</code> | The copy for the link. |
| actions.primary.url | <code>string</code> | The url for the link. |
| actions.primary.openInNewWindow | <code>boolean</code> | [false] - Opens in a new tab/window when set to `true`. |
| [actions.secondary] | <code>Object</code> | Show a link with less emphasis that the primary action. |
| actions.secondary.text | <code>string</code> | The copy for the link. |
| actions.secondary.url | <code>string</code> | The url for the link. |
| actions.secondary.openInNewWindow | <code>boolean</code> | [false] - Opens in a new tab/window when set to `true`. |
| close | <code>boolean</code> | [true] -  Whether or not to display a close button. |

<a name="MessageOptions"></a>

## MessageOptions : <code>object</code>
An object of options to configure a message instance.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The o-message type e.g. 'action', 'alert' and 'notice'. |
| state | <code>string</code> | The o-message state e.g. `success`, `neutral`, `error`, `inform-inverse`. |
| autoOpen | <code>boolean</code> | [true] - Whether to show the message automatically. |
| parentElement | <code>string</code> | [null] - The element to append the message to. If none is declared it will leave any existing message elements in place or append to the body when creating a new message element. |
| content | <code>object</code> | Configuration for the message copy. |
| content.detail | <code>string</code> | Copy for of the message e.g "Thing saved to the place you requested.". |
| content.highlight | <code>string</code> | [null] - Highlighted copy to prepend the main message copy "Success!". |
| content.additionalInfo | <code>string</code> | [null] - More copy with additional information – only applies to a message with an `inner` layout. |
| [actions] | <code>Object</code> | Links to display on the message. |
| [actions.primary] | <code>Object</code> | Show a link in the style of a primary button within the message. |
| actions.primary.text | <code>string</code> | The copy for the link. |
| actions.primary.url | <code>string</code> | The url for the link. |
| actions.primary.openInNewWindow | <code>boolean</code> | [false] - Opens in a new tab/window when set to `true`. |
| [actions.secondary] | <code>Object</code> | Show a link with less emphasis that the primary action. |
| actions.secondary.text | <code>string</code> | The copy for the link. |
| actions.secondary.url | <code>string</code> | The url for the link. |
| actions.secondary.openInNewWindow | <code>boolean</code> | [false] - Opens in a new tab/window when set to `true`. |
| close | <code>boolean</code> | [true] -  Whether or not to display a close button. |


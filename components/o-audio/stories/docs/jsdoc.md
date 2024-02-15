## Classes

<dl>
<dt><a href="#Delegate">Delegate</a></dt>
<dd></dd>
<dt><a href="#OAudio">OAudio</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#matchesTag">matchesTag(tagName, element)</a> ⇒</dt>
<dd><p>Check whether an element
matches a tag selector.</p>
<p>Tags are NOT case-sensitive,
except in XML (and XML-based
languages such as XHTML).</p>
</dd>
<dt><a href="#matchesRoot">matchesRoot(selector, element)</a> ⇒</dt>
<dd><p>Check whether an element
matches the root.</p>
</dd>
<dt><a href="#matchesId">matchesId(id, element)</a> ⇒</dt>
<dd><p>Check whether the ID of
the element in &#39;this&#39;
matches the given ID.</p>
<p>IDs are case-sensitive.</p>
</dd>
</dl>

<a name="Delegate"></a>

## Delegate
**Kind**: global class  

* [Delegate](#Delegate)
    * [new Delegate([root])](#new_Delegate_new)
    * [.listenerMap](#Delegate+listenerMap) : <code>Object</code>
    * [.handle](#Delegate+handle) : <code>function</code>
    * [.rootElement](#Delegate+rootElement) : <code>Node</code>
    * [.root([root])](#Delegate+root) ⇒ [<code>Delegate</code>](#Delegate)
    * [.captureForType(eventType)](#Delegate+captureForType) ⇒
    * [.on(eventType, selector, handler, [useCapture])](#Delegate+on) ⇒ [<code>Delegate</code>](#Delegate)
    * [.off([eventType], [selector], [handler])](#Delegate+off) ⇒ [<code>Delegate</code>](#Delegate)
    * [.handle(event)](#Delegate+handle)
    * [.fire(event, target, listener)](#Delegate+fire) ⇒ <code>boolean</code>
    * [.destroy()](#Delegate+destroy) ⇒

<a name="new_Delegate_new"></a>

### new Delegate([root])
DOM event delegator

The delegator will listen
for events that bubble up
to the root node.


| Param | Type | Description |
| --- | --- | --- |
| [root] | <code>Node</code> \| <code>string</code> | The root node or a selector string matching the root node |

<a name="Delegate+listenerMap"></a>

### delegate.listenerMap : <code>Object</code>
Maintain a map of listener
lists, keyed by event name.

**Kind**: instance property of [<code>Delegate</code>](#Delegate)  
<a name="Delegate+handle"></a>

### delegate.handle : <code>function</code>
**Kind**: instance property of [<code>Delegate</code>](#Delegate)  
<a name="Delegate+rootElement"></a>

### delegate.rootElement : <code>Node</code>
The root node at which
listeners are attached.

**Kind**: instance property of [<code>Delegate</code>](#Delegate)  
<a name="Delegate+root"></a>

### delegate.root([root]) ⇒ [<code>Delegate</code>](#Delegate)
Start listening for events
on the provided DOM element

**Kind**: instance method of [<code>Delegate</code>](#Delegate)  
**Returns**: [<code>Delegate</code>](#Delegate) - This method is chainable  

| Param | Type | Description |
| --- | --- | --- |
| [root] | <code>Node</code> \| <code>string</code> | The root node or a selector string matching the root node |

<a name="Delegate+captureForType"></a>

### delegate.captureForType(eventType) ⇒
**Kind**: instance method of [<code>Delegate</code>](#Delegate)  
**Returns**: boolean  

| Param | Type |
| --- | --- |
| eventType | <code>string</code> | 

<a name="Delegate+on"></a>

### delegate.on(eventType, selector, handler, [useCapture]) ⇒ [<code>Delegate</code>](#Delegate)
Attach a handler to one
event for all elements
that match the selector,
now or in the future

The handler function receives
three arguments: the DOM event
object, the node that matched
the selector while the event
was bubbling and a reference
to itself. Within the handler,
'this' is equal to the second
argument.

The node that actually received
the event can be accessed via
'event.target'.

**Kind**: instance method of [<code>Delegate</code>](#Delegate)  
**Returns**: [<code>Delegate</code>](#Delegate) - This method is chainable  

| Param | Type | Description |
| --- | --- | --- |
| eventType | <code>string</code> | Listen for these events |
| selector | <code>string</code> \| <code>undefined</code> | Only handle events on elements matching this selector, if undefined match root element |
| handler | <code>function</code> | Handler function - event data passed here will be in event.data |
| [useCapture] | <code>boolean</code> | see 'useCapture' in <https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener> |

<a name="Delegate+off"></a>

### delegate.off([eventType], [selector], [handler]) ⇒ [<code>Delegate</code>](#Delegate)
Remove an event handler
for elements that match
the selector, forever

**Kind**: instance method of [<code>Delegate</code>](#Delegate)  
**Returns**: [<code>Delegate</code>](#Delegate) - This method is chainable  

| Param | Type | Description |
| --- | --- | --- |
| [eventType] | <code>string</code> | Remove handlers for events matching this type, considering the other parameters |
| [selector] | <code>string</code> | If this parameter is omitted, only handlers which match the other two will be removed |
| [handler] | <code>function</code> | If this parameter is omitted, only handlers which match the previous two will be removed |

<a name="Delegate+handle"></a>

### delegate.handle(event)
Handle an arbitrary event.

**Kind**: instance method of [<code>Delegate</code>](#Delegate)  

| Param | Type |
| --- | --- |
| event | <code>Event</code> | 

<a name="Delegate+fire"></a>

### delegate.fire(event, target, listener) ⇒ <code>boolean</code>
Fire a listener on a target.

**Kind**: instance method of [<code>Delegate</code>](#Delegate)  

| Param | Type |
| --- | --- |
| event | <code>Event</code> | 
| target | <code>Node</code> | 
| listener | <code>Object</code> | 

<a name="Delegate+destroy"></a>

### delegate.destroy() ⇒
Short hand for off()
and root(), ie both
with no parameters

**Kind**: instance method of [<code>Delegate</code>](#Delegate)  
**Returns**: void  
<a name="OAudio"></a>

## OAudio
**Kind**: global class  

* [OAudio](#OAudio)
    * [new OAudio([oAudioEl], [opts])](#new_OAudio_new)
    * _instance_
        * [.destroy()](#OAudio+destroy) ⇒ <code>void</code>
    * _static_
        * [.getDataAttributes(oAudioEl)](#OAudio.getDataAttributes) ⇒ <code>object</code>
        * [.init(rootEl, [opts])](#OAudio.init) ⇒ [<code>OAudio</code>](#OAudio) \| [<code>Array.&lt;OAudio&gt;</code>](#OAudio)

<a name="new_OAudio_new"></a>

### new OAudio([oAudioEl], [opts])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [oAudioEl] | <code>HTMLAudioElement</code> |  | The component element in the DOM |
| [opts] | <code>object</code> | <code>{}</code> | An options object for configuring the component |

<a name="OAudio+destroy"></a>

### oAudio.destroy() ⇒ <code>void</code>
Destroy this component. Unbinds listeners and dispatches any final tracking events

**Kind**: instance method of [<code>OAudio</code>](#OAudio)  
<a name="OAudio.getDataAttributes"></a>

### OAudio.getDataAttributes(oAudioEl) ⇒ <code>object</code>
Get the data attributes from the OAudioElement. If the message is being set up
declaratively, this method is used to extract the data attributes from the DOM.

**Kind**: static method of [<code>OAudio</code>](#OAudio)  
**Returns**: <code>object</code> - - Data attributes as an object  

| Param | Type | Description |
| --- | --- | --- |
| oAudioEl | <code>HTMLElement</code> | The component element in the DOM |

<a name="OAudio.init"></a>

### OAudio.init(rootEl, [opts]) ⇒ [<code>OAudio</code>](#OAudio) \| [<code>Array.&lt;OAudio&gt;</code>](#OAudio)
Initialise message component.

**Kind**: static method of [<code>OAudio</code>](#OAudio)  
**Returns**: [<code>OAudio</code>](#OAudio) \| [<code>Array.&lt;OAudio&gt;</code>](#OAudio) - - OAudio instance(s)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rootEl | <code>HTMLElement</code> \| <code>string</code> |  | The root element to intialise the component in, or a CSS selector for the root element |
| [opts] | <code>object</code> | <code>{}</code> | An options object for configuring the component |

<a name="matchesTag"></a>

## matchesTag(tagName, element) ⇒
Check whether an element
matches a tag selector.

Tags are NOT case-sensitive,
except in XML (and XML-based
languages such as XHTML).

**Kind**: global function  
**Returns**: boolean  

| Param | Type | Description |
| --- | --- | --- |
| tagName | <code>string</code> | The tag name to test against |
| element | <code>Element</code> | The element to test with |

<a name="matchesRoot"></a>

## matchesRoot(selector, element) ⇒
Check whether an element
matches the root.

**Kind**: global function  
**Returns**: boolean  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | In this case this is always passed through as null and not used |
| element | <code>Element</code> | The element to test with |

<a name="matchesId"></a>

## matchesId(id, element) ⇒
Check whether the ID of
the element in 'this'
matches the given ID.

IDs are case-sensitive.

**Kind**: global function  
**Returns**: boolean  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID to test against |
| element | <code>Element</code> | The element to test with |


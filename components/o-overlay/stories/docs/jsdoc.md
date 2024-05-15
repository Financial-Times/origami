## Classes

<dl>
<dt><a href="#Delegate">Delegate</a></dt>
<dd></dd>
<dt><a href="#Overlay">Overlay</a></dt>
<dd><p>Represents an Overlay.</p>
</dd>
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
<a name="Overlay"></a>

## Overlay
Represents an Overlay.

**Kind**: global class  

* [Overlay](#Overlay)
    * [new Overlay(id, opts)](#new_Overlay_new)
    * [.show()](#Overlay+show)

<a name="new_Overlay_new"></a>

### new Overlay(id, opts)
Construct an overlay.

**Throws**:

- <code>Error</code> Will throw an error if the `id` parameter is not unique.


| Param | Type | Description |
| --- | --- | --- |
| id | <code>HTMLElement</code> | String. A unique identifier for the overlay within the page. (Required) |
| opts | <code>object</code> | An options object for configuring the Overlay. This object MUST have either `src` or `html` set. (Required) |
| opts.heading.title | <code>string</code> | Your overlay's title |
| opts.heading.visuallyhidetitle | <code>boolean</code> | If you want to provide a different title style, this option will prevent the title span from being added to the overlay. (In this case the title is only used for aria labelling) Default: false. |
| opts.heading.shaded | <code>boolean</code> | Whether to shade the background of the header. Default: to false |
| opts.modal | <code>boolean</code> | Whether the overlay should have modal behaviour or not. Setting this as true will add a translucent shadow between the page and the overlay |
| opts.compact | <code>boolean</code> | If true, the .o-overlay--compact class will be added to the overlay that reduces heading font-size and paddings in the content. |
| opts.src | <code>string</code> | Either a url from which HTML to populate the overlay can be loaded, or a querySelector string identifying an element from which the textContent should be extracted. |
| opts.html | <code>string</code> | String or HTMLElement. Raw HTML (cannot be set declaratively) |
| opts.trigger | <code>string</code> | querySelector expression or HTMLElement. When there's a trigger set, a click event handler will be added to it that will open or close the overlay accordingly. (cannot be set declaratively) |
| opts.zindex | <code>string</code> | Value of the CSS z-index property of the overlay. Default set via CSS: '10' |
| opts.preventclosing | <code>boolean</code> | Prevents closure of overlay via standard x button or escape key. For use when you are directing the user to somewhere else. Only valid with modal set to true. |
| opts.customclose | <code>boolean</code> | If you do not use the heading, but want to provide a close button in your html / src (with a class of o-overlay__close), setting customclose to true will attach o-overlay's close handler function to that button. |
| opts.parentnode | <code>string</code> | Should be a query selector for a DOM element. If set, the overlay will be appended as a child of this rather than the document body or target. If multiple nodes are matched, it will use the first. If nothing matches this selector, the body will be used. |
| opts.nested | <code>boolean</code> | If set to true, the resize, escape, and layer listeners will not be set up. This boolean should be used in conjunction with the parentnode setting to allow an overlay to be positioned within a DOM element rather than overlaid on top of everything. Default: false. |
| opts.nofocus | <code>boolean</code> | If set to true, the tabindex will not be set on the wrapper element. Useful in conjunction with the nested and parentnode options. Default: false. |
| opts.fullscreen | <code>boolean</code> | If set to true, the overlay will display full screen. This overlay disables scroll on the underlying document and is dismissible with the back button. |

<a name="Overlay+show"></a>

### overlay.show()
Show the overlay

**Kind**: instance method of [<code>Overlay</code>](#Overlay)  
**Emits**: [<code>ready</code>](#oOverlay+event_ready)  
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


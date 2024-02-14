## Classes

<dl>
<dt><a href="#Delegate">Delegate</a></dt>
<dd></dd>
<dt><a href="#Tooltip">Tooltip</a></dt>
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
<a name="Tooltip"></a>

## Tooltip
**Kind**: global class  

* [Tooltip](#Tooltip)
    * [new Tooltip(tooltipEl, opts)](#new_Tooltip_new)
    * _instance_
        * [.render()](#Tooltip+render)
        * [.show()](#Tooltip+show)
        * [.toggle()](#Tooltip+toggle)
        * [.closeAfter(seconds)](#Tooltip+closeAfter)
        * [.showAfter(seconds)](#Tooltip+showAfter)
        * [.destroy()](#Tooltip+destroy)
        * [.close(_event, _target, fireCloseEvent)](#Tooltip+close) ⇒ <code>boolean</code>
        * [.closeOnKeyUp(ev)](#Tooltip+closeOnKeyUp)
        * [.resizeListener()](#Tooltip+resizeListener)
        * [.drawTooltip()](#Tooltip+drawTooltip) ⇒ <code>void</code>
        * [.width()](#Tooltip+width) ⇒ <code>number</code>
        * [.height()](#Tooltip+height) ⇒ <code>number</code>
        * [._evaulateTooltip(position)](#Tooltip+_evaulateTooltip) ⇒ <code>boolean</code>
        * [._calculateTooltipRectangle(position, alignment)](#Tooltip+_calculateTooltipRectangle) ⇒ <code>object</code>
        * [._tooltipIsOutOfBounds(tooltipRect)](#Tooltip+_tooltipIsOutOfBounds) ⇒ <code>boolean</code>
    * _static_
        * [.getOptions(tooltipEl)](#Tooltip.getOptions) ⇒ <code>Object.&lt;string, any&gt;</code>
        * [.checkOptions(opts)](#Tooltip.checkOptions) ⇒ <code>object</code>

<a name="new_Tooltip_new"></a>

### new Tooltip(tooltipEl, opts)
Represents a tooltip.


| Param | Type | Description |
| --- | --- | --- |
| tooltipEl | <code>HTMLElement</code> | The tooltip element in the DOM (Required) |
| opts | <code>object</code> | An options object for configuring the tooltip (Optional) |

<a name="Tooltip+render"></a>

### tooltip.render()
Render the tooltip. Adds markup and attributes to this.tooltipEl in the DOM

**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
<a name="Tooltip+show"></a>

### tooltip.show()
Show the tooltip. Adds event handlers for clicks, touches, keypresses and
viewport resizes. Uses FTDomDelegate to implement the event delegate
pattern. Calls DrawTooltip.

**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
<a name="Tooltip+toggle"></a>

### tooltip.toggle()
Toggle the tooltip open and close

**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
<a name="Tooltip+closeAfter"></a>

### tooltip.closeAfter(seconds)
Close the tooltip after set time

**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  

| Param | Type | Description |
| --- | --- | --- |
| seconds | <code>number</code> | how long to wait until closing |

<a name="Tooltip+showAfter"></a>

### tooltip.showAfter(seconds)
Show the tooltip after set time

**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  

| Param | Type | Description |
| --- | --- | --- |
| seconds | <code>number</code> | how long to wait until showing |

<a name="Tooltip+destroy"></a>

### tooltip.destroy()
Destroy the tooltip.

**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
<a name="Tooltip+close"></a>

### tooltip.close(_event, _target, fireCloseEvent) ⇒ <code>boolean</code>
Close the tooltip. (Visually hide it and remove event listeners)

**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
**Returns**: <code>boolean</code> - false  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _event | <code>any</code> |  | ignored |
| _target | <code>any</code> |  | ignored |
| fireCloseEvent | <code>boolean</code> | <code>true</code> | should we fire the oTooltip.close event? |

<a name="Tooltip+closeOnKeyUp"></a>

### tooltip.closeOnKeyUp(ev)
**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  

| Param | Type | Description |
| --- | --- | --- |
| ev | <code>Event</code> | calls close on the tooltip if the key is Esc |

<a name="Tooltip+resizeListener"></a>

### tooltip.resizeListener()
Respond to resize events. Redraw the tooltip in case the target has moved.

**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
**Todo**

- [ ] There are many optimisations to make here- we're redrawing even if
the target hasn't moved.

<a name="Tooltip+drawTooltip"></a>

### tooltip.drawTooltip() ⇒ <code>void</code>
Calculates the best place to position the tooltip based on space around the
target and a preference set by the app developer.

**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
**Returns**: <code>void</code> - this function is recursive!  
**Throws**:

- <code>Error</code> if Tooltip can't be drawn in the client window

<a name="Tooltip+width"></a>

### tooltip.width() ⇒ <code>number</code>
**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
**Returns**: <code>number</code> - the offset width of the tooltip element  
<a name="Tooltip+height"></a>

### tooltip.height() ⇒ <code>number</code>
**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
**Returns**: <code>number</code> - the offset height of the tooltip element  
<a name="Tooltip+_evaulateTooltip"></a>

### tooltip.\_evaulateTooltip(position) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
**Returns**: <code>boolean</code> - If the set position is out of bounds.  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>&quot;above&quot;</code> \| <code>&quot;below&quot;</code> | above or below? where should the tooltip go? |

<a name="Tooltip+_calculateTooltipRectangle"></a>

### tooltip.\_calculateTooltipRectangle(position, alignment) ⇒ <code>object</code>
**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
**Returns**: <code>object</code> - sets this.tooltipRect to `left`, `right`, `top` and `bottom`
representing the bounding box of the tooltip (including the arrow)  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>&quot;above&quot;</code> \| <code>&quot;below&quot;</code> | where the tooltip should go (above or below) |
| alignment | <code>&quot;left&quot;</code> \| <code>&quot;right&quot;</code> \| <code>&quot;middle&quot;</code> \| <code>&quot;top&quot;</code> \| <code>&quot;bottom&quot;</code> | how the tooltip should be aligned |

<a name="Tooltip+_tooltipIsOutOfBounds"></a>

### tooltip.\_tooltipIsOutOfBounds(tooltipRect) ⇒ <code>boolean</code>
Checks if a hypothetical tooltip is in bounds on all sides.

**Kind**: instance method of [<code>Tooltip</code>](#Tooltip)  
**Returns**: <code>boolean</code> - is the tooltip in bounds?  

| Param | Type | Description |
| --- | --- | --- |
| tooltipRect | <code>object</code> | An object which represents a hypothetical tooltip position. |

<a name="Tooltip.getOptions"></a>

### Tooltip.getOptions(tooltipEl) ⇒ <code>Object.&lt;string, any&gt;</code>
Get the data attributes from the tooltipEl. If the tooltip is being set up
declaratively, this method is used to extract the data attributes from
the DOM.

**Kind**: static method of [<code>Tooltip</code>](#Tooltip)  
**Returns**: <code>Object.&lt;string, any&gt;</code> - a dictionary of options  

| Param | Type | Description |
| --- | --- | --- |
| tooltipEl | <code>HTMLElement</code> | The tooltip element in the DOM (Required) |

<a name="Tooltip.checkOptions"></a>

### Tooltip.checkOptions(opts) ⇒ <code>object</code>
Check the options passed in are valid, and that the required option
(target) is present

**Kind**: static method of [<code>Tooltip</code>](#Tooltip)  
**Returns**: <code>object</code> - opts  
**Throws**:

- o-tooltip error: opts.target is not set
- o-tooltip error: opts.tooltipPosition is not one of "above", "below"
"left" or "right"


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | An Object with configuration options for the tooltip |

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


## Functions

<dl>
<dt><a href="#setThrottleInterval">setThrottleInterval(eventType, interval)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#listenTo">listenTo(eventType)</a></dt>
<dd><p>Start listening for an event(s).</p>
</dd>
<dt><a href="#stopListeningTo">stopListeningTo(eventType)</a></dt>
<dd><p>Stop listening for an event(s).</p>
</dd>
<dt><a href="#broadcast">broadcast(eventType, data, target)</a></dt>
<dd></dd>
<dt><a href="#getHeight">getHeight(ignoreScrollbars)</a> ⇒ <code>number</code></dt>
<dd><p>Get the viewport height.</p>
</dd>
<dt><a href="#getWidth">getWidth(ignoreScrollbars)</a> ⇒ <code>number</code></dt>
<dd><p>Get the viewport width.</p>
</dd>
<dt><a href="#getSize">getSize(ignoreScrollbars)</a> ⇒ <code><a href="#Size">Size</a></code></dt>
<dd><p>Get the viewport width and height.</p>
</dd>
<dt><a href="#getScrollPosition">getScrollPosition()</a> ⇒ <code><a href="#ScrollPosition">ScrollPosition</a></code></dt>
<dd></dd>
<dt><a href="#getOrientation">getOrientation()</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#getVisibility">getVisibility()</a> ⇒ <code>boolean</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Size">Size</a> : <code>object</code></dt>
<dd><p>Viewport size.</p>
</dd>
<dt><a href="#ScrollPosition">ScrollPosition</a> : <code>object</code></dt>
<dd><p>Scroll position.</p>
</dd>
</dl>

<a name="setThrottleInterval"></a>

## setThrottleInterval(eventType, interval) ⇒ <code>void</code>

**Kind**: global function

| Param     | Type                | Description                                      |
| --------- | ------------------- | ------------------------------------------------ |
| eventType | <code>string</code> | The type of event to throttle for this duration. |
| interval  | <code>number</code> | The duration to throttle in ms.                  |

**Example**

```js
// throttle for different events at different durations
setThrottleInterval('scroll', 100);
setThrottleInterval('resize', 300);
setThrottleInterval('orientation', 30);
setThrottleInterval('visibility', 30);
// throttle all events at 30ms
setThrottleInterval(30);
```

<a name="listenTo"></a>

## listenTo(eventType)

Start listening for an event(s).

**Kind**: global function

| Param     | Type                | Description                                                                                        |
| --------- | ------------------- | -------------------------------------------------------------------------------------------------- |
| eventType | <code>string</code> | The event to start listening for. One of `resize`, `scroll`, `orientation`, `visibility` or `all`. |

**Example**

```js
// Start listening for all events.
oViewport.listenTo('all');

// It is now possible to listen for debounce o-viewport events such as `oViewport.orientation`.
document.body.addEventListener('oViewport.orientation', function (event) {
	console.log(event.type); // oViewport.orientation
});
```

<a name="stopListeningTo"></a>

## stopListeningTo(eventType)

Stop listening for an event(s).

**Kind**: global function

| Param     | Type                | Description                                                                                       |
| --------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| eventType | <code>string</code> | The event to stop listening for. One of `resize`, `scroll`, `orientation`, `visibility` or `all`. |

**Example**

```js
// Start listening for all events.
oViewport.listenTo('all');
// We're done. Stop listening for all events.
oViewport.stopListeningTo('all');
```

<a name="broadcast"></a>

## broadcast(eventType, data, target)

**Kind**: global function

| Param     | Type                     | Description              |
| --------- | ------------------------ | ------------------------ |
| eventType | <code>string</code>      | the name of the event    |
| data      | <code>object</code>      | the payload of the event |
| target    | <code>EventTarget</code> | the target of the event  |

<a name="getHeight"></a>

## getHeight(ignoreScrollbars) ⇒ <code>number</code>

Get the viewport height.

**Kind**: global function
**Returns**: <code>number</code> - viewport height

| Param            | Type                 | Description                                         |
| ---------------- | -------------------- | --------------------------------------------------- |
| ignoreScrollbars | <code>boolean</code> | [false] - set to true to discount scrollbar height. |

<a name="getWidth"></a>

## getWidth(ignoreScrollbars) ⇒ <code>number</code>

Get the viewport width.

**Kind**: global function
**Returns**: <code>number</code> - viewport width

| Param            | Type                 | Description                                       |
| ---------------- | -------------------- | ------------------------------------------------- |
| ignoreScrollbars | <code>boolean</code> | [false] - set to true to discount scrollbar width |

<a name="getSize"></a>

## getSize(ignoreScrollbars) ⇒ [<code>Size</code>](#Size)

Get the viewport width and height.

**Kind**: global function
**Returns**: [<code>Size</code>](#Size) - viewport width and height object

| Param            | Type                 | Description                                               |
| ---------------- | -------------------- | --------------------------------------------------------- |
| ignoreScrollbars | <code>boolean</code> | [false] - set to true to discount scrollbar width/height. |

<a name="getScrollPosition"></a>

## getScrollPosition() ⇒ [<code>ScrollPosition</code>](#ScrollPosition)

**Kind**: global function
**Returns**: [<code>ScrollPosition</code>](#ScrollPosition) - current scroll info
<a name="getOrientation"></a>

## getOrientation() ⇒ <code>string</code>

**Kind**: global function
**Returns**: <code>string</code> - - 'portrait' or 'landscape'
<a name="getVisibility"></a>

## getVisibility() ⇒ <code>boolean</code>

**Kind**: global function
**Returns**: <code>boolean</code> - - true if the viewport is visible
<a name="Size"></a>

## Size : <code>object</code>

Viewport size.

**Kind**: global typedef
**Properties**

| Name   | Type                | Description     |
| ------ | ------------------- | --------------- |
| height | <code>number</code> | viewport height |
| width  | <code>number</code> | viewport width  |

<a name="ScrollPosition"></a>

## ScrollPosition : <code>object</code>

Scroll position.

**Kind**: global typedef
**Properties**

| Name   | Type                | Description                  |
| ------ | ------------------- | ---------------------------- | --- | --------------- |
| height | <code>number</code> | `document.body.scrollHeight` |
| width  | <code>number</code> | `document.body.scrollWidth`  |
| left   | <code>number</code> | `window.pageXOffset          |     | window.scrollX` |
| top    | <code>number</code> | `window.pageYOffset          |     | window.scrollY` |

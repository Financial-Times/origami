## Classes

<dl>
<dt><a href="#Count">Count</a></dt>
<dd></dd>
<dt><a href="#Stream">Stream</a></dt>
<dd></dd>
</dl>

<a name="Count"></a>

## Count
**Kind**: global class  

* [Count](#Count)
    * [new Count([countEl], [opts])](#new_Count_new)
    * [.getCountLabel(count)](#Count.getCountLabel) ⇒ <code>string</code>

<a name="new_Count_new"></a>

### new Count([countEl], [opts])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [countEl] | <code>HTMLElement</code> |  | The component element in the DOM |
| [opts] | <code>object</code> | <code>{}</code> | An options object for configuring the component |

<a name="Count.getCountLabel"></a>

### Count.getCountLabel(count) ⇒ <code>string</code>
Get the aria-label for the count element.

**Kind**: static method of [<code>Count</code>](#Count)  
**Returns**: <code>string</code> - The string that should be used as the aria-label  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | The comment count |

<a name="Stream"></a>

## Stream
**Kind**: global class  

* [Stream](#Stream)
    * [new Stream([streamEl], [opts])](#new_Stream_new)
    * [.publishEvent(args)](#Stream+publishEvent) ⇒ <code>void</code>

<a name="new_Stream_new"></a>

### new Stream([streamEl], [opts])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [streamEl] | <code>HTMLElement</code> |  | The component element in the DOM |
| [opts] | <code>object</code> | <code>{}</code> | An options object for configuring the component |

<a name="Stream+publishEvent"></a>

### stream.publishEvent(args) ⇒ <code>void</code>
Emits events that have a valid o-comment event name.

**Kind**: instance method of [<code>Stream</code>](#Stream)  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>object</code> | The args object |
| args.name | <code>string</code> | The event name |
| args.data | <code>object</code> | The event payload |


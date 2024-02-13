<a name="LazyLoad"></a>

## LazyLoad
**Kind**: global class  

* [LazyLoad](#LazyLoad)
    * [new LazyLoad([rootEl], [opts])](#new_LazyLoad_new)
    * [.getDataAttributes(rootEl)](#LazyLoad.getDataAttributes) ⇒ <code>Object.&lt;string, any&gt;</code>
    * [.init(rootEl, [opts])](#LazyLoad.init) ⇒ [<code>LazyLoad</code>](#LazyLoad) \| [<code>Array.&lt;LazyLoad&gt;</code>](#LazyLoad)

<a name="new_LazyLoad_new"></a>

### new LazyLoad([rootEl], [opts])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [rootEl] | <code>HTMLElement</code> |  | The component element in the DOM |
| [opts] | <code>object</code> | <code>{}</code> | An options object for configuring the component |

<a name="LazyLoad.getDataAttributes"></a>

### LazyLoad.getDataAttributes(rootEl) ⇒ <code>Object.&lt;string, any&gt;</code>
Get the data attributes from the ${name.titleCase}Element. If the message is being set up
declaratively, this method is used to extract the data attributes from the DOM.

**Kind**: static method of [<code>LazyLoad</code>](#LazyLoad)  
**Returns**: <code>Object.&lt;string, any&gt;</code> - - The options  

| Param | Type | Description |
| --- | --- | --- |
| rootEl | <code>HTMLElement</code> | The component element in the DOM |

<a name="LazyLoad.init"></a>

### LazyLoad.init(rootEl, [opts]) ⇒ [<code>LazyLoad</code>](#LazyLoad) \| [<code>Array.&lt;LazyLoad&gt;</code>](#LazyLoad)
Initialise component.

**Kind**: static method of [<code>LazyLoad</code>](#LazyLoad)  
**Returns**: [<code>LazyLoad</code>](#LazyLoad) \| [<code>Array.&lt;LazyLoad&gt;</code>](#LazyLoad) - - The freshly made LazyLoad or LazyLoads  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rootEl | <code>HTMLElement</code> \| <code>string</code> |  | The root element to intialise the component in, or a CSS selector for the root element |
| [opts] | <code>object</code> | <code>{}</code> | An options object for configuring the component |


## Classes

<dl>
<dt><a href="#ExpanderUtility">ExpanderUtility</a></dt>
<dd></dd>
<dt><a href="#Expander">Expander</a></dt>
<dd></dd>
</dl>

<a name="ExpanderUtility"></a>

## ExpanderUtility
**Kind**: global class  

* [ExpanderUtility](#ExpanderUtility)
    * [new ExpanderUtility(oExpanderElement, opts)](#new_ExpanderUtility_new)
    * [.apply(isSilent)](#ExpanderUtility+apply) ⇒ <code>void</code>
    * [.toggle()](#ExpanderUtility+toggle) ⇒ <code>void</code>
    * [.expand(isSilent)](#ExpanderUtility+expand) ⇒ <code>void</code>
    * [.collapse(isSilent)](#ExpanderUtility+collapse) ⇒ <code>void</code>
    * [.isCollapsed()](#ExpanderUtility+isCollapsed) ⇒ <code>boolean</code>
    * [.destroy()](#ExpanderUtility+destroy) ⇒ <code>void</code>
    * [._getCollapseableItems()](#ExpanderUtility+_getCollapseableItems) ⇒ <code>Array.&lt;Element&gt;</code>
    * [._getItems()](#ExpanderUtility+_getItems) ⇒ <code>Array.&lt;Element&gt;</code>

<a name="new_ExpanderUtility_new"></a>

### new ExpanderUtility(oExpanderElement, opts)
Class constructor.


| Param | Type | Description |
| --- | --- | --- |
| oExpanderElement | <code>HTMLElement</code> | The component element in the DOM |
| opts | <code>object</code> | An options object for configuring the component. |
| opts.shrinkTo | <code>string</code> \| <code>number</code> | ['height'] - The expander collapse method, "height", "hidden", or a number of items. |
| opts.toggleState | <code>string</code> \| <code>number</code> | ['all'] - How to update the expander toggles: "all" to update text and aria-expanded attributes, "aria" to update only aria-expanded attributes, "none" to avoid updating toggles on click. |
| opts.expandedToggleText | <code>string</code> | ['fewer'] - Toggle text when the expander is collapsed. Defaults to "fewer", or "less" when `shrinkTo` is "height", or "hidden" when `shrinkTo` is "hidden". |
| opts.collapsedToggleText | <code>string</code> | ['more'] - Toggle text when the expander is collapsed. Defaults to "more" or "show" when `shrinkTo` is "hidden". |
| opts.selectors | <code>object</code> | The selectors for expander elements. |
| opts.selectors.toggle | <code>string</code> | A selector for the expanders toggles e.g. `.my-expander__toggle`. |
| opts.selectors.content | <code>string</code> | A selector for the expanders content, which will collapse or expand e.g. `.my-expander__content`. |
| opts.selectors.item | <code>string</code> | A selector for the items within the expander content e.g. `li` (required only when `shrinkTo` is set to a number). |
| opts.classnames | <code>object</code> | The classnames to apply to the expander for different states. |
| opts.classnames.initialized | <code>string</code> | The class to apply to the top level of the expander when initialised by JS e.g. `.my-expander--initialized`. |
| opts.classnames.inactive | <code>string</code> | The class to apply to the top level of the expander when it can not expand or collapse e.g. `.my-expander--inactive`. |
| opts.classnames.expanded | <code>string</code> | The class to apply to the expander content when it is expanded e.g. `.my-expander--expanded`. |
| opts.classnames.collapsed | <code>string</code> | The class to apply to the expander content when it is collapsed JS e.g. `.my-expander--collapsed`. |
| opts.classnames.collapsibleItem | <code>string</code> | The class to apply to any item (see the `selectors.item` option) which will be hidden when collapsed e.g. `.my-expander__collapsible-item` (required only when `shrinkTo` is set to a number). |

<a name="ExpanderUtility+apply"></a>

### expanderUtility.apply(isSilent) ⇒ <code>void</code>
Recalculate and apply the styles to expand or collapse the expander
according to its current state.

**Kind**: instance method of [<code>ExpanderUtility</code>](#ExpanderUtility)  

| Param | Type | Description |
| --- | --- | --- |
| isSilent | <code>boolean</code> | [false] Set to true to avoid firing the `oExpander.expand` or `oExpander.collapse` events. |

<a name="ExpanderUtility+toggle"></a>

### expanderUtility.toggle() ⇒ <code>void</code>
Toggle the expander so expands or, if it's already expanded, collapses.

**Kind**: instance method of [<code>ExpanderUtility</code>](#ExpanderUtility)  
<a name="ExpanderUtility+expand"></a>

### expanderUtility.expand(isSilent) ⇒ <code>void</code>
Expand the expander.

**Kind**: instance method of [<code>ExpanderUtility</code>](#ExpanderUtility)  

| Param | Type | Description |
| --- | --- | --- |
| isSilent | <code>boolean</code> | [false] Set to true to avoid firing the `oExpander.expand` event. |

<a name="ExpanderUtility+collapse"></a>

### expanderUtility.collapse(isSilent) ⇒ <code>void</code>
Collapse the expander.

**Kind**: instance method of [<code>ExpanderUtility</code>](#ExpanderUtility)  

| Param | Type | Description |
| --- | --- | --- |
| isSilent | <code>boolean</code> | [false] Set to true to avoid firing the `oExpander.collapse` event. |

<a name="ExpanderUtility+isCollapsed"></a>

### expanderUtility.isCollapsed() ⇒ <code>boolean</code>
Return true if the expander is currently collapsed.

**Kind**: instance method of [<code>ExpanderUtility</code>](#ExpanderUtility)  
**Returns**: <code>boolean</code> - - is the expander collapsed  
<a name="ExpanderUtility+destroy"></a>

### expanderUtility.destroy() ⇒ <code>void</code>
Remove the expander from the page.

**Kind**: instance method of [<code>ExpanderUtility</code>](#ExpanderUtility)  
<a name="ExpanderUtility+_getCollapseableItems"></a>

### expanderUtility.\_getCollapseableItems() ⇒ <code>Array.&lt;Element&gt;</code>
**Kind**: instance method of [<code>ExpanderUtility</code>](#ExpanderUtility)  
**Returns**: <code>Array.&lt;Element&gt;</code> - - All collapseable content items.  
<a name="ExpanderUtility+_getItems"></a>

### expanderUtility.\_getItems() ⇒ <code>Array.&lt;Element&gt;</code>
**Kind**: instance method of [<code>ExpanderUtility</code>](#ExpanderUtility)  
**Returns**: <code>Array.&lt;Element&gt;</code> - - All content items.  
<a name="Expander"></a>

## Expander
**Kind**: global class  

* [Expander](#Expander)
    * [new Expander(oExpanderElement, opts)](#new_Expander_new)
    * [.createCustom(oExpanderElement, opts)](#Expander.createCustom) ⇒ [<code>ExpanderUtility</code>](#ExpanderUtility)
    * [.init(rootEl, opts)](#Expander.init) ⇒ [<code>Expander</code>](#Expander) \| [<code>Array.&lt;Expander&gt;</code>](#Expander)

<a name="new_Expander_new"></a>

### new Expander(oExpanderElement, opts)
o-expander constructor.


| Param | Type | Description |
| --- | --- | --- |
| oExpanderElement | <code>HTMLElement</code> | The component element in the DOM |
| opts | <code>object</code> | An options object for configuring the component. |
| opts.shrinkTo | <code>string</code> \| <code>number</code> | ['height'] - The expander collapse method, "height", "hidden", or a number of items. |
| opts.toggleState | <code>string</code> \| <code>number</code> | ['all'] - How to update the expander toggles: "all" to update text and aria-expanded attributes, "aria" to update only aria-expanded attributes, "none" to avoid updating toggles on click. |
| opts.itemSelector | <code>string</code> | ['li'] - A selector for the expandable items when `shrinkTo` is set to a number, relative to `.o-expander__content`. |
| opts.expandedToggleText | <code>string</code> | ['fewer'] - Toggle text for when the expander is collapsed. Defaults to "fewer", or "less" when `shrinkTo` is "height", or "hidden" when `shrinkTo` is "hidden". |
| opts.collapsedToggleText | <code>string</code> | ['more'] - Toggle text for when the expander is collapsed. Defaults to "more" or "show" when `shrinkTo` is "hidden". |

<a name="Expander.createCustom"></a>

### Expander.createCustom(oExpanderElement, opts) ⇒ [<code>ExpanderUtility</code>](#ExpanderUtility)
Construct a custom expander. Useful to add customised expander
functionality to a component. E.g. to animate away collapsed items
rather than hide them immediately.

**Kind**: static method of [<code>Expander</code>](#Expander)  
**Returns**: [<code>ExpanderUtility</code>](#ExpanderUtility) - - A custom expander  

| Param | Type | Description |
| --- | --- | --- |
| oExpanderElement | <code>HTMLElement</code> | The expander element in the DOM. |
| opts | <code>object</code> | [{}] - An options object for configuring the expander @see ExpanderUtility. |

<a name="Expander.init"></a>

### Expander.init(rootEl, opts) ⇒ [<code>Expander</code>](#Expander) \| [<code>Array.&lt;Expander&gt;</code>](#Expander)
Initialise the component.

**Kind**: static method of [<code>Expander</code>](#Expander)  
**Returns**: [<code>Expander</code>](#Expander) \| [<code>Array.&lt;Expander&gt;</code>](#Expander) - - Expander instance(s)  

| Param | Type | Description |
| --- | --- | --- |
| rootEl | <code>HTMLElement</code> \| <code>string</code> | The root element to initialise the component in, or a CSS selector for the root element |
| opts | <code>object</code> | [{}] - An options object for configuring the component |


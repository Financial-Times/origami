## Classes

<dl>
<dt><a href="#Drawer">Drawer</a></dt>
<dd></dd>
<dt><a href="#DropDown">DropDown</a></dt>
<dd></dd>
<dt><a href="#HeaderServices">HeaderServices</a></dt>
<dd></dd>
<dt><a href="#Scroll">Scroll</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Drawer">Drawer</a></dt>
<dd></dd>
</dl>

<a name="Drawer"></a>

## Drawer
**Kind**: global class  

* [Drawer](#Drawer)
    * [new Drawer([headerEl])](#new_Drawer_new)
    * [.enabled](#Drawer+enabled) ⇒ <code>boolean</code>
    * [.handleEvent(event)](#Drawer+handleEvent) ⇒ <code>void</code>
    * [.render()](#Drawer+render) ⇒ <code>void</code>
    * [.toggleDrawer()](#Drawer+toggleDrawer) ⇒ <code>void</code>

<a name="new_Drawer_new"></a>

### new Drawer([headerEl])
Class constructor.


| Param | Type | Description |
| --- | --- | --- |
| [headerEl] | <code>HTMLElement</code> | The component element in the DOM |

<a name="Drawer+enabled"></a>

### drawer.enabled ⇒ <code>boolean</code>
Check if the drawer is currently enabled.
If the burger element is visible, the drawer is enabled.

**Kind**: instance property of [<code>Drawer</code>](#Drawer)  
**Returns**: <code>boolean</code> - is the burger visible?  
<a name="Drawer+handleEvent"></a>

### drawer.handleEvent(event) ⇒ <code>void</code>
Event Handler

**Kind**: instance method of [<code>Drawer</code>](#Drawer)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | The event emitted by element/window interactions |

<a name="Drawer+render"></a>

### drawer.render() ⇒ <code>void</code>
Drawer rendering

**Kind**: instance method of [<code>Drawer</code>](#Drawer)  
<a name="Drawer+toggleDrawer"></a>

### drawer.toggleDrawer() ⇒ <code>void</code>
Drawer hide/show functionality

**Kind**: instance method of [<code>Drawer</code>](#Drawer)  
<a name="DropDown"></a>

## DropDown
**Kind**: global class  

* [DropDown](#DropDown)
    * [new DropDown(headerEl, drawer)](#new_DropDown_new)
    * _instance_
        * [.navItems](#DropDown+navItems) : <code>Array.&lt;Element&gt;</code>
        * [.handleEvent(event)](#DropDown+handleEvent) ⇒ <code>void</code>
        * [.isDrawer()](#DropDown+isDrawer) ⇒ <code>boolean</code>
        * [.reset()](#DropDown+reset) ⇒ <code>void</code>
    * _static_
        * [.isExpanded(item)](#DropDown.isExpanded) ⇒ <code>boolean</code>
        * [.expand(item)](#DropDown.expand) ⇒ <code>void</code>
        * [.position(item)](#DropDown.position) ⇒ <code>void</code>
        * [.collapse(item)](#DropDown.collapse) ⇒ <code>void</code>
        * [.collapseAll(items)](#DropDown.collapseAll) ⇒ <code>void</code>
        * [.expandAll(items)](#DropDown.expandAll) ⇒ <code>void</code>
        * [.getCurrent(items)](#DropDown.getCurrent) ⇒ <code>HTMLElement</code>

<a name="new_DropDown_new"></a>

### new DropDown(headerEl, drawer)
Class constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| headerEl | <code>HTMLElement</code> |  | The component element in the DOM |
| drawer | [<code>Drawer</code>](#Drawer) \| <code>null</code> | <code></code> | The drawer that this drop down belongs to if any. |

<a name="DropDown+navItems"></a>

### dropDown.navItems : <code>Array.&lt;Element&gt;</code>
- Nav items with a dropdown.

**Kind**: instance property of [<code>DropDown</code>](#DropDown)  
<a name="DropDown+handleEvent"></a>

### dropDown.handleEvent(event) ⇒ <code>void</code>
Event Handler

**Kind**: instance method of [<code>DropDown</code>](#DropDown)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | The event emitted by element/window interactions |

<a name="DropDown+isDrawer"></a>

### dropDown.isDrawer() ⇒ <code>boolean</code>
Checks if primary nav is in a drawer
This boolean will change the drop down behaviour.

**Kind**: instance method of [<code>DropDown</code>](#DropDown)  
**Returns**: <code>boolean</code> - - whether the drawer is enabled or not  
<a name="DropDown+reset"></a>

### dropDown.reset() ⇒ <code>void</code>
Returns nav items to their original collapsed state,
items which contain links with the attribute `aria-current`
set to true remain expanded.

**Kind**: instance method of [<code>DropDown</code>](#DropDown)  
<a name="DropDown.isExpanded"></a>

### DropDown.isExpanded(item) ⇒ <code>boolean</code>
Checks whether nav menu is expanded

**Kind**: static method of [<code>DropDown</code>](#DropDown)  
**Returns**: <code>boolean</code> - - whether the nav menu is expanded  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>HTMLElement</code> | the nav menu |

<a name="DropDown.expand"></a>

### DropDown.expand(item) ⇒ <code>void</code>
Expands closed nav menu

**Kind**: static method of [<code>DropDown</code>](#DropDown)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>HTMLElement</code> | the nav menu |

<a name="DropDown.position"></a>

### DropDown.position(item) ⇒ <code>void</code>
Changes nav menu position relative to the window

**Kind**: static method of [<code>DropDown</code>](#DropDown)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>HTMLElement</code> | the nav menu |

<a name="DropDown.collapse"></a>

### DropDown.collapse(item) ⇒ <code>void</code>
Collapses open nav menu

**Kind**: static method of [<code>DropDown</code>](#DropDown)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>HTMLElement</code> | the nav menu |

<a name="DropDown.collapseAll"></a>

### DropDown.collapseAll(items) ⇒ <code>void</code>
Collapses all open nav menus

**Kind**: static method of [<code>DropDown</code>](#DropDown)  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;HTMLElement&gt;</code> | the menu items to collapse |

<a name="DropDown.expandAll"></a>

### DropDown.expandAll(items) ⇒ <code>void</code>
Expands all open nav menus

**Kind**: static method of [<code>DropDown</code>](#DropDown)  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;HTMLElement&gt;</code> | the menu items to expand |

<a name="DropDown.getCurrent"></a>

### DropDown.getCurrent(items) ⇒ <code>HTMLElement</code>
Returns items which contain an anchor
with the attribute `aria-current` set to true or "page".

**Kind**: static method of [<code>DropDown</code>](#DropDown)  
**Returns**: <code>HTMLElement</code> - - The current menu item  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;HTMLElement&gt;</code> | the menu items to check |

<a name="HeaderServices"></a>

## HeaderServices
**Kind**: global class  

* [HeaderServices](#HeaderServices)
    * [new HeaderServices([headerEl])](#new_HeaderServices_new)
    * [.init(rootElement, [options])](#HeaderServices.init) ⇒ <code>Array.&lt;HTMLElement&gt;</code> \| <code>HTMLElement</code>

<a name="new_HeaderServices_new"></a>

### new HeaderServices([headerEl])
Class constructor


| Param | Type | Description |
| --- | --- | --- |
| [headerEl] | <code>HTMLElement</code> | The component element in the DOM |

<a name="HeaderServices.init"></a>

### HeaderServices.init(rootElement, [options]) ⇒ <code>Array.&lt;HTMLElement&gt;</code> \| <code>HTMLElement</code>
Initialise header component

**Kind**: static method of [<code>HeaderServices</code>](#HeaderServices)  
**Returns**: <code>Array.&lt;HTMLElement&gt;</code> \| <code>HTMLElement</code> - - The header(s) initalised.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rootElement | <code>HTMLElement</code> \| <code>string</code> |  | The root element to intialise the component in, or a CSS selector for the root element |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the component |

<a name="Scroll"></a>

## Scroll
**Kind**: global class  

* [Scroll](#Scroll)
    * [new Scroll([headerEl])](#new_Scroll_new)
    * [.render()](#Scroll+render) ⇒ <code>void</code>
    * [.toggleScrollButtons()](#Scroll+toggleScrollButtons) ⇒ <code>void</code>
    * [.scroll(event)](#Scroll+scroll) ⇒ <code>void</code>
    * [.showCurrentSelection()](#Scroll+showCurrentSelection) ⇒ <code>void</code>

<a name="new_Scroll_new"></a>

### new Scroll([headerEl])
Class constructor


| Param | Type | Description |
| --- | --- | --- |
| [headerEl] | <code>HTMLElement</code> | The component element in the DOM |

<a name="Scroll+render"></a>

### scroll.render() ⇒ <code>void</code>
Scroll functionality rendering

**Kind**: instance method of [<code>Scroll</code>](#Scroll)  
<a name="Scroll+toggleScrollButtons"></a>

### scroll.toggleScrollButtons() ⇒ <code>void</code>
Hide/show scroll buttons

**Kind**: instance method of [<code>Scroll</code>](#Scroll)  
<a name="Scroll+scroll"></a>

### scroll.scroll(event) ⇒ <code>void</code>
Scrolling functionality

**Kind**: instance method of [<code>Scroll</code>](#Scroll)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | A scroll event |

<a name="Scroll+showCurrentSelection"></a>

### scroll.showCurrentSelection() ⇒ <code>void</code>
Scroll secondary nav to 'current selection'

**Kind**: instance method of [<code>Scroll</code>](#Scroll)  
<a name="Drawer"></a>

## Drawer
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| [headerEl] | <code>HTMLElement</code> | The component element in the D |


* [Drawer](#Drawer)
    * [new Drawer([headerEl])](#new_Drawer_new)
    * [.enabled](#Drawer+enabled) ⇒ <code>boolean</code>
    * [.handleEvent(event)](#Drawer+handleEvent) ⇒ <code>void</code>
    * [.render()](#Drawer+render) ⇒ <code>void</code>
    * [.toggleDrawer()](#Drawer+toggleDrawer) ⇒ <code>void</code>

<a name="new_Drawer_new"></a>

### new Drawer([headerEl])
Class constructor.


| Param | Type | Description |
| --- | --- | --- |
| [headerEl] | <code>HTMLElement</code> | The component element in the DOM |

<a name="Drawer+enabled"></a>

### drawer.enabled ⇒ <code>boolean</code>
Check if the drawer is currently enabled.
If the burger element is visible, the drawer is enabled.

**Kind**: instance property of [<code>Drawer</code>](#Drawer)  
**Returns**: <code>boolean</code> - is the burger visible?  
<a name="Drawer+handleEvent"></a>

### drawer.handleEvent(event) ⇒ <code>void</code>
Event Handler

**Kind**: instance method of [<code>Drawer</code>](#Drawer)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | The event emitted by element/window interactions |

<a name="Drawer+render"></a>

### drawer.render() ⇒ <code>void</code>
Drawer rendering

**Kind**: instance method of [<code>Drawer</code>](#Drawer)  
<a name="Drawer+toggleDrawer"></a>

### drawer.toggleDrawer() ⇒ <code>void</code>
Drawer hide/show functionality

**Kind**: instance method of [<code>Drawer</code>](#Drawer)  

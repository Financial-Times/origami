## Classes

<dl>
<dt><a href="#Layout">Layout</a></dt>
<dd></dd>
<dt><a href="#LinkedHeading">LinkedHeading</a></dt>
<dd><p>Represents a linked heading.</p>
</dd>
</dl>

<a name="Layout"></a>

## Layout
**Kind**: global class  

* [Layout](#Layout)
    * [new Layout([layoutEl], [options])](#new_Layout_new)
    * _instance_
        * [.navAnchors](#Layout+navAnchors) : <code>Array.&lt;HTMLAnchorElement&gt;</code>
        * [.navAnchors](#Layout+navAnchors) : <code>Array.&lt;HTMLAnchorElement&gt;</code>
        * [.constructNavFromDOM()](#Layout+constructNavFromDOM)
        * [.destroy()](#Layout+destroy)
        * [.highlightNavItems()](#Layout+highlightNavItems) ⇒ <code>void</code>
    * _static_
        * [.getDataAttributes(layoutElement)](#Layout.getDataAttributes) ⇒ <code>Object.&lt;string, any&gt;</code>
        * [.init(rootEl, [opts])](#Layout.init) ⇒ [<code>Layout</code>](#Layout) \| [<code>Array.&lt;Layout&gt;</code>](#Layout)

<a name="new_Layout_new"></a>

### new Layout([layoutEl], [options])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [layoutEl] | <code>HTMLElement</code> |  | The layout element in the DOM |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring aspects of the layout |

<a name="Layout+navAnchors"></a>

### layout.navAnchors : <code>Array.&lt;HTMLAnchorElement&gt;</code>
**Kind**: instance property of [<code>Layout</code>](#Layout)  
<a name="Layout+navAnchors"></a>

### layout.navAnchors : <code>Array.&lt;HTMLAnchorElement&gt;</code>
**Kind**: instance property of [<code>Layout</code>](#Layout)  
<a name="Layout+constructNavFromDOM"></a>

### layout.constructNavFromDOM()
Construct the sidebar navigation from headings within the DOM.

**Kind**: instance method of [<code>Layout</code>](#Layout)  
<a name="Layout+destroy"></a>

### layout.destroy()
Unmount the sideBarNavigation.

**Kind**: instance method of [<code>Layout</code>](#Layout)  
<a name="Layout+highlightNavItems"></a>

### layout.highlightNavItems() ⇒ <code>void</code>
Enables navigation item highlighting based on scroll position.
Relies on heading ids and anchor href being the same.

**Kind**: instance method of [<code>Layout</code>](#Layout)  
<a name="Layout.getDataAttributes"></a>

### Layout.getDataAttributes(layoutElement) ⇒ <code>Object.&lt;string, any&gt;</code>
Get the data attributes from the layoutEl. If the layout is being set up
declaratively, this method is used to extract the data attributes from the DOM.

**Kind**: static method of [<code>Layout</code>](#Layout)  
**Returns**: <code>Object.&lt;string, any&gt;</code> - - Options for configuring the layout  

| Param | Type | Description |
| --- | --- | --- |
| layoutElement | <code>HTMLElement</code> | The layout element in the DOM |

<a name="Layout.init"></a>

### Layout.init(rootEl, [opts]) ⇒ [<code>Layout</code>](#Layout) \| [<code>Array.&lt;Layout&gt;</code>](#Layout)
Initialise layout component.

**Kind**: static method of [<code>Layout</code>](#Layout)  
**Returns**: [<code>Layout</code>](#Layout) \| [<code>Array.&lt;Layout&gt;</code>](#Layout) - Returns either a single Layout instance or an array of Layout instances  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rootEl | <code>HTMLElement</code> \| <code>string</code> |  | The root element to intialise the layout in, or a CSS selector for the root element |
| [opts] | <code>object</code> | <code>{}</code> | An options object for configuring layout behaviour. |

<a name="LinkedHeading"></a>

## LinkedHeading
Represents a linked heading.

**Kind**: global class  
**Access**: public  
<a name="new_LinkedHeading_new"></a>

### new LinkedHeading(headingElement, [options])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| headingElement | <code>HTMLElement</code> |  | The heading element in the DOM |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the linked heading |
| [options.content] | <code>string</code> | <code>&quot;\&quot;¶\&quot;&quot;</code> | The content to add to the created link |
| [options.title] | <code>string</code> | <code>&quot;\&quot;Link directly to this section of the page\&quot;&quot;</code> | The title attribute to add to the created link |


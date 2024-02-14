<a name="Banner"></a>

## Banner
Represents a banner.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bannerElement | <code>HTMLElement</code> | The banner element we were given |


* [Banner](#Banner)
    * [new Banner([bannerElement], [options])](#new_Banner_new)
    * _instance_
        * [.render()](#Banner+render) ⇒ <code>void</code>
        * [.open()](#Banner+open) ⇒ <code>void</code>
        * [.close()](#Banner+close) ⇒ <code>void</code>
        * [.buildBannerElement([bannerElement])](#Banner+buildBannerElement) ⇒ <code>HTMLElement</code>
        * [.buildCloseButtonElement()](#Banner+buildCloseButtonElement) ⇒ <code>HTMLElement</code>
        * [.destroy()](#Banner+destroy)
    * _static_
        * [.getOptionsFromDom(bannerElement)](#Banner.getOptionsFromDom) ⇒ <code>Object.&lt;string, any&gt;</code>
        * [.init([rootElement], [options])](#Banner.init) ⇒ [<code>Banner</code>](#Banner) \| [<code>Array.&lt;Banner&gt;</code>](#Banner)

<a name="new_Banner_new"></a>

### new Banner([bannerElement], [options])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [bannerElement] | <code>HTMLElement</code> |  | The banner element in the DOM |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the banner |

<a name="Banner+render"></a>

### banner.render() ⇒ <code>void</code>
Render the banner.

**Kind**: instance method of [<code>Banner</code>](#Banner)  
<a name="Banner+open"></a>

### banner.open() ⇒ <code>void</code>
Open the banner.

**Kind**: instance method of [<code>Banner</code>](#Banner)  
<a name="Banner+close"></a>

### banner.close() ⇒ <code>void</code>
Close the banner.

**Kind**: instance method of [<code>Banner</code>](#Banner)  
<a name="Banner+buildBannerElement"></a>

### banner.buildBannerElement([bannerElement]) ⇒ <code>HTMLElement</code>
Build a full banner element. This is used when no banner or a partial banner exists in the DOM.

**Kind**: instance method of [<code>Banner</code>](#Banner)  
**Returns**: <code>HTMLElement</code> - Returns the new banner element  

| Param | Type | Description |
| --- | --- | --- |
| [bannerElement] | <code>HTMLElement</code> | The banner element to build around |

<a name="Banner+buildCloseButtonElement"></a>

### banner.buildCloseButtonElement() ⇒ <code>HTMLElement</code>
Build a close button element.

**Kind**: instance method of [<code>Banner</code>](#Banner)  
**Returns**: <code>HTMLElement</code> - Returns the new close button element  
<a name="Banner+destroy"></a>

### banner.destroy()
Undo the init method

**Kind**: instance method of [<code>Banner</code>](#Banner)  
<a name="Banner.getOptionsFromDom"></a>

### Banner.getOptionsFromDom(bannerElement) ⇒ <code>Object.&lt;string, any&gt;</code>
Get the data attributes from the bannerElement. If the banner is being set up
declaratively, this method is used to extract the data attributes from the DOM.

**Kind**: static method of [<code>Banner</code>](#Banner)  
**Returns**: <code>Object.&lt;string, any&gt;</code> - - The options  

| Param | Type | Description |
| --- | --- | --- |
| bannerElement | <code>HTMLElement</code> | The banner element in the DOM |

<a name="Banner.init"></a>

### Banner.init([rootElement], [options]) ⇒ [<code>Banner</code>](#Banner) \| [<code>Array.&lt;Banner&gt;</code>](#Banner)
Initialise banner components.

**Kind**: static method of [<code>Banner</code>](#Banner)  
**Returns**: [<code>Banner</code>](#Banner) \| [<code>Array.&lt;Banner&gt;</code>](#Banner) - - The newly instantiated Banner (or Banners, if rootElement was not a banner)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [rootElement] | <code>HTMLElement</code> \| <code>string</code> |  | The root element to intialise banners in, or a CSS selector for the root element |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the banners |


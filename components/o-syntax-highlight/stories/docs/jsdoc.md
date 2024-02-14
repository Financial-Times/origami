<a name="SyntaxHighlight"></a>

## SyntaxHighlight
**Kind**: global class  

* [SyntaxHighlight](#SyntaxHighlight)
    * [new SyntaxHighlight([syntaxEl], [options])](#new_SyntaxHighlight_new)
    * _instance_
        * [._setLanguage()](#SyntaxHighlight+_setLanguage)
        * [._getLanguage(element)](#SyntaxHighlight+_getLanguage) ⇒ <code>string</code> \| <code>null</code>
        * [._checkLanguage()](#SyntaxHighlight+_checkLanguage)
        * [._tokeniseCodeBlocks()](#SyntaxHighlight+_tokeniseCodeBlocks)
        * [._tokeniseBlock(element)](#SyntaxHighlight+_tokeniseBlock)
        * [.tokenise()](#SyntaxHighlight+tokenise) ⇒ <code>HTMLElement</code>
    * _static_
        * [.init(rootElement, [options])](#SyntaxHighlight.init) ⇒ [<code>SyntaxHighlight</code>](#SyntaxHighlight) \| [<code>Array.&lt;SyntaxHighlight&gt;</code>](#SyntaxHighlight)

<a name="new_SyntaxHighlight_new"></a>

### new SyntaxHighlight([syntaxEl], [options])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [syntaxEl] | <code>HTMLElement</code> \| <code>string</code> |  | The element to highlight in the DOM |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the message |
| options.language | <code>string</code> |  | The language to tokenise the code for |

<a name="SyntaxHighlight+_setLanguage"></a>

### syntaxHighlight.\_setLanguage()
Set language for syntax highlighting

**Kind**: instance method of [<code>SyntaxHighlight</code>](#SyntaxHighlight)  
<a name="SyntaxHighlight+_getLanguage"></a>

### syntaxHighlight.\_getLanguage(element) ⇒ <code>string</code> \| <code>null</code>
Get language from HTML element

**Kind**: instance method of [<code>SyntaxHighlight</code>](#SyntaxHighlight)  
**Returns**: <code>string</code> \| <code>null</code> - - The language name e.g. `js` or null if not defined.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The element with a language-relevant class name |

<a name="SyntaxHighlight+_checkLanguage"></a>

### syntaxHighlight.\_checkLanguage()
Check if language is present for tokenising, add if not load it here (e.g.scss, json);

**Kind**: instance method of [<code>SyntaxHighlight</code>](#SyntaxHighlight)  
<a name="SyntaxHighlight+_tokeniseCodeBlocks"></a>

### syntaxHighlight.\_tokeniseCodeBlocks()
Fetch and tokenise every <code> tag's content under the syntaxEl

**Kind**: instance method of [<code>SyntaxHighlight</code>](#SyntaxHighlight)  
<a name="SyntaxHighlight+_tokeniseBlock"></a>

### syntaxHighlight.\_tokeniseBlock(element)
Prepares syntax for highlighting based on the language provided in the element classname (class="syntax-html")

**Kind**: instance method of [<code>SyntaxHighlight</code>](#SyntaxHighlight)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The html element that holds the syntax to highlight |

<a name="SyntaxHighlight+tokenise"></a>

### syntaxHighlight.tokenise() ⇒ <code>HTMLElement</code>
Tokenise string for highlighting

**Kind**: instance method of [<code>SyntaxHighlight</code>](#SyntaxHighlight)  
**Returns**: <code>HTMLElement</code> - tokenised code in the form of HTML elements  
<a name="SyntaxHighlight.init"></a>

### SyntaxHighlight.init(rootElement, [options]) ⇒ [<code>SyntaxHighlight</code>](#SyntaxHighlight) \| [<code>Array.&lt;SyntaxHighlight&gt;</code>](#SyntaxHighlight)
Initialise syntax highlighting.

**Kind**: static method of [<code>SyntaxHighlight</code>](#SyntaxHighlight)  
**Returns**: [<code>SyntaxHighlight</code>](#SyntaxHighlight) \| [<code>Array.&lt;SyntaxHighlight&gt;</code>](#SyntaxHighlight) - - The SyntaxHighlight instance or instances  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rootElement | <code>HTMLElement</code> \| <code>string</code> |  | The root element to intialise a message in, or a CSS selector for the root element |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the syntax highlighting |


<a name="ODate"></a>

## ODate
Initialise the o-date component.

**Kind**: global class  

* [ODate](#ODate)
    * [new ODate(rootElement)](#new_ODate_new)
    * _instance_
        * [.update()](#ODate+update) ⇒ <code>undefined</code>
        * [.destroy()](#ODate+destroy) ⇒ <code>undefined</code>
        * [._renderDateFor(printer, date)](#ODate+_renderDateFor) ⇒ <code>undefined</code>
    * _static_
        * [.init([el])](#ODate.init) ⇒ [<code>Array.&lt;ODate&gt;</code>](#ODate) \| [<code>ODate</code>](#ODate)
        * ~~[.toDate()](#ODate.toDate) ⇒ <code>string</code>~~
        * ~~[.format()](#ODate.format) ⇒ <code>string</code>~~
        * ~~[.getSecondsBetween()](#ODate.getSecondsBetween) ⇒ <code>string</code>~~
        * ~~[.ftTime()](#ODate.ftTime) ⇒ <code>string</code>~~
        * ~~[.isNearFuture()](#ODate.isNearFuture) ⇒ <code>string</code>~~
        * ~~[.isFarFuture()](#ODate.isFarFuture) ⇒ <code>string</code>~~
        * ~~[.isToday()](#ODate.isToday) ⇒ <code>string</code>~~
        * ~~[.isYesterday()](#ODate.isYesterday) ⇒ <code>string</code>~~
        * ~~[.timeAgo()](#ODate.timeAgo) ⇒ <code>string</code>~~
        * ~~[.asTodayOrYesterdayOrNothing()](#ODate.asTodayOrYesterdayOrNothing) ⇒ <code>string</code>~~
        * ~~[.timeAgoNoSeconds()](#ODate.timeAgoNoSeconds) ⇒ <code>string</code>~~

<a name="new_ODate_new"></a>

### new ODate(rootElement)

| Param | Type | Description |
| --- | --- | --- |
| rootElement | <code>HTMLElement</code> \| <code>string</code> | The root element or CSS selector to initialise |

<a name="ODate+update"></a>

### oDate.update() ⇒ <code>undefined</code>
Re-render the formatted date within the `time` element.

**Kind**: instance method of [<code>ODate</code>](#ODate)  
<a name="ODate+destroy"></a>

### oDate.destroy() ⇒ <code>undefined</code>
Remove o-date from the `time` element i.e. remove event
listeners and drop references to the element.

**Kind**: instance method of [<code>ODate</code>](#ODate)  
<a name="ODate+_renderDateFor"></a>

### oDate.\_renderDateFor(printer, date) ⇒ <code>undefined</code>
Render the date to the "printer" element in the requested format.

**Kind**: instance method of [<code>ODate</code>](#ODate)  

| Param | Type | Description |
| --- | --- | --- |
| printer | <code>HTMLElement</code> | The element to render the date in |
| date | <code>Date</code> | The date to format |

<a name="ODate.init"></a>

### ODate.init([el]) ⇒ [<code>Array.&lt;ODate&gt;</code>](#ODate) \| [<code>ODate</code>](#ODate)
Initialise the o-date component.

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: [<code>Array.&lt;ODate&gt;</code>](#ODate) \| [<code>ODate</code>](#ODate) - - An o-date instance or array of o-date instances.  

| Param | Type | Description |
| --- | --- | --- |
| [el] | <code>HTMLElement</code> \| <code>string</code> | The root element or CSS selector to initialise |

<a name="ODate.toDate"></a>

### ~~ODate.toDate() ⇒ <code>string</code>~~
***Deprecated***

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: <code>string</code> - - A formatted date or empty string.  
<a name="ODate.format"></a>

### ~~ODate.format() ⇒ <code>string</code>~~
***Deprecated***

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: <code>string</code> - - A formatted date or empty string.  
<a name="ODate.getSecondsBetween"></a>

### ~~ODate.getSecondsBetween() ⇒ <code>string</code>~~
***Deprecated***

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: <code>string</code> - - A formatted date or empty string.  
<a name="ODate.ftTime"></a>

### ~~ODate.ftTime() ⇒ <code>string</code>~~
***Deprecated***

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: <code>string</code> - - A formatted date or empty string.  
<a name="ODate.isNearFuture"></a>

### ~~ODate.isNearFuture() ⇒ <code>string</code>~~
***Deprecated***

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: <code>string</code> - - A formatted date or empty string.  
<a name="ODate.isFarFuture"></a>

### ~~ODate.isFarFuture() ⇒ <code>string</code>~~
***Deprecated***

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: <code>string</code> - - A formatted date or empty string.  
<a name="ODate.isToday"></a>

### ~~ODate.isToday() ⇒ <code>string</code>~~
***Deprecated***

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: <code>string</code> - - A formatted date or empty string.  
<a name="ODate.isYesterday"></a>

### ~~ODate.isYesterday() ⇒ <code>string</code>~~
***Deprecated***

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: <code>string</code> - - A formatted date or empty string.  
<a name="ODate.timeAgo"></a>

### ~~ODate.timeAgo() ⇒ <code>string</code>~~
***Deprecated***

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: <code>string</code> - - A formatted date or empty string.  
<a name="ODate.asTodayOrYesterdayOrNothing"></a>

### ~~ODate.asTodayOrYesterdayOrNothing() ⇒ <code>string</code>~~
***Deprecated***

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: <code>string</code> - - A formatted date or empty string.  
<a name="ODate.timeAgoNoSeconds"></a>

### ~~ODate.timeAgoNoSeconds() ⇒ <code>string</code>~~
***Deprecated***

**Kind**: static method of [<code>ODate</code>](#ODate)  
**Returns**: <code>string</code> - - A formatted date or empty string.  

## Classes

<dl>
<dt><a href="#Delegate">Delegate</a></dt>
<dd></dd>
<dt><a href="#OTable">OTable</a></dt>
<dd></dd>
<dt><a href="#CellFormatter">CellFormatter</a></dt>
<dd><p>Methods to format table cells for sorting.</p>
</dd>
<dt><a href="#TableSorter">TableSorter</a></dt>
<dd><p>Provides methods to sort table instances.</p>
</dd>
<dt><a href="#BaseTable">BaseTable</a></dt>
<dd></dd>
<dt><a href="#BasicTable">BasicTable</a></dt>
<dd></dd>
<dt><a href="#FlatTable">FlatTable</a></dt>
<dd></dd>
<dt><a href="#OverflowTable">OverflowTable</a></dt>
<dd></dd>
<dt><a href="#ScrollTable">ScrollTable</a></dt>
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

## Typedefs

<dl>
<dt><a href="#OTableOptions">OTableOptions</a> : <code>object</code></dt>
<dd><p>Table options.</p>
</dd>
<dt><a href="#formatFunction">formatFunction</a> : <code>function</code></dt>
<dd><p>The custom formatter accepts a table cell and returns a sort value for that cell.
This could be used to define a custom sort order for an unsupported format, such as emoji&#39;s, or a new date format.</p>
</dd>
<dt><a href="#formatFunction">formatFunction</a> ⇒ <code>string</code> | <code>object</code></dt>
<dd><p>The <code>formatFunction</code> take the table cell HTMLElement,
and converts it to a String or Number of sorting.</p>
</dd>
<dt><a href="#BaseTable">BaseTable</a> ⇒ <code><a href="#BaseTable">BaseTable</a></code></dt>
<dd><p>The shared functionality of all <code>o-table</code> variants.</p>
</dd>
<dt><a href="#TableSorter">TableSorter</a> ⇒ <code>void</code></dt>
<dd><p>Sort the given table.</p>
</dd>
<dt><a href="#TableSorter">TableSorter</a> ⇒ <code>void</code></dt>
<dd><p>Sort the given table.</p>
</dd>
<dt><a href="#TableSorter">TableSorter</a> ⇒ <code>void</code></dt>
<dd><p>Sort the given table.</p>
</dd>
<dt><a href="#TableSorter">TableSorter</a> ⇒ <code>void</code></dt>
<dd><p>Sort the given table.</p>
</dd>
<dt><a href="#TableSorter">TableSorter</a> ⇒ <code>void</code></dt>
<dd><p>Sort the given table.</p>
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
<a name="OTable"></a>

## OTable
**Kind**: global class  

* [OTable](#OTable)
    * [new OTable(rootEl, opts)](#new_OTable_new)
    * [.init([el], opts)](#OTable.init) ⇒ <code>Array.&lt;(FlatTable\|ScrollTable\|OverflowTable\|BasicTable)&gt;</code> \| [<code>FlatTable</code>](#FlatTable) \| [<code>ScrollTable</code>](#ScrollTable) \| [<code>OverflowTable</code>](#OverflowTable) \| [<code>BasicTable</code>](#BasicTable)
    * [.setSortFormatterForType(type, formatFunction)](#OTable.setSortFormatterForType)

<a name="new_OTable_new"></a>

### new OTable(rootEl, opts)
Constructs an o-table component.

**Returns**: [<code>FlatTable</code>](#FlatTable) \| [<code>ScrollTable</code>](#ScrollTable) \| [<code>OverflowTable</code>](#OverflowTable) \| [<code>BasicTable</code>](#BasicTable) - - A table instance.  

| Param | Type | Description |
| --- | --- | --- |
| rootEl | <code>HTMLElement</code> | An o-table element. |
| opts | [<code>OTableOptions</code>](#OTableOptions) | A table options object. |

<a name="OTable.init"></a>

### OTable.init([el], opts) ⇒ <code>Array.&lt;(FlatTable\|ScrollTable\|OverflowTable\|BasicTable)&gt;</code> \| [<code>FlatTable</code>](#FlatTable) \| [<code>ScrollTable</code>](#ScrollTable) \| [<code>OverflowTable</code>](#OverflowTable) \| [<code>BasicTable</code>](#BasicTable)
Constructs all o-table components inside the element passed as the first parameter.

**Kind**: static method of [<code>OTable</code>](#OTable)  
**Returns**: <code>Array.&lt;(FlatTable\|ScrollTable\|OverflowTable\|BasicTable)&gt;</code> \| [<code>FlatTable</code>](#FlatTable) \| [<code>ScrollTable</code>](#ScrollTable) \| [<code>OverflowTable</code>](#OverflowTable) \| [<code>BasicTable</code>](#BasicTable) - - A table instance or array of table instances.  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [el] | <code>HTMLElement</code> \| <code>string</code> | <code>document.body</code> | Element where to search for o-table components. You can pass an HTMLElement or a selector string. |
| opts | [<code>OTableOptions</code>](#OTableOptions) |  | A table options object. |

<a name="OTable.setSortFormatterForType"></a>

### OTable.setSortFormatterForType(type, formatFunction)
Set a custom sort formatter for a given data type.

**Kind**: static method of [<code>OTable</code>](#OTable)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The data type to apply the filter function to. |
| formatFunction | [<code>formatFunction</code>](#formatFunction) | The function used to format the cell |

**Example** *(Mapping table cells which contain emojis to a numerical sort value.)*  
```js
	import OTable from 'o-table';
	// Set a filter for custom data type "emoji-time".
	// The return value may be a string or number.
	OTable.setSortFormatterForType('emoji-time', (cell) => {
		const text = cell.textContent.trim();
		if (text === '🌑') {
			return 1;
		}
		if (text === '🌤️️') {
			return 2;
		}
		return 0;
	});
	OTable.init();
```
<a name="CellFormatter"></a>

## CellFormatter
Methods to format table cells for sorting.

**Kind**: global class  
**Access**: public  

* [CellFormatter](#CellFormatter)
    * [.setFormatter(type, formatFunction)](#CellFormatter+setFormatter)
    * [.formatCell(args)](#CellFormatter+formatCell) ⇒ <code>string</code> \| <code>number</code>

<a name="CellFormatter+setFormatter"></a>

### cellFormatter.setFormatter(type, formatFunction)
**Kind**: instance method of [<code>CellFormatter</code>](#CellFormatter)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The data type of the cell to apply the filter function to. |
| formatFunction | [<code>formatFunction</code>](#formatFunction) | The function to take the cell and return a sortable value (string/number). |

**Example**  
```js
mySortFormatter.setFormatter('emoji-time', (cell) => {
		const text = cell.textContent.trim();
		if (text === '🌑') {
			return 1;
		}
		if (text === '🌤️️') {
			return 2;
		}
		return 0;
 });
```
<a name="CellFormatter+formatCell"></a>

### cellFormatter.formatCell(args) ⇒ <code>string</code> \| <code>number</code>
**Kind**: instance method of [<code>CellFormatter</code>](#CellFormatter)  
**Returns**: <code>string</code> \| <code>number</code> - A representation of cell which can be used for sorting.  
**Access**: public  
**See**: [setFormatter](setFormatter) to support add support for a custom type.  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>object</code> | the argument object |
| args.cell | <code>HTMLElement</code> | the td to format |
| args.type | <code>string</code> | The data type of the cell, e.g. date, number, currency. Custom types are supported. |

<a name="TableSorter"></a>

## TableSorter
Provides methods to sort table instances.

**Kind**: global class  

* [TableSorter](#TableSorter)
    * [.sortRowsByColumn(table, columnIndex, sortOrder, batch)](#TableSorter+sortRowsByColumn) ⇒ <code>void</code>
    * [.setCellFormatterForType(type, formatFunction)](#TableSorter+setCellFormatterForType)

<a name="TableSorter+sortRowsByColumn"></a>

### tableSorter.sortRowsByColumn(table, columnIndex, sortOrder, batch) ⇒ <code>void</code>
Sort the given table.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | [<code>BaseTable</code>](#BaseTable) | The table instance to sort. |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>string</code> | How to sort the column, "ascending" or "descending" |
| batch | <code>number</code> | [100] - Deprecated. No longer used. How many rows to render at once when sorting. |

<a name="TableSorter+setCellFormatterForType"></a>

### tableSorter.setCellFormatterForType(type, formatFunction)
Set a custom cell formatter for a given data type.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  
**See**: [CellFormatter~setFormatter](CellFormatter~setFormatter) for `formatFunction` details.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The data type to apply the filter function to. |
| formatFunction | [<code>formatFunction</code>](#formatFunction) | Callback to format a table cell to a sort value. |

<a name="BaseTable"></a>

## BaseTable
**Kind**: global class  
**Access**: public  

* [BaseTable](#BaseTable)
    * [new BaseTable(rootEl, sorter, opts)](#new_BaseTable_new)
    * [._currentSort](#BaseTable+_currentSort)
    * [._currentFilter](#BaseTable+_currentFilter)
    * [._rowsToHide](#BaseTable+_rowsToHide) ⇒ <code>Array.&lt;Node&gt;</code>
    * [.updateRows()](#BaseTable+updateRows) ⇒ <code>void</code>
    * [.renderRowUpdates()](#BaseTable+renderRowUpdates) ⇒ <code>void</code>
    * [._updateTableHeight()](#BaseTable+_updateTableHeight)
    * [._getTableHeight()](#BaseTable+_getTableHeight) ⇒ <code>number</code>
    * [._updateRowAriaHidden()](#BaseTable+_updateRowAriaHidden)
    * [._hideFilteredRows()](#BaseTable+_hideFilteredRows)
    * [._updateRowOrder()](#BaseTable+_updateRowOrder)
    * [.filter(headerIndex, filter)](#BaseTable+filter) ⇒ <code>undefined</code>
    * [.getTableHeader(columnIndex)](#BaseTable+getTableHeader) ⇒ <code>HTMLElement</code>
    * [.sortRowsByColumn(columnIndex, sortOrder)](#BaseTable+sortRowsByColumn) ⇒ <code>undefined</code>
    * [.addSortButtons()](#BaseTable+addSortButtons) ⇒ <code>undefined</code>
    * [.sorted(sortDetails)](#BaseTable+sorted)
    * [.destroy()](#BaseTable+destroy) ⇒ <code>undefined</code>
    * [._ready()](#BaseTable+_ready) ⇒ <code>undefined</code>
    * [._getNextSortOrder(th)](#BaseTable+_getNextSortOrder) ⇒ <code>string</code>
    * [._sortButtonHandler(event)](#BaseTable+_sortButtonHandler) ⇒ <code>undefined</code>
    * [._dispatchEvent(event, data, opts)](#BaseTable+_dispatchEvent) ⇒ <code>boolean</code>

<a name="new_BaseTable_new"></a>

### new BaseTable(rootEl, sorter, opts)
The shared functionality of all `o-table` variants.

**Returns**: [<code>BaseTable</code>](#BaseTable) - the new base table  

| Param | Type | Description |
| --- | --- | --- |
| rootEl | <code>HTMLElement</code> | The `o-table` element. |
| sorter | [<code>TableSorter</code>](#TableSorter) | a TableSorter instance |
| opts | <code>object</code> | [{}] |
| opts.sortable | <code>boolean</code> | [true] |

<a name="BaseTable+_currentSort"></a>

### baseTable.\_currentSort
**Kind**: instance property of [<code>BaseTable</code>](#BaseTable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _currentSort | <code>object</code> \| <code>null</code> | The current sort applied. |
| _currentSort.columnIndex | <code>number</code> | The index of the currently sorted column. |
| _currentSort.sortOrder | <code>string</code> | The type of sort, "ascending" or "descending" |

<a name="BaseTable+_currentFilter"></a>

### baseTable.\_currentFilter
**Kind**: instance property of [<code>BaseTable</code>](#BaseTable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _currentFilter | <code>object</code> \| <code>null</code> | The filter currently applied. |
| _currentFilter.columnIndex | <code>number</code> | The index of the column which is filtered. |
| _currentFilter.filter | <code>string</code> \| <code>function</code> | The filter applied. |

<a name="BaseTable+_rowsToHide"></a>

### baseTable.\_rowsToHide ⇒ <code>Array.&lt;Node&gt;</code>
Which rows are hidden, e.g. by a filter.

**Kind**: instance property of [<code>BaseTable</code>](#BaseTable)  
**Returns**: <code>Array.&lt;Node&gt;</code> - the rows that should be hidden  
<a name="BaseTable+updateRows"></a>

### baseTable.updateRows() ⇒ <code>void</code>
Update the o-table instance with rows added or removed dynamically from
the table. Applies any existing sort and filter to new rows.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+renderRowUpdates"></a>

### baseTable.renderRowUpdates() ⇒ <code>void</code>
Updates the dom to account for row updates, including when their sort
order changes, or any filter is applied. E.g. changes the dom order,
applies aria-labels to hidden rows, updates the table height to
efficiently hide them.

Note this does not calculate which rows should be sorted or filtered,
and does not look for new rows added to the dom. See `updateRows`.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**See**: updateRows  
<a name="BaseTable+_updateTableHeight"></a>

### baseTable.\_updateTableHeight()
Hide filtered rows by updating the container height.
Filtered rows are not removed from the table so column width is not
recalculated. Unfortunately "visibility: collaposed" has inconsistent
support.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+_getTableHeight"></a>

### baseTable.\_getTableHeight() ⇒ <code>number</code>
Get the table height, accounting for "hidden" rows.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Returns**: <code>number</code> - the height in pixels  
<a name="BaseTable+_updateRowAriaHidden"></a>

### baseTable.\_updateRowAriaHidden()
Update the "aria-hidden" attribute of all hidden table rows.
Rows may be hidden for a number of reasons, including being filtered.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+_hideFilteredRows"></a>

### baseTable.\_hideFilteredRows()
Hide filtered rows by updating the "data-o-table-filtered" attribute.
Filtered rows are removed from the table using CSS so column width is
not recalculated.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+_updateRowOrder"></a>

### baseTable.\_updateRowOrder()
Updates the order of table rows in the DOM. This is required upon sort,
but also on filter as hidden rows must be at the bottom of the table.
Otherwise the stripped pattern of the stripped table is not maintained.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+filter"></a>

### baseTable.filter(headerIndex, filter) ⇒ <code>undefined</code>
Filter the table and render the result.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| headerIndex | <code>number</code> | The index of the table column to filter. |
| filter | <code>string</code> \| <code>function</code> | How to filter the column (either a string to match or a callback function). |

<a name="BaseTable+getTableHeader"></a>

### baseTable.getTableHeader(columnIndex) ⇒ <code>HTMLElement</code>
Gets a table header for a given column index.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Returns**: <code>HTMLElement</code> - the table header  
**Throws**:

- When no header is not found.

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| columnIndex | <code>number</code> | The index of the table column to get the header for. |

<a name="BaseTable+sortRowsByColumn"></a>

### baseTable.sortRowsByColumn(columnIndex, sortOrder) ⇒ <code>undefined</code>
Sort the table.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>number</code> | How to sort the column, "ascending" or "descending" |

<a name="BaseTable+addSortButtons"></a>

### baseTable.addSortButtons() ⇒ <code>undefined</code>
Add sort buttons to the DOM within the table header.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+sorted"></a>

### baseTable.sorted(sortDetails)
Indicate that the table has been sorted after intercepting the sorting event.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sortDetails | <code>object</code> | Details of the current sort state. |
| sortDetails.columnIndex | <code>number</code> \| <code>null</code> | The index of the currently sorted column. |
| sortDetails.sortOrder | <code>string</code> \| <code>null</code> | The type of sort, "ascending" or "descending" |

<a name="BaseTable+destroy"></a>

### baseTable.destroy() ⇒ <code>undefined</code>
Gets the instance ready for deletion.
Removes event listeners that were added during instatiation of the component.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Access**: public  
<a name="BaseTable+_ready"></a>

### baseTable.\_ready() ⇒ <code>undefined</code>
Indicate that the table has been constructed successfully.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+_getNextSortOrder"></a>

### baseTable.\_getNextSortOrder(th) ⇒ <code>string</code>
Column sort orders are toggled. For a given column heading, return
the next sort order which should be applied.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Returns**: <code>string</code> - - What the next sort order for the heading should be, 'ascending' or 'descending'.  

| Param | Type | Description |
| --- | --- | --- |
| th | <code>Element</code> | The heading for the column to be sorted. |

<a name="BaseTable+_sortButtonHandler"></a>

### baseTable.\_sortButtonHandler(event) ⇒ <code>undefined</code>
Handles a sort button click event. Toggles column sort.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The click event. |

<a name="BaseTable+_dispatchEvent"></a>

### baseTable.\_dispatchEvent(event, data, opts) ⇒ <code>boolean</code>
Helper function to dispatch namespaced events.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Returns**: <code>boolean</code> - false is cancelable and canceled, otherwise true  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event name within `oTable` e.g. "sorted". |
| data | <code>object</code> | Event data. `instance` is added automatically. |
| opts | <code>object</code> | [Event options](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#Values) (o-table events bubble by default). |

<a name="BasicTable"></a>

## BasicTable
**Kind**: global class  
**Access**: public  
<a name="new_BasicTable_new"></a>

### new BasicTable(rootEl, sorter, opts)
Initialises an `o-table` component without responsive behaviour.

**Returns**: [<code>BasicTable</code>](#BasicTable) - A new table  

| Param | Type | Description |
| --- | --- | --- |
| rootEl | <code>HTMLElement</code> | The `o-table` element. |
| sorter | [<code>TableSorter</code>](#TableSorter) | A TableSorter instance |
| opts | <code>object</code> | [{}] |
| opts.sortable | <code>boolean</code> | [true] |

<a name="FlatTable"></a>

## FlatTable
**Kind**: global class  
**Access**: public  

* [FlatTable](#FlatTable)
    * [new FlatTable(rootEl, sorter, opts)](#new_FlatTable_new)
    * [.updateRows()](#FlatTable+updateRows) ⇒ <code>void</code>

<a name="new_FlatTable_new"></a>

### new FlatTable(rootEl, sorter, opts)
Initialises an `o-table` component with "flat" responsive behaviour.

**Returns**: [<code>FlatTable</code>](#FlatTable) - The new flat table  

| Param | Type | Description |
| --- | --- | --- |
| rootEl | <code>HTMLElement</code> | The `o-table` element. |
| sorter | [<code>TableSorter</code>](#TableSorter) | the TableSorter instance |
| opts | <code>object</code> | [{}] |
| opts.sortable | <code>boolean</code> | [true] |

<a name="FlatTable+updateRows"></a>

### flatTable.updateRows() ⇒ <code>void</code>
Update the o-table instance with rows added dynamically to the table.

**Kind**: instance method of [<code>FlatTable</code>](#FlatTable)  
<a name="OverflowTable"></a>

## OverflowTable
**Kind**: global class  
**Access**: public  

* [OverflowTable](#OverflowTable)
    * [new OverflowTable(rootEl, sorter, opts)](#new_OverflowTable_new)
    * _instance_
        * [._minimumRowCount](#OverflowTable+_minimumRowCount) ⇒ <code>number</code>
        * [._rowsToHide](#OverflowTable+_rowsToHide) ⇒ <code>Array.&lt;Node&gt;</code>
        * [._rowsHiddenByExpander](#OverflowTable+_rowsHiddenByExpander) ⇒ <code>Array.&lt;Node&gt;</code>
        * [._canScrollTable](#OverflowTable+_canScrollTable) ⇒ <code>boolean</code>
        * [._tableTallerThanViewport](#OverflowTable+_tableTallerThanViewport) ⇒ <code>boolean</code>
        * [._canScrollPastTable](#OverflowTable+_canScrollPastTable) ⇒ <code>boolean</code>
        * [._showArrowDock](#OverflowTable+_showArrowDock) ⇒ <code>boolean</code>
        * [._stickyArrows](#OverflowTable+_stickyArrows) ⇒ <code>boolean</code>
        * [.filter(headerIndex, filter)](#OverflowTable+filter) ⇒ <code>undefined</code>
        * [.isExpanded()](#OverflowTable+isExpanded) ⇒ <code>boolean</code>
        * [.isContracted()](#OverflowTable+isContracted) ⇒ <code>boolean</code>
        * [.canExpand()](#OverflowTable+canExpand) ⇒ <code>boolean</code>
        * [.renderRowUpdates()](#OverflowTable+renderRowUpdates) ⇒ <code>undefined</code>
        * [.contractTable()](#OverflowTable+contractTable) ⇒ <code>void</code>
        * [.expandTable()](#OverflowTable+expandTable) ⇒ <code>void</code>
        * [._getTableHeight()](#OverflowTable+_getTableHeight) ⇒ <code>number</code> \| <code>null</code>
        * [._addControlsToDom()](#OverflowTable+_addControlsToDom) ⇒ <code>undefined</code>
        * [._setupScroll()](#OverflowTable+_setupScroll) ⇒ <code>undefined</code>
        * [._setupExpander()](#OverflowTable+_setupExpander) ⇒ <code>undefined</code>
        * [._updateControls()](#OverflowTable+_updateControls) ⇒ <code>undefined</code>
        * [._updateScrollControl(element)](#OverflowTable+_updateScrollControl) ⇒ <code>undefined</code>
    * _static_
        * [._supportsArrows()](#OverflowTable._supportsArrows) ⇒ <code>boolean</code>

<a name="new_OverflowTable_new"></a>

### new OverflowTable(rootEl, sorter, opts)
Initialises an `o-table` component with "overflow" responsive behaviour.

**Returns**: [<code>OverflowTable</code>](#OverflowTable) - - Your new table  

| Param | Type | Description |
| --- | --- | --- |
| rootEl | <code>HTMLElement</code> | The `o-table` element. |
| sorter | [<code>TableSorter</code>](#TableSorter) | a tablesorter instance |
| opts | <code>object</code> | [{}] |
| opts.sortable | <code>boolean</code> | [true] - is the table sortable |
| opts.expanded | <code>undefined</code> \| <code>boolean</code> | is the table expanded |
| opts.minimumRowCount | <code>number</code> | [20] - the fewest number of rows to show |

<a name="OverflowTable+_minimumRowCount"></a>

### overflowTable.\_minimumRowCount ⇒ <code>number</code>
The number of rows to display if the table is collapsed.

**Kind**: instance property of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>number</code> - the number of rows, or 20  
<a name="OverflowTable+_rowsToHide"></a>

### overflowTable.\_rowsToHide ⇒ <code>Array.&lt;Node&gt;</code>
Which rows are hidden, either by a filter or by the expander.

**Kind**: instance property of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>Array.&lt;Node&gt;</code> - the hidden trs  
<a name="OverflowTable+_rowsHiddenByExpander"></a>

### overflowTable.\_rowsHiddenByExpander ⇒ <code>Array.&lt;Node&gt;</code>
The rows which will be hidden if the table is collapsed.

**Kind**: instance property of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>Array.&lt;Node&gt;</code> - the rows that will disappear when collapsing  
<a name="OverflowTable+_canScrollTable"></a>

### overflowTable.\_canScrollTable ⇒ <code>boolean</code>
Check if the table can be scrolled.

**Kind**: instance property of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>boolean</code> - can the table be scrolled?  
<a name="OverflowTable+_tableTallerThanViewport"></a>

### overflowTable.\_tableTallerThanViewport ⇒ <code>boolean</code>
Check if the table can fit within the viewport vertically.

**Kind**: instance property of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>boolean</code> - is the table too big for the viewport?  
<a name="OverflowTable+_canScrollPastTable"></a>

### overflowTable.\_canScrollPastTable ⇒ <code>boolean</code>
Check if the document is long enough to scroll beyond the table enough for sticky arrows to dock at the bottom.
I.e. Scroll past the table by at least 50% of the viewport.

**Kind**: instance property of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>boolean</code> - is the table so big that the viewport can scroll past it by over 50%?  
<a name="OverflowTable+_showArrowDock"></a>

### overflowTable.\_showArrowDock ⇒ <code>boolean</code>
Check if the "dock" at the bottom of the table should be shown.
After scrolling past the table, sticky arrows sit within the dock at the bottom of the table.

**Kind**: instance property of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>boolean</code> - should the dock be shown?  
<a name="OverflowTable+_stickyArrows"></a>

### overflowTable.\_stickyArrows ⇒ <code>boolean</code>
Check if left/right controls should be sticky.

**Kind**: instance property of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>boolean</code> - does the browser support stickiness, and is the table big?  
<a name="OverflowTable+filter"></a>

### overflowTable.filter(headerIndex, filter) ⇒ <code>undefined</code>
Filter the table.

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| headerIndex | <code>number</code> | The index of the table column to filter. |
| filter | <code>string</code> \| <code>function</code> | How to filter the column (either a string to match or a callback function). |

<a name="OverflowTable+isExpanded"></a>

### overflowTable.isExpanded() ⇒ <code>boolean</code>
Check if the table is expanded (true) or collapsed (false).

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>boolean</code> - is the table expanded?  
**Access**: public  
<a name="OverflowTable+isContracted"></a>

### overflowTable.isContracted() ⇒ <code>boolean</code>
Check if the table is collapsed (true) or expanded (false).

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>boolean</code> - is the table contracted?  
**Access**: public  
<a name="OverflowTable+canExpand"></a>

### overflowTable.canExpand() ⇒ <code>boolean</code>
Check if the table supports the expand/contract feature.

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>boolean</code> - can the table expand and contract?  
**Access**: public  
<a name="OverflowTable+renderRowUpdates"></a>

### overflowTable.renderRowUpdates() ⇒ <code>undefined</code>
Updates the dom to account for row updates.

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
<a name="OverflowTable+contractTable"></a>

### overflowTable.contractTable() ⇒ <code>void</code>
Hides table rows if the table can be expanded.

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
**Access**: public  
<a name="OverflowTable+expandTable"></a>

### overflowTable.expandTable() ⇒ <code>void</code>
Expands the table, revealing hidden table rows, if it can be expanded and has been contracted.

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
**Access**: public  
<a name="OverflowTable+_getTableHeight"></a>

### overflowTable.\_getTableHeight() ⇒ <code>number</code> \| <code>null</code>
Get the table height, accounting for "hidden" rows.

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>number</code> \| <code>null</code> - the height  
<a name="OverflowTable+_addControlsToDom"></a>

### overflowTable.\_addControlsToDom() ⇒ <code>undefined</code>
Add controls such as the back, forward, "show more" buttons to DOM,
plus wrappers needed for them to function.

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
<a name="OverflowTable+_setupScroll"></a>

### overflowTable.\_setupScroll() ⇒ <code>undefined</code>
Add functionality to improve the experience when scrolling a table,
such as showing forward/back buttons to indicate that scroll is possible.

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
<a name="OverflowTable+_setupExpander"></a>

### overflowTable.\_setupExpander() ⇒ <code>undefined</code>
Add hide/show functionality for long tables.

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
<a name="OverflowTable+_updateControls"></a>

### overflowTable.\_updateControls() ⇒ <code>undefined</code>
Update all controls and their overlays,
e.g. forward/back arrow visibility, visibility of arrow dock, overlay fade.

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  
<a name="OverflowTable+_updateScrollControl"></a>

### overflowTable.\_updateScrollControl(element) ⇒ <code>undefined</code>
Update the visibility of a scroll forward/back button.

**Kind**: instance method of [<code>OverflowTable</code>](#OverflowTable)  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The button wrapper. |

<a name="OverflowTable._supportsArrows"></a>

### OverflowTable.\_supportsArrows() ⇒ <code>boolean</code>
Check if sticky buttons are supported.

**Kind**: static method of [<code>OverflowTable</code>](#OverflowTable)  
**Returns**: <code>boolean</code> - is stickiness supported by the user's browser?  
<a name="ScrollTable"></a>

## ScrollTable
**Kind**: global class  
**Access**: public  

* [ScrollTable](#ScrollTable)
    * [new ScrollTable(rootEl, sorter, opts)](#new_ScrollTable_new)
    * [.filter(headerIndex, filter)](#ScrollTable+filter) ⇒ <code>undefined</code>
    * [.updateRows()](#ScrollTable+updateRows) ⇒ <code>undefined</code>

<a name="new_ScrollTable_new"></a>

### new ScrollTable(rootEl, sorter, opts)
Initialises an `o-table` component with "scroll" responsive behaviour.

**Returns**: [<code>ScrollTable</code>](#ScrollTable) - - the new ScrollTable instance  

| Param | Type | Description |
| --- | --- | --- |
| rootEl | <code>HTMLElement</code> | The `o-table` element. |
| sorter | [<code>TableSorter</code>](#TableSorter) | the TableSorter instance |
| opts | <code>object</code> | [{}] |
| opts.sortable | <code>boolean</code> | [true] |

<a name="ScrollTable+filter"></a>

### scrollTable.filter(headerIndex, filter) ⇒ <code>undefined</code>
Filter the table.

**Kind**: instance method of [<code>ScrollTable</code>](#ScrollTable)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| headerIndex | <code>number</code> | The index of the table column to filter. |
| filter | <code>string</code> \| <code>function</code> | How to filter the column (either a string to match or a callback function). |

<a name="ScrollTable+updateRows"></a>

### scrollTable.updateRows() ⇒ <code>undefined</code>
Update the o-table instance with rows added dynamically to the table.

**Kind**: instance method of [<code>ScrollTable</code>](#ScrollTable)  
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

<a name="OTableOptions"></a>

## OTableOptions : <code>object</code>
Table options.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sortable | <code>boolean</code> | [true] - Disable the table's sort feature. |
| expanded | <code>undefined</code> \| <code>boolean</code> | [Undefined] - Allow the "OverflowTable" to hide results behind a "show more" button. The table is expanded by default when "true", contracted when "false", or not expandable if not set. |
| minimumRowCount | <code>number</code> | [20] - When the `expanded` option is set, the number of rows to show when the table is not expanded. |

<a name="formatFunction"></a>

## formatFunction : <code>function</code>
The custom formatter accepts a table cell and returns a sort value for that cell.
This could be used to define a custom sort order for an unsupported format, such as emoji's, or a new date format.

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| cell | <code>HTMLElement</code> | 

<a name="formatFunction"></a>

## formatFunction ⇒ <code>string</code> \| <code>object</code>
The `formatFunction` take the table cell HTMLElement,
and converts it to a String or Number of sorting.

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| cell | <code>HTMLElement</code> | 

<a name="BaseTable"></a>

## BaseTable ⇒ [<code>BaseTable</code>](#BaseTable)
The shared functionality of all `o-table` variants.

**Kind**: global typedef  
**Returns**: [<code>BaseTable</code>](#BaseTable) - the new base table  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| rootEl | <code>HTMLElement</code> | The `o-table` element. |
| sorter | [<code>TableSorter</code>](#TableSorter) | a TableSorter instance |
| opts | <code>object</code> | [{}] |
| opts.sortable | <code>boolean</code> | [true] |


* [BaseTable](#BaseTable) ⇒ [<code>BaseTable</code>](#BaseTable)
    * [new BaseTable(rootEl, sorter, opts)](#new_BaseTable_new)
    * [._currentSort](#BaseTable+_currentSort)
    * [._currentFilter](#BaseTable+_currentFilter)
    * [._rowsToHide](#BaseTable+_rowsToHide) ⇒ <code>Array.&lt;Node&gt;</code>
    * [.updateRows()](#BaseTable+updateRows) ⇒ <code>void</code>
    * [.renderRowUpdates()](#BaseTable+renderRowUpdates) ⇒ <code>void</code>
    * [._updateTableHeight()](#BaseTable+_updateTableHeight)
    * [._getTableHeight()](#BaseTable+_getTableHeight) ⇒ <code>number</code>
    * [._updateRowAriaHidden()](#BaseTable+_updateRowAriaHidden)
    * [._hideFilteredRows()](#BaseTable+_hideFilteredRows)
    * [._updateRowOrder()](#BaseTable+_updateRowOrder)
    * [.filter(headerIndex, filter)](#BaseTable+filter) ⇒ <code>undefined</code>
    * [.getTableHeader(columnIndex)](#BaseTable+getTableHeader) ⇒ <code>HTMLElement</code>
    * [.sortRowsByColumn(columnIndex, sortOrder)](#BaseTable+sortRowsByColumn) ⇒ <code>undefined</code>
    * [.addSortButtons()](#BaseTable+addSortButtons) ⇒ <code>undefined</code>
    * [.sorted(sortDetails)](#BaseTable+sorted)
    * [.destroy()](#BaseTable+destroy) ⇒ <code>undefined</code>
    * [._ready()](#BaseTable+_ready) ⇒ <code>undefined</code>
    * [._getNextSortOrder(th)](#BaseTable+_getNextSortOrder) ⇒ <code>string</code>
    * [._sortButtonHandler(event)](#BaseTable+_sortButtonHandler) ⇒ <code>undefined</code>
    * [._dispatchEvent(event, data, opts)](#BaseTable+_dispatchEvent) ⇒ <code>boolean</code>

<a name="new_BaseTable_new"></a>

### new BaseTable(rootEl, sorter, opts)
The shared functionality of all `o-table` variants.

**Returns**: [<code>BaseTable</code>](#BaseTable) - the new base table  

| Param | Type | Description |
| --- | --- | --- |
| rootEl | <code>HTMLElement</code> | The `o-table` element. |
| sorter | [<code>TableSorter</code>](#TableSorter) | a TableSorter instance |
| opts | <code>object</code> | [{}] |
| opts.sortable | <code>boolean</code> | [true] |

<a name="BaseTable+_currentSort"></a>

### baseTable.\_currentSort
**Kind**: instance property of [<code>BaseTable</code>](#BaseTable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _currentSort | <code>object</code> \| <code>null</code> | The current sort applied. |
| _currentSort.columnIndex | <code>number</code> | The index of the currently sorted column. |
| _currentSort.sortOrder | <code>string</code> | The type of sort, "ascending" or "descending" |

<a name="BaseTable+_currentFilter"></a>

### baseTable.\_currentFilter
**Kind**: instance property of [<code>BaseTable</code>](#BaseTable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| _currentFilter | <code>object</code> \| <code>null</code> | The filter currently applied. |
| _currentFilter.columnIndex | <code>number</code> | The index of the column which is filtered. |
| _currentFilter.filter | <code>string</code> \| <code>function</code> | The filter applied. |

<a name="BaseTable+_rowsToHide"></a>

### baseTable.\_rowsToHide ⇒ <code>Array.&lt;Node&gt;</code>
Which rows are hidden, e.g. by a filter.

**Kind**: instance property of [<code>BaseTable</code>](#BaseTable)  
**Returns**: <code>Array.&lt;Node&gt;</code> - the rows that should be hidden  
<a name="BaseTable+updateRows"></a>

### baseTable.updateRows() ⇒ <code>void</code>
Update the o-table instance with rows added or removed dynamically from
the table. Applies any existing sort and filter to new rows.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+renderRowUpdates"></a>

### baseTable.renderRowUpdates() ⇒ <code>void</code>
Updates the dom to account for row updates, including when their sort
order changes, or any filter is applied. E.g. changes the dom order,
applies aria-labels to hidden rows, updates the table height to
efficiently hide them.

Note this does not calculate which rows should be sorted or filtered,
and does not look for new rows added to the dom. See `updateRows`.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**See**: updateRows  
<a name="BaseTable+_updateTableHeight"></a>

### baseTable.\_updateTableHeight()
Hide filtered rows by updating the container height.
Filtered rows are not removed from the table so column width is not
recalculated. Unfortunately "visibility: collaposed" has inconsistent
support.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+_getTableHeight"></a>

### baseTable.\_getTableHeight() ⇒ <code>number</code>
Get the table height, accounting for "hidden" rows.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Returns**: <code>number</code> - the height in pixels  
<a name="BaseTable+_updateRowAriaHidden"></a>

### baseTable.\_updateRowAriaHidden()
Update the "aria-hidden" attribute of all hidden table rows.
Rows may be hidden for a number of reasons, including being filtered.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+_hideFilteredRows"></a>

### baseTable.\_hideFilteredRows()
Hide filtered rows by updating the "data-o-table-filtered" attribute.
Filtered rows are removed from the table using CSS so column width is
not recalculated.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+_updateRowOrder"></a>

### baseTable.\_updateRowOrder()
Updates the order of table rows in the DOM. This is required upon sort,
but also on filter as hidden rows must be at the bottom of the table.
Otherwise the stripped pattern of the stripped table is not maintained.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+filter"></a>

### baseTable.filter(headerIndex, filter) ⇒ <code>undefined</code>
Filter the table and render the result.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| headerIndex | <code>number</code> | The index of the table column to filter. |
| filter | <code>string</code> \| <code>function</code> | How to filter the column (either a string to match or a callback function). |

<a name="BaseTable+getTableHeader"></a>

### baseTable.getTableHeader(columnIndex) ⇒ <code>HTMLElement</code>
Gets a table header for a given column index.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Returns**: <code>HTMLElement</code> - the table header  
**Throws**:

- When no header is not found.

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| columnIndex | <code>number</code> | The index of the table column to get the header for. |

<a name="BaseTable+sortRowsByColumn"></a>

### baseTable.sortRowsByColumn(columnIndex, sortOrder) ⇒ <code>undefined</code>
Sort the table.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>number</code> | How to sort the column, "ascending" or "descending" |

<a name="BaseTable+addSortButtons"></a>

### baseTable.addSortButtons() ⇒ <code>undefined</code>
Add sort buttons to the DOM within the table header.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+sorted"></a>

### baseTable.sorted(sortDetails)
Indicate that the table has been sorted after intercepting the sorting event.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sortDetails | <code>object</code> | Details of the current sort state. |
| sortDetails.columnIndex | <code>number</code> \| <code>null</code> | The index of the currently sorted column. |
| sortDetails.sortOrder | <code>string</code> \| <code>null</code> | The type of sort, "ascending" or "descending" |

<a name="BaseTable+destroy"></a>

### baseTable.destroy() ⇒ <code>undefined</code>
Gets the instance ready for deletion.
Removes event listeners that were added during instatiation of the component.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Access**: public  
<a name="BaseTable+_ready"></a>

### baseTable.\_ready() ⇒ <code>undefined</code>
Indicate that the table has been constructed successfully.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
<a name="BaseTable+_getNextSortOrder"></a>

### baseTable.\_getNextSortOrder(th) ⇒ <code>string</code>
Column sort orders are toggled. For a given column heading, return
the next sort order which should be applied.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Returns**: <code>string</code> - - What the next sort order for the heading should be, 'ascending' or 'descending'.  

| Param | Type | Description |
| --- | --- | --- |
| th | <code>Element</code> | The heading for the column to be sorted. |

<a name="BaseTable+_sortButtonHandler"></a>

### baseTable.\_sortButtonHandler(event) ⇒ <code>undefined</code>
Handles a sort button click event. Toggles column sort.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MouseEvent</code> | The click event. |

<a name="BaseTable+_dispatchEvent"></a>

### baseTable.\_dispatchEvent(event, data, opts) ⇒ <code>boolean</code>
Helper function to dispatch namespaced events.

**Kind**: instance method of [<code>BaseTable</code>](#BaseTable)  
**Returns**: <code>boolean</code> - false is cancelable and canceled, otherwise true  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event name within `oTable` e.g. "sorted". |
| data | <code>object</code> | Event data. `instance` is added automatically. |
| opts | <code>object</code> | [Event options](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#Values) (o-table events bubble by default). |

<a name="TableSorter"></a>

## TableSorter ⇒ <code>void</code>
Sort the given table.

**Kind**: global typedef  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | [<code>BaseTable</code>](#BaseTable) | The table instance to sort. |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>string</code> | How to sort the column, "ascending" or "descending" |
| batch | <code>number</code> | [100] - Deprecated. No longer used. How many rows to render at once when sorting. |


* [TableSorter](#TableSorter) ⇒ <code>void</code>
    * [.sortRowsByColumn(table, columnIndex, sortOrder, batch)](#TableSorter+sortRowsByColumn) ⇒ <code>void</code>
    * [.setCellFormatterForType(type, formatFunction)](#TableSorter+setCellFormatterForType)

<a name="TableSorter+sortRowsByColumn"></a>

### tableSorter.sortRowsByColumn(table, columnIndex, sortOrder, batch) ⇒ <code>void</code>
Sort the given table.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | [<code>BaseTable</code>](#BaseTable) | The table instance to sort. |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>string</code> | How to sort the column, "ascending" or "descending" |
| batch | <code>number</code> | [100] - Deprecated. No longer used. How many rows to render at once when sorting. |

<a name="TableSorter+setCellFormatterForType"></a>

### tableSorter.setCellFormatterForType(type, formatFunction)
Set a custom cell formatter for a given data type.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  
**See**: [CellFormatter~setFormatter](CellFormatter~setFormatter) for `formatFunction` details.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The data type to apply the filter function to. |
| formatFunction | [<code>formatFunction</code>](#formatFunction) | Callback to format a table cell to a sort value. |

<a name="TableSorter"></a>

## TableSorter ⇒ <code>void</code>
Sort the given table.

**Kind**: global typedef  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | [<code>BaseTable</code>](#BaseTable) | The table instance to sort. |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>string</code> | How to sort the column, "ascending" or "descending" |
| batch | <code>number</code> | [100] - Deprecated. No longer used. How many rows to render at once when sorting. |


* [TableSorter](#TableSorter) ⇒ <code>void</code>
    * [.sortRowsByColumn(table, columnIndex, sortOrder, batch)](#TableSorter+sortRowsByColumn) ⇒ <code>void</code>
    * [.setCellFormatterForType(type, formatFunction)](#TableSorter+setCellFormatterForType)

<a name="TableSorter+sortRowsByColumn"></a>

### tableSorter.sortRowsByColumn(table, columnIndex, sortOrder, batch) ⇒ <code>void</code>
Sort the given table.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | [<code>BaseTable</code>](#BaseTable) | The table instance to sort. |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>string</code> | How to sort the column, "ascending" or "descending" |
| batch | <code>number</code> | [100] - Deprecated. No longer used. How many rows to render at once when sorting. |

<a name="TableSorter+setCellFormatterForType"></a>

### tableSorter.setCellFormatterForType(type, formatFunction)
Set a custom cell formatter for a given data type.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  
**See**: [CellFormatter~setFormatter](CellFormatter~setFormatter) for `formatFunction` details.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The data type to apply the filter function to. |
| formatFunction | [<code>formatFunction</code>](#formatFunction) | Callback to format a table cell to a sort value. |

<a name="TableSorter"></a>

## TableSorter ⇒ <code>void</code>
Sort the given table.

**Kind**: global typedef  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | [<code>BaseTable</code>](#BaseTable) | The table instance to sort. |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>string</code> | How to sort the column, "ascending" or "descending" |
| batch | <code>number</code> | [100] - Deprecated. No longer used. How many rows to render at once when sorting. |


* [TableSorter](#TableSorter) ⇒ <code>void</code>
    * [.sortRowsByColumn(table, columnIndex, sortOrder, batch)](#TableSorter+sortRowsByColumn) ⇒ <code>void</code>
    * [.setCellFormatterForType(type, formatFunction)](#TableSorter+setCellFormatterForType)

<a name="TableSorter+sortRowsByColumn"></a>

### tableSorter.sortRowsByColumn(table, columnIndex, sortOrder, batch) ⇒ <code>void</code>
Sort the given table.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | [<code>BaseTable</code>](#BaseTable) | The table instance to sort. |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>string</code> | How to sort the column, "ascending" or "descending" |
| batch | <code>number</code> | [100] - Deprecated. No longer used. How many rows to render at once when sorting. |

<a name="TableSorter+setCellFormatterForType"></a>

### tableSorter.setCellFormatterForType(type, formatFunction)
Set a custom cell formatter for a given data type.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  
**See**: [CellFormatter~setFormatter](CellFormatter~setFormatter) for `formatFunction` details.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The data type to apply the filter function to. |
| formatFunction | [<code>formatFunction</code>](#formatFunction) | Callback to format a table cell to a sort value. |

<a name="TableSorter"></a>

## TableSorter ⇒ <code>void</code>
Sort the given table.

**Kind**: global typedef  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | [<code>BaseTable</code>](#BaseTable) | The table instance to sort. |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>string</code> | How to sort the column, "ascending" or "descending" |
| batch | <code>number</code> | [100] - Deprecated. No longer used. How many rows to render at once when sorting. |


* [TableSorter](#TableSorter) ⇒ <code>void</code>
    * [.sortRowsByColumn(table, columnIndex, sortOrder, batch)](#TableSorter+sortRowsByColumn) ⇒ <code>void</code>
    * [.setCellFormatterForType(type, formatFunction)](#TableSorter+setCellFormatterForType)

<a name="TableSorter+sortRowsByColumn"></a>

### tableSorter.sortRowsByColumn(table, columnIndex, sortOrder, batch) ⇒ <code>void</code>
Sort the given table.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | [<code>BaseTable</code>](#BaseTable) | The table instance to sort. |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>string</code> | How to sort the column, "ascending" or "descending" |
| batch | <code>number</code> | [100] - Deprecated. No longer used. How many rows to render at once when sorting. |

<a name="TableSorter+setCellFormatterForType"></a>

### tableSorter.setCellFormatterForType(type, formatFunction)
Set a custom cell formatter for a given data type.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  
**See**: [CellFormatter~setFormatter](CellFormatter~setFormatter) for `formatFunction` details.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The data type to apply the filter function to. |
| formatFunction | [<code>formatFunction</code>](#formatFunction) | Callback to format a table cell to a sort value. |

<a name="TableSorter"></a>

## TableSorter ⇒ <code>void</code>
Sort the given table.

**Kind**: global typedef  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | [<code>BaseTable</code>](#BaseTable) | The table instance to sort. |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>string</code> | How to sort the column, "ascending" or "descending" |
| batch | <code>number</code> | [100] - Deprecated. No longer used. How many rows to render at once when sorting. |


* [TableSorter](#TableSorter) ⇒ <code>void</code>
    * [.sortRowsByColumn(table, columnIndex, sortOrder, batch)](#TableSorter+sortRowsByColumn) ⇒ <code>void</code>
    * [.setCellFormatterForType(type, formatFunction)](#TableSorter+setCellFormatterForType)

<a name="TableSorter+sortRowsByColumn"></a>

### tableSorter.sortRowsByColumn(table, columnIndex, sortOrder, batch) ⇒ <code>void</code>
Sort the given table.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| table | [<code>BaseTable</code>](#BaseTable) | The table instance to sort. |
| columnIndex | <code>number</code> | The index of the table column to sort. |
| sortOrder | <code>string</code> | How to sort the column, "ascending" or "descending" |
| batch | <code>number</code> | [100] - Deprecated. No longer used. How many rows to render at once when sorting. |

<a name="TableSorter+setCellFormatterForType"></a>

### tableSorter.setCellFormatterForType(type, formatFunction)
Set a custom cell formatter for a given data type.

**Kind**: instance method of [<code>TableSorter</code>](#TableSorter)  
**Access**: public  
**See**: [CellFormatter~setFormatter](CellFormatter~setFormatter) for `formatFunction` details.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The data type to apply the filter function to. |
| formatFunction | [<code>formatFunction</code>](#formatFunction) | Callback to format a table cell to a sort value. |


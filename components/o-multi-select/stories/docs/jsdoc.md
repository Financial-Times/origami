## Classes

<dl>
<dt><a href="#MultiSelect">MultiSelect</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#handleOptionSelect">handleOptionSelect(optionEl, option, index)</a> ⇒ <code>void</code></dt>
<dd><p>adds or removes the selection of a multi-select option in selected list.</p>
</dd>
<dt><a href="#handleCustomEvent">handleCustomEvent(optionEl, option, selected, index)</a> ⇒ <code>void</code></dt>
<dd><p>Dispatches custom event with important details.</p>
</dd>
<dt><a href="#createOption">createOption(idBase, option, index, [selected])</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Creates an option element for a multi-select.</p>
</dd>
<dt><a href="#toggleDropdown">toggleDropdown([open])</a> ⇒ <code>void</code></dt>
<dd><p>Handles opening and closing the dropdown menu for the multi-select component.
When the menu is opened, it sets the display property of the listbox element to &#39;block&#39;.
When the menu is closed, it sets the display property of the listbox element to &#39;none&#39;.
It also updates the &#39;aria-expanded&#39; attribute of the combo box element.</p>
</dd>
<dt><a href="#onComboBoxKeyDown">onComboBoxKeyDown(event)</a> ⇒ <code>void</code></dt>
<dd><p>Handles the &#39;keydown&#39; event for the combobox element of the multi-select component.
If the component is closed, it handles opening the menu if the key pressed is &#39;ArrowDown&#39;, &#39;ArrowUp&#39;, &#39;Enter&#39;, or &#39; &#39;.
If the component is open and &#39;Alt&#39; and &#39;ArrowUp&#39; keys are pressed, it calls &#39;addOptionToList&#39; and then opens the menu.
If any other key is pressed, it updates the active index of the listbox options based on the key pressed.
If the key pressed is &#39;Escape&#39;, it closes the menu.
If the key pressed is &#39;Enter&#39; or &#39; &#39;, it calls &#39;addOptionToList&#39;.
Finally, it calls &#39;updateCurrentElement&#39; to update the active descendant and current listbox option.</p>
</dd>
<dt><a href="#addOptionToList">addOptionToList()</a> ⇒ <code>void</code></dt>
<dd><p>Adds the currently selected listbox option to the selected items list of the multi-select component.</p>
</dd>
<dt><a href="#updateCurrentElement">updateCurrentElement()</a> ⇒ <code>void</code></dt>
<dd><p>Updates the currently active descendant and current listbox option of the multi-select component.</p>
</dd>
<dt><a href="#_removeCurrentClass">_removeCurrentClass(element)</a> ⇒ <code>Array.&lt;HTMLElement&gt;</code></dt>
<dd><p>Removes the &#39;o-multi-select-option__current&#39; class from all listbox options.</p>
</dd>
<dt><a href="#isScrollable">isScrollable(element)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if the element is scrollable.</p>
</dd>
<dt><a href="#maintainScrollVisibility">maintainScrollVisibility(activeElement, scrollParent)</a> ⇒ <code>void</code></dt>
<dd><p>Maintains scroll visibility for an active element.</p>
</dd>
</dl>

<a name="MultiSelect"></a>

## MultiSelect
**Kind**: global class  

* [MultiSelect](#MultiSelect)
    * [new MultiSelect([multiSelectEl])](#new_MultiSelect_new)
    * _instance_
        * [.destroy()](#MultiSelect+destroy) ⇒ <code>void</code>
    * _static_
        * [.init(rootElement, options)](#MultiSelect.init) ⇒ [<code>MultiSelect</code>](#MultiSelect) \| [<code>Array.&lt;MultiSelect&gt;</code>](#MultiSelect)

<a name="new_MultiSelect_new"></a>

### new MultiSelect([multiSelectEl])
Class constructor.


| Param | Type | Description |
| --- | --- | --- |
| [multiSelectEl] | <code>HTMLElement</code> | The component element in the DOM |

<a name="MultiSelect+destroy"></a>

### multiSelect.destroy() ⇒ <code>void</code>
Remove window event listeners.

**Kind**: instance method of [<code>MultiSelect</code>](#MultiSelect)  
<a name="MultiSelect.init"></a>

### MultiSelect.init(rootElement, options) ⇒ [<code>MultiSelect</code>](#MultiSelect) \| [<code>Array.&lt;MultiSelect&gt;</code>](#MultiSelect)
Initialise o-multi-select component/s.

**Kind**: static method of [<code>MultiSelect</code>](#MultiSelect)  
**Returns**: [<code>MultiSelect</code>](#MultiSelect) \| [<code>Array.&lt;MultiSelect&gt;</code>](#MultiSelect) - The newly constructed MultiSelect components  

| Param | Type | Description |
| --- | --- | --- |
| rootElement | <code>HTMLElement</code> \| <code>string</code> | The root element to initialise the component in, or a CSS selector for the root element |
| options | <code>Object</code> | An options object for configuring the component ({multiselectOptions: ['option1', 'option2']}) |

<a name="handleOptionSelect"></a>

## handleOptionSelect(optionEl, option, index) ⇒ <code>void</code>
adds or removes the selection of a multi-select option in selected list.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| optionEl | <code>HTMLElement</code> | The option element that was selected. |
| option | <code>Object</code> | The text content and value of the option. |
| index | <code>number</code> | The index of the option that was selected. |

<a name="handleCustomEvent"></a>

## handleCustomEvent(optionEl, option, selected, index) ⇒ <code>void</code>
Dispatches custom event with important details.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| optionEl | <code>HTMLElement</code> | The option element that was selected. |
| option | <code>Object</code> | The text content and value of the option. |
| selected | <code>boolean</code> | Determines if the element is selected or not. |
| index | <code>number</code> | The index of the option that was selected. |

<a name="createOption"></a>

## createOption(idBase, option, index, [selected]) ⇒ <code>HTMLElement</code>
Creates an option element for a multi-select.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - The newly created option element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| idBase | <code>string</code> |  | The base ID to use for the option element. |
| option | <code>Object</code> |  | The text content and value of the option. |
| index | <code>number</code> |  | The index of the option. |
| [selected] | <code>boolean</code> | <code>false</code> | Whether the option should be selected. |

<a name="toggleDropdown"></a>

## toggleDropdown([open]) ⇒ <code>void</code>
Handles opening and closing the dropdown menu for the multi-select component.
When the menu is opened, it sets the display property of the listbox element to 'block'.
When the menu is closed, it sets the display property of the listbox element to 'none'.
It also updates the 'aria-expanded' attribute of the combo box element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [open] | <code>boolean</code> | If passed, it will force the menu to open or close. |

<a name="onComboBoxKeyDown"></a>

## onComboBoxKeyDown(event) ⇒ <code>void</code>
Handles the 'keydown' event for the combobox element of the multi-select component.
If the component is closed, it handles opening the menu if the key pressed is 'ArrowDown', 'ArrowUp', 'Enter', or ' '.
If the component is open and 'Alt' and 'ArrowUp' keys are pressed, it calls 'addOptionToList' and then opens the menu.
If any other key is pressed, it updates the active index of the listbox options based on the key pressed.
If the key pressed is 'Escape', it closes the menu.
If the key pressed is 'Enter' or ' ', it calls 'addOptionToList'.
Finally, it calls 'updateCurrentElement' to update the active descendant and current listbox option.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>KeyboardEvent</code> | The keyboard event. |

<a name="addOptionToList"></a>

## addOptionToList() ⇒ <code>void</code>
Adds the currently selected listbox option to the selected items list of the multi-select component.

**Kind**: global function  
<a name="updateCurrentElement"></a>

## updateCurrentElement() ⇒ <code>void</code>
Updates the currently active descendant and current listbox option of the multi-select component.

**Kind**: global function  
<a name="_removeCurrentClass"></a>

## \_removeCurrentClass(element) ⇒ <code>Array.&lt;HTMLElement&gt;</code>
Removes the 'o-multi-select-option__current' class from all listbox options.

**Kind**: global function  
**Returns**: <code>Array.&lt;HTMLElement&gt;</code> - - The listbox options.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The multi-select element. |

<a name="isScrollable"></a>

## isScrollable(element) ⇒ <code>boolean</code>
Checks if the element is scrollable.

**Kind**: global function  
**Returns**: <code>boolean</code> - - Whether the element is scrollable.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | The element to check. |

<a name="maintainScrollVisibility"></a>

## maintainScrollVisibility(activeElement, scrollParent) ⇒ <code>void</code>
Maintains scroll visibility for an active element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| activeElement | <code>HTMLElement</code> | element that currently has focus |
| scrollParent | <code>HTMLElement</code> | element that is being scrolled. |


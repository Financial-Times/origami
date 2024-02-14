## Classes

<dl>
<dt><a href="#ErrorSummary">ErrorSummary</a></dt>
<dd></dd>
<dt><a href="#Forms">Forms</a></dt>
<dd></dd>
<dt><a href="#Input">Input</a></dt>
<dd></dd>
<dt><a href="#State">State</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ErrorSummaryElement">ErrorSummaryElement</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#FormsOptions">FormsOptions</a> : <code>Object</code></dt>
<dd><p>An options object for configuring the form.</p>
</dd>
<dt><a href="#FormsSubmitEvent">FormsSubmitEvent</a> : <code>Event</code></dt>
<dd><p>An event emitted when the form is submitted by the userand <code>o-forms</code> has completed validation.</p>
</dd>
<dt><a href="#ErrorSummaryElement">ErrorSummaryElement</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="ErrorSummary"></a>

## ErrorSummary
**Kind**: global class  

* [ErrorSummary](#ErrorSummary)
    * [new ErrorSummary([elements], [headingMessage])](#new_ErrorSummary_new)
    * _instance_
        * [.createSummary()](#ErrorSummary+createSummary) ⇒ <code>HTMLDivElement</code>
    * _static_
        * [.createList(inputs)](#ErrorSummary.createList) ⇒ <code>HTMLUListElement</code>
        * [.createItem([input])](#ErrorSummary.createItem) ⇒ <code>Element</code>
        * [.createAnchor([input])](#ErrorSummary.createAnchor) ⇒ <code>Element</code>

<a name="new_ErrorSummary_new"></a>

### new ErrorSummary([elements], [headingMessage])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [elements] | [<code>Array.&lt;ErrorSummaryElement&gt;</code>](#ErrorSummaryElement) |  | An array of objects, where each object describes an invalid input element |
| [headingMessage] | <code>string</code> | <code>&quot;&#x27;There is a problem&#x27;&quot;</code> | A message to show in the header. It defaults to: 'There is a problem' |

**Example**  
```js
const elementsExample = [
		{
			id: 'text-input',
			valid: false,
			error: 'Please fill out this field',
			label: 'Input Label',
			element: <Element />,
		},
		{...},
	];
	new ErrorSummary(example, 'This is a heading message')
```
<a name="ErrorSummary+createSummary"></a>

### errorSummary.createSummary() ⇒ <code>HTMLDivElement</code>
Generate Node to hold list of invalid inputs

**Kind**: instance method of [<code>ErrorSummary</code>](#ErrorSummary)  
**Returns**: <code>HTMLDivElement</code> - - a div full of error messages  
<a name="ErrorSummary.createList"></a>

### ErrorSummary.createList(inputs) ⇒ <code>HTMLUListElement</code>
Generate list of anchors

**Kind**: static method of [<code>ErrorSummary</code>](#ErrorSummary)  
**Returns**: <code>HTMLUListElement</code> - - the list  

| Param | Type | Description |
| --- | --- | --- |
| inputs | [<code>Array.&lt;ErrorSummaryElement&gt;</code>](#ErrorSummaryElement) | element descriptors |

<a name="ErrorSummary.createItem"></a>

### ErrorSummary.createItem([input]) ⇒ <code>Element</code>
Generate an item for the error summary

**Kind**: static method of [<code>ErrorSummary</code>](#ErrorSummary)  
**Returns**: <code>Element</code> - - li  

| Param | Type | Description |
| --- | --- | --- |
| [input] | <code>object</code> | The input object to construct an error summary item for |

<a name="ErrorSummary.createAnchor"></a>

### ErrorSummary.createAnchor([input]) ⇒ <code>Element</code>
Generate anchor element to point at invalid input

**Kind**: static method of [<code>ErrorSummary</code>](#ErrorSummary)  
**Returns**: <code>Element</code> - - a  

| Param | Type | Description |
| --- | --- | --- |
| [input] | <code>object</code> | The input object to construct an anchor for |

<a name="Forms"></a>

## Forms
**Kind**: global class  

* [Forms](#Forms)
    * [new Forms([formElement], [options])](#new_Forms_new)
    * _instance_
        * [.handleEvent(event)](#Forms+handleEvent) ⇒ <code>void</code>
        * [.validateFormInputs()](#Forms+validateFormInputs) ⇒ [<code>Array.&lt;ErrorSummaryElement&gt;</code>](#ErrorSummaryElement)
        * [.setState(state, name, options)](#Forms+setState)
        * [.destroy()](#Forms+destroy)
    * _static_
        * [.getDataAttributes(formElement)](#Forms.getDataAttributes) ⇒ <code>Object.&lt;string, any&gt;</code>
        * [.init(rootEl, [opts])](#Forms.init) ⇒ [<code>Forms</code>](#Forms) \| [<code>Array.&lt;Forms&gt;</code>](#Forms)

<a name="new_Forms_new"></a>

### new Forms([formElement], [options])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [formElement] | <code>HTMLFormElement</code> |  | The form element in the DOM |
| [options] | [<code>FormsOptions</code>](#FormsOptions) | <code>{}</code> | An options object for configuring the form |

<a name="Forms+handleEvent"></a>

### forms.handleEvent(event) ⇒ <code>void</code>
Event Handler

**Kind**: instance method of [<code>Forms</code>](#Forms)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | The event emitted by element/window interactions |

<a name="Forms+validateFormInputs"></a>

### forms.validateFormInputs() ⇒ [<code>Array.&lt;ErrorSummaryElement&gt;</code>](#ErrorSummaryElement)
Form validation
Validates every element in the form and creates input objects for the error
	summary

**Kind**: instance method of [<code>Forms</code>](#Forms)  
**Returns**: [<code>Array.&lt;ErrorSummaryElement&gt;</code>](#ErrorSummaryElement) - - list of elements for the error summary  
<a name="Forms+setState"></a>

### forms.setState(state, name, options)
**Kind**: instance method of [<code>Forms</code>](#Forms)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | name of the input fields to add state to |
| name | <code>string</code> | type of state to apply — one of 'saving', 'saved', 'none' |
| options | <code>object</code> | an object of options |
| options.iconLabel | <code>string</code> | [null] - customise the label of the state, e.g. the saved state defaults to "Saving" but could be "Sent" |
| options.iconOnly | <code>boolean</code> | [false] - when true display an icon only, hiding the status label |

<a name="Forms+destroy"></a>

### forms.destroy()
Destroy form instance

**Kind**: instance method of [<code>Forms</code>](#Forms)  
<a name="Forms.getDataAttributes"></a>

### Forms.getDataAttributes(formElement) ⇒ <code>Object.&lt;string, any&gt;</code>
Get the data attributes from the formElement. If the form is being set up
declaratively, this method is used to extract the data attributes from the DOM.

**Kind**: static method of [<code>Forms</code>](#Forms)  
**Returns**: <code>Object.&lt;string, any&gt;</code> - - The options  

| Param | Type | Description |
| --- | --- | --- |
| formElement | <code>HTMLElement</code> | The message element in the DOM |

<a name="Forms.init"></a>

### Forms.init(rootEl, [opts]) ⇒ [<code>Forms</code>](#Forms) \| [<code>Array.&lt;Forms&gt;</code>](#Forms)
Initialise form component.

**Kind**: static method of [<code>Forms</code>](#Forms)  
**Returns**: [<code>Forms</code>](#Forms) \| [<code>Array.&lt;Forms&gt;</code>](#Forms) - - The newly instantiated Form or Forms  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rootEl | <code>HTMLElement</code> \| <code>string</code> |  | The root element to intialise a form in, or a CSS selector for the root element |
| [opts] | <code>object</code> | <code>{}</code> | An options object for configuring the banners |

<a name="Input"></a>

## Input
**Kind**: global class  

* [Input](#Input)
    * [new Input([element])](#new_Input_new)
    * [.handleEvent(event)](#Input+handleEvent)
    * [.validate(event)](#Input+validate) ⇒ <code>boolean</code>
    * [._validateDate(event)](#Input+_validateDate) ⇒ <code>boolean</code>

<a name="new_Input_new"></a>

### new Input([element])
Class constructor.


| Param | Type | Description |
| --- | --- | --- |
| [element] | <code>HTMLElement</code> | An input element in the DOM |

<a name="Input+handleEvent"></a>

### input.handleEvent(event)
Event Handler

**Kind**: instance method of [<code>Input</code>](#Input)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | The event emitted by element/window interactions |

<a name="Input+validate"></a>

### input.validate(event) ⇒ <code>boolean</code>
Input validation
Conditions for input validation

**Kind**: instance method of [<code>Input</code>](#Input)  
**Returns**: <code>boolean</code> - - is the input valid?  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>FocusEvent</code> | [] - The event which has caused re-validation. |

<a name="Input+_validateDate"></a>

### input.\_validateDate(event) ⇒ <code>boolean</code>
Date input validation

**Kind**: instance method of [<code>Input</code>](#Input)  
**Returns**: <code>boolean</code> - - is the input valid?  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>FocusEvent</code> | [] - The event which has caused re-validation. |

<a name="State"></a>

## State
**Kind**: global class  

* [State](#State)
    * [new State([inputs], opts)](#new_State_new)
    * [.set(state, label)](#State+set)

<a name="new_State_new"></a>

### new State([inputs], opts)
Class constructor.


| Param | Type | Description |
| --- | --- | --- |
| [inputs] | <code>RadioNodeList</code> | A NodeList of radio input elements |
| opts | <code>boolean</code> \| <code>object</code> | an object of options |
| opts.iconOnly | <code>string</code> | [null] - when true display an icon only, hiding the status label |

<a name="State+set"></a>

### state.set(state, label)
State setter

**Kind**: instance method of [<code>State</code>](#State)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>string</code> | type of state to display |
| label | <code>string</code> | customise the label of the state, e.g. the saved state defaults to "Saving" but could be "Sent" |

<a name="ErrorSummaryElement"></a>

## ErrorSummaryElement : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| element | <code>HTMLInputElement</code> | the associated element |
| id | <code>string</code> | the input element's id |
| valid | <code>boolean</code> | was the user's value valid? |
| [error] | <code>string</code> | the error message for this element |
| [field] | <code>HTMLElement</code> | a containing o-forms-field element |
| label | <code>HTMLLabelElement</code> | an associated label element |

<a name="FormsOptions"></a>

## FormsOptions : <code>Object</code>
An options object for configuring the form.

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [errorSummary] | <code>boolean</code> | <code>true</code> | Display an error summary at the top of the form as part of `o-forms` validation. |
| [preventSubmit] | <code>boolean</code> | <code>false</code> | Prevent form submission after `o-froms` validation – see the `oForms.submit` event to manually submit the form after validation. This does not apply when `useBrowserValidation` is true. |
| [useBrowserValidation] | <code>boolean</code> | <code>false</code> | Do not use `o-forms` validation, rely on the browser's built-in validation instead. |

<a name="FormsSubmitEvent"></a>

## FormsSubmitEvent : <code>Event</code>
An event emitted when the form is submitted by the userand `o-forms` has completed validation.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| detail | <code>object</code> | The event detail. |
| detail.instance | <code>object</code> | The instance of `o-forms`. |
| detail.valid | <code>boolean</code> | The validity of the `o-forms` instance. |

<a name="ErrorSummaryElement"></a>

## ErrorSummaryElement : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| element | <code>HTMLInputElement</code> | the associated element |
| id | <code>string</code> | the input element's id |
| valid | <code>boolean</code> | was the user's value valid? |
| [error] | <code>string</code> | the error message for this element |
| [field] | <code>HTMLElement</code> | a containing o-forms-field element |
| label | <code>HTMLLabelElement</code> | an associated label element |


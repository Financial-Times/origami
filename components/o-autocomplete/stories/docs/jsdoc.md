## Classes

<dl>
<dt><a href="#Autocomplete">Autocomplete</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#mapOptionToSuggestedValue">mapOptionToSuggestedValue(option)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#customSuggestions">customSuggestions(query, populateOptions)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#mapOptionToSuggestedValue">mapOptionToSuggestedValue(option)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#suggestionTemplate">suggestionTemplate(option)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#customSuggestions">customSuggestions(query, populateOptions)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#customSuggestions">customSuggestions(query, populateOptions)</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#highlightSuggestion">highlightSuggestion(suggestion, query)</a> ⇒ <code><a href="#CharacterHighlight">Array.&lt;CharacterHighlight&gt;</a></code></dt>
<dd></dd>
<dt><a href="#createLoadingContainer">createLoadingContainer()</a> ⇒ <code>HTMLDivElement</code></dt>
<dd><p>Create DOM for the loading container.</p>
</dd>
<dt><a href="#showLoadingPane">showLoadingPane(instance)</a> ⇒ <code>void</code></dt>
<dd><p>Show the loading panel</p>
</dd>
<dt><a href="#hideLoadingPane">hideLoadingPane(instance)</a> ⇒ <code>void</code></dt>
<dd><p>Hide the loading panel</p>
</dd>
<dt><a href="#createClearButton">createClearButton(id)</a> ⇒ <code>HTMLButtonElement</code></dt>
<dd><p>Create the DOM tree which corresponds to
<button class="o-autocomplete__clear" type="button" aria-controls=${autocompleteEl.id} title="Clear input">
        <span class="o-autocomplete__visually-hidden">Clear input</span>
</button></p>
</dd>
<dt><a href="#initClearButton">initClearButton(instance)</a> ⇒ <code>void</code></dt>
<dd><p>Attach the clear button and corresponding event listeners to the o-autocomplete instance</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#CustomOption">CustomOption</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#PopulateOptions">PopulateOptions</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#CustomOption">CustomOption</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#PopulateOptions">PopulateOptions</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#PopulateOptions">PopulateOptions</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#PopulateOptions">PopulateOptions</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#CharacterHighlight">CharacterHighlight</a> : <code>Array</code></dt>
<dd></dd>
<dt><a href="#PopulateOptions">PopulateOptions</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#Source">Source</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#MapOptionToSuggestedValue">MapOptionToSuggestedValue</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#onConfirm">onConfirm</a> ⇒ <code>void</code></dt>
<dd></dd>
<dt><a href="#SuggestionTemplate">SuggestionTemplate</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#AutocompleteOptions">AutocompleteOptions</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="Autocomplete"></a>

## Autocomplete
**Kind**: global class  

* [Autocomplete](#Autocomplete)
    * [new Autocomplete([autocompleteEl], [options])](#new_Autocomplete_new)
    * _instance_
        * [.mapOptionToSuggestedValue](#Autocomplete+mapOptionToSuggestedValue) : [<code>MapOptionToSuggestedValue</code>](#MapOptionToSuggestedValue)
        * [.suggestionTemplate(suggestedValue)](#Autocomplete+suggestionTemplate) ⇒ <code>string</code>
    * _static_
        * [.getDataAttributes(autocompleteEl)](#Autocomplete.getDataAttributes) ⇒ <code>object</code>
        * [.init(rootElement, [options])](#Autocomplete.init) ⇒ [<code>Autocomplete</code>](#Autocomplete) \| [<code>Array.&lt;Autocomplete&gt;</code>](#Autocomplete)

<a name="new_Autocomplete_new"></a>

### new Autocomplete([autocompleteEl], [options])
Class constructor.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [autocompleteEl] | <code>HTMLElement</code> |  | The component element in the DOM |
| [options] | [<code>AutocompleteOptions</code>](#AutocompleteOptions) | <code>{}</code> | An options object for configuring the component |

<a name="Autocomplete+mapOptionToSuggestedValue"></a>

### autocomplete.mapOptionToSuggestedValue : [<code>MapOptionToSuggestedValue</code>](#MapOptionToSuggestedValue)
**Kind**: instance property of [<code>Autocomplete</code>](#Autocomplete)  
<a name="Autocomplete+suggestionTemplate"></a>

### autocomplete.suggestionTemplate(suggestedValue) ⇒ <code>string</code>
Used when rendering suggestions, the return value of this will be used as the innerHTML for a single suggestion.

**Kind**: instance method of [<code>Autocomplete</code>](#Autocomplete)  
**Returns**: <code>string</code> - HTML string to be represent a single suggestion.  

| Param | Type | Description |
| --- | --- | --- |
| suggestedValue | <code>string</code> | The suggestion to apply the template with. |

<a name="Autocomplete.getDataAttributes"></a>

### Autocomplete.getDataAttributes(autocompleteEl) ⇒ <code>object</code>
Get the data attributes from the AutocompleteElement. If the element is being set up
declaratively, this method is used to extract the data attributes from the DOM.

**Kind**: static method of [<code>Autocomplete</code>](#Autocomplete)  
**Returns**: <code>object</code> - An options object which can be used for configuring the component  

| Param | Type | Description |
| --- | --- | --- |
| autocompleteEl | <code>HTMLElement</code> | The component element in the DOM |

<a name="Autocomplete.init"></a>

### Autocomplete.init(rootElement, [options]) ⇒ [<code>Autocomplete</code>](#Autocomplete) \| [<code>Array.&lt;Autocomplete&gt;</code>](#Autocomplete)
Initialise o-autocomplete component/s.

**Kind**: static method of [<code>Autocomplete</code>](#Autocomplete)  
**Returns**: [<code>Autocomplete</code>](#Autocomplete) \| [<code>Array.&lt;Autocomplete&gt;</code>](#Autocomplete) - The newly constructed Autocomplete components  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rootElement | <code>HTMLElement</code> \| <code>string</code> |  | The root element to intialise the component in, or a CSS selector for the root element |
| [options] | <code>object</code> | <code>{}</code> | An options object for configuring the component |

<a name="mapOptionToSuggestedValue"></a>

## mapOptionToSuggestedValue(option) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - The string to display in the suggestions dropdown for this option  

| Param | Type | Description |
| --- | --- | --- |
| option | [<code>CustomOption</code>](#CustomOption) | The option to transform into a suggestion string |

<a name="customSuggestions"></a>

## customSuggestions(query, populateOptions) ⇒ <code>void</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | Text which was typed into the autocomplete by the user |
| populateOptions | [<code>PopulateOptions</code>](#PopulateOptions) | Function to call when ready to update the suggestions dropdown |

<a name="mapOptionToSuggestedValue"></a>

## mapOptionToSuggestedValue(option) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - The string to display in the suggestions dropdown for this option  

| Param | Type | Description |
| --- | --- | --- |
| option | [<code>CustomOption</code>](#CustomOption) | The option to transform into a suggestion string |

<a name="suggestionTemplate"></a>

## suggestionTemplate(option) ⇒ <code>string</code>
**Kind**: global function  
**Returns**: <code>string</code> - The string to display in the suggestions dropdown for this option  

| Param | Type | Description |
| --- | --- | --- |
| option | [<code>CustomOption</code>](#CustomOption) | The option to transform into a suggestion string |

<a name="customSuggestions"></a>

## customSuggestions(query, populateOptions) ⇒ <code>void</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | Text which was typed into the autocomplete by the user |
| populateOptions | [<code>PopulateOptions</code>](#PopulateOptions) | Function to call when ready to update the suggestions dropdown |

<a name="customSuggestions"></a>

## customSuggestions(query, populateOptions) ⇒ <code>void</code>
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | Text which was typed into the autocomplete by the user |
| populateOptions | [<code>PopulateOptions</code>](#PopulateOptions) | Function to call when ready to update the suggestions dropdown |

<a name="highlightSuggestion"></a>

## highlightSuggestion(suggestion, query) ⇒ [<code>Array.&lt;CharacterHighlight&gt;</code>](#CharacterHighlight)
**Kind**: global function  
**Returns**: [<code>Array.&lt;CharacterHighlight&gt;</code>](#CharacterHighlight) - An array of arrays which contain two items, the first is the character in the suggestion, the second is a boolean which indicates whether the character should be highlighted.  

| Param | Type | Description |
| --- | --- | --- |
| suggestion | <code>string</code> | Text which is going to be suggested to the user |
| query | <code>string</code> | Text which was typed into the autocomplete by the user |

<a name="createLoadingContainer"></a>

## createLoadingContainer() ⇒ <code>HTMLDivElement</code>
Create DOM for the loading container.

**Kind**: global function  
**Returns**: <code>HTMLDivElement</code> - The loading container.  
<a name="showLoadingPane"></a>

## showLoadingPane(instance) ⇒ <code>void</code>
Show the loading panel

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| instance | [<code>Autocomplete</code>](#Autocomplete) | The autocomplete instance whose loading panel should be shown |

<a name="hideLoadingPane"></a>

## hideLoadingPane(instance) ⇒ <code>void</code>
Hide the loading panel

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| instance | [<code>Autocomplete</code>](#Autocomplete) | The autocomplete instance whose loading panel should be hidden |

<a name="createClearButton"></a>

## createClearButton(id) ⇒ <code>HTMLButtonElement</code>
Create the DOM tree which corresponds to
<button class="o-autocomplete__clear" type="button" aria-controls=${autocompleteEl.id} title="Clear input">
		<span class="o-autocomplete__visually-hidden">Clear input</span>
</button>

**Kind**: global function  
**Returns**: <code>HTMLButtonElement</code> - The clear button DOM tree  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The id of the autocomplete input to associate the clear button with |

<a name="initClearButton"></a>

## initClearButton(instance) ⇒ <code>void</code>
Attach the clear button and corresponding event listeners to the o-autocomplete instance

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| instance | [<code>Autocomplete</code>](#Autocomplete) | The autocomplete instance to setup the clear button for |

<a name="CustomOption"></a>

## CustomOption : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Continent_Code | <code>string</code> | 2 letter continent code |
| Continent_Name | <code>string</code> | name of continent |
| Country_Name | <code>string</code> | name of country |
| Country_Number | <code>number</code> | id of country |
| Three_Letter_Country_Code | <code>string</code> | three letter country code |
| Two_Letter_Country_Code | <code>string</code> | two letter country code |

<a name="PopulateOptions"></a>

## PopulateOptions : <code>function</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>Array.&lt;string&gt;</code> | The options which match the rext which was typed into the autocomplete by the user |

<a name="CustomOption"></a>

## CustomOption : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Continent_Code | <code>string</code> | 2 letter continent code |
| Continent_Name | <code>string</code> | name of continent |
| Country_Name | <code>string</code> | name of country |
| Country_Number | <code>number</code> | id of country |
| Three_Letter_Country_Code | <code>string</code> | three letter country code |
| Two_Letter_Country_Code | <code>string</code> | two letter country code |

<a name="PopulateOptions"></a>

## PopulateOptions : <code>function</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>Array.&lt;string&gt;</code> | The options which match the rext which was typed into the autocomplete by the user |

<a name="PopulateOptions"></a>

## PopulateOptions : <code>function</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>Array.&lt;string&gt;</code> | The options which match the rext which was typed into the autocomplete by the user |

<a name="PopulateOptions"></a>

## PopulateOptions : <code>function</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>Array.&lt;string&gt;</code> | The options which match the rext which was typed into the autocomplete by the user |

<a name="CharacterHighlight"></a>

## CharacterHighlight : <code>Array</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 0 | <code>string</code> | the character in the suggestion |
| 1 | <code>boolean</code> | should it be highlighted? |

<a name="PopulateOptions"></a>

## PopulateOptions ⇒ <code>void</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Array.&lt;\*&gt;</code> | The options which match the rext which was typed into the autocomplete by the user |

<a name="Source"></a>

## Source ⇒ <code>void</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | Text which was typed into the autocomplete by the user |
| populateOptions | [<code>PopulateOptions</code>](#PopulateOptions) | Function to call when ready to update the suggestions dropdown |

<a name="MapOptionToSuggestedValue"></a>

## MapOptionToSuggestedValue ⇒ <code>string</code>
**Kind**: global typedef  
**Returns**: <code>string</code> - The string to display as the suggestions for this option  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>\*</code> | The option to transform into a suggestion string |

<a name="onConfirm"></a>

## onConfirm ⇒ <code>void</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>\*</code> | The option the user selected |

<a name="SuggestionTemplate"></a>

## SuggestionTemplate ⇒ <code>string</code>
**Kind**: global typedef  
**Returns**: <code>string</code> - The html string to render for this suggestion.  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>\*</code> | The option to render |

<a name="AutocompleteOptions"></a>

## AutocompleteOptions : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [defaultValue] | <code>string</code> | Specify a string to prefill the autocomplete with |
| [source] | [<code>Source</code>](#Source) | The function which retrieves the suggestions to display |
| [mapOptionToSuggestedValue] | [<code>MapOptionToSuggestedValue</code>](#MapOptionToSuggestedValue) | Function which transforms a suggestion before rendering. |
| [onConfirm] | [<code>onConfirm</code>](#onConfirm) | Function which is called when the user selects an option |
| [suggestionTemplate] | [<code>SuggestionTemplate</code>](#SuggestionTemplate) | Function to override how a suggestion item is rendered. |
| [autoselect] | <code>boolean</code> | Boolean to specify whether first option in suggestions list is highlighted. |


# o-autocomplete

An Origami component for autocomplete inputs. This is built on top of the excellent [accessible autocomplete component](https://github.com/alphagov/accessible-autocomplete) by AlphaGov.

- [Usage](#usage)
- [Markup](#markup)
    - [For a static set of suggestions](#for-a-static-set-of-suggestions)
    - [For a dynamic set of suggestions](#for-a-dynamic-set-of-suggestions)
    - [Use with o-forms](#use-with-o-forms)
- [Sass](#sass)
- [JavaScript](#javascript)
    - [dynamic suggestions function](#dynamic-suggestions-function)
- [Keyboard Support](#keyboard-support)
    - [When focus is within the text input](#when-focus-is-within-the-text-input)
    - [When focus is within the suggestions menu](#when-focus-is-within-the-suggestions-menu)
    - [When focus is within the clear button](#when-focus-is-within-the-clear-button)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-autocomplete`.

## Markup

### For a static set of suggestions

To provide a static set of suggestions, we recommend using a `select` element. o-autocomplete will progressively enhance the `select` element, using the provided `option` elements as the source for the suggestions.

```html
<label for="my-autocomplete">Select your country</label>
<div data-o-component="o-autocomplete" class="o-autocomplete">
    <select id="my-autocomplete">
        <option value="fr">France</option>
        <option value="de">Germany</option>
        <option value="gb">United Kingdom</option>
    </select>
</div>
```

### For a dynamic set of suggestions

To provide a dynamic set of suggestions, you will need to provide a javascript function or name of a javascript function on the window object which follows the [dynamic-suggestions-function](dynamic-suggestions-function) <abbr title="application programming interface">API</abbr>.

The input element requires an `id` attribute, this is used within the component to implement the accessibility features.
```html
<div data-o-component="o-autocomplete" class="o-autocomplete">
    <input id="my-autocomplete" type="text" >
</div>
```

### Use with o-forms

To have styling for labels, you will need to use [o-forms](https://registry.origami.ft.com/components/o-forms) as part of the autocomplete implementation.

Below is an example of how to combine o-forms and o-autocomplete components together:
```html
<label class="o-forms-field" >
    <span class="o-forms-title">
        <span class="o-forms-title__main">Select your country</span>
    </span>
    <span class="o-forms-input o-forms-input--select">
        <div data-o-component="o-autocomplete" class="o-autocomplete">
            <select id="my-autocomplete">
                <option value=""></option>
                <option>Afghanistan</option>
            </select>
        </div>
    </span>
</label>
```
## Sass

Use `@include oAutocomplete()` to include styles for all `o-autocomplete` features.

```scss
@import "@financial-times/o-autocomplete/main";

@include oAutocomplete();
```

## JavaScript

JavaScript is initialised automatically for [Origami Build Service](https://www.ft.com/__origami/service/build/v3/) users.

If your project is using a manual build process, initialise  `o-autocomplete` manually.
For example call the `init` method to initialise all `o-autocomplete` instances in the document:

```js
import oAutocomplete from 'o-autocomplete';
oAutocomplete.init();
```

Or pass an element to initialise a specific `o-autocomplete` instance:

```js
import oAutocomplete from 'o-autocomplete';
const oAutocompleteElement = document.getElementById('#my-o-autocomplete-element');
new oAutocomplete(oAutocompleteElement);
```

### dynamic suggestions function

#### Example

```js
import oAutocomplete from 'o-autocomplete';

/**
 * @callback PopulateOptions
 * @param {Array<*>} options - The options which match the rext which was typed into the autocomplete by the user
 * @returns {void}
 */
/**
 * @param {string} query - Text which was typed into the autocomplete by the user
 * @param {PopulateOptions} populateOptions - Function to call when ready to update the suggestions dropdown
 * @returns {void}
*/
async function customSuggestions(query, populateOptions) {
	const suggestions = await getSuggestions(query);
	populateOptions(suggestions);
}

const oAutocompleteElement = document.getElementById('#my-o-autocomplete-element');
new oAutocomplete(oAutocompleteElement, {
    source: customSuggestions
});
```

If wanting to supply dynamic suggestions, you will need to provide a function which implements the following <abbr title="application programming interface">API</abbr>:

<a name="customSuggestions"></a>

#### (query, suggestionsCallback) ⇒ <code>void</code>

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | Text which was typed into the text input |
| suggestionsCallback | [<code>suggestionsCallback</code>](#suggestionsCallback) | Function to call when ready to update the suggestions menu |

<a name="suggestionsCallback"></a>

#### suggestionsCallback : <code>function</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>Array.&lt;*&gt;</code> | The options which match the entered query |


### mapOptionToSuggestedValue

This function is used to convert the options returned from the `source` function into strings for the suggestions menu.
If the `source` function is returning an array of strings which are already suitable to be displayed in within the suggestions menu, then there is no need to define a `mapOptionToSuggestedValue` function.

The most common scenario which requires having to define a `mapOptionToSuggestedValue` function is when the `source` function is returning an array of objects, where one of the properties in the object should be used as the suggestion.

#### Example

```js
import oAutocomplete from 'o-autocomplete';

async function customSuggestions(query, populateOptions) {
	const suggestions = await getSuggestions(query);
	populateOptions(suggestions);
}

/**
 * @param {{"suggestionText": string}} option - The option to transform into a suggestion string
 * @returns {string} The string to display as the suggestions for this option
*/
function mapOptionToSuggestedValue(option) {
	return option.suggestionText;
}

const oAutocompleteElement = document.getElementById('#my-o-autocomplete-element');
new oAutocomplete(oAutocompleteElement, {
    mapOptionToSuggestedValue,
    source: customSuggestions,
});
```

<a name="MapOptionToSuggestedValue"></a>

#### MapOptionToSuggestedValue ⇒ <code>string</code>
**Returns**: <code>string</code> - The string to display as the suggestions for this option

| Param | Type | Description |
| --- | --- | --- |
| option | <code>\*</code> | The option to transform into a suggestion string |


## Keyboard Support

### When focus is within the text input

Key|Function
---|---
Down Arrow | If the suggestions menu is displayed, moves focus to the first suggested value in the suggestions menu.
Enter | If the suggestions menu is displayed, does nothing.
Escape | If the suggestions menu is displayed, closes it.

### When focus is within the suggestions menu

Key|Function
---|---
Enter | <ul><li>Sets the text input value to the content of the focused option in the suggestions menu.</li><li>Closes the suggestions menu.</li><li>Sets focus on the text input.</li></ul>
Tab | <ul><li>Sets the text input value to the content of the focused option in the suggestions menu.</li><li>Closes the suggestions menu.</li><li>Sets focus on the clear button.</li></ul>
Space | <ul><li>Sets the text input value to the content of the focused option in the suggestions menu.</li><li>Closes the suggestions menu.</li><li>Sets focus on the text input.</li></ul>
Up Arrow | If focus is on the first option, returns focus to the text input. Otherwise, moves focus to and selects the previous option in the suggestions menu.
Down Arrow | If focus is on the last option, does nothing. Otherwise, moves focus to and selects the next option in the suggestions menu.
Backspace | Returns focus to the text input and deletes the character prior to the cursor
Printable Characters | <ul><li>Moves focus to the text input.</li><li>Types the characters into the text input.</li></ul>

### When focus is within the clear button

Key|Function
---|---
Enter | <ul><li>Moves focus to the text input.</li><li>Removes all the characters within the text input.</li></ul>
Space | <ul><li>Moves focus to the text input.</li><li>Removes all the characters within the text input.</li></ul>


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 1 | 1.0 | N/A |

## Contact
If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-autocomplete/issues), visit [##origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence
This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

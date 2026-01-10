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
  - [mapOptionToSuggestedValue](#mapoptiontosuggestedvalue)
  - [suggestionTemplate](#suggestiontemplate)
  - [onConfirm](#onconfirm)
- [Keyboard Support](#keyboard-support)
  - [When focus is within the text input](#when-focus-is-within-the-text-input)
  - [When focus is within the suggestions menu](#when-focus-is-within-the-suggestions-menu)
  - [When focus is within the clear button](#when-focus-is-within-the-clear-button)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-autocomplete`.

## Markup

### For a static set of suggestions

To provide a static set of suggestions, we recommend using a `select` element. o-autocomplete will progressively enhance the `select` element, using the provided `option` elements as the source for the suggestions.

```html
<label for="my-autocomplete">Select your country</label>
<span data-o-component="o-autocomplete" class="o-autocomplete">
	<select id="my-autocomplete">
		<option value="fr">France</option>
		<option value="de">Germany</option>
		<option value="gb">United Kingdom</option>
	</select>
</span>
```

### For a dynamic set of suggestions

To provide a dynamic set of suggestions, provide a javascript function or name of a javascript function on the window object which follows the [dynamic-suggestions-function](#dynamic-suggestions-function) <abbr title="application programming interface">API</abbr>.

The input element requires an `id` attribute, this is used within the component to implement the accessibility features.

```html
<span data-o-component="o-autocomplete" class="o-autocomplete">
	<input id="my-autocomplete" type="text" />
</span>
```

### Use with o-forms

To have styling for labels, you will need to use [o-forms](https://registry.origami.ft.com/components/o-forms) as part of the autocomplete implementation.

Below is an example of how to combine o-forms and o-autocomplete components together. Note the `label` and `select` element are connected using `for` and `id` attributes.

```html
<span class="o-forms-field">
	<label for="my-autocomplete" class="o-forms-title">
		<span class="o-forms-title__main">Select your country</span>
	</label>
	<span class="o-forms-input o-forms-input--select">
		<span data-o-component="o-autocomplete" class="o-autocomplete">
			<select id="my-autocomplete">
				<option value=""></option>
				<option>Afghanistan</option>
			</select>
		</span>
	</span>
</span>
```

## Sass

Use `@include oAutocomplete()` to include styles for all `o-autocomplete` features.

```scss
@import '@financial-times/o-autocomplete/main';

@include oAutocomplete();
```

## JavaScript

JavaScript is initialised automatically for [Origami Build Service](https://www.ft.com/__origami/service/build/v3/) users.

If your project is using a manual build process, initialise `o-autocomplete` manually.
For example call the `init` method to initialise all `o-autocomplete` instances in the document:

```js
import oAutocomplete from 'o-autocomplete';
oAutocomplete.init();
```

Or pass an element to initialise a specific `o-autocomplete` instance:

```js
import oAutocomplete from 'o-autocomplete';
const oAutocompleteElement = document.getElementById(
	'my-o-autocomplete-element'
);
new oAutocomplete(oAutocompleteElement);
```

### dynamic suggestions function

#### Example

```js
import oAutocomplete from 'o-autocomplete';

/**
 * @callback PopulateOptions
 * @param {Array<*>} options - The options which match the text which was typed into the autocomplete by the user
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

const oAutocompleteElement = document.getElementById(
	'my-o-autocomplete-element'
);
new oAutocomplete(oAutocompleteElement, {
	source: customSuggestions,
});
```

If wanting to supply dynamic suggestions, you will need to provide a function which implements the following <abbr title="application programming interface">API</abbr>:

<a name="customSuggestions"></a>

#### (query, suggestionsCallback) ⇒ <code>void</code>

| Param               | Type                                                     | Description                                                |
| ------------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| query               | <code>string</code>                                      | Text which was typed into the text input                   |
| suggestionsCallback | [<code>suggestionsCallback</code>](#suggestionsCallback) | Function to call when ready to update the suggestions menu |

<a name="suggestionsCallback"></a>

#### suggestionsCallback : <code>function</code>

**Properties**

| Name    | Type                          | Description                               |
| ------- | ----------------------------- | ----------------------------------------- |
| options | <code>Array.&lt;\*&gt;</code> | The options which match the entered query |

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

const oAutocompleteElement = document.getElementById(
	'my-o-autocomplete-element'
);
new oAutocomplete(oAutocompleteElement, {
	mapOptionToSuggestedValue,
	source: customSuggestions,
});
```

<a name="MapOptionToSuggestedValue"></a>

#### MapOptionToSuggestedValue ⇒ <code>string</code>

**Returns**: <code>string</code> - The string to display as the suggestions for this option

| Param  | Type            | Description                                      |
| ------ | --------------- | ------------------------------------------------ |
| option | <code>\*</code> | The option to transform into a suggestion string |

### suggestionTemplate

This function is used to override the default rendering of suggestion items, with a function that returns a custom HTML string for the given option.

It is typically used when wanting to provide additional context or styling for each suggestion item.

The `query` value (text which was typed into the autocomplete text input field by the user) is provided so that it can be used as a basis for highlighting the `option` value (or one of its values if it is an object).

:warning: **Caution:** because this function allows you to output arbitrary HTML, you should [make sure it's trusted](https://en.wikipedia.org/wiki/Cross-site_scripting), and accessible. The HTML will be output within listbox options, so [ensure all descendants are presentational](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/option_role#all_descendants_are_presentational).

#### Example

Providing additional context by displaying multiple `option` properties:

```js
import oAutocomplete from 'o-autocomplete';

async function customSuggestions(query, populateOptions) {
	const suggestions = await getSuggestions(query);
	populateOptions(suggestions);
}

/**
 * @param {{"name": string, "role": string}} option - The option to transform into a suggestion
 * @param {string} [query] - Text which was typed into the autocomplete text input field by the user
 * @returns {string} The HTML to render in the suggestion list*/
function suggestionTemplate(option) {
	return `
		<div>
			<strong>${option.name}</strong>
			<em>${option.role}</em>
		</div>
	`;
}

const oAutocompleteElement = document.getElementById(
	'my-o-autocomplete-element'
);
new oAutocomplete(oAutocompleteElement, {
	suggestionTemplate,
	source: customSuggestions,
});
```

Using the `query` value to apply highlighting to one of the `option` properties:

```js
import oAutocomplete from 'o-autocomplete';

async function customSuggestions(query, populateOptions) {
	const suggestions = await getSuggestions(query);
	populateOptions(suggestions);
}

function highlightSuggestion(suggestion, query) {
	const result = suggestion.split('');

	const matchIndex = suggestion
		.toLocaleLowerCase()
		.indexOf(query.toLocaleLowerCase());
	return result.map(function (character, index) {
		let shouldHighlight = true;
		const hasMatched = matchIndex > -1;
		const characterIsWithinMatch =
			index >= matchIndex && index <= matchIndex + query.length - 1;
		if (hasMatched && characterIsWithinMatch) {
			shouldHighlight = false;
		}
		return [character, shouldHighlight];
	});
}

/**
 * @param {{"name": string, "role": string}} option - The option to transform into a suggestion
 * @param {string} [query] - Text which was typed into the autocomplete text input field by the user
 * @returns {string} The HTML to render in the suggestion list*/
function suggestionTemplate(option, query) {
	const characters = highlightSuggestion(option.name, query || option.name);

	let output = '';
	for (const [character, shoudHighlight] of characters) {
		if (shoudHighlight) {
			output += `<span class="o-autocomplete__option--highlight">${character}</span>`;
		} else {
			output += `${character}`;
		}
	}
	output += ` (${option.role})`;
	const span = document.createElement('span');
	span.setAttribute('aria-label', option.name);
	span.innerHTML = output;
	return span.outerHTML;
}

const oAutocompleteElement = document.getElementById(
	'my-o-autocomplete-element'
);
new oAutocomplete(oAutocompleteElement, {
	suggestionTemplate,
	source: customSuggestions,
});
```

<a name="SuggestionTemplate"></a>

#### SuggestionTemplate ⇒ <code>string</code>

**Returns**: <code>string</code> - The HTML string to render as the suggestion for this option

| Param  | Type                | Description                                                             |
| ------ | ------------------- | ----------------------------------------------------------------------- |
| option | <code>\*</code>     | The option to transform into a suggestion                               |
| query  | <code>string</code> | Text which was typed into the autocomplete text input field by the user |

### onConfirm

This function is called when the user selects an option and is called with the option the user selected.

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

/**
 * @param {{"suggestionText": string}} option - The option the user selected
*/
function onConfirm(option) {
    console.log('You selected option: ', option);
}

const oAutocompleteElement = document.getElementById('my-o-autocomplete-element');
new oAutocomplete(oAutocompleteElement, {
    onConfirm
    mapOptionToSuggestedValue,
    source: customSuggestions,
});
```

<a name="onConfirm"></a>

#### onConfirm ⇒ <code>void</code>

| Param  | Type            | Description                  |
| ------ | --------------- | ---------------------------- |
| option | <code>\*</code> | The option the user selected |

#### `defaultValue` (default: `''`)

Type: `string`

If setting a default input value for a [dynamic set of suggestions](for-a-dynamic-set-of-suggestions) set the `defaultValue` option.

_When progressively enhancing a [static set of suggestions](#for-a-static-set-of-suggestions) set a default value using HTML, by providing an appropriate `option` element._

## Keyboard Support

### When focus is within the text input

| Key        | Function                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| Down Arrow | If the suggestions menu is displayed, moves focus to the first suggested value in the suggestions menu. |
| Enter      | If the suggestions menu is displayed, does nothing.                                                     |
| Escape     | If the suggestions menu is displayed, closes it.                                                        |

### When focus is within the suggestions menu

| Key                  | Function                                                                                                                                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enter                | <ul><li>Sets the text input value to the content of the focused option in the suggestions menu.</li><li>Closes the suggestions menu.</li><li>Sets focus on the text input.</li></ul>   |
| Tab                  | <ul><li>Sets the text input value to the content of the focused option in the suggestions menu.</li><li>Closes the suggestions menu.</li><li>Sets focus on the clear button.</li></ul> |
| Space                | <ul><li>Sets the text input value to the content of the focused option in the suggestions menu.</li><li>Closes the suggestions menu.</li><li>Sets focus on the text input.</li></ul>   |
| Up Arrow             | If focus is on the first option, returns focus to the text input. Otherwise, moves focus to and selects the previous option in the suggestions menu.                                   |
| Down Arrow           | If focus is on the last option, does nothing. Otherwise, moves focus to and selects the next option in the suggestions menu.                                                           |
| Backspace            | Returns focus to the text input and deletes the character prior to the cursor                                                                                                          |
| Printable Characters | <ul><li>Moves focus to the text input.</li><li>Types the characters into the text input.</li></ul>                                                                                     |

### When focus is within the clear button

| Key   | Function                                                                                                   |
| ----- | ---------------------------------------------------------------------------------------------------------- |
| Enter | <ul><li>Moves focus to the text input.</li><li>Removes all the characters within the text input.</li></ul> |
| Space | <ul><li>Moves focus to the text input.</li><li>Removes all the characters within the text input.</li></ul> |

## Migration

|    State     | Major Version | Last Minor Release |                    Migration guide                    |
| :----------: | :-----------: | :----------------: | :---------------------------------------------------: |
| ⚠ maintained |       3       |        n/a         | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ⚠ maintained |       1       |        1.10        |                          N/A                          |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-autocomplete/issues), visit [##origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

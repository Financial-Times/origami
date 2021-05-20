# o-autocomplete

An origami component for autocomplete inputs

- [Usage](#usage)
- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Migration](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-autocomplete`.

## Markup

### For a static set of suggestions

To provide a static set of suggestions, it is recommended to provide the suggestions via a `select` element, o-autocomplete will then progressively enhance the `select` element, using the provided `option` elements as the source for the suggestions.

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
```html
<div data-o-component="o-autocomplete" class="o-autocomplete" id="my-autocomplete"></div>
```

## Sass

Use `@include oAutocomplete()` to include styles for all `o-autocomplete` features.

```scss
@import "@financial-times/o-autocomplete";

@include oAutocomplete();
```

## JavaScript

JavaScript is initialised automatically for [Origami Build Service](https://www.ft.com/__origami/service/build/v3/) users. If your project is using a manual build process, [initialise  `o-autocomplete` manually](https://origami.ft.com/docs/components/initialising/).

For example call the `init` method to initialise all `o-autocomplete` instances in the document:

```js
import oAutocomplete from 'o-autocomplete';
oAutocomplete.init();
```

Or pass an element to initialise a specific `o-autocomplete` instance:

```js
import oAutocomplete from 'o-autocomplete';
const oAutocompleteElement = document.getElementById('#my-o-autocomplete-element');
oAutocomplete.init(oAutocompleteElement);
```

[Learn more about Origami component initialisation](https://origami.ft.com/docs/components/initialising/).

## Keyboard Support

### When focus is within the text input

Key|Function
---|---
Down Arrow | If the results menu is displayed, moves focus to the first suggested value in the results menu.
Enter | Does nothing.
Escape | If the results menu is displayed, closes it.

### When focus is within the results menu

Key|Function
---|---
Enter | <ul><li>Sets the text input value to the content of the focused option in the results menu.</li><li>Closes the results menu.</li><li>Sets focus on the text input.</li></ul>
Tab | <ul><li>Sets the text input value to the content of the focused option in the results menu.</li><li>Closes the results menu.</li><li>Sets focus on the text input.</li></ul>
Space | <ul><li>Sets the text input value to the content of the focused option in the results menu.</li><li>Closes the results menu.</li><li>Sets focus on the text input.</li></ul>
Up Arrow | If focus is on the first option, returns focus to the text input. Otherwise, moves focus to and selects the previous option in the results menu.
Down Arrow | If focus is on the last option, does nothing. Otherwise, moves focus to and selects the next option in the results menu.
Printable Characters | <ul><li>Moves focus to the text input.</li><li>Types the characters into the text input.</li></ul>



## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 1 | 1.0 | N/A |

## Contact
If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-autocomplete/issues), visit [##origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence
This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

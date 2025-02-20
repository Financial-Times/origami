# o-multi-select

An Origami component for selecting multiple options.

- [o-multi-select](#o-multi-select)
  - [Usage](#usage)
  - [Markup](#markup)
    - [Using TSX templates](#using-tsx-templates)
  - [Sass](#sass)
  - [JavaScript](#javascript)
  - [Keyboard Support](#keyboard-support)
    - [When focus is within the combobox input and the suggestions menu is closed](#when-focus-is-within-the-combobox-input-and-the-suggestions-menu-is-closed)
    - [When focus is within the suggestions menu](#when-focus-is-within-the-suggestions-menu)
  - [Migration](#migration)
  - [Contact](#contact)
  - [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-multi-select`.

## Markup

`o-multi-select` expects options to be provided in a `<select>` tag. The component will automatically enhance the experience for users with JavaScript enabled.

The value must not contain whitespace characters, as it should be valid as an [id attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)

```html
<div class="o-multi-select" data-o-component="o-multi-select">
	<select name="multiple" id="fruits" multiple>
		<option value="Apple">Apple</option>
		<option value="Banana">Banana</option>
		<!--More options -->
	</select>
</div>
```

To style form labels, we recommend using [o-forms](https://registry.origami.ft.com/components/o-forms).

Below is an example of how to combine o-forms and o-multi-select components together. Note the `label` and `select` element are connected using `for` and `id` attributes.

```html
<form data-o-component="o-forms">
	<label for="fruits" class="o-forms-field">
		<span class="o-forms-title">
			<span class="o-forms-title__main">Select multiple options</span>
		</span>
	</label>
	<div class="o-forms-input">
		<div class="o-multi-select" data-o-component="o-multi-select">
			<select name="multiple" id="fruits" multiple>
				<option value="Apple">Apple</option>
				<option value="Banana">Banana</option>
				<!--More options -->
			</select>
		</div>
	</div>
</form>
```

### Using TSX templates

If you are using TSX templates we recommend that you also import `GenericInput` and `Form` from `o-forms`. This will style labels and options for your TSX component. And you will also need to initialise component javascript in correct lifecycle of your competent. Bellow is an example for react users.

```jsx
import {Form, GenericInput} from '@financial-times/o-forms/src/tsx/Form';
import {MultiSelect} from '@financial-times/o-multi-select/src/tsx/multi-select';

export const MultiSelectDefault = args => {
	return (
		<Form>
			<GenericInput id={args.id} title={args.title}>
				<MultiSelect {...args} />
			</GenericInput>
		</Form>
	);
};
```

## Sass

Use `@include oMultiSelect()` to include styles for all `o-multi-select` features.

```scss
@import '@financial-times/o-multi-select';

@include oMultiSelect();
```

## JavaScript

JavaScript is initialised automatically for [Origami Build Service](https://www.ft.com/__origami/service/build/v2/) users.

If your project is using a manual build process, [initialise `o-multi-select` manually](https://origami.ft.com/docs/tutorials/manual-build/). For example call the `init` method to initialise all `o-multi-select` instances in the document:

```js
import oMultiSelect from 'o-multi-select';
oMultiSelect.init();
```

Or pass an element to initialise a specific `o-multi-select` instance:

```js
import oMultiSelect from 'o-multi-select';
const oMultiSelectElement = document.getElementById(
	'#my-o-multi-select-element'
);
oMultiSelect.init(oMultiSelectElement);
```

### Events

`o-multi-select` dispatches a custom event `oMultiSelect.OptionChange` that bubbles. It is triggered when an option gets selected or removed. The event data has the following interface:

```js
detail: {
  optionElement: HTMLelement, // The elements that was selected or deselected
  value: string, // Value of selected/deselected option
  selected: boolean, // If element is selected or not
  index: number, // Index of option in the array of options
  instance, // Instance of multiselect element
}
```

## Keyboard Support

### When focus is within the combobox input and the suggestions menu is closed

| Key                                  | Function                                                                                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Enter, Space, Up Arrow or Down Arrow | All these keys will expand the suggestions menu, and focus will be on the first option, or the most recently highlighted option. |

### When focus is within the suggestions menu

| Key        | Function                                                                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Enter      | <ul><li>Selects content of the focused option in the suggestions menu.</li><li>Prevents form submission.</li><li>Creates selected option as button with remove icon.</li></ul> |
| Space      | <ul><li>Selects content of the focused option in the suggestions menu.</li><li>Creates selected option as button with remove icon.</li></ul>                                   |
| Tab        | <ul><li>Closes the suggestions menu.</li><li>Focus moves to next focusable element</li></ul>                                                                                   |
| Up Arrow   | moves focus to the previous option, if one exists. If focus is already on the first option, it will not move.                                                                  |
| Down Arrow | moves focus to the next option, if one exists. If focus is already on the last option, it will not move.                                                                       |
| PageUp     | Jumps visual focus up 10 options (or to first option).                                                                                                                         |
| PageDown   | Jumps visual focus down 10 options (or to last option).                                                                                                                        |
| Home/End   | moves focus to the first or last option.                                                                                                                                       |
| Escape     | <ul><li>Returns focus to the combobox element</li> <li>closes the dropdown without modifying the selected options.</li></ul>                                                   |

## Migration

|    State     | Major Version | Last Minor Release |                    Migration guide                    |
| :----------: | :-----------: | :----------------: | :---------------------------------------------------: |
| ⚠ maintained |       3       |        2.0         | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
| ╳ deprecated |       2       |        2.2         | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated |       1       |        1.0         |                          N/A                          |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/origami/issues/new?labels=o-multi-select,components), visit [#origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

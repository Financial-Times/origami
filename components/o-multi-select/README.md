# @financial-times/o-multi-select

_A short description of what the component does._

- [@financial-times/o-multi-select](#financial-timeso-multi-select)
	- [Usage](#usage)
	- [Behaviour](#behaviour)
	- [Markup](#markup)
		- [Core support](#core-support)
	- [Sass](#sass)
	- [JavaScript](#javascript)
	- [Keyboard Support](#keyboard-support)
		- [When focus is within the combobox input and the suggestions menu is closed](#when-focus-is-within-the-combobox-input-and-the-suggestions-menu-is-closed)
		- [When focus is within the suggestions menu](#when-focus-is-within-the-suggestions-menu)
	- [Migration](#migration)
	- [Contact](#contact)
	- [Licence](#licence)

## Usage

You will need to pass multi select options as data attribute (`data-o-multi-select-options`) or passing it down to init function (`{multiSelectOptions: ['Apple','banana']}`).
Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-components-in-your-project) to get started with `o-multi-select`.

## Behaviour

`o-multi-select` Behaviour description.

## Markup

We use `o-forms` component to apply styles to some parts of multi-select component. This is a custom implementation and markup is very different from native `<select multiselect=true>` element, but using correct aria labels, roles and attributes we can make it accessible and behave like a native `select` element.

```html
<div data-o-component="o-multi-select" class="o-multi-select">
	<!-- Code for Core experience -->
	<div class="o-form o-multi-select o-multi-select--enhanced">
		<span class="o-forms-field">
			<span class="o-forms-title">
				<label
					class="o-forms-title__main"
					for="multiple-enhanced"
					id="o-multi-select-label"
				>
					Multiple select box
				</label>
			</span>
		</span>

		<ul
			class="o-multi-select__selected-options"
			id="o-multi-select-selected"
		></ul>
		<div class="o-multi-select__combobox-wrapper">
			<div
				class="o-multi-select__combobox"
				id="o-multi-select__combobox"
				name="multiple-enhanced"
				role="combobox"
				aria-activedescendant=""
				aria-labelledby="o-multi-select-label o-multi-select-selected"
				aria-haspopup="listbox"
				aria-expanded="false"
				aria-owns="o-multi-select-listbox"
				tabindex="0"
			>
				<span class="o-multi-select__combobox-text">
					Click to select options
				</span>
			</div>
		</div>
		<div
			class="o-multi-select__dropdown-menu"
			id="o-multi-select-listbox"
			role="listbox"
			aria-label="multi select options"
			aria-multiselectable="true"
			tabindex="-1"
		></div>
	</div>
</div>
```

### Core support

To add support for browsers without JavaScript use multi-select element from `o-forms` component with `o-multi-select--core` class. This will help users with screen readers to select multiple options.

```html
<div class="o-multi-select" data-o-component="o-multi-select">
	<div class="o-form o-multi-select o-multi-select--core">
		<span class="o-forms-field">
			<span class="o-forms-title">
				<label class="o-forms-title__main" for="multiple">
					Multiple select box
				</label>
			</span>

			<span class="o-forms-combobox o-forms-combobox--select">
				<select name="multiple" id="multiple" multiple>
					<option value="Apple">Apple</option>
					<option value="Banana">BAnana</option>
					<!-- More options -->
				</select>
			</span>
		</span>
	</div>

	<!-- Code for enhanced experiance -->
</div>
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

## Keyboard Support

### When focus is within the combobox input and the suggestions menu is closed

| Key                                  | Function                                                                                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Enter, Space, Up Arrow or Down Arrow | All these keys will expand the suggestions menu, and focus will be on the first option, or the most recently highlighted option. |

### When focus is within the suggestions menu

| Key        | Function                                                                                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enter      | <ul><li>Selects content of the focused option in the suggestions menu.</li><li>Prevents form submission.</li><li>Creates selected option as button with remove icon.</li></ul> |
| Space      | <ul><li>Selects content of the focused option in the suggestions menu.</li><li>Creates selected option as button with remove icon.</li></ul>                                   |
| Tab        | <ul><li>Closes the suggestions menu.</li><li>Focus moves to next focusable element</li></ul>                                                                                                            |
| Up Arrow   | moves focus to the previous option, if one exists. If focus is already on the first option, it will not move.                                                                                           |
| Down Arrow | moves focus to the next option, if one exists. If focus is already on the last option, it will not move.                                                                                                |
| PageUp     | Jumps visual focus up 10 options (or to first option).                                                                                                                                                  |
| PageDown   | Jumps visual focus down 10 options (or to last option).                                                                                                                                                 |
| Home/End   | moves focus to the first or last option.                                                                                                                                                                |
| Escape     | <ul><li>Returns focus to the combobox element</li> <li>closes the dropdown without modifying the selected options.</li></ul>                                                                               |

## Migration

|   State   | Major Version | Last Minor Release | Migration guide |
| :-------: | :-----------: | :----------------: | :-------------: |
| ✨ active |       1       |        1.0         |       N/A       |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/origami/issues/new?labels=o-multi-select,components), visit [#origami-support](https://financialtimes.slack.com/messages/#origami-support/) or email [origami.support@ft.com](mailto:origami.support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
`;
};

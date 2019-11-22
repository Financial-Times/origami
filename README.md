# o-forms [![CircleCI](https://circleci.com/gh/Financial-Times/o-forms.png?style=shield&circle-token=8d39afee1e3c3b1f586770034db9673b791cb4f8)](https://circleci.com/gh/Financial-Times/o-forms) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

FT-branded styles for form elements.

- [Markup](#markup)
	- [Single input fields](#single-input-fields)
		- [`input[type=text]`](#inputtypetext)
		- [`input[type=password]`](#inputtypepassword)
		- [`textarea`](#textarea)
		- [`select`](#select)
		- [Modifiers](#modifiers)
	- [Multiple input fields](#multiple-input-fields)
		- [`input[type=radio]`](#inputtyperadio)
			- [Round](#round)
			- [Box](#box)
		- [`input[type=checkbox]`](#inputtypecheckbox)
			- [Square](#square)
			- [Toggle](#toggle)
	- [Uncategorised input fields](#uncategorised-input-fields)
		- [Date inputs](#date-inputs)
		- [Pseudo Radio Links](#pseudo-radio-links)
	- [Shared Modifiers](#shared-modifiers)
		- [Field modifiers](#field-modifiers)
		- [Input modifiers](#input-modifiers)
	- [Errors](#errors)
		- [Custom errors](#custom-errors)
		- [Error summary](#error-summary)
- [Sass](#sass)
	- [Options](#options)
	- [Customisation](#customisation)
- [Accessibility](#accessibility)
- [JavaScript](#javascript)
	- [Form Instance](#form-instance)
	- [Individual Inputs](#individual-inputs)
	- [State](#state)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)


## Markup
`o-forms` defines form elements as a combination of 'fields' and 'inputs'. At its core, a field holds the information about an input (such as a label) and the input itself.

Regardless of the input type used, all elements follow the same structure:
```
┌— field container (.o-forms-field) —————┐
|      (one of div or label)             |
|                                        |
|  ┌ title container (.o-forms-title) ┐  |
|  |    (group titles or              |  |
|  |     individual input labels)     |  |
|  └——————————————————————————————————┘  |
|                                        |
|  ┌ input container (.o-forms-input) ┐  |
|  |    (group inputs or              |  |
|  |     individual inputs)           |  |
|  └——————————————————————————————————┘  |
└————————————————————————————————————————┘
```

Bearing that in mind, all form elements are divided into two main categories, with a couple of outliers:
- [single input fields](#single-input-fields)
- [multiple input fields](#multiple-input-fields)
- [uncategorised input fields](#uncategorised-input-fields)

Overall, the same modifiers will work for the structure outlined above.
If a particular form element has a unique modifier, it will be under its markup description.
- [Field modifiers](#field-modifiers)
- [Input modifiers](#input-modifiers)

### Single input fields

`o-forms` consideres a single input field to be a field that has **one** input, like a text input, rather than multiple children, such as radio buttons.

Every single input field requires a root structure that looks like this:
```html
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main"> Label for input here </span>
		<span class="o-forms-title__prompt"> Optional text to describe the input here </span>
	</span>

	<span class="o-forms-input">
		<!-- input element -->
	</span>
</label>
```

`o-forms` provides a different modifier class for each input type, as shown in the examples below:

#### `input[type=text]`
```html
...
	<span class="o-forms-input o-forms-input--text">
		<input type="text"/>
	</span>
...
```

#### `input[type=password]`
```html
...
	<span class="o-forms-input o-forms-input--password">
		<input type="password"/>
	</span>
...
```

Note: For text-like input types where `o-forms` does not provide a specific modifier class, like `type="email"`, the `o-forms-input--text` modifier may be used.

[_See the full markup for text and password input in the registry_](https://registry.origami.ft.com/components/o-forms#text-input)
#### `textarea`
```html
...
	<span class="o-forms-input o-forms-input--textarea">
		<textarea></textarea>
	</span>
...
```
[_See the full markup for text areas in the registry_](https://registry.origami.ft.com/components/o-forms#text-area)
#### `select`
```html
...
	<span class="o-forms-input o-forms-input--select">
		<select>
			<option>Option 1</option>
			<!-- further options -->
		</select>
	</span>
...
```
It is also possible to have a multiple select input by adding the `multiple` attribute	:
```diff
...
	<span class="o-forms-input o-forms-input--select">
-		<select>
+		<select multiple>
			<option>Option 1</option>
			<!-- further options -->
		</select>
	</span>
...
```
[_See the full markup for select inputs in the registry_](https://registry.origami.ft.com/components/o-forms#select)

#### Modifiers
All single input fields accept the following modifiers on the input container:
- `o-forms-input--small`: reduces the height of the input field
- `o-forms-input--suffix`: inlines a sibling element (e.g. a button) with the input
- `o-forms-title--vertical-center`: aligns the title container vertically (most useful when there is no prompt text)
- `o-forms-title--shrink`: shrinks the title container to the width of a shorter title (should be used with `o-forms-field--inline`):
```diff
...
-<div class="o-forms-field">
+<div class="o-forms-field o-forms-field--inline">
-	<span class="o-forms-title">
+	<span class="o-forms-title o-forms-title--shrink">
		<span class="o-forms-title__main"> Label for input here </span>
		<span class="o-forms-title__prompt"> Optional text to describe the input here </span>
	</span>
	...
</div>
```
### Multiple input fields
A multiple input field is considered a field with multiple sibling inputs, e.g. radio buttons.

Every multiple input field requires a root structure that looks like this:
```html
<div class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Group Title</span>
		<span class="o-forms-title__prompt">Group info</span>
	</span>

	<span class="o-forms-input">
		<!-- sibling inputs -->
	</span>
</div>
```

#### `input[type=radio]`
There are two different visual styles available for radio inputs, which we've called 'Round' and 'Box'. They can be output using specific modifier classes:

##### Round
For a regular, round radio button, you'll need the following markup:
```html
...
	<span class="o-forms-input o-forms-input--radio-round">
		<label>
			<input type="radio" name="my-round-radio"/>
			<span class="o-forms-input__label">Radio 1</span>
		</label>
		<label>
			<input type="radio" name="my-round-radio"/>
			<span class="o-forms-input__label">Radio 2</span>
		</label>
	</span>
...
```
[_See the full markup for a round radio button in the registry_](https://registry.origami.ft.com/components/o-forms#radio-round)

##### Box
For a box-like, rectangular radio button, you'll need the following markup:
```html
...
	<span class="o-forms-input o-forms-input--radio-box">
		<div class="o-forms-input--radio-box__container">
			<label>
				<input type="radio" name="my-box-radio"/>
				<span class="o-forms-input__label">Radio 1</span>
			</label>
			<label>
				<input type="radio" name="my-box-radio"/>
				<span class="o-forms-input__label">Radio 2</span>
			</label>
		</div>
	</span>
...
```

This input type also accepts a 'negative' modifier `o-forms-input__label--negative`, which changes the background colour of an input when selected (usually for a negative choice):
```html
<div class="o-forms-field">
	...
	<span class="o-forms-input o-forms-input--radio-box">
		<div class="o-forms-input--radio-box__container">
			<label>
				<input type="radio" name="negative" value="Yes">
				<span class="o-forms-input__label">Yes</span>
			</label>
			<label>
				<input type="radio" name="negative" value="No"checked>
				<span class="o-forms-input__label o-forms-input__label--negative">No</span>
			</label>
		</div>
	</span>
</div>
```

Box style radio buttons may also support saving and saved states. Add a modifier classes `o-forms-input--saving` or `o-forms-input--saved`, and the `o-forms-input__state` element.

_We recommend using the [setState method](#state) instead of adding this markup manually._

```diff
<div class="o-forms-field">
	...
-	<span class="o-forms-input o-forms-input--radio-box">
+	<span class="o-forms-input o-forms-input--radio-box o-forms-input--saving">
		<div class="o-forms-input--radio-box__container">
			<label>
				<input type="radio" name="negative" value="Yes">
				<span class="o-forms-input__label">Yes</span>
			</label>
			<label>
				<input type="radio" name="negative" value="No"checked>
				<span class="o-forms-input__label o-forms-input__label--negative">No</span>
			</label>
		</div>
+		<span class="o-forms-input__state"></span>
	</span>
</div>
```

To show no state label add the `o-forms-input__state--icon-only` modifier class.
```diff
<div class="o-forms-field">
	...
-	<span class="o-forms-input o-forms-input--radio-box">
+	<span class="o-forms-input o-forms-input--radio-box o-forms-input--saving">
		<div class="o-forms-input--radio-box__container">
			<label>
				<input type="radio" name="negative" value="Yes">
				<span class="o-forms-input__label">Yes</span>
			</label>
			<label>
				<input type="radio" name="negative" value="No"checked>
				<span class="o-forms-input__label o-forms-input__label--negative">No</span>
			</label>
		</div>
-		<span class="o-forms-input__state"></span>
+		<span class="o-forms-input__state o-forms-input__state--icon-only"></span>
	</span>
</div>
```

If you would like custom copy for the "saving" or "saved" state put it within the `o-forms-input__state` element, and add the modifier class `o-forms-input__state--custom`. _We recommend setting a custom label using the [setState method](#state) JS method instead of adding this markup manually._

```diff
<div class="o-forms-field">
	...
-	<span class="o-forms-input o-forms-input--radio-box">
+	<span class="o-forms-input o-forms-input--radio-box o-forms-input--saving">
		<div class="o-forms-input--radio-box__container">
			<label>
				<input type="radio" name="negative" value="Yes">
				<span class="o-forms-input__label">Yes</span>
			</label>
			<label>
				<input type="radio" name="negative" value="No"checked>
				<span class="o-forms-input__label o-forms-input__label--negative">No</span>
			</label>
		</div>
-		<span class="o-forms-input__state"></span>
+		<span class="o-forms-input__state o-forms-input__state--custom">
+			Processing
+		</span>
	</span>
</div>
```

[_See the full markup for a box-style radio button in the registry_](https://registry.origami.ft.com/components/o-forms#radio-box)

#### `input[type=checkbox]`
There are two different visual styles available for checkbox inputs, which are a default square checkbox or a toggle checkbox. They can be output using specific modifier classes:

##### Square
For a regular, squared checkbox, you'll need the following markup:
```html
...
	<span class="o-forms-input o-forms-input--checkbox">
		<label>
			<input type="checkbox" name="my-checkbox"/>
			<span class="o-forms-input__label">Checkbox 1</span>
		</label>
		<label>
			<input type="checkbox" name="my-checkbox"/>
			<span class="o-forms-input__label">Checkbox 2</span>
		</label>
	</span>
...
```

To align the checkbox to the **right** of its label, you can add the `o-forms-input__right` class:
```diff
...
<span class="o-forms-input o-forms-input--checkbox">
-		<label>
+		<label class="o-forms-input__right">
			<input type="checkbox" name="my-checkbox"/>
			<span class="o-forms-input__label">Checkbox 1</span>
		</label>
	</span>
...
```

[_See the full markup for regular checkboxes in the registry_](https://registry.origami.ft.com/components/o-forms#checkboxes)

##### Toggle

For a toggle checkbox, you'll need the following markup:
```html
...
	<span class="o-forms-input o-forms-input--toggle">
		<label>
			<input type="checkbox" name="my-toggle"/>
			<span class="o-forms-input__label">Toggle 1</span>
		</label>
		<label>
			<input type="checkbox" name="my-toggle"/>
			<span class="o-forms-input__label">Toggle 2</span>
		</label>
	</span>
...
```

This is currently the only input type that has an inverse state.
For this you'll need to add the `o-forms-field--inverse` to the parent element:

```diff
-<div class="o-forms-field">
+<div class="o-forms-field o-forms-field--inverse">
	<span class="o-forms-title">
		...
	</span>

	<span class="o-forms-input o-forms-input--toggle">
		<!-- toggle inputs -->
	</span>
</div>
```
[_See the full markup for regular checkboxes in the registry_](https://registry.origami.ft.com/components/o-forms#toggle)


### Uncategorised input fields
Date inputs and anchor elements with box-like styling are outliers to the rules above.

#### Date inputs
We do not use `input[type=date]`, but instead combine three `input[type=text]` within the [base structure for a multiple input field](#multiple-input-fields), as shown below:
```html
...
	<span class="o-forms-input o-forms-input--date">
		<label>
			<input type="text" pattern="[0-9]{2}" name="my-date"/>
			<span class="o-forms-input__label">DD</span>
		</label>
		<label>
			<input type="text" pattern="0?[1-9]|1[012]" name="my-date"/>
			<span class="o-forms-input__label">MM</span>
		</label>
		<label>
			<input type="text" pattern="[0-9]{4}" name="my-date"/>
			<span class="o-forms-input__label">YYYY</span>
		</label>
	</span>
...
```
[_See the full markup for date inputs in the registry_](https://registry.origami.ft.com/components/o-forms#date)

#### Pseudo Radio Links
Anchor elements are an entirely separate entity. They _look_ like a form element but do not function as one. They are styled to look like a box-like radio button.

```html
<div class="o-forms-input o-forms-input--pseudo-radio-link">
		<a class="o-forms-input__link o-forms-input__link--current" href="#">Link A</a>
		<a class="o-forms-input__link" href="#">Link B</a>
</div>
```
[_See the full markup for an anchor element in the registry_](https://registry.origami.ft.com/components/o-forms#pseudo-radio-links)


### Shared Modifiers
The markup structure outlined at the [beginning of this section](#markup) indicates containers for a form field that accept modifiers.

#### Field Modifiers
The following modifiers are available for the `o-forms-field` element:
- `o-forms-field--optional`: indicates that a field is optional, and will append `(optional)` to the end of the field's title.
- `o-forms-field--inline`: inlines the title container to the input container

#### Input Modifiers
- `o-forms-input--valid`: identifies a valid input, gets set dynamically on form valdiation
- `o-forms-input--invalid`: identifies an invalid input, gets set dynamically on form valdiation. This requires additional markup to be added as a direct child of the `o-forms-input` element:
```diff
-<span class="o-forms-input">
+<span class="o-forms-input o-forms--invalid">
	<!-- input(s) -->
+	<span class="o-forms-input__error>Error message here</span>
</span>
```
- `o-forms-input--inline`: inlines all inputs with each other (usually only used on multiple input fields).


### Errors

In terms of invalid inputs, `o-forms` has a built in mechanism to display custom errors and an error summary. If neither of these work for your product, you can also choose to use [native browser validation](#form-instance).

#### Custom Errors
In order to provide customised error messages for an invalid input field, you'll need to add the message to the markup. In any of the structures shown in the markup above, the error message will need to live within the input container as a sibling to the input elements:
```html
...
	<span class="o-forms-input">
		<!-- inputs -->
		<span class="o-forms-input__error">This is the error message</span>
	</span>
...
```
The message is hidden by default, until the input field becomes invalid.

#### Error Summary
`o-forms` also generates an error message element when a form is submitted and invalid inputs are recognised.

This feature will collect the custom messages of the invalid fields if they are present in the markup, or will default to the browsers native error message if they aren't. It will associate the message to the title of the input that is invalid, generate a list of links at the top of the form, and focus on the first link.

This markup will always be generated dynamically if the [errorSummary option](#form-instance) is set to `true`.

## Sass
`o-forms` has a primary mixin; `oForms()`.

You can include styles for every input type and feature by calling that mixin:
```scss
@import 'o-forms';
@include oForms();
```

If you would like to be more specific about what aspects of the styles get output, then you'll need to provide the primary mixin with an `$opts` map. For example, in order to output styles for text inputs and checkboxes, and add the ability to inlne them, you would use the following:
```scss
@import 'o-forms';
@include oForms($opts: (
	'elements': ('text', 'checkbox'),
	'features': ('inline')
));
```
### Options
`o-forms` has many options due to its comprehensive nature.
The `$opts` map accepts two lists with the following options:
- `'elements'`:
	- `'checkbox'`
	- `'date'`
	- `'password'`
	- `'pseudo-radio-link'`
	- `'radio-round'`
	- `'radio-box'`
	- `'select'`
	- `'textarea'`
	- `'text'`
	- `'toggle'`
- `'features'`:
	- `'disabled'`
	- `'inline'`
	- `'right'`
	- `'inverse'`
	- `'small'`
	- `'state'`
	- `'suffix'`

_Note 1: `valid` and `invalid` styles are output with the base of `o-forms` so there is no need to include them in the list above._

_Note 2: It's important to remember that not all features will apply to all input types. If there are any features you would like to see added to an input, please [get in touch with the team](#contact)._


### Customisation

There is one public mixin to customise two types of input: [pseudo radio links](#pseudo-radio-links) and [box-styled `input[type=radio]`](#inputttyperadio-box).
It accepts four arguments:
- `$input`: (required) either `'pseudo-radio-link'` or `'radio'`
- `$modifier`: (required) this will name the modifier to add to the input container class list
- `$icons`: (optional) accepts an icon or a list of icons to output according to the custom theme
- `$theme`: (required) a map of the colors that define the custom theme:
	- `'controls-base'`: the base color of the theme
	- `'controls-checked-base'`: the background color of a checked input
	- `'controls-negative-checked-background'`: the background color for a 'negative' checked input

```scss
@include oFormsAddCustom((
	$input: 'radio',
	$modifier: 'my-theme', // outputs the class 'o-forms-input--my-theme',
	$icons: 'burger'
	$theme: (
		controls-base: 'claret',
		controls-checked-base: 'white',
		controls-negative-checked-background: 'claret-30'
	)
));
```

## Accessibility

`o-forms` has been written with a strong focus on accessibility.
We've chosen to override native browser validation and to provide an error summary on form submit (this behaviour relies on JavaScript to run). We [have a more detailed explanation](./ACCESSIBILITY.md) about these topics and writing markup to comply with that accessibility, please read through it to familiarise yourself with some of our reasoning and recommended practices.

## JavaScript

No code will run automatically unless you are using the Build Service. You must either construct an `o-forms` object or fire an `o.DOMContentLoaded` event, which `o-forms` listens for.

The JavaScript for this component is primarily responsible for individual input validation and overall form validation.

If you would like to use an input without a form element, you can still apply validation to it with the `o-forms` [individual `Input` API](#individual-inputs).

### Form Instance

The main `o-forms` JavaScript has been written to identify and run on a `<form>` element. You'll need to set up your form and include the data attribute `data-o-component="o-forms"`:
```html
<form data-o-component="o-forms">
	<!-- form elements as demonstrated in the markup section above  -->
</form>
```

By default, `o-forms` is initialised _without_ native browser validation, and with an error summary for invalid elements when the form is submitted. In order to use the default behaviour, you'll need to do the following:
```js
import oForms from 'o-forms';
oForms.init()
```
The default behaviour can be changed by configuring the options object:
```js
oForms.init(null, {
	useBrowserValidation: true,
	errorSummary: false
})
```
You can also set these values to the data attributes `data-o-forms-use-browser-validation` and `data-o-forms-error-summary` on the `<form>` element if you are not initialising the `oForms` instance in your product.

### Individual Inputs

In the case where a single input is enough for a product but requires validation, you can initialise an `Input` instance:
```js
import Input from 'o-forms/src/js/input';
new Input(myInputEl);
```

### State
`o-forms` offers the ability to display a 'saving' or 'saved' state. However, currently the only input that accepts state is the [box-styled `input[type=radio]`](#inputtyperadio-box). If you would like to apply state to any other input, please [get in touch with the team](#contact).

`o-forms` has no opinion about the timing of the states—it doesn't know when to change from 'saving' to 'saved', but it has a public method `setState` that allows the project to control this.

The `setState` method accepts three arguments: the state, name, and label. State can be one of 'saving', 'saved' or 'none'. 'none' removes any state from the input. The name argument must be the name of the inputs that will be recieving the state. Label is used in the user interface to describe the state. Label is optional and defaults to 'Saving' for the saving state and 'Saved' for the saving state.

```html
<form data-o-component="o-forms">
	...
		<label>
			<span class="o-forms-input__label">Daily</span>
			<input type="radio" name="my-radio-box"/>
		</label>
			<label>
			<span class="o-forms-input__label">Weekly</span>
			<input type="radio" name="my-radio-box"/>
		</label>
	...
</form>
```

```js
import oForms from 'o-forms';
let myForm = oForms.init();
// on event, e.g. click
myForm.setState('saving', 'my-radio-box');
```

To change the saving label pass a third argument, e.g. to update the label from "Saving" to "Sending":

```diff
-myForm.setState('saving', 'my-radio-box');
+myForm.setState('saving', 'my-radio-box', {
+	iconLabel: 'Sending'
+});
```

You also have the option of displaying state as an icon without text. In order to do this, you can call the method above with an extra options argument:

```js
myForm.setState('saving', 'my-radio-box', {
	iconOnly: true
});
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 8 | N/A | [migrate to v8](MIGRATION.md#migrating-from-v7-to-v8) |
⚠ maintained | 7 | 7.1 | [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7) |
╳ deprecated | 6 | 6.0 | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
╳ deprecated | 5 | 5.11 | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.1 | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.5 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.0 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0 | [migrate to v1](MIGRATION.md#migrating-to-v1) |
╳ deprecated | 0 | 0.13 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-forms/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

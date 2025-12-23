# o3-form[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Provides components to construct forms.

- [Overview](#overview)
- [Components](#components)
	- [Form](#form)
		- [Form Field, Form Fieldset and Feedback](#form-field-form-fieldset-and-feedback)
	- [Text Input](#text-input)
		- [Short text input](#short-text-input)
		- [Password Input](#password-input)
	- [Checkbox](#checkbox)
		- [Checkbox Group](#checkbox-group)
	- [Select Input](#select-input)
    - [File Upload](#file-upload)
	- [Date Input](#date-input)
- [Contact](#contact)
- [Licence](#licence)

## Overview

o3-form provides UI form elements with consistent labelling, descriptions, and error styles and interfaces.

## Components

### Form

Form is the top-level component that wraps all form elements. It can be used as plain HTML:

```html

<form class="o3-form">
	<!-- form elements go here -->
</form>
```

Or users can also import JSX components:

```tsx
import {Form} from '@financial-times/o3-form/cjs'; // or esm

<Form>
	<!-- form elements go here -->
</Form>;
```

| Prop       | Description                      | required | Type | Default |
|------------|----------------------------------|----------|------|---------|
| `children` | The form elements to be rendered | true     | any  | -       |

### Form Field, Form Fieldset and Feedback

Form Field components can be complex and contain multiple elements. Form Field and Form Fieldset are containers for form
elements. Shared anatomy of Form Field and Form Fieldset looks like composition of the following elements:

```html

<form>
	<form-field-element>
		<title-label-element>
			Title/Label
		</title-label-element>
		<description-element>
			Description
		</description-element>
		<!-- form elements go here -->
		<feedback-element>
			Feedback
		</feedback-element>
		</form-field>
</form>
```

We are using Title and Label interchangeably. But we export two JSX components from `o3-form` package: `TitledFormField`
and `LabeledFormField`. Both components are similar but `TitledFormField` is used with checkboxes, radio buttons and
use-cases when `<label>` element needs to be part of form element or more flexibility is require. `LabeledFormField` is
used with other text inputs.

The main difference between them is HTML they output. `TitledFormField` outputs:

```html

<div className="o3-form-field">
	<span className="o3-form-field__title" id="{labelId}"> Title </span>
	<!--- Description -->
	{children}
	<!--- Feedback --->
</div>
```

And `LabeledFormField` outputs:

```html

<div className="o3-form-field">
	<label className="o3-form-field__label" htmlFor="{id}"> label </label>
	<!--- Description -->
	{children}
	<!--- Feedback --->
</div>
```

`TitleFormField` expects children to contain both `<input>` and `<label>` elements, which helps us a lot with checkboxes
and radio buttons. `LabeledFormField` expects children to contain only `<input>` element. Two components in JSX can be
used as follows:

```tsx
import {
	Form,
	TitledFormField,
	LabeledFormField,
	CheckBoxItem,
} from '@financial-times/o3-form/cjs'; // or esm

<Form>
	<TitledFormField label="Title for checkbox" description="Description">
		<input type="checkbox" id={inputId} />
		<label htmlFor={inputId}>Checkbox Label</label>
	</TitledFormField>

	<LabeledFormField
		label="Label for text input"
		description="Description"
		inputId={inputId}>
		<input type="text" id={inputId} />
	</LabeledFormField>
</Form>;
```

Form Field and Form Fieldset components have same props:

| Prop          | Description                                                                                        | required | Type   | Default |
|---------------|----------------------------------------------------------------------------------------------------|----------|--------|---------|
| `label`       | The label for the form fieldset                                                                    | true     | string | -       |
| `inputId`     | The id of the form input element                                                                   | false    | string | -       |
| `description` | A description of the form fieldset                                                                 | false    | string | -       |
| `children`    | The form elements to be rendered                                                                   | true     | any    | -       |
| `feedback`    | The feedback object for the form fieldset that contains `message` and `type` of message properties | false    | string | -       |

Form Fieldset is used to group related form elements together such as checkboxes. They can be used as plain HTML:

```html

<form class="o3-form">
	<div class="o3-form-field">
		<fieldset className="o3-form-field" aria-describedby="descriptionId">
			<legend className="o3-form-field__legend ">
				Field group label/title
			</legend>
			<span className="o3-form-input__description" id="descriptionId">
    description of the field group
   </span>
			<!-- form elements go here -->
		</fieldset>
	</div>
</form>
```

Or users can also import JSX components:

```tsx
import {Form, FormFieldset} from '@financial-times/o3-form/cjs'; // or esm

<Form>
	<FormFieldset label="Field group label/title" description="description of the field group">
		<!-- form elements go here -->
	</FormFieldset>
</Form>;
```

| Prop          | Description                                                                                        | required | Type   | Default |
|---------------|----------------------------------------------------------------------------------------------------|----------|--------|---------|
| `label`       | The label for the form fieldset                                                                    | true     | string | -       |
| `description` | A description of the form fieldset                                                                 | false    | string | -       |
| `children`    | The form elements to be rendered                                                                   | true     | any    | -       |
| `feedback`    | The feedback object for the form fieldset that contains `message` and `type` of message properties | false    | string | -       |

### Text Input

A standard text input for collecting text values.
label: 'Full name',
description: 'Your full name as printed on your driving license',

**HTML**

```html

<div data-o3-brand="whitelabel">
	<div class="o3-form-field">
		<label for="my-input-field">Full name</label>
		<span
			class="o3-form-input-description"
		>
      Your full name as printed on your driving license
    </span>
		<input id="my-input-field" class="o3-form o3-form-text-input" type="text" />
	</div>
</div>
```

**JSX**

```tsx
import {TextInput} from '@financial-times/o3-form/cjs'; // or esm

<TextInput
	label="Full name"
	disabled="{false}"
	description="Your full name as printed on your driving license"
/>
```

#### Short text input

The size and max length of the text input can be limited with the `length` property.

**HTML**

```html

<div class="o3-form-field">
	<label for="my-input-field">Security Code</label>
	<span class="o3-form-input-description">
  3 digit security code as printed on the back of your credit card.
 </span>
	<input
		id="my-input-field"
		class="o3-form o3-form-text-input o3-form-text-input--short-3"
		maxlength="3"
		type="text"
	/>
</div>
```

**JSX**

```tsx
import {TextInput} from '@financial-times/o3-form/cjs'; // or esm

<TextInput
	label="Security code"
	description="3 digit security code as printed on the back of your credit card."
	length="{3}"
/>;
```

This will provide a text box 3 characters wide and only allow 3 characters to be typed.

If you prefer to limit the length without styling, use the `maxLength` attribute instead.

**HTML**

```html

<div class="o3-form-field">
	<label for="my-input-field">Security Code</label>
	<span class="o3-form-input-description">
  3 digit security code as printed on the back of your credit card.
 </span>
	<input
		id="my-input-field"
		class="o3-form o3-form-text-input"
		maxlength="3"
		type="text"
	/>
</div>
```

**JSX**

```tsx
import {TextInput} from '@financial-times/o3-form/cjs'; // or esm

<TextInput
	label="Security code"
	description="3 digit security code as printed on the back of your credit card."
	feedback={args.feedback}
	attributes={{
		maxLength: 3,
	}}
/>
```

#### Password Input

A password input for collecting password values. Features a show/hide password toggle and a forgot password link.

**HTML**

```html

<div class="o3-form-field">
	<label
		class="o3-form-field__label"
		for="o3-form-password-input-_5538262633951523"
	>
		Password
	</label>
	<span
		class="o3-form-input__description"
		id="o3-form-description_5812824517374977"
	>
        Your password must be at least 8 characters.
      </span>
	<div class="o3-password-input__container">
		<input
			id="o3-form-password-input-_5538262633951523"
			class="o3-form o3-form-text-input o3-form-text-input--password"
			required=""
			type="password"
			aria-required="true"
		/>
		<button
			id="o3-form-password-toggle"
			class="o3-password-input__show-password-toggle o3-password-input__show-password-toggle--show"
			aria-label="Show password"
			title="Show password"
			aria-pressed="false"
		></button>
	</div>
	<div class="o3-form-feedback o3-form-feedback__undefined">
		<span class="o3-form-feedback__undefined-message"></span>
	</div>
</div>
<div class="o3-password-input__controls">
	<a class="o3-typography-link" href="#">Forgot password?</a>
</div>
```

Be sure to include Javascript to enable the password toggle feature.

```javascript
import PasswordInput from '@financial-times/o3-form/cjs/PasswordInput';

document.addEventListener('DOMContentLoaded', function() {
	const passwordInput = new PasswordInput(
		document.getElementById('o3-form-password-toggle')
	);
});
```

```tsx
import {PasswordInput} from '@financial-times/o3-form';

<Form>
	<PasswordInput
		label="Password"
		description="Your password must be at least 8 characters."
		forgotPasswordLink="#" />
</Form>
```

### Checkbox

A customizable and accessible checkbox input for selecting one or more items from a list, or turning an item on or off.
Checkbox can also have a state of `indeterminate` and `o3-form` provides styling, for `indeterminate` state but this
state can only be set using javaScript. Read more
about [indeterminate state](https://css-tricks.com/indeterminate-checkboxes/).

Checkboxes can be used as plain HTML:

```html

<form class="o3-form">
	<div class="o3-form-field">
  <span class="o3-form-field__title" id="o3-form-label_Demo_ID">
   Check this box
  </span>
		<span class="o3-form-input__description" id="o3-form-description_DEMO_ID">
   Please check the box to continue
  </span>
		<div class="o3-form-input__checkbox">
			<input
				type="checkbox"
				id="checkbox_1"
				class="o3-form-input__checkbox-input o3-visually-hidden"
				required=""
				aria-required="true"
			/>
			<label for="checkbox_1" class="o3-form-input__checkbox-label">
				I agree to the terms and conditions
			</label>
		</div>
	</div>
</form>
```

Or users can also import JSX components:

```tsx
import {CheckBox, TitledFormField} from '@financial-times/o3-form/cjs'; // or esm

<TitledFormField>
	<CheckBox
		inputId="terms"
		checkboxLabel="I agree to the terms and conditions"
		optional={false}
	/>
	;
</TitledFormField>;
```

| Prop            | Description                                                                                   | required | Type    | Default |
|-----------------|-----------------------------------------------------------------------------------------------|----------|---------|---------|
| `inputId`       | The id of the checkbox input                                                                  | true     | string  | -       |
| `checkboxLabel` | The label for the checkbox                                                                    | true     | string  | -       |
| `feedback`      | The feedback object for the checkbox that contains `message` and `type` of message properties | false    | string  | -       |
| `optional`      | Whether the checkbox is optional                                                              | false    | boolean | -       |
| `label`         | The title for the checkbox                                                                    | false    | string  | -       |
| `description`   | A description of the checkbox                                                                 | false    | string  | -       |

#### Checkbox Group

For multiple related checkboxes, use the CheckBoxGroup component:

```html

<form class="o3-form">
	<fieldset
		class="o3-form-field"
		aria-describedby="o3-form-Interest-description"
	>
		<legend class="o3-form-field__legend">Select your interests</legend>
		<span class="o3-form-input__description" id="o3-form-Interest-description2">
   Choose all interests that apply
  </span>
		<div class="o3-form-input__checkbox">
			<input
				type="checkbox"
				id="interest-tech"
				class="o3-form-input__checkbox-input o3-visually-hidden"
			/>
			<label for="interest-tech" class="o3-form-input__checkbox-label">
				Technology
			</label>
		</div>
		<div class="o3-form-input__checkbox">
			<input
				type="checkbox"
				id="interest-finance"
				class="o3-form-input__checkbox-input o3-visually-hidden"
			/>
			<label for="interest-finance" class="o3-form-input__checkbox-label">
				Finance
			</label>
		</div>
		<div class="o3-form-input__checkbox">
			<input
				type="checkbox"
				id="interest-sports"
				class="o3-form-input__checkbox-input o3-visually-hidden"
			/>
			<label for="interest-sports" class="o3-form-input__checkbox-label">
				Sports
			</label>
		</div>
	</fieldset>
</form>
```

```tsx
import {CheckBoxGroup, CheckBoxItem} from '@financial-times/o3-form/cjs'; // or esm

<CheckBoxGroup
	label="Select your interests"
	description="Choose all that apply">
	<CheckBoxItem inputId="interest-tech" checkboxLabel="Technology" />
	<CheckBoxItem inputId="interest-finance" checkboxLabel="Finance" />
	<CheckBoxItem inputId="interest-sports" checkboxLabel="Sports" />
</CheckBoxGroup>;
```

| Attribute     | Description                              | Type       | Default |
|---------------|------------------------------------------|------------|---------|
| `label`       | The label for the group of checkboxes    | string     |         |
| `description` | A description of the group of checkboxes | string     |         |
| `children`    | The checkboxes to be rendered            | CheckBox[] |         |

### Select Input

A dropdown select input for choosing one option from a list.

**HTML**

```html

<div class="o3-form-field">
	<label
		class="o3-form-field__label"
		for="o3-form-select-input-_3564083419195512"
	>
		Card type
	</label>
	<span
		class="o3-form-input__description"
		id="o3-form-description_14471165011746046"
	>
        Printed on the front side of your payment card.
      </span>
	<div class="o3-form-select-input__container">
		<select
			id="o3-form-select-input-_3564083419195512"
			class="o3-form o3-form-select-input"
			required=""
			aria-required="true"
			maxlength="0"
			type="select"
		>
			<option value="American Express">American Express</option>
			<option value="Visa Debit">Visa Debit</option>
			<option value="Visa Credit">Visa Credit</option>
			<option value="Mastercard Debit">Mastercard Debit</option>
			<option value="Mastercard Credit">Mastercard Credit</option>
		</select>
	</div>
	<div class="o3-form-feedback o3-form-feedback__undefined">
		<span class="o3-form-feedback__undefined-message"></span>
	</div>
</div>
```

**TSX**

```tsx
import {SelectInput} from '@financial-times/o3-form';

<SelectInput
	label="Card type"
	description="Printed on the front side of your payment card."
>
	<option value="American Express">American Express</option>
	<option value="Visa Debit">Visa Debit</option>
	<option value="Visa Credit">Visa Credit</option>
	<option value="Mastercard Debit">Mastercard Debit</option>
	<option value="Mastercard Credit">Mastercard Credit</option>
</SelectInput>
```

### File Input

Use to provide an interface for users to upload files.

**TSX**
```tsx
import {FileInput} from '@financial-times/o3-form';

<FileInputTsx
	label="Driving license"
	description="Photograph of the front side of your driving license" />
```

**HTML**

```html

<div class="o3-form-field">
	<label
		class="o3-form-field__label"
		htmlFor="o3-form-file-input"
	>
		Driving license
	</label>
	<span
		class="o3-form-input__description"
		id="o3-form-description"
	>
        			The front face of your driving license
      			</span>
	<div class="o3-form-file-input" id="file-input-container">
		<label
			htmlFor="file-input"
			class="o3-form-file-input__label"
			tabIndex="0"
		>
				<span
					class="o3-form-file-input__label__button o3-button o3-button--primary o3-button-icon o3-button-icon--upload">File Upload</span>
			<span data-testid="file-input-label" class="o3-form-file-input__label__text">No file chosen</span>
			<input
				data-testid="file-input"
				id="file-input"
				className="o3-form-file-input__input-field"
				required
				aria-required="true"
				type="file"
			/>
		</label>
	</div>
</div>
```
Be sure to enable javascript to make use of delete button and uploading status:

```js
	const fileUploadElement = canvasElement.querySelector('#file-input');

	if (fileUploadElement) {
		new FileUploadController(fileUploadElement)
	}

	// Use event listeners to control the state of loading
	fileUploadElement.dispatchEvent('o3Form.uploading.start');

	// Remove uploading indicator
	fileUploadElement.dispatchEvent('o3Form.uploading.complete');
```


#### Short Text Input

Select input supports width control for shorter inputs:

```html

<div class="o3-form-field">
	<label
		class="o3-form-field__label"
		for="o3-form-select-input-_3564083419195512"
	>
		Title
	</label>
	<div class="o3-form-select-input__container o3-form-select-input--short-3">
		<select
			id="o3-form-select-input-_3564083419195512"
			class="o3-form o3-form-select-input"
			required=""
			aria-required="true"
			maxlength="0"
			type="select"
		>
			<option value="American Express">American Express</option>
			<option value="Visa Debit">Visa Debit</option>
			<option value="Visa Credit">Visa Credit</option>
			<option value="Mastercard Debit">Mastercard Debit</option>
			<option value="Mastercard Credit">Mastercard Credit</option>
		</select>
	</div>
	<div class="o3-form-feedback o3-form-feedback__undefined">
		<span class="o3-form-feedback__undefined-message"></span>
	</div>
</div>
```

**TSX**

```tsx
import {SelectInput} from '@financial-times/o3-form';

<SelectInput
	label="Title"
	length="3"
>
	<option value="Mr">Mr</option>
	<option value="Mrs">Mrs</option>
	<option value="Mx>">Mx</option>
</SelectInput>
```

### Date Input

Used for collecting date values, Origami provides two options for date input.

#### Date Picker

Makes use of the browser's native date picker. We recommend using this if you need to support core experiences.

**TSX**

```tsx
import {DateInputPicker} from '@financial-times/o3-form';

const MyForm = () => {
	<Form>
		<DateInputPicker
			label="Date of birth"
			description="The year you were born"
		/>
	</Form>;
};
```

**HTML**

```HTML
<div class="o3-form">
	<div class="o3-form-field">
		<label
			class="o3-form-field__label"
			for="o3-form-date-input"
			>
				Date of Birth
		</label>
		<span
			class="o3-form-input__description"
			id="o3-form-description"
		>
        	The date you were born
      	</span>
		<input
			id="o3-form-date-input"
			class="o3-form o3-form-text-input"
			required=""
			type="date"
			aria-required="true"
			pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
		/>
		<div class="o3-form-feedback o3-form-feedback__undefined">
			<span class="o3-form-feedback__undefined-message"></span>
		</div>
	</div>
</div>
```

#### Date Text Input

An input allowing users to input a date via text input only. We recommend using [Date Picker](#date-picker) if you need to support core experiences.

```tsx
import {DateInputPicker} from '@financial-times/o3-form';

const MyForm = () => {
	<Form>
		<DateInput
			label="Date of birth"
			description="The year you were born"
		/>
	</Form>;
};
```

```html
<script>
	  import DateInput from '@financial-times/o3-form/cjs/DateInput';

  document.addEventListener('DOMContentLoaded', function() {
	const dateInput = new DateInput(
	  document.getElementById('o3-form-date-input)
	);
  });
</script>
<div
		class="o3-form"
		style="grid-column: content-start / content-end; font-family: var(--o3-font-family-metric);"
>
		<div class="o3-form-field">
				<label
						class="o3-form-field__label"
						for="o3-form-date-input"
				>
						Date of Birth
				</label>
				<span
						class="o3-form-input__description"
						id="o3-form-description"
				>
        	The date you were born
  		</span>
				<input
						id="o3-form-date-input"
						class="o3-form o3-form-text-input"
						required=""
						type="text"
						aria-required="true"
						pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
				/>
				<div class="o3-form-feedback o3-form-feedback__undefined">
						<span class="o3-form-feedback__undefined-message"></span>
				</div>
		</div>
</div>
</div>
```



## Contact

If you have any questions or comments about this component, or need help using it, please
either [raise an issue](https://github.com/Financial-Times/o3-editorial-typography/issues),
visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or
email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

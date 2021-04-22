# o-forms [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

FT-branded styles for form elements.

- [Usage](#usage)
- [Markup](#markup)
	- [Single input fields](#single-input-fields)
	- [Multiple input fields](#multiple-input-fields)
	- [Prompt Text](#prompt-text)
	- [Optional](#optional)
	- [Suffix](#suffix)
	- [Small](#small)
	- [Inline](#inline)
	- [Validity](#validity)
- [Sass](#sass)
	- [Options](#options)
	- [Customisation](#customisation)
- [JavaScript](#javascript)
	- [Form Instance](#form-instance)
	- [Individual Inputs](#individual-inputs)
	- [State](#state)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)


## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-forms`.

## Markup

`o-forms` has "field" elements which hold an input and information about that input, e.g. its label text.

All form fields follow the same structure:
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

Form fields may support [single input fields](#single-input-fields), such as text or select boxes. Or [multiple input fields](#multiple-input-fields), such as check boxes or toggles. There are also a number of modifying classes to change the layout or fields, e.g. to show inputs inline with their label, or to visually display an inputs validity.

### Single input fields

Single input fields are created with a `label` element and class `o-forms-field`. All label copy is wrapped within a child `o-forms-title` element, and the input itself is wrapped within a child `o-forms-input` element.

The input and its label copy are associated since they are both within a [`label` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label). Association enables a screenreader to read out the label when the user is focused on the input. Association also means clicking the label will focus the input.

The following example shows a text input:

```html
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input type="text" name="text-example">
	</span>
</label>
```

For a different single input, update the input element within `o-forms-input` and add a matching modifier to the `o-forms-input` element. E.g. for a [`textarea` input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea):

```diff
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

-	<span class="o-forms-input o-forms-input--text">
+	<span class="o-forms-input o-forms-input--textarea">
-		<input type="text" name="text-example">
+		<textarea name="text-example"></textarea>
	</span>
</label>
```

#### Text input

To create a text input use a [single input](#single-input-fields) field structure, with an `o-forms-input--text` modifier class on the `o-forms-input` element and an input type of `type="text"`.

```html
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input type="text" name="text-example" value>
	</span>
</label>
```

#### File input

To create a file input use a [single input](#single-input-fields) field structure, with an `o-forms-input--file` modifier class on the `o-forms-input` element and an input type of `type="file"`.

```html
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--file">
		<input type="file" name="file-example" value>
	</span>
</label>
```

#### Password input

To create a password input use a [single input](#single-input-fields) field structure, with an `o-forms-input--password` modifier class on the `o-forms-input` element and an input type of `type="password"`.

```html
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--password">
		<input type="password" name="password-example" value>
	</span>
</label>
```

#### Textarea input

To create a textarea input use a [single input](#single-input-fields) field structure, with an `o-forms-input--textarea` modifier class on the `o-forms-input` element and a [`textarea` input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).

```html
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--textarea">
		<textarea></textarea>
	</span>
</label>
```

#### Select Input

To create a select input use a [single input](#single-input-fields) field structure, with an `o-forms-input--select` modifier class on the `o-forms-input` element and a [`select` input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select).

```html
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--select">
		<select>
			<option>Option 1</option>
			<!-- further options -->
		</select>
	</span>
</label>
```

#### Other single inputs

For text-like input types where `o-forms` does not provide a specific modifier class the `o-forms-input--text` modifier may be used. [_See more example in the Origami Registry._](https://registry.origami.ft.com/components/o-forms#text-input)

E.g. to create an email input use a [single input](#single-input-fields) field structure, with an `o-forms-input--text` modifier class on the `o-forms-input` element and an input type of `type="email"`.

```html
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input type="email" name="email-example" value>
	</span>
</label>
```

### Multiple input fields

For fields which have more than one input element we must build on the [single input field](#single-input-fields) structure. Since each field has multiple inputs the `o-forms-field` element becomes a `div` and each input is associate with its own [`label` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label).

For example to for a group of radio buttons:

```html
<div class="o-forms-field" aria-labelledby="example-group-title" role="group">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title">Group Title</span>
	</span>

	<span class="o-forms-input o-forms-input--radio-round">
		<label>
			<input type="radio" name="radio-1" value="Radio 1" checked>
			<span class="o-forms-input__label">Radio 1</span>
		</label>
		<label>
			<input type="radio" name="radio-2" value="Radio 2" checked>
			<span class="o-forms-input__label">Radio 2</span>
		</label>
	</span>
</div>
```

Note that to associate the field title to the group of inputs we should use a [fieldset and legend element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend). However `o-forms` instead relies on a `role="group"` attribute along with an `aria-labelledby` attribute and associated `id`, `example-group-title` in the label above.

_We chose not to work with a fieldset because they are [especially difficult to style consistently](https://thatemil.com/blog/2015/01/03/reset-your-fieldset/) _and_ we wanted to provide visual flexibility for our users._

Other fields which use multiple input elements follow the same structure. E.g. for a group of [`checkbox` inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox):

```diff
<div class="o-forms-field" aria-labelledby="example-group-title">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title">Group Title</span>
	</span>

-	<span class="o-forms-input o-forms-input--radio-round">
+	<span class="o-forms-input o-forms-input--checkbox">
		<label>
-			<input type="radio" name="example-radio"/>
-			<span class="o-forms-input__label">Radio 1</span>
+			<input type="checkbox" name="checkbox-1" value="1">
+			<span class="o-forms-input__label">Checkbox 1</span>
		</label>
		<label>
-			<input type="radio" name="example-radio"/>
-			<span class="o-forms-input__label">Radio 2</span>
+			<input type="checkbox" name="checkbox-2" value="2">
+			<span class="o-forms-input__label">Checkbox 2</span>
		</label>
	</span>
</div>
```

#### Radio inputs

##### Round radio inputs

To create a radio input use a [multiple input](#multiple-input-fields) field structure, with an `o-forms-input--radio-round` modifier class on the `o-forms-input` element and child [radio input elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) within labels.

```html
<div class="o-forms-field" aria-labelledby="example-group-title" role="group">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title">Group Title</span>
	</span>

	<span class="o-forms-input o-forms-input--radio-round">
		<label>
			<input type="radio" name="radio-1" value="Radio 1" checked>
			<span class="o-forms-input__label">Radio 1</span>
		</label>
		<label>
			<input type="radio" name="radio-2" value="Radio 2">
			<span class="o-forms-input__label">Radio 2</span>
		</label>
	</span>
</div>
```

[_See radio buttons in the registry_](https://registry.origami.ft.com/components/o-forms#demo-round-styled-radio-inputs)

##### Box radio inputs

For a box-like, rectangular radio button replace the `o-forms-input--radio-round` modifier class with `o-forms-input--radio-box`.

Box radio buttons may also, optionally represent a negative choose by applying the `o-forms-input__label--negative` modifier class to its label. This is useful for a yes/no input.

Loading states are also supported by box radio buttons. We recommend using [`o-forms` JavaScript](#javascript) to add states to an existing form. However to add a state manually add an additional `o-forms-input__state` element and a state modifier class to the `o-forms-input` element, `o-forms-input--saving` or `o-forms-input--saved`.

The below example shows a box style radio button with a positive "yes" and negative "no" option. The "no" option is checked and a saved state is shown.

```html
<div class="o-forms-field" aria-labelledby="example-group-title" role="group">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title">Group Title</span>
	</span>

	<span class="o-forms-input o-forms-input--radio-round o-forms-input--saved">
		<label>
			<input type="radio" name="positive" value="Yes">
			<span class="o-forms-input__label">Yes</span>
		</label>
		<label>
			<input type="radio" name="negative" value="No" checked>
			<span class="o-forms-input__label o-forms-input__label--negative">No</span>
		</label>

		<span class="o-forms-input__state"></span>
	</span>
</div>
```

To show a state label with no text set the modifier class `o-forms-input__state--icon-only` on the `o-forms-input__state` state element. Or to use custom copy for the saving and saved states add the modifier class `o-forms-input__state--custom` and put your copy within the state element. However, as mentioned previously, we recommend setting a custom label using the [setState JavaScript method](#state) instead of adding this markup manually.

##### Pseudo box radio inputs

Its possible to achieve the look of box style radio inputs with anchor elements instead of actual radio inputs, we call these pseudo box radio inputs. They are useful, for example, as a control to toggle between two versions of a page.

```html
<div class="o-forms-input o-forms-input--pseudo-radio-link">
	<a class="o-forms-input__link o-forms-input__link--current" href="/category">Category View</a>
	<a class="o-forms-input__link" href="/timeline">Timeline View</a>
</div>
```

#### Checkbox inputs

##### Square checkbox inputs

To create a checkbox input use a [multiple input](#multiple-input-fields) field structure, with an `o-forms-input--checkbox` modifier class on the `o-forms-input` element and child [checkbox input elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) within labels.

```html
<div class="o-forms-field" aria-labelledby="example-group-title">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title">Group Title</span>
	</span>

	<span class="o-forms-input o-forms-input--checkbox">
		<label>
			<input type="checkbox" name="checkbox-1" value="1">
			<span class="o-forms-input__label">Checkbox 1</span>
		</label>
		<label>
			<input type="checkbox" name="checkbox-2" value="2">
			<span class="o-forms-input__label">Checkbox 2</span>
		</label>
	</span>
</div>
```

To align the checkbox to the **right** of its `label`, add the `o-forms-input__right` class to the `label` element:
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

##### Toggle checkbox inputs

For a toggle checkbox, replace the `o-forms-input--checkbox` modifier class with `o-forms-input--toggle`.

```html
<div class="o-forms-field" aria-labelledby="example-group-title">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title">Group Title</span>
	</span>

	<span class="o-forms-input o-forms-input--toggle">
		<label>
			<input type="checkbox" name="checkbox-1" value="1">
			<span class="o-forms-input__label">Checkbox 1</span>
		</label>
		<label>
			<input type="checkbox" name="checkbox-2" value="2">
			<span class="o-forms-input__label">Checkbox 2</span>
		</label>
	</span>
</div>
```

Toggles have an inverse theme. Set `o-forms-field--inverse` on the field element to use the inverse theme on a dark background.

#### Date inputs

We do not use `input[type=date]`, but instead combine three `input[type=text]` inputs. We use `inputmode="numeric"` to show a numeric keyboard in mobile browsers which support the attribute. And use a `pattern` attribute for basic client side date validation.

To create our date input use a [multiple input](#multiple-input-fields) field structure, with an `o-forms-input--date` modifier class on the `o-forms-input` element, containing inputs as shown:

```html
<div class="o-forms-field" aria-labelledby="example-group-title">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title">Group Title</span>
	</span>

	<span class="o-forms-input o-forms-input--date">
		<label>
			<input class="o-forms-input__day-part" type="text" inputmode="numeric" pattern="0[1-9]|[12]\d|3[01]" name="my-date" aria-label="Day (DD)"/>
			<span class="o-forms-input__label" aria-hidden="true">DD</span>
		</label>
		<label>
			<input class="o-forms-input__month-part" type="text" inputmode="numeric" pattern="0?[1-9]|1[012]" name="my-date" aria-label="Month (MM)"/>
			<span class="o-forms-input__label" aria-hidden="true">MM</span>
		</label>
		<label>
			<input class="o-forms-input__year-part" type="text" inputmode="numeric" pattern="[0-9]{4}" name="my-date" aria-label="Year (YYYY)"/>
			<span class="o-forms-input__label" aria-hidden="true">YYYY</span>
		</label>
	</span>
</div>
```

_We avoid `type="number"` here for a number of reasons related to accessibility and how browsers handle number inputs, which [gov.uk explain thoroughly in a blogpost](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)._

### Prompt Text

To add additional, contextual information to an input label add a title element with class `o-forms-title__prompt`. When adding a prompt to a multiple input field, such as a checkbox or radio button group, give the prompt element an `id` and associated `aria-describedby` label on the field.

For a single input field, such as a text input:
```diff
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
+		<span class="o-forms-title__prompt">Extra context for the input</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input type="text" name="text-example" value>
	</span>
</label>
```

For a multiple input field, such as a checkbox group:
```diff
-<div class="o-forms-field" aria-labelledby="example-group-title">
+<div class="o-forms-field" aria-labelledby="example-group-title" aria-describedby="example-group-prompt">
	<span class="o-forms-title">
		<span id="example-group-title" class="o-forms-title__main">Group Title</span>
+		<span id="example-group-prompt" class="o-forms-title__prompt">Extra context for the input</span>
	</span>

	<span class="o-forms-input o-forms-input--checkbox">
		<label>
			<input type="checkbox" name="checkbox-1" value="1">
			<span class="o-forms-input__label">Checkbox 1</span>
		</label>
		<label>
			<input type="checkbox" name="checkbox-2" value="2">
			<span class="o-forms-input__label">Checkbox 2</span>
		</label>
	</span>
</div>
```

### Optional

Add the `o-forms-field--optional` class to indicate that a field is optional. For example to mark a text field as optional:
```diff
-<label class="o-forms-field">
+<label class="o-forms-field o-forms-field--optional">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input type="text" name="text-example" value>
	</span>
</label>
```

### Suffix

To inline an element, such as a button, after an input add the class `o-forms-input--suffix` on the `o-forms-input` element. For example to inline a button with a text input using [o-buttons](https://registry.origami.ft.com/components/o-buttons):

```diff
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Search for an example thing</span>
	</span>

-	<span class="o-forms-input o-forms-input--text">
+	<span class="o-forms-input o-forms-input--text o-forms-input--suffix">
		<input type="text" name="text-example" value>
+		<button class="o-buttons o-buttons--secondary o-buttons--big">Search</button>
	</span>
</label>
```

### Small

Add the class `o-forms-input--small` on the `o-forms-input` element to reduce the size of an input. For example to output a small text input:

```diff
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

-	<span class="o-forms-input o-forms-input--text">
+	<span class="o-forms-input o-forms-input--text o-forms-input--small">
		<input type="text" name="text-example" value>
	</span>
</label>
```

### Inline

#### Inline Field

To display an input next to its label, rather than below, set `o-forms-field--inline`.

```diff
-<label class="o-forms-field">
+<label class="o-forms-field o-forms-field--inline">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input type="text" name="text-example" value>
	</span>
</label>
```

If the label of an inlined field is short the class `o-forms-title--vertical-center` may be added to align the title element vertically with the input.

```diff
-<label class="o-forms-field">
+<label class="o-forms-field o-forms-field--inline">
-	<span class="o-forms-title">
+	<span class="o-forms-title o-forms-title--vertical-center">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input type="text" name="text-example" value>
	</span>
</label>
```

By default the inline label and input will be a set width to ensure multiple inline fields are aligned with one another. Set `o-forms-title--shrink` to allow the input to take all available space.

```diff
-<label class="o-forms-field">
+<label class="o-forms-field o-forms-field--inline">
	<span class="o-forms-title">
-		<span class="o-forms-title__main">short label</span>
+		<span class="o-forms-title__main o-forms-title--shrink">short label</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input type="text" name="text-example" value>
	</span>
</label>
```

#### Inline Inputs

Add the class `o-forms-input--inline` to the `o-forms-input` element to display multiple inputs inline. For example, by default multiple checkboxes are stacked on top of each other but may be shown in a row:

```diff
<div class="o-forms-field" aria-labelledby="example-group-title">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title">Group Title</span>
	</span>

-	<span class="o-forms-input o-forms-input--checkbox">
+	<span class="o-forms-input o-forms-input--checkbox o-forms-input--inline">
		<label>
			<input type="checkbox" name="checkbox-1" value="1">
			<span class="o-forms-input__label">Checkbox 1</span>
		</label>
		<label>
			<input type="checkbox" name="checkbox-2" value="2">
			<span class="o-forms-input__label">Checkbox 2</span>
		</label>
	</span>
</div>
```

### Validity

[`o-forms` JavaScript](#javascript) builds on [form validation built into the browser](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) to visually display an input as valid or invalid; display a custom error message below the input; and generate an [error summary](#error-summary).

To show a custom error message below an input add an element with class `o-forms-input__error` as a child of the `o-forms-input` element. Add your message to `o-forms-input__error`.

For example to create a required text field with a custom error message, whilst including [`o-forms` JavaScript](#javascript).

```diff
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
-		<input type="text" name="required-text-example">
+		<input type="text" name="required-text-example" required>
+		<span class="o-forms-input__error>Error message here for a required input</span>
	</span>
</label>
```

To visually highlight an inputs validity without using [`o-forms` JavaScript](#javascript) add the `o-forms-input--valid` class on a valid `o-forms-input` element or `o-forms-input--invalid` on an invalid element. This is useful if rendering a form server-side for example.

For example to render an invalid field without [`o-forms` JavaScript](#javascript):

```diff
<label class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

-	<span class="o-forms-input o-forms-input--text">
+	<span class="o-forms-input o-forms-input--text o-forms-input--invalid">
-		<input type="text" name="required-text-example">
+		<input type="text" name="required-text-example" required>
+		<span class="o-forms-input__error>Error message here for a required input</span>
	</span>
</label>
```

#### Error Summary
`o-forms` also generates an error message element when a form is submitted and invalid inputs are recognised. Inputs must have a unique id and a field title element to show in the error summary.

This feature will collect the custom messages of the invalid fields if they are present in the markup, or will default to the browsers native error message if they aren't. It will associate the message to the title of the input that is invalid, generate a list of links at the top of the form, and focus on the first link.

This markup will always be generated dynamically if the [errorSummary option](#form-instance) is not set to `false`.

If you are not using `o-forms` JavaScript you may manually create the error summary within an `o-forms` element using the following markup:

```html
<!-- error summary, `labelledby` the error heading  -->
<div class="o-forms__error-summary" aria-labelledby="my-error-summary" role="alert">
	<h4 id="my-error-summary" class="o-forms__error-summary__heading">There is a problem</h4>
	<ul class="o-forms__error-summary__list">
		<li class="o-forms__error-summary__item">
			<!-- link to the invalid input -->
			<a href="#my-date-input">
				<!-- the name of the invalid input -->
				<span class="o-forms__error-summary__item-overview">My date input</span>:
				<!-- a description of what is wrong and how to fix it -->
				<span class="o-forms__error-summary__item-detail">
					Please use the format (DD/MM/YYYY)
				</span>
			</a>
		</li>
	</ul>
</div>
```

## Sass
`o-forms` has a primary mixin; `oForms()`.

You can include styles for every input type and feature by calling that mixin:
```scss
@import '@financial-times/o-forms/main';
@include oForms();
```

If you would like to be more specific about what aspects of the styles get output, then you'll need to provide the primary mixin with an `$opts` map. For example, in order to output styles for text inputs and checkboxes, and add the ability to inlne them, you would use the following:
```scss
@import '@financial-times/o-forms/main';
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
	- `'file'`
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
	- `error-summary`

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
	- `'controls-border'`: the colour of the border around the controls

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
import oForms from '@financial-times/o-forms';
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
import Input from '@financial-times/o-forms/src/js/input';
new Input(myInputEl);
```

### State
`o-forms` offers the ability to display a 'saving' or 'saved' state. However, currently the only input that accepts state is the [box-styled `input[type=radio]`](#inputtyperadio-box). If you would like to apply state to any other input, please [get in touch with the team](#contact).

`o-forms` has no opinion about the timing of the states—it doesn't know when to change from 'saving' to 'saved', but it has a public method `setState` that allows the project to control this.

The `setState` method accepts three arguments: the state, name, and label. State can be one of 'saving', 'saved' or 'none'. 'none' removes any state from the input. The name argument must be the name of the inputs that will be recieving the state. Label is used in the user interface to describe the state. Label is optional and defaults to 'Saving' for the saving state and 'Saved' for the saved state.

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
import oForms from '@financial-times/o-forms';
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

## Migration guide

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

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-forms/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

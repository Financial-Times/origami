# o-forms [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

FT-branded styles for form elements.

- [o-forms ](#o-forms-)
  - [Usage](#usage)
  - [Markup](#markup)
    - [Single input fields](#single-input-fields)
      - [Text input](#text-input)
      - [File input](#file-input)
      - [Password input](#password-input)
      - [Textarea input](#textarea-input)
      - [Select Input](#select-input)
      - [Other single inputs](#other-single-inputs)
    - [Multiple input fields](#multiple-input-fields)
      - [Radio inputs](#radio-inputs)
        - [Round radio inputs](#round-radio-inputs)
        - [Box radio inputs](#box-radio-inputs)
        - [Pseudo box radio inputs](#pseudo-box-radio-inputs)
      - [Checkbox inputs](#checkbox-inputs)
        - [Square checkbox inputs](#square-checkbox-inputs)
        - [Toggle checkbox inputs](#toggle-checkbox-inputs)
        - [Checkbox inputs with description](#checkbox-inputs-with-description)
      - [Date inputs](#date-inputs)
    - [Prompt Text](#prompt-text)
    - [Optional](#optional)
    - [Suffix](#suffix)
    - [Small](#small)
    - [Inline](#inline)
      - [Inline Field](#inline-field)
      - [Inline Inputs](#inline-inputs)
    - [Validity](#validity)
      - [Error Summary](#error-summary)
  - [Sass](#sass)
    - [Options](#options)
    - [Customisation](#customisation)
  - [JavaScript](#javascript)
    - [Initialise](#initialise)
    - [Customise behaviour](#customise-behaviour)
    - [Individual Inputs](#individual-inputs)
    - [State](#state)
  - [Migration guide](#migration-guide)
  - [Contact](#contact)
  - [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/documentation/components/#including-origami-components-in-your-project) to get started with `o-forms`.

## Markup

`o-forms` has "field" elements which hold an input and information about that input, e.g. its label text. Use unique ids to associate form inputs and their labels. This is required as [some assistive technologies do not support implicit labels](https://a11ysupport.io/tests/html_label_element_implicit), such as Dragon Naturally Speaking.

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
<label for="text" class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input id="text" type="text" name="text-example" />
	</span>
</label>
```

For a different single input, update the input element within `o-forms-input` and add a matching modifier to the `o-forms-input` element. E.g. for a [`textarea` input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea):

```diff
<label for="text-example" class="o-forms-field">
 <span class="o-forms-title">
  <span class="o-forms-title__main">Label for input here</span>
 </span>

- <span class="o-forms-input o-forms-input--text">
+ <span class="o-forms-input o-forms-input--textarea">
-  <input id="text-example"  type="text" name="text-example">
+  <textarea id="text-example" name="text-example"></textarea>
 </span>
</label>
```

#### Text input

To create a text input use a [single input](#single-input-fields) field structure, with an `o-forms-input--text` modifier class on the `o-forms-input` element and an input type of `type="text"`.

```html
<label for="text-example" class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input id="text-example" type="text" name="text-example" value />
	</span>
</label>
```

#### File input

To create a file input use a [single input](#single-input-fields) field structure, with an `o-forms-input--file` modifier class on the `o-forms-input` element and an input type of `type="file"`.

```html
<label for="text-example" class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--file">
		<input id="text-example" type="file" name="file-example" value />
	</span>
</label>
```

#### Password input

To create a password input use a [single input](#single-input-fields) field structure, with an `o-forms-input--password` modifier class on the `o-forms-input` element and an input type of `type="password"`.

```html
<label for="password-example" class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--password">
		<input
			id="password-example"
			type="password"
			name="password-example"
			value
		/>
	</span>
</label>
```

#### Textarea input

To create a textarea input use a [single input](#single-input-fields) field structure, with an `o-forms-input--textarea` modifier class on the `o-forms-input` element and a [`textarea` input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea).

```html
<label for="textarea-example" class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--textarea">
		<textarea id="textarea-example"></textarea>
	</span>
</label>
```

#### Select Input

To create a select input use a [single input](#single-input-fields) field structure, with an `o-forms-input--select` modifier class on the `o-forms-input` element and a [`select` input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select).

```html
<label for="select-example" class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--select">
		<select id="select-example">
			<option>Option 1</option>
			<!-- further options -->
		</select>
	</span>
</label>
```

#### Other single inputs

For text-like input types where `o-forms` does not provide a specific modifier class the `o-forms-input--text` modifier may be used. [_See more examples in the Origami Storybook._](https://o2.origami.ft.com/?path=/story/o2-core_components-o-forms-text-box--optional-text&globals=backgrounds:!undefined)

E.g. to create an email input use a [single input](#single-input-fields) field structure, with an `o-forms-input--text` modifier class on the `o-forms-input` element and an input type of `type="email"`.

```html
<label for="email-example" class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Label for input here</span>
	</span>

	<span class="o-forms-input o-forms-input--text">
		<input id="email-example" type="email" name="email-example" value />
	</span>
</label>
```

### Multiple input fields

For fields which have more than one input element we must build on the [single input field](#single-input-fields) structure. Since each field has multiple inputs the `o-forms-field` element becomes a `div` and each input is associate with its own [`label` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label). Each form element must have a unique `id` attribute, and the `for` attribute of the `label` element must match the `id` of the form element it is associated with to meet accessibility requirements.

For example to for a group of radio buttons:

```html
<div class="o-forms-field" aria-labelledby="example-group-title" role="group">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title"
			>Group Title</span
		>
	</span>

	<span class="o-forms-input o-forms-input--radio-round">
		<label for="radio-1">
			<input id="radio-1" type="radio" name="radio-1" value="Radio 1" checked />
			<span class="o-forms-input__label">Radio 1</span>
		</label>
		<label for="radio-2">
			<input id="radio-2" type="radio" name="radio-2" value="Radio 2" checked />
			<span class="o-forms-input__label">Radio 2</span>
		</label>
	</span>
</div>
```

Note that to associate the field title to the group of inputs we should use a [fieldset and legend element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend). However `o-forms` instead relies on a `role="group"` attribute along with an `aria-labelledby` attribute and associated `id`, `example-group-title` in the label above.

_We chose not to work with a fieldset because they are [especially difficult to style consistently](https://thatemil.com/blog/2015/01/03/reset-your-fieldset/)\_and_we wanted to provide visual flexibility for our users._

Other fields which use multiple input elements follow the same structure. E.g. for a group of [`checkbox` inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox):

```diff
<div class="o-forms-field" aria-labelledby="example-group-title">
 <span class="o-forms-title">
  <span class="o-forms-title__main" id="example-group-title">Group Title</span>
 </span>

- <span class="o-forms-input o-forms-input--radio-round">
+ <span class="o-forms-input o-forms-input--checkbox">
  <label for="checkbox-1">
-   <input id="checkbox-1" type="radio" name="example-radio"/>
-   <span class="o-forms-input__label">Radio 1</span>
+   <input id="checkbox-1" type="checkbox" name="checkbox-1" value="1">
+   <span class="o-forms-input__label">Checkbox 1</span>
  </label>
  <label for="checkbox-2">
-   <input id="checkbox-2" type="radio" name="example-radio"/>
-   <span class="o-forms-input__label">Radio 2</span>
+   <input id="checkbox-2" type="checkbox" name="checkbox-2" value="2">
+   <span class="o-forms-input__label">Checkbox 2</span>
  </label>
 </span>
</div>
```

#### Radio inputs

##### Round radio inputs

To create a radio input use a [multiple input](#multiple-input-fields) field structure, with an `o-forms-input--radio-round` modifier class on the `o-forms-input` element and child [radio input elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) within labels. The `id` attribute of the input element must match the `for` attribute of the label element and they must be unique within the form.

```html
<div class="o-forms-field" aria-labelledby="example-group-title" role="group">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title"
			>Group Title</span
		>
	</span>

	<span class="o-forms-input o-forms-input--radio-round">
		<label for="radio-1">
			<input id="radio-1" type="radio" name="radio-1" value="Radio 1" checked />
			<span class="o-forms-input__label">Radio 1</span>
		</label>
		<label for="radio-2">
			<input id="radio-2" type="radio" name="radio-2" value="Radio 2" />
			<span class="o-forms-input__label">Radio 2</span>
		</label>
	</span>
</div>
```

Round radio inputs support 3 themes.

- **professional**: For a round radios with the FT Professional theme, set `o-forms-field--professional` on the field element.
- **professional-inverse**: For round radios with the inverse FT Professional theme, set `o-forms-field--professional-inverse` on the field element.
- **ft-live**: For round radios with the FT Live theme, add `o-forms-field--ft-live` on the field element.

[_See radio buttons in Storybook_](https://o2.origami.ft.com/?path=/story/o2-core_components-o-forms-radio-buttons--radio-button&globals=backgrounds:!undefined)

##### Box radio inputs

For a box-like, rectangular radio button replace the `o-forms-input--radio-round` modifier class with `o-forms-input--radio-box`.

Box radio buttons may also, optionally represent a negative choose by applying the `o-forms-input__label--negative` modifier class to its label. This is useful for a yes/no input.

Loading states are also supported by box radio buttons. We recommend using [`o-forms` JavaScript](#javascript) to add states to an existing form. However to add a state manually add an additional `o-forms-input__state` element with `role=status` and `aria-label="[STATE]"` attributes. In addition, add a state modifier class to the `o-forms-input` element, `o-forms-input--saving` or `o-forms-input--saved`.

The below example shows a box style radio button with a positive "yes" and negative "no" option. The "no" option is checked and a saved state is shown.

```html
<div class="o-forms-field" aria-labelledby="example-group-title" role="group">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title"
			>Group Title</span
		>
	</span>

	<span class="o-forms-input o-forms-input--radio-round o-forms-input--saved">
		<label for="radio-yes">
			<input id="radio-yes" type="radio" name="positive" value="Yes" />
			<span class="o-forms-input__label">Yes</span>
		</label>
		<label for="radio-no">
			<input id="radio-no" type="radio" name="negative" value="No" checked />
			<span class="o-forms-input__label o-forms-input__label--negative"
				>No</span
			>
		</label>

		<span role="status" class="o-forms-input__state"></span>
	</span>
</div>
```

To show a state label with no text set the modifier class `o-forms-input__state--icon-only` on the `o-forms-input__state` state element. Or to use custom copy for the saving and saved states add the modifier class `o-forms-input__state--custom` and put your copy within the state element. However, as mentioned previously, we recommend setting a custom label using the [setState JavaScript method](#state) instead of adding this markup manually.

Box radio inputs support 3 themes.

- **professional**: For a box radio with FT Professional theme set `o-forms-field--professional` on the field element.
- **professional-inverse**: For box radio with inverse FT Professional theme set `o-forms-field--professional-inverse` on the field element.
- **ft-live**: For box radios with the FT Live theme, set `o-forms-field--professional-inverse` on the field element.

##### Pseudo box radio inputs

**Deprecated, we no longer recommend pseudo box radio inputs. These will be removed in a future major version:**

Its possible to achieve the look of box style radio inputs with anchor elements instead of actual radio inputs, we call these pseudo box radio inputs. This is no longer recommended and should not be used in new projects.

```html
<div class="o-forms-input o-forms-input--pseudo-radio-link">
	<a class="o-forms-input__link o-forms-input__link--current" href="/category"
		>Category View</a
	>
	<a class="o-forms-input__link" href="/timeline">Timeline View</a>
</div>
```

Links which look like form inputs may be confusing for some users of assistive technologies, as they may be accessed or behave differently than expected. Further, unlike true o-forms radio inputs, there is no fieldset with legend to group the links. For most cases, use standard [box radio inputs](#box-radio-inputs) instead.

#### Checkbox inputs

##### Square checkbox inputs

To create a checkbox input use a [multiple input](#multiple-input-fields) field structure, with an `o-forms-input--checkbox` modifier class on the `o-forms-input` element and child [checkbox input elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox) within labels.

```html
<div class="o-forms-field" aria-labelledby="example-group-title">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title"
			>Group Title</span
		>
	</span>

	<span class="o-forms-input o-forms-input--checkbox">
		<label for="checkbox-1">
			<input id="checkbox-1" type="checkbox" name="checkbox-1" value="1" />
			<span class="o-forms-input__label">Checkbox 1</span>
		</label>
		<label for="checkbox-2">
			<input id="checkbox-2" type="checkbox" name="checkbox-2" value="2" />
			<span class="o-forms-input__label">Checkbox 2</span>
		</label>
	</span>
</div>
```

To align the checkbox to the **right** of its `label`, add the `o-forms-input__right` class to the `label` element:

```diff
...
<span class="o-forms-input o-forms-input--checkbox">
-  <label for="my-checkbox">
+  <label for="my-checkbox"class="o-forms-input__right">
   <input id="my-checkbox" type="checkbox" name="my-checkbox"/>
   <span class="o-forms-input__label">Checkbox 1</span>
  </label>
 </span>
...
```

Square checkboxes also support an additional theme:

- **professional**: To add the Professional theme to a square checkbox, add the `o-forms-field--professional` modifier class to the field element.
- **professional-inverse**: To add the inverse FT Professional theme to a square checkbox, add the `o-forms-field--professional-inverse` modifier class to the field element.
- **ft-live**: To add the FT Live theme to a square checkbox, add the `o-forms-field--ft-live` modifier class to the field element.

##### Toggle checkbox inputs

For a toggle checkbox, replace the `o-forms-input--checkbox` modifier class with `o-forms-input--toggle`.

```html
<div class="o-forms-field" aria-labelledby="example-group-title">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title"
			>Group Title</span
		>
	</span>

	<span class="o-forms-input o-forms-input--toggle">
		<label for="checkbox-1">
			<input id="checkbox-1" type="checkbox" name="checkbox-1" value="1" />
			<span class="o-forms-input__label">Checkbox 1</span>
		</label>
		<label for="checkbox-2">
			<input id="checkbox-2" type="checkbox" name="checkbox-2" value="2" />
			<span class="o-forms-input__label">Checkbox 2</span>
		</label>
	</span>
</div>
```

Toggles support 2 themes.

- inverse: For a toggle on a dark background. Set `o-forms-field--inverse` on the field element.
- white: For a toggle on a white background. Set `o-forms-field--white` on the field element.

##### Checkbox inputs with description

Add descriptions to toggles / checkboxes by adding `o-forms-input__label__main` and `o-forms-input__label__prompt` span elements. These must be associated with the checkbox input using `aria-labelledby` and `aria-describedby` attributes:

```html
<div
	class="o-forms-field"
	role="group"
	aria-labelledby="[your-title-id]"
	aria-describedby="[your-description-id]"
>
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="[your-title-id]"
			>Toggle inputs with description</span
		>
		<span class="o-forms-title__prompt" id="[your-description-id]"
			>Optional prompt text</span
		>
	</span>

	<span class="o-forms-input o-forms-input--toggle">
		<label for="checkbox-example">
			<input
				id="checkbox-example"
				type="checkbox"
				name="default"
				value="Lorem ipsum dolor sit amet"
				checked=""
				aria-labelledby="[your-checkbox-label-id]"
				aria-describedby="[your-checkbox-description-id]"
				required=""
			/>
			<span class="o-forms-input__label">
				<span id="[your-checkbox-label-id]" class="o-forms-input__label__main">
					Lorem ipsum dolor sit amet
				</span>
				<span
					id="[your-checkbox-description-id]"
					class="o-forms-input__label__prompt"
				>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad earum
					magnam vel possimus harum suscipit.
				</span>
			</span>
		</label>
	</span>
</div>
```

#### Date inputs

We do not use `input[type=date]`, but instead combine three `input[type=text]` inputs. We use `inputmode="numeric"` to show a numeric keyboard in mobile browsers which support the attribute. And use a `pattern` attribute for basic client side date validation.

To create our date input use a [multiple input](#multiple-input-fields) field structure, with an `o-forms-input--date` modifier class on the `o-forms-input` element, containing inputs as shown:

```html
<div class="o-forms-field" aria-labelledby="example-group-title">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title"
			>Group Title</span
		>
	</span>

	<span class="o-forms-input o-forms-input--date">
		<label for="date">
			<input
				id="date"
				class="o-forms-input__day-part"
				type="text"
				inputmode="numeric"
				pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])"
				name="my-date"
				aria-label="Day (DD)"
			/>
			<span class="o-forms-input__label">DD</span>
		</label>
		<label for="month">
			<input
				id="month"
				class="o-forms-input__month-part"
				type="text"
				inputmode="numeric"
				pattern="(0[1-9]|1[012])"
				name="my-date"
				aria-label="Month (MM)"
			/>
			<span class="o-forms-input__label">MM</span>
		</label>
		<label for="year">
			<input
				id="year"
				class="o-forms-input__year-part"
				type="text"
				inputmode="numeric"
				pattern="[0-9]{4}"
				name="my-date"
				aria-label="Year (YYYY)"
			/>
			<span class="o-forms-input__label">YYYY</span>
		</label>
	</span>
</div>
```

_We avoid `type="number"` here for a number of reasons related to accessibility and how browsers handle number inputs, which [gov.uk explain thoroughly in a blogpost](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)._

### Prompt Text

To add additional, contextual information to an input label add a title element with class `o-forms-title__prompt`. When adding a prompt to a multiple input field, such as a checkbox or radio button group, give the prompt element an `id` and associated `aria-describedby` label on the field.

For a single input field, such as a text input:

```diff
<span class="o-forms-field">
 <span class="o-forms-title">
  <label for="text-example" class="o-forms-title__main">Label for input here</label>
+  <span class="o-forms-title__prompt">Extra context for the input</span>
 </span>

 <span class="o-forms-input o-forms-input--text">
  <input id="text-example" type="text" name="text-example" value>
 </span>
</span>
```

For a multiple input field, such as a checkbox group:

```diff
-<div class="o-forms-field" aria-labelledby="example-group-title">
+<div class="o-forms-field" aria-labelledby="example-group-title" aria-describedby="example-group-prompt">
 <span class="o-forms-title">
  <span id="example-group-title" class="o-forms-title__main">Group Title</span>
+  <span id="example-group-prompt" class="o-forms-title__prompt">Extra context for the input</span>
 </span>

 <span class="o-forms-input o-forms-input--checkbox">
  <label for="checkbox-1">
   <input id="checkbox-1" type="checkbox" name="checkbox-1" value="1">
   <span class="o-forms-input__label">Checkbox 1</span>
  </label>
  <label for="checkbox-2">
   <input id="checkbox-2" type="checkbox" name="checkbox-2" value="2">
   <span class="o-forms-input__label">Checkbox 2</span>
  </label>
 </span>
</div>
```

### Optional

Add the `o-forms-field--optional` class to indicate that a field is optional. For example to mark a text field as optional:

```diff
-<label for="text-example" class="o-forms-field">
+<label for="text-example" class="o-forms-field o-forms-field--optional">
 <span class="o-forms-title">
  <span class="o-forms-title__main">Label for input here</span>
 </span>

 <span class="o-forms-input o-forms-input--text">
  <input id="text-example" type="text" name="text-example" value>
 </span>
</label>
```

### Suffix

To inline an element, such as a button, after an input add the class `o-forms-input--suffix` on the `o-forms-input` element. For example to inline a button with a text input using [o-buttons](https://o2.origami.ft.com/?path=/docs/o2-core_components-o-buttons-readme--docs&globals=backgrounds:!undefined):

```diff
<label for="text-example" class="o-forms-field">
 <span class="o-forms-title">
  <span class="o-forms-title__main">Search for an example thing</span>
 </span>

- <span class="o-forms-input o-forms-input--text">
+ <span class="o-forms-input o-forms-input--text o-forms-input--suffix">
  <input id="text-example type="text" name="text-example" value>
+  <button class="o-buttons o-buttons--secondary o-buttons--big">Search</button>
 </span>
</label>
```

### Small

Add the class `o-forms-input--small` on the `o-forms-input` element to reduce the size of an input. For example to output a small text input:

```diff
<label for="text-example" class="o-forms-field">
 <span class="o-forms-title">
  <span class="o-forms-title__main">Label for input here</span>
 </span>

- <span class="o-forms-input o-forms-input--text">
+ <span class="o-forms-input o-forms-input--text o-forms-input--small">
  <input id="text-example" type="text" name="text-example" value>
 </span>
</label>
```

### Inline

#### Inline Field

To display an input next to its label, rather than below, set `o-forms-field--inline`.

```diff
-<label for="text-example" class="o-forms-field">
+<label for="text-example" class="o-forms-field o-forms-field--inline">
 <span class="o-forms-title">
  <span class="o-forms-title__main">Label for input here</span>
 </span>

 <span class="o-forms-input o-forms-input--text">
  <input id="text-example" type="text" name="text-example" value>
 </span>
</label>
```

If the label of an inlined field is short the class `o-forms-title--vertical-center` may be added to align the title element vertically with the input.

```diff
-<label for="text-example" class="o-forms-field">
+<label for="text-example" class="o-forms-field o-forms-field--inline">
- <span class="o-forms-title">
+ <span class="o-forms-title o-forms-title--vertical-center">
  <span class="o-forms-title__main">Label for input here</span>
 </span>

 <span class="o-forms-input o-forms-input--text">
  <input id="text-example"  type="text" name="text-example" value>
 </span>
</label>
```

By default the inline label and input will be a set width to ensure multiple inline fields are aligned with one another. Set `o-forms-title--shrink` to allow the input to take all available space.

```diff
-<label for="text-example" class="o-forms-field">
+<label for="text-example" class="o-forms-field o-forms-field--inline">
- <span class="o-forms-title o-forms-title--shrink">
+ <span class="o-forms-title o-forms-title--shrink">
  <span class="o-forms-title__main">short label</span>
 </span>

 <span class="o-forms-input o-forms-input--text">
  <input id="text-example"  type="text" name="text-example" value>
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

- <span class="o-forms-input o-forms-input--checkbox">
+ <span class="o-forms-input o-forms-input--checkbox o-forms-input--inline">
  <label for="checkbox-1">
   <input id="checkbox-1" type="checkbox" name="checkbox-1" value="1">
   <span class="o-forms-input__label">Checkbox 1</span>
  </label>
  <label for="checkbox-2">
   <input id="checkbox-2" type="checkbox" name="checkbox-2" value="2">
   <span class="o-forms-input__label">Checkbox 2</span>
  </label>
 </span>
</div>
```

### Validity

[`o-forms` JavaScript](#javascript) builds on [form validation built into the browser](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) to visually display an input as valid or invalid; display a custom error message below the input; and generate an [error summary](#error-summary).

To show a custom error message below an input add an element with class `o-forms-input__error` as a child of the `o-forms-input` element. Add your message to `o-forms-input__error` and to meet [accessibility standards](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role) we add `role="alert"`.

For example to create a required text field with a custom error message, whilst including [`o-forms` JavaScript](#javascript).

```diff
<label for="required-text" class="o-forms-field">
 <span class="o-forms-title">
  <span class="o-forms-title__main">Label for input here</span>
 </span>

 <span class="o-forms-input o-forms-input--text">
-  <input id="required-text" type="text" name="required-text-example">
+  <input id="required-text" type="text" name="required-text-example" required>
+  <span role="alert" class="o-forms-input__error>Error message here for a required input</span>
 </span>
</label>
```

For example to render an invalid field without [`o-forms` JavaScript](#javascript):

```diff
<label for="required-text" class="o-forms-field">
 <span class="o-forms-title">
  <span class="o-forms-title__main">Label for input here</span>
 </span>

- <span class="o-forms-input o-forms-input--text">
+ <span class="o-forms-input o-forms-input--text o-forms-input--invalid">
-  <input id="required-text" type="text" name="required-text-example">
+  <input id="required-text" type="text" name="required-text-example" required>
+  <span role="alert" class="o-forms-input__error>Error message here for a required input</span>
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
<div
	class="o-forms__error-summary"
	aria-labelledby="my-error-summary"
	role="alert"
>
	<h4 id="my-error-summary" class="o-forms__error-summary__heading">
		There is a problem
	</h4>
	<ul class="o-forms__error-summary__list">
		<li class="o-forms__error-summary__item">
			<!-- link to the invalid input -->
			<a href="#my-date-input">
				<!-- the name of the invalid input -->
				<span class="o-forms__error-summary__item-overview">My date input</span
				>:
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
@include oForms(
	$opts: (
		'elements': (
			'text',
			'checkbox',
		),
		'features': (
			'inline',
		),
	)
);
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
  - `'inverse'` (deprecated, see the 'themes' option)
  - `'small'`
  - `'state'`
  - `'suffix'`
  - `error-summary`
- `'themes'`
  - `'inverse'`
  - `'professional'`
  - `'professional-inverse'`
  - `'white'`

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
@include oFormsAddCustom(
	(
		$input: 'radio',
		$modifier: 'my-theme',
		// outputs the class 'o-forms-input--my-theme',
		$icons: 'burger' $theme:
			(
				controls-base: 'claret',
				controls-checked-base: 'white',
				controls-negative-checked-background: 'claret-30',
			),
	)
);
```

## JavaScript

No code will run automatically unless you are using the Build Service. You must either construct an `o-forms` object or fire an `o.DOMContentLoaded` event, which `o-forms` listens for.

The JavaScript for this component is primarily responsible for individual input validation and overall form validation.

If you would like to use an input without a form element, you can still apply validation to it with the `o-forms` [individual `Input` API](#individual-inputs).

### Initialise

The main `o-forms` JavaScript has been written to identify and run on a `<form>` element. You'll need to set up your form and include the data attribute `data-o-component="o-forms"`:

```html
<form data-o-component="o-forms">
	<!-- form elements as demonstrated in the markup section above  -->
</form>
```

By default, `o-forms` is initialised with validation logic. It will generate an error summary for invalid elements when the form is submitted:

```js
import oForms from '@financial-times/o-forms';
oForms.init();
```

### Customise behaviour

The default behaviour of `o-forms` can be changed by configuring the options object. For example, set `preventSubmit: true` to prevent the user from submitting the form. You may then run your own logic before submitting the form by listening for the `oForms.submit` event.

```js
oForms.init(null, {
	preventSubmit: true,
});

window.addEventListener('oForms.submit', e => {
	console.log(
		`A user would like to submit a form, it is ${
			e.detail.valid ? 'valid' : 'invalid'
		}.`
	);
	if (e.detail.valid) {
		e.detail.instance.form.submit();
	}
});
```

The error summary may also be prevented by setting `errorSummary: false`. Though we do not recommend this as an error summary can be helpful for users to discover and navigate a form with errors – this is particularly true for users of some assistive technologies.

```js
oForms.init(null, {
	errorSummary: false,
});
```

In order to use default browser validation set `useBrowserValidation: true`:

```js
oForms.init(null, {
	useBrowserValidation: true,
	errorSummary: false,
});
```

You can also set these values to the data attributes e.g. `data-o-forms-prevent-submit`, `data-o-forms-use-browser-validation`, and `data-o-forms-error-summary` on the `<form>` element.

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
	<label for="daily">
		<span class="o-forms-input__label">Daily</span>
		<input id="daily" type="radio" name="my-radio-box" />
	</label>
	<label for="weekly">
		<span class="o-forms-input__label">Weekly</span>
		<input id="weekly" type="radio" name="my-radio-box" />
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
+ iconLabel: 'Sending'
+});
```

You also have the option of displaying state as an icon without text. In order to do this, you can call the method above with an extra options argument:

```js
myForm.setState('saving', 'my-radio-box', {
	iconOnly: true,
});
```

## Migration guide

|    State     | Major Version | Last Minor Release |                    Migration guide                    |
| :----------: | :-----------: | :----------------: | :---------------------------------------------------: |
|  ✨ active   |       9       |        N/A         | [migrate to v9](MIGRATION.md#migrating-from-v8-to-v9) |
| ⚠ maintained |       8       |        8.5         | [migrate to v8](MIGRATION.md#migrating-from-v7-to-v8) |
| ╳ deprecated |       7       |        7.1         | [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7) |
| ╳ deprecated |       6       |        6.0         | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
| ╳ deprecated |       5       |        5.11        | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
| ╳ deprecated |       4       |        4.1         | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
| ╳ deprecated |       3       |        3.5         | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
| ╳ deprecated |       2       |        2.0         | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
| ╳ deprecated |       1       |        1.0         |     [migrate to v1](MIGRATION.md#migrating-to-v1)     |
| ╳ deprecated |       0       |        0.13        |                          N/A                          |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-forms/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

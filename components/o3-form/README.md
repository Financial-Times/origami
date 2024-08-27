# o3-form[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Provides components to construct forms.

- [Overview](#overview)
- [Components](#components)
  - [Form](#form)
    - [Form Field, Form Fieldset and Feedback](#form-field-form-fieldset-and-feedback)
  - [Text Input](#text-input)
    - [Short text input](#short-text-input)
  - [Checkbox](#checkbox)
    - [Checkbox Group](#checkbox-group)
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
| ---------- | -------------------------------- | -------- | ---- | ------- |
| `children` | The form elements to be rendered | true     | any  | -       |

### Form Field, Form Fieldset and Feedback

Form Field components can be complex and contain multiple elements. Form Field and Form Fieldset are containers for form elements. Shared anatomy of Form Field and Form Fieldset looks like composition of the following elements:

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

We are using Title and Label interchangeably. But we export two JSX components from `o3-form` package: `TitledFormField` and `LabeledFormField`. Both components are similar but `TitledFormField` is used with checkboxes, radio buttons and use-cases when `<label>` element needs to be part of form element or more flexibility is require. `LabeledFormField` is used with other text inputs.

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

`TitleFormField` expects children to contain both `<input>` and `<label>` elements, which helps us a lot with checkboxes and radio buttons. `LabeledFormField` expects children to contain only `<input>` element. Two components in JSX can be used as follows:

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
| ------------- | -------------------------------------------------------------------------------------------------- | -------- | ------ | ------- |
| `label`       | The label for the form fieldset                                                                    | true     | string | -       |
| `inputId`     | The id of the form input element                                                                   | false    | string | -       |
| `description` | A description of the form fieldset                                                                 | false    | string | -       |
| `children`    | The form elements to be rendered                                                                   | true     | any    | -       |
| `feedback`    | The feedback object for the form fieldset that contains `message` and `type` of message properties | false    | string | -       |

Form Fieldset is used to group related form elements together. They can be used as plain HTML:

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
| ------------- | -------------------------------------------------------------------------------------------------- | -------- | ------ | ------- |
| `label`       | The label for the form fieldset                                                                    | true     | string | -       |
| `description` | A description of the form fieldset                                                                 | false    | string | -       |
| `children`    | The form elements to be rendered                                                                   | true     | any    | -       |
| `feedback`    | The feedback object for the form fieldset that contains `message` and `type` of message properties | false    | string | -       |

### Text Input

A standard text input for collecting text values.
label: 'Full name',
description: 'Your full name as printed on your driving license',

```tsx
<TextInput
 label="Full name"
 disabled="{false}"
 description="Your full name as printed on your driving license"
/>
```

**HTML**

```
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

#### Short text input

The size and max length of the text input can be limited with the `length` property.

```html
<TextInput
 label="Security code"
 description="3 digit security code as printed on the back of your credit card."
 length="{3}"
/>;
```

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

This will provide a text box 3 characters wide and only allow 3 characters to be typed.

If you prefer to limit the length without styling, use the `maxLength` attribute instead.

```tsx
<TextInput
 label="Security code"
 description="3 digit security code as printed on the back of your credit card."
 feedback={args.feedback}
 attributes={{
  maxLength: 3,
 }}
/>
```

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

### Checkbox

A customizable and accessible checkbox input for selecting one or more items from a list, or turning an item on or off. It can be used as plain HTML:

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
| --------------- | --------------------------------------------------------------------------------------------- | -------- | ------- | ------- |
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
| ------------- | ---------------------------------------- | ---------- | ------- |
| `label`       | The label for the group of checkboxes    | string     |         |
| `description` | A description of the group of checkboxes | string     |         |
| `children`    | The checkboxes to be rendered            | CheckBox[] |         |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o3-editorial-typography/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

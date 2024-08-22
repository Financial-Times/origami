# o3-form[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Provides components to construct forms.

## Overview

o3-form provides UI form elements with consistent labelling, descriptions, and error styles and interfaces.

## Components

### Text Input

A standard text input for collecting text values.
label: 'Full name',
description: 'Your full name as printed on your driving license',

```tsx
    <TextInput label='Full name'
			   disabled={false}
			   description='Your full name as printed on your driving license'
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

<TextInput label="Security code"
		   description="3 digit security code as printed on the back of your credit card."
		   length={3} />;
```

**HTML**

```html
<div class="o3-form-field">
	<label for="my-input-field">Security Code</label>
	<span
		class="o3-form-input-description"
	>
      3 digit security code as printed on the back of your credit card.
    </span>
	<input
		id="my-input-field"
		class="o3-form o3-form-text-input o3-form-text-input--short-3"
		maxlength="3"
		type="text"
	/>
```

This will provide a text box 3 characters wide and only allow 3 characters to be typed.

If you prefer to limit the length without styling, use the `maxLength` attribute instead.

```tsx
    <TextInput label="Security code"
			   description="3 digit security code as printed on the back of your credit card."
			   feedback={args.feedback}
			   attributes={{
				   maxLength: 3
			   }} />;
```

**HTML**

```html
<div class="o3-form-field">
	<label for="my-input-field">Security Code</label>
	<span
		class="o3-form-input-description"
	>
      3 digit security code as printed on the back of your credit card.
    </span>
	<input
		id="my-input-field"
		class="o3-form o3-form-text-input"
		maxlength="3"
		type="text"
	/>
```

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o3-editorial-typography/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

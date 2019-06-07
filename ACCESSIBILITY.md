# Form Accessibility

Forms can present a challenge when it comes to accessibility, most specifically in terms of Assitive Technology (in this case screen readers, which we will refer to as 'AT' going forward).

`o-forms` has been tested with our [contrast checker](https://registry.origami.ft.com/components/o-colors#demo-contrast-ratio-checker) to make sure that our colour contrasts meet [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) requirements, so this document is going to walk through `aria` attributes we recommend using.

### Table of Contents:
- [Single Inputs](#single-inputs)
- [Multiple Inputs](#multiple-inputs)
- [Form Validation](#form-validation)

## Single inputs
`o-forms` considers these types of input 'single input fields`:
- `input[type=text]` 
- `input[type=password]`
- `select`
- `textarea`

The base structure for all of these types of input is as follows:
```html
<label>
	<span class="o-forms-title">
		<span class="o-forms-title__main">
			Label to describe the input here
		</span>
	</span>

	<!-- the input container below accepts a number of different modifiers, which are outlined in the README -->
	<span class="o-forms-input"> 
		<input type="text"/>
		<!-- or --> 
		<input type="password"/>
		<!-- or --> 
		<textarea></textarea>
		<!-- or -->
		<select>...</select> 
	</span>
</label>
```
AT will read this markup correctly by identifying the type of input declared, and the label for it. As long as our markup is semantic, this should be read out as intended. 

## Multiple inputs
`o-forms` considers these types of input 'multiple input fields`:
- `input[type=radio]` 
- `input[type=checkbox]`

Essentially, if there is more than one input, they should be grouped with their input siblings.

The base structure for these types of input (ignoring some modifiers) is:
```html
<div class="o-forms-field">
	<span class="o-forms-title">
		<span class="o-forms-title__main">Group Title</span>
		<span class="o-forms-title__prompt">Group info</span>
	</span>

	<span class="o-forms-input o-forms-input--checkbox">
		<label>
			<input type="checkbox" name="default" value="checkbox1" checked>
			<span class="o-forms-input__label">Checkbox 1</span>
		</label>

		<label>
			<input type="checkbox" name="default" value="checkbox2">
			<span class="o-forms-input__label">Checkbox 2</span>
		</label>

		<label>
			<input type="checkbox" name="default" value="checkbox3" checked>
			<span class="o-forms-input__label">Checkbox 3</span>
		</label>
	</span>
</div>
```
Our approach to grouping input elements mimicks the structure of a `<fieldset>` with a `<legend>` and multiple `<input>`s. 

We chose not to work with a fieldset because they are [especially difficult to style consistently](https://thatemil.com/blog/2015/01/03/reset-your-fieldset/) _and_ we wanted to provide visual flexibility for our users.

But in doing this, we've lost the `<fieldset>`'s semantic structure, which ATs rely on to read out correctly.

How to make our mimicked stucture more semantic? Enter `aria` (and `role`) attributes!

There are five attributes we recommend implementing in multiple input fields:
- [`role="group"`](#role-group)
- [`aria-labelledby` & `aria-describedby`](#aria-labelledby--aria-describedby)
- [`aria-label` & `aria-hidden`](#aria-label--aria-hidden)

#### `role="group"`

This role should be set on the parent `<div>`:
```diff
-<div class="o-forms-field">
+<div class="o-forms-field" role="group">
	...
</div>
```
This denominates the `<div>` as the element that holds a group of inputs, similar to the behaviour of a `<fieldset>`.  
[According to MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_group_role): 
>'A group should be used to form a logical collection of items with related functionality ...'

#### `aria-labelledby` & `aria-describedby`
This attribute should also be added to the parent `<div>`. It accepts an id, which should be set on `<span class="o-forms-title__main">`:
```diff
-<div class="o-forms-field">
+<div class="o-forms-field" role="group" aria-labelledby="example-group-title">
	<span class="o-forms-title">
-		<span class="o-forms-title__main">Group Title</span>
+		<span class="o-forms-title__main" id="example-group-title">Group Title</span>
		<span class="o-forms-title__prompt">Group info</span>
	</span>
	...
</div>
```

Using `aria-labelledby` will help us simulate the behaviour that a `<legend>` is responsible for, which is linking a title to a group. This difference is important because we have more than one input in a group, and each one of those inputs has their own label, independent of the group title. 

If we are using "prompt" text to provide further explanation about the group, we should use `aria-describedby`, with an id of its own, to provide that description, e.g.:
```diff
-<div class="o-forms-field" role="group" aria-labelledby="example-group-title">
+<div class="o-forms-field" role="group" aria-labelledby="example-group-title" aria-describedby="example-group-info">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title">Group Title</span>
-		<span class="o-forms-title__prompt">Group info</span>
+		<span class="o-forms-title__prompt" id="example-group-info">Group info</span>
		...
	</span>
	...
</div>
```

`aria-labelledby` and `aria-describedby` are similar attributes, though semantically they provide different functionality.
You can [read more about them on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute):

>A label provides essential information about an object, while a description provides extended information that the user might need.

#### `aria-label` & `aria-hidden`

Independently of whether or not a group of inputs is in a `<fieldset>` or a `<div>`, their structure exhibits a peculiar type of behaviour: AT will focus on the `<input>`, read out its label, and then focus on the label text, and read that out again. To avoid focusing on the label to provide a more natural 'tabbing' experience, we recommend combining `aria-label` and `aria-hidden` on the grouped inputs:

```diff
<label>
-	<input type="checkbox" name="default" value="checkbox1" checked=>
+	<input type="checkbox" name="default" value="checkbox1" checked aria-label="Checkbox 1">
-	<span class="o-forms-input__label">Checkbox 1</span>
+	<span class="o-forms-input__label" aria-hidden="true">Checkbox 1</span>
</label>
```

By defining what the label of the input is and hiding the actual label from the AT, we'll make the transition between inputs far smoother. 

_Note 1: `aria-label` also accepts an id if you would rather set an id on the input's label_

_Note 2: `aria-hidden` is sometimes used as a CSS selector to visually hide/show elements. However, it's primary functionality is to hide the contents of an element from the AT_


#### Example

Putting everything we've just seen together, our multiple input field should look like this:
```html
<div class="o-forms-field" role="group" aria-labelledby="example-group-title" aria-describedby="example-group-info">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="example-group-title">Group Title</span>
		<span class="o-forms-title__prompt" id="example-group-info">Group Info</span>
	</span>
	<span class="o-forms-input o-forms-input--checkbox">
		<label>
			<input type="checkbox" name="default" value="checkbox1" checked aria-label="Checkbox 1">
			<span class="o-forms-input__label" aria-hidden="true">Checkbox 1</span>
		</label>
		<label>
			<input type="checkbox" name="default" value="checkbox2" checked aria-label="Checkbox 2">
			<span class="o-forms-input__label" aria-hidden="true">Checkbox 2</span>
		</label>
		<label>
			<input type="checkbox" name="default" value="checkbox3" checked aria-label="Checkbox 3">
			<span class="o-forms-input__label" aria-hidden="true">Checkbox 3</span>
		</label>
	<span>
</div>
```

## Form Validation

_Phew_. Now that we've covered static attributes for our form elements, let's jump into dynamic form validation. There are many approaches to validating in an accessible way, and none are infallible due to the nature of ATs, but we'll cover what we've considered so far.

#### Native browser validation

Browsers have native form validation. This could mean different implementation details for different browsers, but overall, a browser will check input fields in a form against the [ValidityState interface](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState), which checks for pattern matches, whether input is present in a required field, among a few other conditions.

This means that invalid inputs will recieve messages tailored to describe the condition that has _not_ been met. These messages are presented in the language that the user has chosen for their browser. In addition to that, the browser will shift focus onto the first invalid input. Depending on the browser, the AT will read out the generated error message. 

The main problem with this approach is that there is no guarantee that the experience is consistent. Since browsers process this information differently and interact with screen readers differently, relying on native validation could lead to confusing behaviour for ATs. 


#### Non native validation

We do _not_ style the tool tip that the browser's message appears in, so frequently forms are given the `novalidate` attribute, which doesn't run any native validation on submit. This means that the messages can be overriden and styled according to the FT's design and the behaviour determined by the product's needs.

Primarily because of this, we've chosen to default to non-native validation, using [custom errors](./README.md#custom-errors) and to producing an [error summary](#error-summary) instead.

#### `aria-live` regions

At its core, `aria-live` is an attribute that can be set to an area of a document to denote that the AT should announce changes to that area. It is possible to determine what kind of changes it should recognise (additions, changes to text, etc), how forceful it should be in informing the user of the change (polite, assertive), alongside a few more advanced features.

`o-forms` cannot handle this attribute for you, and it can create an incoherent experience across browsers, so we generate an [error summary](#error-summary) instead.

If you choose not to use the error summary functionality that comes with `o-forms`, please consider adding the `aria-live` attribute to your markup, keeping the following in mind:
- this attribute accepts three politeness settings: off, polite or assertive. We recommend using polite, which will avoid interfering with any other actions the AT may be reading out.
- `aria-live` needs to be set on the markup so that the AT can register it when the document loads. Dynamically added regions won't be recognised. 
	- this means `o-forms` cannot add it to a form or its elements
- it shoud **not** be set to the document `<body>`, as it could overrun the AT with unnecessary information. 
	- in forms with many inputs we might end up with many live regions
- the information a region relays can get lost or confusing amidst a users interaction with the page
	- the validation–and change to the region–could happen on blur, on change, on input, on submit, &c

You can read more about [`aria-live` on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions).

#### Error summary

GDS has a [very good reference](https://design-system.service.gov.uk/components/error-summary/) for error handling.

Overall, it outlines that:
- There should be a summary of errors at the top of a page
- The focus should be shifted to that summary
- Each error should link to the input that is invalid
- Each invalid input should *also* have the error beneath/beside/above it

This means that not only will ATs have clear access to what has happend on the page, but it will be clear for any other user of the product's form.

`o-forms` implements this behaviour for you if the [error summary options is enabled](./README.md#form-instance)

If you would like help implementing anything you've read here, please [get in touch with the team](./README.md#contact). 

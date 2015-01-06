o-ft-forms [![Build Status](https://travis-ci.org/Financial-Times/o-ft-forms.png?branch=master)](https://travis-ci.org/Financial-Times/o-ft-forms)
============
## Overview

This module provides FT-branded styles for commonly used form elements and their corresponding validation states.

---

## Browser Support


This module is currently supported on IE8+ and modern browsers (Chrome, Firefox, Safari etc) version -1. It is also supported on i0S6+ and Chrome for Android > 4.3.0.

Known issues:

* Currently the prefixes and suffixes are not fully supported in IE =< 8.
* Checkboxes and radio buttons will not receive custom styling in IE =< 8, though they'll still receive default browser styling.
* The custom select dropdown icon is not supported in FF35; it currently reverts to the browser default.

---

## Usage

### Basic form field structure

Each form field is made up of at least 3 elements:

* A containing element defined by `.o-ft-forms__field-group`.
* Its label, defined by `.o-ft-forms__label`.
* One or more form controls (e.g. `input`, `select`, `textarea` elements), defined by `.o-ft-forms__field`.

Example HTML:

```html
<div class="o-ft-forms__field-group">
	<label class="o-ft-forms__label">Text input disabled</label>
	<input type="text" placeholder="placeholder" class="o-ft-forms__field">
</div>
```

All the standard form elements follow this basic structure, with some variation as defined below.

### Selects

Using the basic structure defined above, selects are styled by applying `.o-ft-forms__field--select` on the `select` element itself.
    
### Textareas

Textareas are styled by applying `.o-ft-forms__field--textarea` to the `textarea` element itself.
    
###Checkboxes and radio buttons

In order for checkboxes and radio buttons to be styled correctly, their `type` attribute must be set.

Example HTML:

 ```html
 <input type="radio"  class="o-ft-forms__field" />
 ```

###Validation states

Validation styles are applied by adding `.o-ft-forms--error` or `.o-ft-forms--valid` to the field's containing element. Child `.o-ft-forms__label` and `.o-ft-forms__field` elements will be styled appropriately.

An error message, defined with `.o-ft-forms__errortext`, can be appended to the containing element.

Example HTML:
```html
<div class="o-ft-forms__field-group o-ft-forms--error">
	<label class="o-ft-forms__label">Text input disabled</label>
	<input type="text" placeholder="placeholder" class="o-ft-forms__field" />
	<div class="o-ft-forms__errortext">Please enter a valid url</div>
</div>
```

### Section/group validation

For use-cases where validation rules need to be applied to a group of fields rather than just one field, all relevant fields should be wrapped in a block-level element defined with a class of `.o-ft-forms__section`. Validation styles can then be added to this element with the `.o-ft-forms__section--error` modifier class.

An error message can be prepended to the element, defined by a class of `.o-ft-forms-section__message--error`.

Example HTML:

```html
<fieldset class="o-ft-forms__section o-ft-forms__section--error">
	<div class="o-ft-forms-section__message--error">
 		<p>This is a section error message that highlights a group of fields</p>
	</div>
	<div class="o-ft-forms__field-group"></div>
</fieldset>
```

### Global validation

A global error message element exists for generic validation feedback and is defined with `.o-ft-forms__global-message--error`.

### Prefixes and suffixes

Prefixes and suffixes are used for prepending or appending static text to a form control. The form control should be wrapped in a block-level element with a class of `.o-ft-forms__affix-wrapper`. Prefixes (defined by `.o-ft-forms__prefix`) and suffixes (defined by `.o-ft-forms__suffix`) can then be prepended/appended to this wrapper element.

Example HTML:

```html
<div class="o-ft-forms__field-group">
	<label class="o-ft-forms__label">Text input with suffix label</label>
	<div class="o-ft-forms__affix-wrapper">
		<input type="text" class="o-ft-forms__field" value="" />
		<span class="o-ft-forms__suffix">.com</span>
	</div>
</div>
```

### Silent mode

All of the above can be used in silent mode by extending your own class using their placeholder equivalents:

```scss
.my-own-form-element {
	@extend %o-ft-forms__field-group;
	// custom styles
}
```

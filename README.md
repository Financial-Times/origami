o-forms [![Build Status](https://travis-ci.org/Financial-Times/o-forms.png?branch=master)](https://travis-ci.org/Financial-Times/o-forms)
============
## Overview

This module provides FT-branded styles for commonly used form elements and their corresponding validation states.

---

## Upgrading from 0.x.x

1. Search `o-ft-form` and replace with `o-form`
2. Search `oFtForm` and replace with `oForm`

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

* A containing element defined by `.o-forms__field-group`.
* Its label, defined by `.o-forms__label`.
* One or more form controls (e.g. `input`, `select`, `textarea` elements), defined by `.o-forms__field`.

Example HTML:

```html
<div class="o-forms__field-group">
	<label class="o-forms__label">Text input disabled</label>
	<input type="text" placeholder="placeholder" class="o-forms__field">
</div>
```

All the standard form elements follow this basic structure, with some variation as defined below.

### Selects

Using the basic structure defined above, selects are styled by applying `.o-forms__field--select` on the `select` element itself.
    
### Textareas

Textareas are styled by applying `.o-forms__field--textarea` to the `textarea` element itself.
    
###Checkboxes and radio buttons

In order for checkboxes and radio buttons to be styled correctly, their `type` attribute must be set.

Example HTML:

 ```html
 <input type="radio"  class="o-forms__field" />
 ```

###Validation states

Validation styles are applied by adding `.o-forms--error` or `.o-forms--valid` to the field's containing element. Child `.o-forms__label` and `.o-forms__field` elements will be styled appropriately.

An error message, defined with `.o-forms__errortext`, can be appended to the containing element.

Example HTML:
```html
<div class="o-forms__field-group o-forms--error">
	<label class="o-forms__label">Text input disabled</label>
	<input type="text" placeholder="placeholder" class="o-forms__field" />
	<div class="o-forms__errortext">Please enter a valid url</div>
</div>
```

### Section/group validation

For use-cases where validation rules need to be applied to a group of fields rather than just one field, all relevant fields should be wrapped in a block-level element defined with a class of `.o-forms__section`. Validation styles can then be added to this element with the `.o-forms__section--error` modifier class.

An error message can be prepended to the element, defined by a class of `.o-forms-section__message--error`.

Example HTML:

```html
<fieldset class="o-forms__section o-forms__section--error">
	<div class="o-forms-section__message--error">
 		<p>This is a section error message that highlights a group of fields</p>
	</div>
	<div class="o-forms__field-group"></div>
</fieldset>
```

### Global validation

A global error message element exists for generic validation feedback and is defined with `.o-forms__global-message--error`.

### Prefixes and suffixes

Prefixes and suffixes are used for prepending or appending static text to a form control. The form control should be wrapped in a block-level element with a class of `.o-forms__affix-wrapper`. Prefixes (defined by `.o-forms__prefix`) and suffixes (defined by `.o-forms__suffix`) can then be prepended/appended to this wrapper element.

Example HTML:

```html
<div class="o-forms__field-group">
	<label class="o-forms__label">Text input with suffix label</label>
	<div class="o-forms__affix-wrapper">
		<input type="text" class="o-forms__field" value="" />
		<span class="o-forms__suffix">.com</span>
	</div>
</div>
```

### Silent mode

All of the above can be used in silent mode by extending your own class using their placeholder equivalents:

```scss
.my-own-form-element {
	@extend %o-forms__field-group;
	// custom styles
}
```

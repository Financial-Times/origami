# o-forms [![Build Status](https://travis-ci.org/Financial-Times/o-forms.png?branch=master)](https://travis-ci.org/Financial-Times/o-forms)

## Overview

This module provides FT-branded styles for commonly used form elements and their corresponding validation states.

---

## Upgrading from 0.x.x

### 1. Module name change

`o-ft-forms` becomes `o-forms` in v1.

1. Search `o-ft-form` and replace with `o-form`
2. Search `oFtForm` and replace with `oForm`

### 2. Web fonts and icons

Webfonts and icons need to be loaded by your app.

### 3. Helper classes name changes

Change:

- `<input type="radio" class="o-ft-forms__field" />` > `<input type="radio" class="o-forms-radio" />`
- `<input type="checkbox" class="o-ft-forms__field" />` > `<input type="checkbox" class="o-forms-checkbox" />`
- `<input type="text" class="o-ft-forms__field" />` > `<input type="text" class="o-forms-text" />`
- `o-ft-forms__field-group` > `o-forms-group`
- `o-ft-forms__xxxx` > `o-forms-xxxx`
- Error messages are now all named `.o-forms-error-message`

Remove:
- `o-ft-forms__section` is deprecated. It was used on fieldsets and would reset them. Since fieldsets have browser-specific styling issues, prefer simple divs (removing the need for this class).

### 4. Mixins and placeholder classes

If using placeholder classes or extending styles using `oFormsClass` and `oFormsPlaceholderOptionalSelector`, use normal selectors, and include the matching mixins


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

* A containing element defined by `.o-forms-group`.
* Its label, defined by `.o-forms-label`.
* One or more form controls (e.g. `input`, `select`, `textarea` elements), defined by `.o-forms-text`, `.o-forms-select`, `.o-forms-textarea`.

Example HTML:

```html
<div class="o-forms-group">
	<label class="o-forms-label">Text input disabled</label>
	<input type="text" placeholder="placeholder" class="o-forms-text" />
</div>
```

All the standard form elements follow this basic structure, with some variation as defined below.

### Selects

Using the basic structure defined above, selects are styled by applying `.o-forms-select` on the `select` element itself.
    
### Textareas

Textareas are styled by applying `.o-forms-textarea` to the `textarea` element itself.
    
###Checkboxes and radio buttons

In order for checkboxes and radio buttons to be styled correctly, their `type` attribute must be set.

Example HTML:

 ```html
 <input type="radio"  class="o-forms-radio" />
 ```

###Validation states

Validation styles are applied by adding `.o-forms--error` or `.o-forms--valid` to the field's containing element (typically, `.o-forms-group`). Child `.o-forms-label`, `.o-forms-text`, `.o-forms-select`, `.o-forms-checbox`, `.o-forms-radio`, `.o-forms-textarea` elements will be styled appropriately.

An error message, defined with `.o-forms-errortext`, can be appended to the containing element.

Example HTML:
```html
<div class="o-forms-group o-forms-error">
	<label class="o-forms-label">Text input disabled</label>
	<input type="text" placeholder="placeholder" class="o-forms-text" />
	<div class="o-forms-errortext">Please enter a valid url</div>
</div>
```

### Section/group validation

For use-cases where validation rules need to be applied to a group of fields rather than just one field, all relevant fields should be wrapped in a block-level element defined with a class of `.o-forms-section`. Validation styles can then be added to this element with the `.o-forms-section--error` modifier class.

An error message can be prepended to the element, defined by a class of `.o-forms-error-wrapper`.

Example HTML:

```html
<div class="o-error-wrapper">
	<div class="o-forms-message o-forms-message--error">
 		<p>This is a section error message that highlights a group of fields</p>
	</div>
	<div class="o-forms-group"></div>
</div>
```

### Global validation

A global error message element exists for generic validation feedback and is defined with `.o-forms-message.o-forms-message--error`.

### Prefixes and suffixes

Prefixes and suffixes are used for prepending or appending static text to a form control. The form control should be wrapped in a block-level element with a class of `.o-forms-affix-wrapper`. Prefixes (defined by `.o-forms-prefix`) and suffixes (defined by `.o-forms-suffix`) can then be prepended/appended to this wrapper element.

Example HTML:

```html
<div class="o-forms-group">
	<label class="o-forms-label">Text input with suffix label</label>
	<div class="o-forms-affix-wrapper">
		<input type="text" class="o-forms-text" value="" />
		<span class="o-forms-suffix">.com</span>
	</div>
</div>
```

### Silent mode

Base form styles are available:

```scss
#TODO
```

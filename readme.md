o-ft-forms [![Build Status](https://travis-ci.org/Financial-Times/o-ft-forms.png?branch=master)](https://travis-ci.org/Financial-Times/o-ft-forms)
============
##Overview

This module provides FT-branded styles for commonly used form elements and there corresponding validation states.

---

## Browser Support


This module is currently supported on IE8+ and modern browsers (Chrome, Firefox, Safari etc) version -1 . It is also supported on i0S6+ and Chrome for Android >4.3.0.

Known issues:

Currently the prefixes and suffixes are not fully supported in >=IE8.
The custom select dropdown icon is not supported in FF35, it currently reverts to the browser default.

---

##Usage

####Basic form input structure.

Each input is made up 3 core elements, it's containing element defined by:

    .o-ft-forms__field-group

it's label are defined by:

    .o-ft-forms__label

and the input/s defined by:

    .o-ft-forms__field

Example HTML:

```html
	<div class="o-ft-forms__field-group">
	<label class="o-ft-forms__label">Text input disabled</label>
	<input type="text" placeholder="placeholder" class="o-ft-forms__field">
	</div>
```

####Basic validation

Validation styles are applied by including either:

    .o-ft-forms--error

    .o-ft-forms--valid

The error message is a 4th element included in the basic `o-ft-forms__field-group` with:

    .o-ft-forms__errortext

Example HTML:
```html
    <div class="o-ft-forms__field-group o-ft-forms--error">
        <label class="o-ft-forms__label">Text input disabled</label>
        <input type="text" placeholder="placeholder" class="o-ft-forms__field">
        <div class="o-ft-forms__errortext">Please enter a valid url</div>
    </div>
```

All the form elements follow this basic structure with some variation applied to specific types such as checkbox groups as defined below.

#### Select dropdown boxes

Using the basic structure defined above select boxes are styled on the select element itself with:

    .o-ft-forms__select

#### Check and radio boxes

These are defined with their generic input types and the class

    .o-ft-forms__field

Example HTML:

 ```html<input type="radio"  class="o-ft-forms__field">```


####Section/group validation

For user cases where validation rules need to be applied on a group of fields rather than at field level this can be done within a fieldset defined by:

    .o-ft-forms__section

Example HTML:

```html
 <fieldset class="o-ft-forms__section o-ft-forms__section--error">
 	<div class="o-ft-forms-section__message--error">
 		<p>This is a section error message that highlights a group of fields</p>
	</div>
	<div class="o-ft-forms__field-group">
</fieldset>
```

####Global validation

A global message element exist for generic validation error feedback and can be defined with:

    .o-ft-forms__global-message--error

####Prefixes and suffixes

Require classes:

    .o-ft-form__field-group--affixed
    .o-ft-forms__affix-wrapper
    .o-ft-forms__field--prefixed
    .o-ft-forms__field--suffixed
    .o-ft-forms__prefix
    .o-ft-forms__suffix


For example a basic text input with suffix would be contained within '.o-ft-forms-field-group--affixed' with the input and suffix span contained within '.o-ft-forms__affix-wrapper'

Example HTML:

```html
    <div class="o-ft-forms-field-group o-ft-forms-field-group--affixed">
     <label class="o-ft-forms__label">Text input with suffix label</label>
     <div class="o-ft-forms__affix-wrapper">
        <input type="text" class="o-ft-forms__field o-ft-forms__field--suffixed" />
        <span class="o-ft-forms__suffix">.com</span>
      </div>
    </div>
```

####Placeholder classes/@extend

All of the above can be used in silent mode by extending your own class using their placeholder equivalents:

    .my-own-form-element {
        @extends %o-ft-forms__field-group;
    //custom styles
    }


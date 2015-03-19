# o-forms [![Build Status](https://travis-ci.org/Financial-Times/o-forms.png?branch=master)](https://travis-ci.org/Financial-Times/o-forms)

FT-branded styles for commonly used form elements.

Upgrading from v0.x.x? [Follow these instructions](#upgrade-to-v1).

## Usage

### Basic form field structure

Each form field is made up of at least 3 elements:

* A containing element defined by `.o-forms-group`.
* Its label, defined by `.o-forms-label`.
* One or more form controls (e.g. `input`, `select`, `textarea` elements), defined by `.o-forms-text`, `.o-forms-select`, `.o-forms-textarea`.

```html
<div class="o-forms-group">
	<label class="o-forms-label">Text input</label>
	<input type="text" class="o-forms-text" />

	<label class="o-forms-label">Small text input</label>
	<input type="text" class="o-forms-text o-forms-text--small" />
</div>
```

[Text input examples](http://build.origami.ft.com/files/o-forms@%5E1/demos/text-inputs.html)  

### Select boxes

```html
<div class="o-forms-group">
	<label class="o-forms-label">Select box</label>
	<select class="o-forms-select">
		<option value="option1">Option 1</option>
		<option value="option2">Option 2</option>
		<option value="option3">Option 3</option>
		<option value="option4">Option 4</option>
	</select>
</div>
```

[Select boxes examples](http://build.origami.ft.com/files/o-forms@%5E1/demos/select-boxes.html)  
    
### Textareas

```html
<div class="o-forms-group">
	<label class="o-forms-label">Textarea</label>
	<textarea placeholder="placeholder" class="o-forms-textarea"></textarea>
</div>
```

[Textarea examples](http://build.origami.ft.com/files/o-forms@%5E1/demos/textareas.html)

### Checkboxes and radio controls

Couple the checkboxes and radio controls with a label to obtain the desired styles:

```html
<!-- Radio -->
<div class="o-forms-group">
	<input id="a" type="radio" class="o-forms-radio" />
	<label for="a">Unchecked (default)</label>
	<input id="a" type="radio" class="o-forms-radio" checked="checked" />
	<label for="a">Checked</label>
</div>

<!-- Checkboxes -->
<div class="o-forms-group">
	<input id="a" type="checkbox" class="o-forms-checkbox" />
	<label for="a">Unchecked (default)</label>
	<input id="a" type="checkbox" class="o-forms-checkbox" checked="checked" />
	<label for="a">Checked</label>
</div>

<!-- Small size -->
<input type="radio" class="o-forms-radio o-forms-radio--small" />
<input type="checkbox" class="o-forms-checkbox o-forms-checkbox--small" />

<!-- Make the checkbox or radio control look more prominent when checked: -->
<input type="radio" class="o-forms-radio o-forms-radio--highlight" />
<input type="checkbox" class="o-forms-checkbox o-forms-checkbox--highlight" />
```

[Radio control examples](http://build.origami.ft.com/files/o-forms@%5E1/demos/radios.html)  
[Checkbox examples](http://build.origami.ft.com/files/o-forms@%5E1/demos/checkboxes.html)

### Validation states

Validation styles are applied by adding `.o-forms--error` or `.o-forms--valid` to the field's containing element (typically, `.o-forms-group`). Child `.o-forms-label`, `.o-forms-text`, `.o-forms-select`, `.o-forms-checbox`, `.o-forms-radio`, `.o-forms-textarea` elements will be styled appropriately.

An error message, defined with `.o-forms-errortext`, can be appended to the containing element.

Example HTML:
```html
<div class="o-forms-group o-forms--error">
	<label class="o-forms-label">Text input</label>
	<input type="text" placeholder="placeholder" class="o-forms-text" />
	<div class="o-forms-errortext">Please enter a valid url</div>
</div>
```

### Wrappers

You can wrap a group of fields to highlight it or show it is not valid:

```html
<div class="o-forms-wrapper o-forms-wrapper--highlight">
	<div class="o-forms-group">Fields in this group are highlighted</div>
</div>

<div class="o-forms-wrapper o-forms-wrapper--error">
	<div class="o-forms-message o-forms-message--error">
 		<p>This is an error message</p>
	</div>
	<div class="o-forms-group">Fields in this group are invalid</div>
</div>
```

[Wrapper examples](http://build.origami.ft.com/files/o-forms@%5E1/demos/wrappers.html)

### Messages

```html
<div class="o-forms-message o-forms-message--highlight">
	<p>This is a global message that highlights some text</p>
</div>

<div class="o-forms-message o-forms-message--error">
	<p>This is a global error message that relates to the entire form</p>
</div>
```

[Messages examples](http://build.origami.ft.com/files/o-forms@%5E1/demos/messages.html)

### Prefixes and suffixes

Prefixes and suffixes are used for prepending or appending static text to a form control. The form control should be wrapped in a block-level element with a class of `.o-forms-affix-wrapper`. Prefixes (defined by `.o-forms-prefix`) and suffixes (defined by `.o-forms-suffix`) can then be prepended/appended to this wrapper element.

```html
<div class="o-forms-group">
	<div class="o-forms-affix-wrapper">
		<span class="o-forms-prefix">http://</span>
		<input type="text" class="o-forms-text" />
		<div class="o-forms-suffix">
			<button type="button" class="o-buttons">Go</button>
		</div>
	</div>
</div>
```

[Prefixes and suffixes examples](http://build.origami.ft.com/files/o-forms@%5E1/demos/prefix-suffix.html)

### Silent mode

Base form styles are available in silent mode. [Browse the SassDoc documentation of the module](http://sassdoc.webservices.ft.com/v1/sassdoc/o-forms).

----

## Browser Support

|  Browsers  |          |
|:----------:|:--------:|
|   Chrome   |    35+   |
|   Android  |  4.0.3+  |
|   Firefox  |    29+   |
|   iOS      |    6+    |
|   Safari   |    6+    |
|   IE       |    9+    |

Known issues:

* Checkboxes and radio controls will not receive custom styling in IE =< 8, though they'll still receive default browser styling
* In older versions of Firefox and depending on the version of the operating system, the select dropdowns might a default system arrow *and* a decorated arrow
* In some browsers (e.g. iOS 6, Android < 4.4…) there is no space between the select arrow and the right edge of the element. This is caused by a lack of [CSS background-position edge offsets](http://caniuse.com/#feat=css-background-offsets)

There are a number of inconsistencies in how browsers handle form events, validation and auto-fill. The Membership team has [documented the quirks](https://sites.google.com/a/ft.com/membership-subscriptions/sign-up-registration/technical-documentation/front-end-development-notes/browser-inconsistencies) it ran into during the development of the Sign Up app.

----

<a name="upgrade-to-v1"></a>

## Upgrading from 0.x.x

### 1. Module name change

`o-ft-forms` becomes `o-forms` in v1.

1. Search `o-ft-forms` and replace with `o-forms`
2. Search `oFtForms` and replace with `oForms`

### 2. Web fonts and icons

In the v0.x.x of o-forms, the module loaded webfonts itself and was setting its own font-family.

The module now inherits the `font-family` set in your application and doesn't embed web fonts anymore.

Solution: products must load webfonts themselves (tipically, with [o-fonts](https://github.com/Financial-Times/o-fonts) and [o-ft-icons](https://github.com/Financial-Times/o-ft-icons)).

```html
<!-- Load web fonts and icons with @font-face declarations  -->
<link rel="stylesheet" href="//build.origami.ft.com/bundles/css?modules=o-fonts@^1,o-ft-icons@^2.3.4" />

<!-- Set the font family on the whole document -->
<style>
	html {
		font-family: BentonSans, sans-serif;
	}
</style>
```

### 3. Helper classes name changes

The most important change is with input elements, that now have their own classes:

```diff
-<input type="radio" class="o-ft-forms__field" />
+<input type="radio" class="o-forms-radio" />
 
-<input type="checkbox" class="o-ft-forms__field" />
+<input type="checkbox" class="o-forms-checkbox" />
 
-<input type="text" class="o-ft-forms__field" />
+<input type="text" class="o-forms-text" />
```

- `o-ft-forms__field-group` > `o-forms-group`
- `o-ft-forms__field--textarea` becomes `o-forms-textarea`
- `o-ft-forms__field--select` becomes `o-forms-select`
- Any `o-ft-forms__xxxx` becomes `o-forms-xxxx`
- Search templates for `o-ft-forms__global-message--error` and replace with `o-forms-message o-forms-message--error`
- Search templates for `o-forms-error-wrapper` and replace with `o-forms-wrapper o-forms-wrapper--error`

`o-ft-forms__section` is deprecated: sections (previously `<fieldset class="o-ft-forms__section">`) have to be styled at a product level. Since fieldsets have browser-specific styling issues, prefer `<div>` elements.

### 4. Mixins and placeholder classes

If using placeholder classes or extending styles using `oFormsClass` and `oFormsPlaceholderOptionalSelector`, use normal selectors, and include the matching mixins, documented in the [SassDoc documentation of the module](http://sassdoc.webservices.ft.com/v1/sassdoc/o-forms).

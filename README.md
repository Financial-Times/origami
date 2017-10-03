# o-forms [![CircleCI](https://circleci.com/gh/Financial-Times/o-forms.png?style=shield&circle-token=8d39afee1e3c3b1f586770034db9673b791cb4f8)](https://circleci.com/gh/Financial-Times/o-forms)

FT-branded styles for form elements.

- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
	- [JavaScript](#javascript)
- [Troubleshooting](#troubleshooting)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)


## Usage

### Markup

Each form field is made up of at least 3 elements:

* A containing element defined by `.o-forms`.
* Its label, defined by `.o-forms__label`.
* One or more form controls (e.g. `input`, `select`, `textarea` elements), defined by `.o-forms__text`, `.o-forms__select`, `.o-forms__textarea`.

```html
<div class="o-forms">
	<label class="o-forms__label">Text input</label>
	<input type="text" class="o-forms__text" />
</div>
```

[Text input examples](https://www.ft.com/__origami/service/build/v2/demos/o-forms/text-inputs)

#### Select boxes

```html
<div class="o-forms">
	<label class="o-forms__label">Select box</label>
	<select class="o-forms__select">
		<option value="option1">Option 1</option>
		<option value="option2">Option 2</option>
		<option value="option3">Option 3</option>
		<option value="option4">Option 4</option>
	</select>
</div>
```

[Select boxes examples](https://www.ft.com/__origami/service/build/v2/demos/o-forms/select-boxes)

#### Textareas

```html
<div class="o-forms">
	<label class="o-forms__label">Textarea</label>
	<textarea placeholder="placeholder" class="o-forms__textarea"></textarea>
</div>
```

[Textarea examples](https://www.ft.com/__origami/service/build/v2/demos/o-forms/textareas)

#### Checkboxes and radio controls

Couple the checkboxes and radio controls with a label to obtain the desired styles. Add a wrapper and data attribute `data-o-form-toggle` to checkboxes to make them look like toggles:

```html
<!-- Radio -->
<div class="o-forms">
	<input id="a" type="radio" class="o-forms__radio" />
	<label for="a">Unchecked (default)</label>
	<input id="a" type="radio" class="o-forms__radio" checked="checked" />
	<label for="a">Checked</label>
</div>

<!-- Checkboxes -->
<div class="o-forms">
	<input id="a" type="checkbox" class="o-forms__checkbox" />
	<label for="a">Unchecked (default)</label>
	<input id="a" type="checkbox" class="o-forms__checkbox" checked="checked" />
	<label for="a">Checked</label>
</div>

<!-- Checkbox Toggles -->
<form action="" data-o-component="o-forms">
	<fieldset class="o-forms">
		<legend class="o-forms__label">Checkbox Toggle</legend>
		<div class="o-forms__checkbox-toggle">
			<input data-o-form-toggle type="checkbox" id="a" checked="checked" />
			<label for="a" class="o-forms__label">Checkbox Toggle a</label>
		</div>
		<div class="o-forms__checkbox-toggle">
			<input data-o-form-toggle type="checkbox" id="b" />
			<label for="b" class="o-forms__label">Checkbox Toggle b</label>
		</div>
	</fieldset>
</form>
```

[Radio control examples](https://www.ft.com/__origami/service/build/v2/demos/o-forms/radios)
[Checkbox examples](https://www.ft.com/__origami/service/build/v2/demos/o-forms/checkboxes)
[Toggle Checkbox examples](https://www.ft.com/__origami/service/build/v2/demos/o-forms/checkbox-toggle)

#### Validation states

Validation styles are applied by adding `.o-forms--error` or `.o-forms--valid` to the field's containing element (typically, `.o-forms`). Child `.o-forms__label`, `.o-forms__text`, `.o-forms__select`, `.o-forms__checkbox`, `.o-forms__radio`, `.o-forms__textarea` elements will be styled appropriately.

An error message, defined with `.o-forms__errortext`, can be appended to the containing element.

Example HTML:
```html
<div class="o-forms o-forms--error">
	<label class="o-forms__label">Text input</label>
	<input type="text" placeholder="placeholder" class="o-forms__text" />
	<div class="o-forms__errortext">Please enter a valid url</div>
</div>
```

#### Wrappers

You can wrap a group of fields to highlight it or show it is not valid:

```html
<div class="o-forms__wrapper o-forms__wrapper--highlight">
	<div class="o-forms">Fields in this group are highlighted</div>
</div>

<div class="o-forms__wrapper o-forms__wrapper--error">
	<div class="o-forms__message o-forms__message--error">
 		<p>This is an error message</p>
	</div>
	<div class="o-forms">Fields in this group are invalid</div>
</div>
```

[Wrapper examples](https://www.ft.com/__origami/service/build/v2/demos/o-forms/wrappers)

#### Messages

```html
<div class="o-forms__message">
	<p>This is a global message that highlights some text</p>
</div>

<div class="o-forms__message o-forms__message--error">
	<p>This is a global error message that relates to the entire form</p>
</div>
```

[Messages examples](https://www.ft.com/__origami/service/build/v2/demos/o-forms/messages)

#### Prefixes and suffixes

Prefixes and suffixes are used for prepending or appending static text to a form control. The form control should be wrapped in a block-level element with a class of `.o-forms__affix-wrapper`. Prefixes (defined by `.o-forms__prefix`) and suffixes (defined by `.o-forms__suffix`) can then be prepended/appended to this wrapper element.

```html
<div class="o-forms">
	<div class="o-forms__affix-wrapper">
		<span class="o-forms__prefix">http://</span>
		<input type="text" class="o-forms__text" />
		<div class="o-forms__suffix">
			<button type="button" class="o-buttons">Go</button>
		</div>
	</div>
</div>
```

[Prefixes and suffixes examples](https://www.ft.com/__origami/service/build/v2/demos/o-forms/prefix-suffix)

#### "unskin" a form element

Add the class `o-forms--unskin` to a text field to reset its appearance while keeping its vertical structure and other field properties (editable, focusable).

```html
<input type="text" class="o-forms--unskin" value="foo" />
```

Properties of the `o-forms--unskin` class:

- removes borders and rounded corners
- removes the background color
- removes the inner shadow added by some browsers
- removes left-right spacing / padding
- removes the "form field" appearance in supported browsers
- editable
- focusable


### Sass

#### Silent mode

In silent mode `o-forms` provides mixins for each set of form fields as well as some mixins to output basic form styles in one large chunk.

#### oForms mixin

The `oForms` mixin will output styles for the `o-forms` block, as well as all basic input styles supported by `o-forms` (`text`, `select`, `textarea`, `checkboxes` and `radio` buttons) as well as `labels`, valid and error states and, error text and helper text.

```sass
@import 'o-forms/main';

@include oForms;
```

The `oForms` mixin also allows customisation of the base classname:

```sass
@include oForms('my-forms');
```

#### Additional features

`o-forms` provides some additional features that can be included separately using their own mixins.

- `oFormsWrapper` - an area around the form, which can be coloured.
- `oFormsMessage` - styles for global form messages.
- `oFormsPrefixSuffix` - adds ability to affix information/buttons to form fields.
- `oFormsUnskin` - removes all default styling from a field.

For more details on specific mixins [browse the SassDoc documentation of the module](http://sassdoc.webservices.ft.com/v1/sassdoc/o-forms).

### JavaScript

`o-forms` provides some JavaScript to help with validating form inputs. The validation works with the browsers built-in validation API to add the appropriate `o-forms` classes when a user is completing or submitting a form.

By default, `o-forms` listens to the `blur` event of an input field, when a user leaves a field, the input will be validated and if an invalid input is found, the error class will be added to the input.

Additionally `o-forms` fires an event `oForms.toggled` when a toggle checkbox is clicked.

#### Constructing

An o-forms object must be constructed for every `<form>` element you have on your page that you want to validate with this module. You can do this for explicit elements like so:

```js
const OForms = require('o-forms');
const formsEl = document.querySelector('#form-element');

const forms = new OForms(formsEl);
```

Alternatively, an o.DOMContentLoaded event can be dispatched on the document to auto-construct an o-forms object for each element with a `data-o-component="o-forms"` attribute:

```js
require('o-forms');
document.addEventListener("DOMContentLoaded", function() {
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

#### Validate on form submit

By default `o-forms` tests inputs on the `blur` event for each input. To defer the validation to the `submit` event of the form, you can pass an config object to set the `testEvent` when constructing `o-forms`:

```js
const OForms = require('o-forms');
const formsEl = document.querySelector('#form-element');

const forms = new OForms(formsEl, { testEvent: 'submit' });
```

Or you can set an attribute on the `<form>` element to declaratively set the test event:

```html
<form data-o-component="o-forms" data-o-forms-test-event="submit">
	[...]
</form>
```

#### Listening to a toggle change
Listening for the `oTable.toggled` event we can react to the status of a toggle checkbox. This event is fired when the toggle checkbox is clicked.
```
document.addEventListener('oTable.toggled', (event) => {
	console.log(`${event.target.id} is ${(event.target.checked ? 'on' : 'off')}`);
}, false);
```

## Troubleshooting:

* Checkboxes and radio controls will not receive custom styling in IE =< 8, though they'll still receive default browser styling
* In older versions of Firefox and depending on the version of the operating system, the select dropdowns might a default system arrow *and* a decorated arrow
* In some browsers (e.g. iOS 6, Android < 4.4…) there is no space between the select arrow and the right edge of the element. This is caused by a lack of [CSS background-position edge offsets](http://caniuse.com/#feat=css-background-offsets)

There are a number of inconsistencies in how browsers handle form events, validation and auto-fill. The Membership team has [documented the quirks](https://sites.google.com/a/ft.com/membership-subscriptions/sign-up-registration/technical-documentation/front-end-development-notes/browser-inconsistencies) it ran into during the development of the Sign Up app.


----

## Migration Guide

## Upgrading from v3.x.x or v4.x.x
- A dependency on [o-typography](http://github.com/financial-times/o-typography) v5 has been introduced. This will break any builds that use o-typography <v5. __Resolution__: Update to o-typography v5.
- The o-colors dependency has been updated to `^4`. This could create bower conflicts which should be resolved by updating to the newest release of o-colors.
- The design for o-forms has changed in v4. This could create issues on your pages which make use of o-forms. Ensure that the updated design does not break the layout on your webpage.

----

## Upgrading from v2.x.x or v3.x.x

The main change in `v2` is that classes provided by `o-forms` now conform more strictly to the [BEM naming convention][bem]. All form field classes now follow the element convention, so `o-forms-text` is now `o-forms__text`.

There is also now a main block class of `o-forms` which replaces the previous `o-forms-group` class. Full class changes are below:

- `o-forms-group` becomes `o-forms`
- Search templates for `o-forms-xxxxx` and replace with `o-forms__xxxxx`

An example of the changes should be:

```diff
-<div class="o-forms-group">
+<div class="o-forms">

-<label class="o-forms-label"></label>
+<label class="o-forms__label"></label>

-<input type="radio" class="o-forms-radio" />
+<input type="radio" class="o-forms__radio" />

-<input type="checkbox" class="o-forms-checkbox" />
+<input type="checkbox" class="o-forms__checkbox" />

-<input type="text" class="o-forms-text" />
+<input type="text" class="o-forms__text" />
```

Any modifier classes like `o-forms--error` have remained the same.


----

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
<link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v2/bundles/css?modules=o-fonts@^3.0.0,o-icons@^5.0.0" />

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


---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-forms/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

[bem]: http://getbem.com/naming/

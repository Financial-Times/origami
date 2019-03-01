# o-forms [![CircleCI](https://circleci.com/gh/Financial-Times/o-forms.png?style=shield&circle-token=8d39afee1e3c3b1f586770034db9673b791cb4f8)](https://circleci.com/gh/Financial-Times/o-forms) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

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
* One or more form controls e.g. `input`, `select`, `textarea` elements, defined by `.o-forms__text`, `.o-forms__select`, `.o-forms__textarea` etc.

```html
<div class="o-forms">
	<label for="o-forms-demo-text" class="o-forms__label">Text input example</label>
	<input type="text" id="o-forms-demo-text" class="o-forms__text" required />
</div>
```

#### Inline forms

By default `o-forms` is stacked but form fields may also be displayed inline by adding a modifier `o-forms--inline`.

```html
<div class="o-forms o-forms--inline">
	<label for="o-forms-demo-text" class="o-forms__label">Text input example</label>
	<input type="text" id="o-forms-demo-text" class="o-forms__text" required />
</div>
```

Inline forms must wrap multiple messaging elements, such as a label and additional information, using `o-forms__inline-item`.

```html
<div class="o-forms o-forms--inline">
    <div class="o-forms__inline-item">
	    <label for="o-forms__textarea" class="o-forms__label">Label</label>
	    <div class="o-forms__additional-info">Additional information</div>
    </div>
	<!-- input markup -->
</div>
```

If `o-forms` is used on a `fieldset` a wrapper `o-forms__inline-container` must also be addded.

```html
<fieldset class="o-forms o-forms--inline">
    <div class="o-forms__inline-container">
        <legend class="o-forms__label">Legend</legend>
        <!-- radio button markup -->
    </div>
</fieldset>
```

Using `o-forms--inline-controls` instead of `o-forms--inline` keeps the inputs inline from mobile viewports upwards. It also expands the label forcing the inputs to align right. This is useful for long lists of simple styled radio buttons which are used as controls, e.g. repeated yes/no options. For an example see [the registry](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-inline-controls).

```html
<fieldset class="o-forms o-forms--inline-controls">
    <div class="o-forms__inline-container">
        <legend class="o-forms__label">Legend</legend>
        <!-- styled radio button markup -->
    </div>
</fieldset>
```

Inline forms offer more options. For full demo markup see [inline examples](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-inline) on the Origami Registry.

#### Additonal field information

It is possible to add additional information to form fields with `.o-forms__additional-info`. Additonal information is not limited to a text input, it could also apply against a `select`, `textarea`, `checkbox`, etc.

Note that the label has an `aria-describedby` attribute which matches the `id` of the additional information. This enables screen readers to automatically read the additonal information after reading the form label.

```html
<div class="o-forms">
	<label aria-describedby="demo-additional-info" for="demo-text-input" class="o-forms__label">Text input example</label>
	<div id="demo-additional-info" class="o-forms__additional-info">Additional info follows the label if required.</div>
	<input type="text" id="demo-text-input" class="o-forms__text" required />
</div>
```

#### Optional fields

To indicate to the user that a field is optional, add the `.o-forms__label--optional` class to the label of the field. Any field label can be marked optional in this way.

```html
<div class="o-forms">
	<label for="o-forms-demo-optional" class="o-forms__label o-forms__label--optional">Optional  input example</label>
	<input type="text" id="o-forms-demo-optional" class="o-forms__text" />
</div>
```

#### Wide fields

The class `.o-forms--wide` can be used to show form fields without width restrictions. This is demonstrated below with a text input but can apply to any `.o-forms` field.

```html
<div class="o-forms o-forms--wide">
	<label for="o-forms-full" class="o-forms__label">Text input full width</label>
	<input type="text" id="o-forms-full" class="o-forms__text o-forms__text--valid" value="Field value" />
</div>
```

Alternatively for a wide field without the default horizontal padding use `.o-forms--bleed`.

```html
<div class="o-forms o-forms--bleed">
	<label for="o-forms-full" class="o-forms__label">Text input full width</label>
	<input type="text" id="o-forms-full" class="o-forms__text o-forms__text--valid" value="Field value" />
</div>
```

#### Text inputs

The markup above demonstrates how to use text inputs. More [text input examples](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-text-input) are available on the Origami Registry.

#### Textareas

```html
<div class="o-forms">
	<label for="o-forms-demo-textarea" class="o-forms__label">Textarea</label>
	<textarea id="o-forms-demo-textarea" class="o-forms__textarea"></textarea>
</div>
```

[Textarea examples](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-textarea)

#### Select boxes

```html
<div class="o-forms">
	<label for="o-forms-demo-select" class="o-forms__label">Select box</label>
	<select id="o-forms-demo-select" class="o-forms__select">
		<option value="option1" selected>Option 1</option>
		<option value="option2">Option 2</option>
		<option value="option3">Option 3</option>
		<option value="option4">Option 4</option>
	</select>
</div>
```

[Select boxes examples](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-select-box)

#### Checkbox and radio controls

Unlike other inputs, multiple `checkbox` and `radio` inputs should be wrapped in  `.o-forms__group` to ensure correct vertical spacing.

```html
<!-- Radio -->
<fieldset class="o-forms">
	<legend class="o-forms__label">Default radio controls</legend>
	<div class="o-forms__additional-info">Prompt text follows the legend if required.</div>
	<div class="o-forms__group">
		<input type="radio" name="radio" value="1" class="o-forms__radio" id="radio11" checked="checked" />
		<label for="radio11" class="o-forms__label">Radio 1</label>
		<input type="radio" name="radio" value="2" class="o-forms__radio" id="radio12" />
		<label for="radio12" class="o-forms__label">Radio 2</label>
	</div>
</fieldset>

<!-- Checkboxes -->
<fieldset class="o-forms">
	<legend class="o-forms__label">Default checkboxes</legend>
	<div class="o-forms__group">
		<input type="checkbox" name="checkbox" value="1" class="o-forms__checkbox" id="checkbox11" checked="checked" />
		<label for="checkbox11" class="o-forms__label">Checkbox 1</label>
		<input type="checkbox" name="checkbox" value="2" class="o-forms__checkbox" id="checkbox12" />
		<label for="checkbox12" class="o-forms__label">Checkbox 2</label>
		<input type="checkbox" name="checkbox" value="3" class="o-forms__checkbox" id="checkbox13" />
		<label for="checkbox13" class="o-forms__label">Checkbox 3</label>
	</div>
</fieldset>
```

To display checkboxes/radios inline add `.o-forms__group--inline` to their group wrapper.

```html
<!-- Inline Radio -->
<fieldset class="o-forms">
	<legend class="o-forms__label">Radio controls inline</legend>
	<div class="o-forms__group o-forms__group--inline">
		<input type="radio" name="radio" value="1" class="o-forms__radio" id="radio41" checked="checked" />
		<label for="radio41" class="o-forms__label">Radio 1</label>
		<input type="radio" name="radio" value="2" class="o-forms__radio" id="radio42" />
		<label for="radio42" class="o-forms__label">Radio 2</label>
	</div>
</fieldset>

<!-- Inline Checkboxes -->
<fieldset class="o-forms">
	<legend class="o-forms__label">Inline checkboxes</legend>
	<div class="o-forms__group o-forms__group--inline">
		<input type="checkbox" name="checkbox" value="1" class="o-forms__checkbox" id="checkbox61" checked="checked" />
		<label for="checkbox61" class="o-forms__label">Checkbox 1</label>
		<input type="checkbox" name="checkbox" value="2" class="o-forms__checkbox" id="checkbox62" />
		<label for="checkbox62" class="o-forms__label">Checkbox 2</label>
	</div>
</fieldset>
```

[Radio control examples](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-radio-buttons)
[Checkbox examples](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-checkboxes)

#### Styled radio buttons

To produce styled radio buttons wrap radio inputs with  `.o-forms__group .o-forms__group--inline-together` and use the class `.o-forms__radio-button` on the radio input.

```html
<!-- Styled radio buttons -->
<fieldset class="o-forms">
    <legend class="o-forms__label">Styled radio buttons with a default selection</legend>
    <div class="o-forms__group o-forms__group--inline-together">
        <input type="radio" name="radio5" value="daily" class="o-forms__radio-button" id="radio51"
               checked="checked" />
        <label for="radio51" class="o-forms__label">Daily</label>
        <input type="radio" name="radio5" value="weekly" class="o-forms__radio-button" id="radio52" />
        <label for="radio52" class="o-forms__label">Weekly</label>
        <input type="radio" name="radio5" value="monthly" class="o-forms__radio-button" id="radio53" />
        <label for="radio53" class="o-forms__label">Monthly</label>
    </div>
</fieldset>
```

[Styled radio button examples](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-radios-with-button-styling)


#### Suffixes

Suffixes are used to append content to an input, i.e. a button. Add a wrapper `.o-forms__affix-wrapper` to contain both the input and its suffix `.o-forms__suffix`. The suffix `.o-forms__suffix` wraps suffix content, i.e. a button.

```html
<div class="o-forms">
	<label class="o-forms__label" for="text-suffix">Text input with suffix button</label>
	<div class="o-forms__affix-wrapper">
		<input id="text-suffix" type="text" class="o-forms__text" />
		<div class="o-forms__suffix">
			<button type="button" class="o-buttons o-buttons--secondary o-buttons--big">Go</button>
		</div>
	</div>
</div>
```

[Suffixes examples](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-suffix)

#### Toggles (checkbox toggles)

To produce a toggle interface wrap checkboxes in `.o-forms__toggle` and add the data attribute `data-o-form-toggle` to the checkbox input.

```html
<!-- Toggle -->
<fieldset class="o-forms">
	<legend class="o-forms__label">Checkbox Toggle</legend>
	<div class="o-forms__group">
		<div class="o-forms__toggle">
			<input class="o-forms__toggle__checkbox" data-o-form-toggle type="checkbox" name="checkbox" value="1" id="checkboxToggle1" />
			<label for="checkboxToggle1" class="o-forms__label">Checkbox Toggle 1</label>
		</div>
		<div class="o-forms__toggle">
			<input class="o-forms__toggle__checkbox" data-o-form-toggle type="checkbox" name="checkbox" value="1" id="checkboxToggle2" checked="checked" />
			<label for="checkboxToggle2" class="o-forms__label">Checkbox Toggle 2</label>
		</div>
	</div>
</fieldset>
```

[Toggle examples](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-a-checkbox-which-acts-as-a-toggle)


#### Validation states

Validation styles are applied by adding `.o-forms--error` or `.o-forms--valid` to the field's containing element (typically, `.o-forms`). Child `.o-forms__label`, `.o-forms__text`, `.o-forms__select`, `.o-forms__checkbox`, `.o-forms__radio`, `.o-forms__textarea` elements will be styled appropriately.

An error message, defined with `.o-forms__errortext`, can be appended to the containing element.

```html
<div class="o-forms o-forms--error">
	<label class="o-forms__label">Text input</label>
	<input type="text" class="o-forms__text" />
	<div class="o-forms__errortext">Please enter a valid url</div>
</div>
```

#### Sections

Wrap a group of `.o-forms` fields in a section `.o-forms-section` to highlight them and provide a global message.

```html
<div class="o-forms-section">
	<div class="o-forms-section__message">
		<p>This is a section message.</p>
	</div>
	<div class="o-forms">
		<label for="o-forms-message" class="o-forms__label">Field Label</label>
		<input type="text" id="o-forms-message" class="o-forms__text" required />
	</div>
</div>
```

This can be used to highlight errors within a section of a form which contains multiple `.o-forms` fields.

```html
<div class="o-forms-section o-forms-section--error">
	<div class="o-forms-section__message">
		<p>This is a section error message</p>
	</div>
	<div class="o-forms o-forms--error">
		<label for="o-forms-section-error" class="o-forms__label">Field Label</label>
		<input type="text" id="o-forms-section-error" class="o-forms__text" required />
		<div class="o-forms__errortext">Invalid entry</div>
	</div>
</div>
```

Add `.o-forms-section--wide` to remove max width restrictions.

[Section examples](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-sections)


#### Additional Features

Additional features such as small text and select inputs are avalible. Please see [more examples on the Origami Registry](https://registry.origami.ft.com/components/o-forms).

### Sass

#### Silent mode

In silent mode `o-forms` provides mixins for each set of form fields as well as some mixins to output basic form styles in one large chunk.

The `oForms` mixin will output all features of `o-forms`. Turn off silent mode to output all `o-forms` features using this mixin automatically.

```sass
$o-forms-is-silent: false;
@import 'o-forms/main';
```

#### Mixins

If your project does not need all `o-forms` features, you may reduce your project's CSS bundle size by using the following mixins to only output what you need.

Required:
- `oFormsBaseFeatures` - Basic form features including `.o-forms`. Required by the other mixins.

Optional features:
- `oFormsRadioCheckboxFeatures` - Checkbox and radio support.
- `oFormsRadioCheckboxRightModifier` - Modifier styles to align checkbox/radio inputs right.
- `oFormsRadioButtonsStyledFeature` - Styled radio buttons support.
- `oFormsCheckboxToggleFeature` - Toggle support.
- `oFormsSuffixFeature` - Suffix support.
- `oFormsSectionFeature` - Section support.
- `oFormsStatusFeature` - Styles for form status such as "saving" or "saved".
- `oFormsInlineFeature` - Styles for inline forms.
- `oFormsSmallFeature` - Modifier styles for small text and select inputs.
- `oFormsWideFeature` - Modifier styles for form elements with no width restriction.
- `oFormsBleedFeature` - Modifier styles for form elements with no width restriction and no padding.

Customisation (see [SassDoc](http://sassdoc.webservices.ft.com/v1/sassdoc/o-forms/#o-forms)):
- `oFormsRadioButtonsStyledTheme` - Used to customise the color of styled radio buttons.
- `oFormsRadioButtonsStyledIcon` - Used to add an icon to styled radio buttons.

For more details on specific mixins [browse the SassDoc documentation of the module](http://sassdoc.webservices.ft.com/v1/sassdoc/o-forms/#o-forms).

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

#### Apply valid state class

By default `o-forms` does not apply the `o-forms--valid` class, relying on the absence of `o-forms--error` to indicate an input's validity. To have `o-forms` apply a class for valid inputs, pass in a `applyValidState` boolean configuration property when constructing:

```js
const OForms = require('o-forms');
const formsEl = document.querySelector('#form-element');

const forms = new OForms(formsEl, { applyValidState: true });
```

Or you can set the `data-o-forms-apply-valid-state` attribute to true on the `<form>` element:

```html
<form data-o-component="o-forms" data-o-forms-apply-valid-state="true">
	[...]
</form>
```

#### Status

A form status is used to show an input is "saving" or is "saved". To show a status use the static method `updateInputStatus`.

```js
const OForms = require('o-forms');
const formsInput = document.querySelector('input');

OForms.updateInputStatus(formsInput, 'saving');
```

Valid statuses include "saving", "saved", or `null` to remove any current status.

To add a left aligned status to an inline form input, add a placeholder status element `.o-forms__status .o-forms__status--left`, with attribute `aria-hidden="true"`, within the contaning `.o-forms` element.

[Status examples](https://registry.origami.ft.com/components/o-forms@6.0.0#demo-status)

#### Listening to a toggle change
Listening for the `oForms.toggled` event we can react to the status of a toggle checkbox. This event is fired when the toggle checkbox is clicked.
```html
document.addEventListener('oForms.toggled', (event) => {
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

## Upgrade from v5.x.x to v6.x.x

Version 6 uses a new major version of [o-loading](https://github.com/Financial-Times/o-loading/). Make sure your project is [compatible](https://github.com/Financial-Times/o-loading/blob/master/MIGRATION.md#migrating-from-2xx-to-3xx) with o-loading@3.0.0

## Upgrading from v4.x.x to v5.x.x

Version 5 makes some design improvements including tightening up the spacing around checkboxes and radio buttons. It also provides many [new mixins](#sass) to make it easier to output `o-forms` features granularly.

### Checkboxes & Radios
- Wrap groups of checkboxes and radios in `.o-forms__group` for correct vertical spacing.
- `oFormsRadioCheckbox` no longer outputs all styles for checkboxes and radios, only what is shared between them. Use `oFormsRadioCheckboxFeatures` instead.
- It is no longer possible to modify the complete selector of radios, checkboxes, or their labels. The base `.o-forms` class may still be updated using the `$class` argument.

### Prefix, Suffix
- Prefixes have been removed entirely. We recommend using additional label information and feedback in form validation instead.
- Suffix buttons now use standard `o-buttons` styling.
- Check your uses of suffixs still display correctly. In the case of button suffixes it may be necessary to apply the extra `o-buttons` classes `.o-buttons--secondary` and `.o-buttons--big`.
- The mixins `oFormsAffixButton`, `oFormsAffixCheckbox`, `oFormsPrefixSuffix` have been removed. Use `oFormsSuffixFeature` for suffix classes including the affix wrapper (as documented above).

### Toggles
- `.o-forms__checkbox-toggle` has been renamed `.o-forms__toggle`.
- The `oFormsCheckboxToggleSize` mixin has been removed due to lack of use.

### Wrappers and Messages
- Wrappers have been renamed to sections. Their class names have also been updated to conform to the BEM naming convention (as optional containers their name should not contain `__` as they are not elements of a block).
	- `.o-forms__wrapper` becomes `.o-forms-section`.
	- `.o-forms__wrapper--highlight` becomes `.o-forms-section--highlight`.
	- `.o-forms__wrapper--error` which becomes `.o-forms-section--error`.
	- The `oFormsMessage` mixin now only outputs minimal message styles, uses should be replaced with `oFormsSectionFeature`.
- Messages are now child elements of a section and must not be used independently.
	- Wrap messages within a form section `.o-forms-section` if they are not already. They should be the first child of the section.
	- Remove the class `.o-forms__message--error`. A message now infers that it is an error message based on its parent section `.o-forms-section--error`.

### Other changes
- `oFormsFullWidth` has been removed. Use `oFormsWideFeature` for classes to remove form max width restrictions.
- There is a new dependancy on `o-icons`. Build your project to confirm that it is compatible.

Please [contact us](#contact) if you have any queries.

## Upgrading from v3.x.x to v4.x.x
- A dependency on [o-typography](http://github.com/financial-times/o-typography) v5 has been introduced. This will break any builds that use o-typography <v5. __Resolution__: Update to o-typography v5.
- The o-colors dependency has been updated to `^4`. This could create bower conflicts which should be resolved by updating to the newest release of o-colors.
- The design for o-forms has changed in v4. This could create issues on your pages which make use of o-forms. Ensure that the updated design does not break the layout on your webpage.

----

## Upgrading from v2.x.x to v3.x.x

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

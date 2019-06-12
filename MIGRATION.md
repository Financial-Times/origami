
## Migration Guide

### Migrating from v6 to v7

Version 7 introduces a complete redesign to the `o-forms` markup, Sass and JavaScript API, and makes small design changes and additions.

All Sass mixins have been removed, and have been replaced with two public mixins:
- `oForms()`
- `oFormsAddCustom()`

The primary mixin makes an options map public, which allows you to output styles specific to the elements that you want to use in your form. `o-forms` [no longer supports custom classes](https://github.com/Financial-Times/origami-proposals/issues/4).

The following example would output small text inputs and regular checkboxes:

```diff
-@include oFormsBaseFeatures();
-@include oFormsRadioCheckboxFeatures();
-@include oFormsSmallFeature();

+@include oForms($opts: (
+	'elements': (
+		'text',
+		'checkbox'
+	),
+	'features': (
+		'small'
+	)
+))
```

The customisation mixin outputs a custom modifier, and can be applied as follows:
```diff
-.o-forms__radio-button.o-forms__radio-button--my-theme {
-	@include oFormsRadioButtonsStyledTheme($theme: $my-theme);
-}

+@include oFormsAddCustom(
+	$input: 'radio',
+	$class: 'my-theme',
+	$theme: $my-theme
+);

// the custom class modifier will be: .o-forms-input--my-theme
```

The markup has been changed entirely to accomodate the following structure:
```
┌— field container (.o-forms-field) —————┐
|      (one of div or label)             |
|                                        |
|  ┌ title container (.o-forms-title) ┐  |
|  |    (group titles or              |  |
|  |     individual input labels)     |  |
|  └——————————————————————————————————┘  |
|                                        |
|  ┌ input container (.o-forms-input) ┐  |
|  |    (group inputs or              |  |
|  |     individual inputs)           |  |
|  └——————————————————————————————————┘  |
└————————————————————————————————————————┘
```

The root `o-forms` class is no longer used. Instead, there are modifiers for each type of container (field, title, input) illustrated above, and some modifiers that only work for specific inputs:
- Field container modifiers:
	- `.o-forms-field--optional`
	- `.o-forms-field--inline`
	- `.o-forms-field--inverse`
- Title container modifiers:
	- `.o-forms-title`
	- `.o-forms-title--shrink`
	- `.o-forms-title--vertical-center`
- Input container modifiers:
	- `.o-forms-input--pseudo-radio-box`
	- `.o-forms-input--checkbox`
	- `.o-forms-input--date`
	- `.o-forms-input--inline`
	- `.o-forms-input--invalid`
	- `.o-forms-input--radio-box`
	- `.o-forms-input--radio-round`
	- `.o-forms-input--select`
	- `.o-forms-input--text-area`
	- `.o-forms-input--password`
	- `.o-forms-input--text`
	- `.o-forms-input--toggle`
	- `.o-forms-input--valid`


The JavaScript for `o-forms` now accepts two options:
- `useBrowserValidation`: whether to use the browsers validtion and error messages. Defaults to `false`
- `errorSummary`: whether to display a summary of invalid fields on form submit. Defaults to `true`

### Migrating from v5 to v6
Version 6 uses a new major version of o-loading. Make sure your project is compatible with o-loading@3.0.0

### Migrating from v4 to v5

Version 5 makes some design improvements including tightening up the spacing around checkboxes and radio buttons. It also provides many [new mixins](#sass) to make it easier to output `o-forms` features granularly.

#### Checkboxes & Radios
- Wrap groups of checkboxes and radios in `.o-forms__group` for correct vertical spacing.
- `oFormsRadioCheckbox` no longer outputs all styles for checkboxes and radios, only what is shared between them. Use `oFormsRadioCheckboxFeatures` instead.
- It is no longer possible to modify the complete selector of radios, checkboxes, or their labels. The base `.o-forms` class may still be updated using the `$class` argument.

#### Prefix, Suffix
- Prefixes have been removed entirely. We recommend using additional label information and feedback in form validation instead.
- Suffix buttons now use standard `o-buttons` styling.
- Check your uses of suffixs still display correctly. In the case of button suffixes it may be necessary to apply the extra `o-buttons` classes `.o-buttons--secondary` and `.o-buttons--big`.
- The mixins `oFormsAffixButton`, `oFormsAffixCheckbox`, `oFormsPrefixSuffix` have been removed. Use `oFormsSuffixFeature` for suffix classes including the affix wrapper (as documented above).

#### Toggles
- `.o-forms__checkbox-toggle` has been renamed `.o-forms__toggle`.
- The `oFormsCheckboxToggleSize` mixin has been removed due to lack of use.

#### Wrappers and Messages
- Wrappers have been renamed to sections. Their class names have also been updated to conform to the BEM naming convention (as optional containers their name should not contain `__` as they are not elements of a block).
	- `.o-forms__wrapper` becomes `.o-forms-section`.
	- `.o-forms__wrapper--highlight` becomes `.o-forms-section--highlight`.
	- `.o-forms__wrapper--error` which becomes `.o-forms-section--error`.
	- The `oFormsMessage` mixin now only outputs minimal message styles, uses should be replaced with `oFormsSectionFeature`.
- Messages are now child elements of a section and must not be used independently.
	- Wrap messages within a form section `.o-forms-section` if they are not already. They should be the first child of the section.
	- Remove the class `.o-forms__message--error`. A message now infers that it is an error message based on its parent section `.o-forms-section--error`.

#### Other changes
- `oFormsFullWidth` has been removed. Use `oFormsWideFeature` for classes to remove form max width restrictions.
- There is a new dependancy on `o-icons`. Build your project to confirm that it is compatible.

Please [contact us](#contact) if you have any queries.

### Migrating from v3 to v4
- A dependency on [o-typography](http://github.com/financial-times/o-typography) v5 has been introduced. This will break any builds that use o-typography <v5. __Resolution__: Update to o-typography v5.
- The o-colors dependency has been updated to `^4`. This could create bower conflicts which should be resolved by updating to the newest release of o-colors.
- The design for o-forms has changed in v4. This could create issues on your pages which make use of o-forms. Ensure that the updated design does not break the layout on your webpage.

----

### Migrating from v2 to v3

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


### Migrating to v1

#### 1. Module name change

`o-ft-forms` becomes `o-forms` in v1.

1. Search `o-ft-forms` and replace with `o-forms`
2. Search `oFtForms` and replace with `oForms`

#### 2. Web fonts and icons

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


#### 3. Helper classes name changes

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

#### 4. Mixins and placeholder classes

If using placeholder classes or extending styles using `oFormsClass` and `oFormsPlaceholderOptionalSelector`, use normal selectors, and include the matching mixins, documented in the [SassDoc documentation of the module](http://sassdoc.webservices.ft.com/v1/sassdoc/o-forms).

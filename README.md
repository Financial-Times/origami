o-brand [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

Tools to tailor Origami components for distinct use cases.

**&#x26A0;&#xFE0F; Non-Origami projects must not depend on `o-brand` directly.**

- [Terms](#terms)
- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

## Terms

### Brand

A brand represents an environment which requires components to offer a distinct appearance or unique functionality. A brand may be thought of as a theme, but branded components may provide unique features as well as a distinct appearance.

Brands include:

- master: FT branding for public ft.com sites and affiliates.
- internal: Style suitable for internal products, tools, and documentation.
- whitelabel: Base, structural styles only.

### Variant

A variant is an addition or modification to a component within a given brand. Variants __must__ be optional and build upon a fully functional component. E.g. A button component may have an "inverse" variant, a "big" variant, etc. A header component may have a "subnav" variant, a "sticky" variant, etc.

## Sass

Mixins within `o-brand` help configure components to support brands. There is no configuration in `o-brand`. It provides the mechanisms for components to apply their own brand support. Projects which consume branded Origami components may choose a brand by setting the `$o-brand` variable.

The following mixins and functions help brand a component.

- [oBrandGetCurrentBrand](#obrandgetcurrentbrand) - Set a default brand if necessary
- [oBrandDefine](#obranddefine) - Define brand configuration (variables & supported variants).
- [oBrandGet](#obrandget) - Retrieve brand variables.
- [oBrandSupportsVariant](#obrandsupportsvariant) - Check if the brand supports a variant.
- [oBrandCustomize](#obrandcustomize) - Update brand variables for a unique project.

### oBrandGetCurrentBrand

This function will return the brand defined at a product level.

If `$o-brand` has been defined by a project `oBrandGetCurrentBrand` will return that value.

```scss
$o-brand: internal // Defined in the product using branded Origami components.

$chosen-brand: oBrandGetCurrentBrand(); // internal
```

If it has not yet been defined, it will provide a default brand (master).
```scss
//$o-brand is undefined

$chosen-brand: oBrandGetCurrentBrand(); // master
```

### oBrandDefine

Components are individually responsible for defining the configuration for each brand they support. In order to add configuration for a new brand, use the mixin `oBrandDefine`.

Where `$component` is the component's name; `$brand` is one of "master", "internal", or "whitelabel"; and `$config` is a map which comprises of variables and supported variants:
- [`variables`](#brand-variables)
- [`supported variants`](#supported-variants)

```scss
@if oBrandGetCurrentBrand() == 'master' {
	@include oBrandDefine($component, $brand, $config);
}
```

_Note: `oBrandDefine` should be used in conjunction with `oBrandGetCurrentBrand`, to define only the requested brand._

#### Brand Variables

Brand variables configure a component for a brand. E.g. a component `o-example` might define a variable `example-background` to configure its background colour.

```scss
$variables: (
	example-background: 'paper'
);
```

A nested map configures a variant, which may provide new variables or a different value for an existing variable. E.g. for an `inverse` variant which has a different value for the variable `example-background`:

```scss
$variables: (
	example-background: 'paper',
	'inverse': (
		example-background: 'slate'
	)
);
```

- Variable names _must_ be a string and should be alphanumeric, including dashes e.g. `example-background`.
- Variable names _should not_ match css properties exactly e.g. `example-background` over `background`.
- A variant _must_ be an alphanumeric string e.g. `inverse`, `b2b-inverse`.

#### Supported Variants

To indicate a brand should support a variant, add the variant name to the `supports-variants` list.

E.g. To configure support for "inverse" and "b2b" variants:
```scss
$supports-variants: (
	'inverse',
	'b2b'
);
```

Variant support can then be checked using [oBrandSupportsVariant](#obrandsupportsvariant).

#### A Complete `oBrandDefine` Example

The below example defines a `master` brand for the component `o-example`. We define four variables including `example-background`, but we provide a different `example-background` value for the `inverse` and `b2b` variants. Using the `supports-variants` list we explicitly state the `master` brand supports both of these variants.

```scss
@if oBrandGetCurrentBrand() == 'master' {
	@include oBrandDefine('o-example', 'master', (
		'variables': (
			example-background: 'paper',
			example-border-width: 1px,
			example-border-type: solid,
			example-border-type: grey,
			'inverse': (
				example-background: 'slate'
			)
			'b2b': (
				example-background: 'lightblue'
			)
		),
		'supports-variants': (
			'inverse',
			'b2b'
		)
	));
}
```

### oBrandGet

Use `oBrandGet` to retrieve a brand variable. First create a private, component-specifc function which calls `oBrandGet`, e.g. for a component `o-example`, create `_oExampleGet`:
```scss
/// Helper for `o-brand` function.
/// @access private
@function _oExampleGet($variables, $from: null) {
    @return oBrandGet($component: 'o-example', $variables: $variables, $from: $from);
}
```

Your new component specifc function `_oExampleGet` can then be used to fetch variables. E.g. building on the `oBrandDefine` example:
```scss
.o-example {
	background: _oExampleGet($variables: 'example-background'); // background: paper;
}
```

It is possible to request multiple variables:
```scss
.o-example {
	border: _oExampleGet($variables: ('example-border-width', 'example-border-type', 'example-border-color')); // border: 1px solid grey;
}
```

To retrieve a variable for a variant use the `$from` argument:
```scss
.o-example--inverse {
	background: _oExampleGet($variables: 'example-background', $from: 'inverse'); // background: slate;
}
```

The `$from` argument also accepts a custom variant:

```scss
$custom-variant: (
	'example-background': 'hotpink',
	'example-border-width', '2px'
);

.o-example--custom {
	background: _oExampleGet($variables: 'example-background', $from: $custom-variant); // background: hotpink;
	border-width: _oExampleGet($variables: 'example-border-width', $from: $custom-variant); // border-width: 2px;
}
```

- `oBrandGet` returns `null` if a variable is undefined. Sass removes css properties which are set to `null`. This is a useful feature to conditionally output css properties for different variants.

## oBrandSupportsVariant

To check if a brand supports a variant call `oBrandSupportsVariant`. First create a private, component-specifc function which wraps `oBrandSupportsVariant`, e.g. for a component `o-example`, create `_oExampleSupports`:
```scss
/// Helper for `o-brand` function.
/// @access private
@function _oExampleSupports($variant) {
    @return oBrandSupportsVariant($component: 'o-example', $variant: $variant);
}
```

Then call your new function `_oExampleSupports` to determine whether to output CSS for a variant or not. E.g. to only output the `inverse` variant if the brand supports it:
```scss
@if _oExampleSupports($variant: 'inverse') {
	.o-example--inverse {
		background: _oExampleGet($variables: 'example-background', $from: 'inverse'); // background: slate;
	}
}
```

### oBrandCustomize

`oBrandCustomize` allows existing brand variables to be modified, so long as those variables have been defined with `oBrandDefine`. This customisation is component-specific, so a branded component must wrap `oBrandCustomize` within a mixin of its own, as `o-brand` must not be used directly outside Origami components.

Example Component (o-example):
```scss
/// Create a component-specific mixin to wrap `oBrandCustomize`.
@mixin oExampleCustomize($variables) {
    @include oBrandCustomize('o-example', $variables);
}

// Define the whitelabel brand for the component.
@if oBrandGetCurrentBrand() == 'whitelabel' {
	@include oBrandDefine('o-example', 'whitelabel', (
		'variables': (
			example-background: white,
			example-color: black,
		),
		'supports-variants': ()
	));
}
```

Example Project:
```scss
$o-brand: 'whitelabel';
@import 'o-table/main';

// Customise the example component.
// Here we change the variable "example-background" from "white" to "lightblue".
// The "example-color" variable has not been customised so remains "black".
@include oExampleCustomize((
    example-background: lightblue
));

// Output the example component CSS.
@include oExample();
```

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-brand/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

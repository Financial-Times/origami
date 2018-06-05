o-brand [![Circle CI](https://circleci.com/gh/Financial-Times/o-brand/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-brand/tree/master)
=================

Tools to tailor Origami components for distinct usecases.

**&#x26A0;&#xFE0F; Non-Origami projects must not depend on `o-brand` directly.**



- [Terms](#terms)
- [Motivation](#motivation)
- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

## Terms

### Brand

A brand represents an enviroment which requires components to offer a distinct appearence or unique functionality.

Brands include:

- master: FT branding for public ft.com sites and affiliates.
- internal: Style suitable for internal products, tools, and documentation.
- whitelabel: Base, structural styles only.

### Variant

A variant is an addition or modification to a component within a given brand. A variant may also alter the appearance and/or functionality of a component. Variants must be optional and build upon a fully functional component.

E.g. A button component may have an "inverse" variant, a "big" variant, etc. A header component may have a "subnav" variant, a "sticky" variant, etc.

## Motivation

As of March 2018 Origami components provide master brand specific styles inconsistently. Some components aim to provide a generic foundation for visually distinct clients to build upon, e.g. `o-table`, but include CSS classes which unpredictably introduce heavy "master" brand specific styles. This means some clients need to manually override "master" brand styles with extra CSS. It also means a non-masterbrand client cannot be confident that new "master" brand styles will not creep in over time.

Branded components aim to provide styles for "master" and "internal" branded products which are immediately usable with little or no modification. For products where those do not apply a "whitelabel" brand provides a reliable foundation with little visual styling to build upon.

## Sass

**The default brand is `master`. Projects which consume branded Origami components may choose a different brand. To do so set the SCSS variable `$o-brand`.**

Mixins within `o-brand` help configure components to support brands. There is no configuration in `o-brand`. It provides the mechanisms for components to apply their own brand support.

The following mixins and functions help brand a component.

- [oBrandDefine](#obranddefine) - Define brand configuration (variables & supported variants).
- [oBrandGet](#obrandget) - Retrieve brand variables.
- [oBrandSupportsVariant](#obrandsupportsvariant) - Check if the brand supports a variant.

### oBrandDefine

A component defines configuration for each of its supported brands. The default brand `master` must be defined. To do that use the mixin `oBrandDefine`.

Brand configuration comprises of variables and supported variants. As explained below.
- [`variables`](#brand-variables)
- [`supports-variants`](#supports-variants)

```scss
@include oBrandDefine($component: 'o-example', $brand: 'master', (
    'variables': $variables,
    'supports-variants': $supports-variants
));
```

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

- Variable names must be a string and should be alphanumeric, including dashes e.g. `example-background`.
- Variable names should not match css properties exactly e.g. `example-background` over `background`.
- A variant must be an alphanumeric string e.g. `inverse`, `b2b-inverse`.

#### Supported Variant

To indicate a brand should support a variant, add the variant name to the `supports-variants` map.

E.g. To configure support for "inverse" and "b2b" variants:
```scss
$supports-variants: (
	'inverse': true,
	'b2b': true
);
```

These ensures support for a variant which sets no variables can be determined.

#### A Complete `oBrandDefine` Example

The below example defines a `master` brand for the component `o-example`. We define four variables including `example-background`, but we provide a different `example-background` value for the `inverse` and `b2b` variants. Using the `supports-variants` map we explicitly state the `master` brand supports both of these variants.

```scss
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
        'inverse': true
    )
));
```

### oBrandGet

Use `oBrandGet` to retrieve a brand variable.

E.g. building on the `oBrandDefine` example:
```scss
.o-example {
	background: oBrandGet($component: 'o-example', $variables: 'example-background'); // background: paper;
}
```

It is possible to request multiple variables:
```scss
.o-example {
	border: oBrandGet($component: 'o-example', $variables: ('example-border-width', 'example-border-type', 'example-border-color')); // border: 1px solid grey;
}
```

To retrieve a variable for a variant use the `$from` argument of `oBrandGet`.
```scss
.o-example--inverse {
	background: oBrandGet($component: 'o-example', $variables: 'example-background', $from: 'inverse'); // background: slate;
}
```

The `$from` argument `oBrandGet` also accepts a custom variant:

```scss
$custom-variant: (
	'example-background': 'hotpink',
	'example-border-width', '2px'
);

.o-example--custom {
	background: oBrandGet($component: 'o-example', $variables: 'example-background', $from: $custom-variant); // background: hotpink;
	border-width: oBrandGet($component: 'o-example', $variables: 'example-border-width', $from: $custom-variant); // border-width: 2px;
}
```

- `oBrandGet` returns `null` if a variable is undefined. Sass removes css properties which are set to `null`. This is a useful feature to conditionally output css properties for different variants.

## oBrandSupportsVariant

To check if a brand supports a variant call `oBrandSupportsVariant`.

E.g. only output the `inverse` variant if the brand supports it:
```scss
@if oBrandSupportsVariant($component: 'o-example', $variant: 'inverse') {
	.o-example--inverse {
		background: oBrandGet($component: 'o-example', $variables: 'example-background', $from: 'inverse'); // background: slate;
	}
}
```

### Debug Mode

Some warnings are not output by default but may be useful in certain circumstances.

To output all warnings set debug mode to true: `$o-brand-debug-mode: true;`.

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-brand/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

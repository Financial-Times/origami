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

A brand is a collection of configuration to tailor a component for distinct use-cases. A branded Origami component is able to output differing styles for a requested brand. It is also able to include extra styles specific to a brand.

Brands include:

- master: FT branding for public ft.com sites and affiliates.
- internal: Style suitable for internal products, tools, and documentation.
- whitelabel: Base, structural styles only.

### Variant

A variant is an addition or modification of a component. A variant may alter the appearance and/or functionality of a component. Variants must be optional and build upon a fully functional component.

E.g. A button component may have an "inverse" variant, a "big" variant, etc. A header component may have a "subnav" variant, a "sticky" variant, etc.

## Motivation

As of March 2018 Origami components provide master brand specific styles inconsistently. Some components aim to provide a generic foundation for visually distinct clients to build upon, e.g. `o-table`, but include CSS classes which unpredictably introduce heavy master brand specific styles. This means some clients need to manually override master brand styles with extra CSS. It also means a non-masterbrand client cannot be confident that new master brand styles will not creep in over time.

Branded components aim to provide styles for "master" and "internal" products which are immediately usable with little or no modification. For products where those do not apply a "whitelabel" brand provides a reliable foundation with little visual styling to build upon.

## Sass

**The default brand is `master`. Projects which consume branded Origami components may choose a different brand. To do so set the SCSS variable `$o-brand`.**

Mixins within `o-brand` help configure components to support brands. There is no configuration in `o-brand`. It provides the mechanisms for components to apply their own brand support.

The following mixins and functions help brand a component.

- [oBrandDefine](#obranddefine) - Defines brand configuration (variables & settings).
- [oBrandGet](#obrandget) - Retrieves brand variables.
- [oBrandConfigureFor](#obrandconfigurefor) - Supports working with variants.
- [oBrandOverride](#obrandoverride) - Helps customise a defined brand.

### oBrandDefine

A component defines configuration for each of its supported brands. The default brand `master` must be defined. To do that use the mixin `oBrandDefine`.

Brand configuration comprises of variables and settings. As explained below.
- [`variables`](#brand-variables)
- [`settings`](#brand-settings)

```scss
@include oBrandDefine($component: 'o-example', $brand: 'master', (
    'variables': $variables,
    'settings': $settings
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

Two or more variants may be used together to create a new variant. E.g. a "b2b" variant might provide a different background color when used along with the "inverse" variant.

```scss
$variables: (
	example-background: 'paper',
	'inverse': (
		example-background: 'slate'
	)
	'b2b': (
		example-background: 'lightblue'
	)
	('b2b', 'inverse'): (
		example-background: 'darkblue'
	)
);
```

- Variable names must be a string and should be alphanumeric, including dashes e.g. `example-background`.
- Variable names should not match css properties exactly e.g. `example-background` over `background`.
- A variant must be an alphanumeric string or list of alphanumeric strings e.g. `inverse`, `('b2b', 'inverse')`.

#### Brand Settings

Variants are unsupported by default. To enable a variant for a brand, add the variant name to the settings map if the brand supports it. Brand settings provide boolean flags to turn variants on.

E.g. To configure support for inverse and b2b variants:
```scss
$settings: (
	'inverse': true,
	'b2b': true
);
```

- Some variants may not need variables, but may still exist in a component. This means the variant still needs to be set within the brand settings. E.g. a "sticky" variant of a header may need no configuration, other than a setting to turn support on/off.

#### A Complete `oBrandDefine` Example

The below example defines a brand `master` for the component `o-example`. We define a variable `example-background`. There is a different `example-background` value for the `inverse` and `b2b inverse` variant. Using the settings map we state the `master` brand supports these two variants.

```scss
@include oBrandDefine('o-example', 'master', (
    'variables': (
		example-background: 'paper',
		'inverse': (
			example-background: 'slate'
		)
		'b2b': (
			example-background: 'lightblue'
		)
		('b2b', 'inverse'): (
			example-background: 'darkblue'
		)
    ),
    'settings': (
        'b2b': true,
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

To request multiple variables at once, assuming variables `example-border-size: 1px`, `example-border-type: solid`, `example-border-color: grey` are defined using `oBrandDefine`:
```scss
.o-example {
	border: oBrandGet($component: 'o-example', $variables: ('example-border-size', 'example-border-type', 'example-border-color')); // border: 1px solid grey;
}
```

Retrieve a variable for a variant using `oBrandGet` using `$force-variant`. Whilst this is possible use [`oBrandConfigureFor`](#retrieve-a-variable-for-a-variant) instead where possible.
```scss
.o-example--inverse {
	background: oBrandGet($component: 'o-example', $variables: 'example-background', $force-variant: 'inverse'); // background: slate;
}
```

- `oBrandGet` returns `null` if a variable is undefined. Sass removes css properties which are set to `null`. This is a useful feature to conditionally output css properties for different variants.

### oBrandConfigureFor

`oBrandConfigureFor` improves working with variants. It accepts a Sass content block which will only output if the brand supports the given variant. It also configures all `oBrandGet` calls within its content block for a given variant.

Building on the `oBrandDefine` example the following outputs multiple `o-example` variants with different backgrounds. The variants are only output if the brand supports them:

```scss

@mixin oExampleTheme() {
	background: oBrandGet($component: 'o-example', $variables: 'example-background');
}

@include oBrandConfigureFor($component: 'o-example', $variant: 'inverse') {
	.o-example--inverse {
		@include oExampleTheme(); // background: paper;
	}
}

@include oBrandConfigureFor($component: 'o-example', $variant: 'b2b') {
	.o-example--b2b {
		@include oExampleTheme(); // background: lightblue;
	}
}

@include oBrandConfigureFor($component: 'o-example', $variant: ('b2b', 'inverse')) {
	.o-example--b2b .o-example--inverse {
		@include oExampleTheme(); // background: darkblue;
	}
}
```

`oBrandConfigureFor` may also be nested:

```scss
@mixin oExampleTheme() {
	background: oBrandGet($component: 'o-example', $variables: 'example-background');
}

// "b2b" variant
@include oBrandConfigureFor($component: 'o-example', $variant: 'b2b') {
	.o-example--b2b {
		@include oExampleTheme(); // background: lightblue;
		// "b2b inverse" variant
		@include oBrandConfigureFor($component: 'o-example', $variant: 'inverse') {
			&.o-example--inverse {
				@include oExampleTheme(); // background: darkblue;
			}
		}
	}
}
```

### oBrandOverride

To customise a brand use the `oBrandOverride` mixin. It accepts configuration, including variables and settings, in the same format as `oBrandDefine`.  Sass within the `oBrandOverride` content block uses `oBrandDefine` configuration merged with  `oBrandOverride` configuration.

```scss
$custom-config: ('variables', {
	'example-background': hotpink
});

.o-example--custom-variant {
	@include oBrandOverride('o-example', $custom-config) {
		background: oBrandGet($component: 'o-example', $variables: 'example-background'); // background: hotpink
	};
}
```

### Debug Mode

Some warnings are not output by default but may be useful in certain circumstances.

To output all warnings set debug mode to true: `$o-brand-debug-mode: true;`.

For example, no warning is output if a component uses `oBrandConfigureFor` and `oBrandGet` to get a variant variable which is not configured. This is a valid method to conditionally output CSS properties if a corresponding variant variable is configured. In other cases it might be useful to know where variant configuration has been missed using debug mode.

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-brand/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

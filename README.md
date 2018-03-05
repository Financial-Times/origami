o-brand [![Circle CI](https://circleci.com/gh/Financial-Times/o-brand/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-brand/tree/master)
=================

Tools to "brand" Origami components. Other non-Origami projects should not depend on `o-brand` directly.

- [Terms](#terms)
- [Usage](#usage)
- [Contact](#contact)
- [Licence](#licence)

## Terms

### Brand

A brand is a collection of configuration to tailor a component for specific use-cases. A branded Origami component is able to output differing styles for a requested brand. It is also able to include extra styles specific to a brand.

Examples of brands include:

- Master: FT branding for public ft.com sites and affiliates.
- Internal: Style suitable for internal products, tools, and documentation.
- Whitelabel: Base, structural styles only.

### Variant

Variants are things which can alter the appearance and/or functionality of a component. E.g. A branded component may contain multiple variants which change the appearance of the component such as a "big" variant, a "small" variant, etc. Variants must be optional and build upon a fully functional branded component.

E.g.

1. Brand variants modify a fully functional foundation.
```scss
	.o-example {
		content: 'component';
	}
```
```html
	<div class="o-example"></div>
```
2. Variants may override styles.
```scss
	.o-example--inverse {
		content: 'example variant "inverse"';
	}
```
```html
	<div class="o-example o-example--inverse"></div>
```
3. Variants may require additional markup.
```scss
	.o-example__extra {
		content: 'example feature variant "extra"';
	}
```
```html
	<div class="o-example o-example--inverse">
		<div class="o-example__extra"></div>
	</div>
```

## Usage

Mixins within `o-brand` help configure components to support brands. There is no configuration in `o-brand`. It provides the mechanisms for components to apply their own brand support.

The following mixins and functions help brand a component.

- [oBrandDefine](#defining-brand-configuration) - Define brand configuration (variables & settings).
- [oBrandGet](#retrieve-a-variable) - Retrieve brand variables.
- [oBrandConfigureFor](#retrieve-a-variable-for-a-variant) - Work with variants.

### Defining Brand Configuration

A component must first define the configuration for its supported brands. To do that use the mixin `oBrandDefine`.

First define the default brand `master`, this is required.

Brand configuration comprises:
- [`variables`](#brand-variables)
- [`settings`](#brand-settings)

#### Brand Variables

Brand variables define how a component should look for the given brand. They are defined as a map of key/value pairs, where the key is later used to retrieve the value to style the component e.g. with a CSS property. The key should not be the exact name of a CSS property to avoid confusion. E.g. to configure a variable "component-border-color" to "black":

```scss
$variables: (
	component-border-color: 'black'
);
```

Variant variables will take precedence over default brand variables. To configure variant variables nest them, where the key is the variant. E.g. to configure an "inverse" variant:

```scss
$variables: (
	component-border-color: 'black',
	'inverse': (
		component-border-color: 'white'
	)
);
```

#### Brand Settings

Settings hold boolean values to indicate which variants a brand supports. Settings are `false` by default. A component should not output styles for a variant if the current brand does not explicitly support it. To indicate support of an "inverse" variant a brand may include configuration like so:

```scss
$settings: (
	'inverse': true
);
```

Explicit settings enables the creation of variants which do not need variable configuration -- e.g. the `extra` variant in the following example.

#### A Complete `oBrandDefine` Example

The below example defines a brand `master` for the component `o-example`. We define a default variable `component-content`. We provide a different value for the `inverse` variant and a different value for the compound variant `inverse demo`. Using the settings map we state the `master` brand supports these two variants and another variant `extra`, which does not need any configured variables.

```scss
@include oBrandDefine('o-example', 'master', (
    'variables': (
        component-content: 'default value',
        'inverse': (
            component-content: '"inverse" variant value'
        ),
        ('inverse', 'demo'): (
            component-content: '"inverse demo" variant value'
        )
    ),
    'settings': (
        'demo': true,
        'inverse': true,
        'extra': true
    )
));
```

### Retrieve A Variable

To retrieve a variable previously defined for a brand, use the function `oBrandGet`. This gets the value for the requested component variable.

Building on the "define" example above:
```scss
.o-example {
	content: oBrandGet('o-example', 'component-content'); // default value
}
```

### Retrieve A Variable For A Variant

To retrieve a variable for a variant use `oBrandConfigureFor`. This mixin accepts a content block and variant. This indicates styles within the content block should pertain to the passed variant.

Styles within `oBrandConfigureFor` are [only output if the current brand supports the variant](#output-styles-only-if-a-brand-supports-a-variant).

Building on the "define" example above:
```scss
@include oBrandConfigureFor('o-example', 'inverse') {
	.o-example--inverse {
		content: oBrandGet('o-example', 'component-content'); // "inverse" variant value
	}
}
```

To retrieve a variable for a compound variant pass a list:
```scss
@include oBrandConfigureFor('o-example', ('inverse', 'demo')) {
	.o-example--inverse.o-example--demo {
		content: oBrandGet('o-example', 'component-content'); // "inverse demo" variant value
	}
}
```

Nesting is also supported:
```scss
@include oBrandConfigureFor('o-example', 'inverse') {
	@include oBrandConfigureFor('o-example', 'demo') {
		.o-example--inverse.o-example--demo {
			content: oBrandGet('o-example', 'component-content'); // "inverse demo" variant value
		}
	}
}
```

### Output Styles Only If A Brand Supports A Variant

Not all brands will share variants. Define support in the `settings` map as demonstrated above. To output styles only if the current brand supports the variant use `oBrandConfigureFor`.

Uses of `oBrandGet` within `oBrandConfigureFor` [retrieves a variable for a variant](#retrieve-a-variable-for-a-variant).

```scss
@include oBrandConfigureFor('o-example', 'b2b') {
	.o-example--b2b {
		// The brand defined above does not support a "b2b" variant.
		// CSS here will not be output.
		content: '"b2b" variant not available for the current brand.';
	}
}
@include oBrandConfigureFor('o-example', 'extra') {
	.o-example__extra {
		// The brand defined above does support an "extra" variant.
		// CSS here is output.
		content: '"extra" variant is supported by the current brand.';
	}
}
@include oBrandConfigureFor('o-example', ('extra', 'b2b')) {
	.o-example__b2b.o-example__extra {
		// As this current brand does not support the "b2b" variant the
		// "extra b2b" compound variant is not supported.
		content: '"extra b2b" variant not available for the current brand.';
	}
}
```

### Change The Current Brand

The default brand is `master`. Projects which consume branded Origami components may choose a different brand by setting the SCSS variable `$o-brand`.

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-brand/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

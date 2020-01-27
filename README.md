
# o-labels [![Build Status](https://circleci.com/gh/Financial-Times/o-labels.png?style=shield&circle-token=baf3bd7fe9625dfc5c7e24a5451253b348cd9102)](https://circleci.com/gh/Financial-Times/o-labels) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Labels for content classification or to emphasise a value.

- [Markup](#markup)
- [Sass](#sass)
- [Migration guide](#migration)
- [Contact](#contact)
- [Licence](#licence)


## Markup

The most minimal markup for a label is as follows:

```html
<span class="o-labels">Label</span>
```

Labels are displayed inline so including the above markup in a paragraph, for example, will make it sit alongside the text.

There are several size modifier classes which can be used to change the general appearance of a label:

```html
<span class="o-labels o-labels--big">Big Label</span>
<span class="o-labels o-labels--small">Small Label</span>
```

Labels can also have one of several states. The available states depend on which brand you are using (there are no states for whitelabel branded components):

### Masterbrand

The following states are used to categorise content, mostly on FT.com:

```html
<span class="o-labels o-labels--content-commercial">Paid Post</span> (used for paid post and promoted content)
<span class="o-labels o-labels--content-premium">Premium</span> (used for premium-only content)
```

The following state is used to indicate that a feature is in a beta state:

```html
<span class="o-labels o-labels--lifecycle-beta">Beta</span>
```

### Internal

The following states are used to represent the different support levels of Origami components:

```html
<span class="o-labels o-labels--support-active">Active</span>
<span class="o-labels o-labels--support-maintained">Maintained</span>
<span class="o-labels o-labels--support-experimental">Experimental</span>
<span class="o-labels o-labels--support-deprecated">Deprecated</span>
<span class="o-labels o-labels--support-dead">Dead</span>
```

The following states are used to represent the FT's service tiers:

```html
<span class="o-labels o-labels--support-platinum">Platinum</span>
<span class="o-labels o-labels--support-gold">Gold</span>
<span class="o-labels o-labels--support-silver">Silver</span>
<span class="o-labels o-labels--support-bronze">Bronze</span>
```

## Sass

### Mixin: `oLabels`

The `oLabels` mixin is used to output base styles as well as styles for _all_ of the label sizes and states. This output includes the `o-labels` classes:

```scss
@include oLabels();
```

```css
.o-labels {
    /* styles */
}
.o-labels--big {
    /* styles */
}
/* etc. */
```

If you wish to specify a subset of sizes and states to output styles for, you can pass in options (see [sizes](#sizes) and [states](#states) for available options):

```scss
@include oLabels($opts: (
    'sizes': ('big'),
    'states': (
        'content-commercial',
        'content-premium'
    )
));
```

### Mixin: `oLabelsAddState`

The `oLabelsAddState` mixin can be used to output a class for one of the label states, outlined in the [states table](#states):

```scss
@include oLabelsAddState('content-commercial');
```

```css
.o-labels--content-commercial {
    /* styles */
}
```

The `oLabelsAddState` mixin also accepts optional custom configurations, which override defaults or allow you to define your own label states:

```scss
@include oLabelsAddState('citrus-fruit', (
    background-color: oColorsByName('lemon')
));
```

```css
.o-labels--citrus-fruit {
    /* styles */
}
```

### Mixin: `oLabelsContent`

When it's not possible to use an `o-labels` CSS class, for example within another Origami component, use `oLabelsContent` to output a label with a custom class.

If it is possible to use `o-labels` classes we recommend [oLabels](#mixin-olabels) and [oLabelsAddStates](#mixin-olabelsaddstate) instead. Using these will help reduce the size of your CSS bundle where mutliple labels are used.

`oLabelsContent` accepts an `$opts` argument which is a map of options. To output styles required by all labels set "base" to "true". Then set the labels "[sizes](#size)" and its "[state](#states)". Any of these options may be output independently.

To output an existing label:
```scss
.o-example-my-label {
	@include oLabelsContent($opts: (
        'base': true,
        'size': 'big',
        'state': 'tier-gold'
    ));
}
```

To output a custom label:
```scss
.o-example-my-custom-label {
	@include oLabelsContent($opts: (
		'base': true,
		'size': 'big',
		'state': (
			'background-color': oColorsByName('lemon')
		)
	));
}
```

### Sizes

This table outlines all of the possible sizes you can request in the [`oLabels` mixin](#mixin-olabels):

| Size  | Description                                 | Brand support                |
|-------|---------------------------------------------|------------------------------|
| big   | Label with increased font size and padding. | master, internal, whitelabel |
| small | Label with decreased font size and padding. | master, internal, whitelabel |

### States

This table outlines all of the possible states you can request in the [`oLabels` mixin](#mixin-olabels) and [`oLabelsAddState` mixin](#mixin-olabelsaddstate):

| Size                 | Description                                                   | Brand support |
|----------------------|---------------------------------------------------------------|---------------|
| content-commercial   | Used to identify paid posts or promoted content.              | master        |
| content-premium      | Used to identify premium content.                             | master        |
| lifecycle-beta       | Used to identify a feature that's in beta.                    | master        |
| support-active       | Used to indicate that a component is actively maintained.     | internal      |
| support-maintained   | Used to indicate that a component is maintained.              | internal      |
| support-experimental | Used to indicate that a component is an experimental feature. | internal      |
| support-deprecated   | Used to indicate that a component is deprecated.              | internal      |
| support-dead         | Used to indicate that a component is no longer worked on.     | internal      |
| tier-platinum        | Used to indicate a service with a platinum service tier.      | internal      |
| tier-gold            | Used to indicate a service with a gold service tier.          | internal      |
| tier-silver          | Used to indicate a service with a silver service tier.        | internal      |
| tier-bronze          | Used to indicate a service with a bronze service tier.        | internal      |


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 5 | N/A | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
⚠ maintained | 4 | N/A | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.1.1 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.1.0 | N/A |
╳ deprecated | 1 | 1.0.6 | N/A |


## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-labels/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).


## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).


# o-labels

Labels for content classification, to emphasise a value, or highlight a status.

- [Usage](#usage)
- [Label Types](#label-types)
- [Markup](#markup)
- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-labels`.

## Label Types

There are three types of label:
- [A standard label](#standard-label), the default.
- [An indicator label](#indicator-label).
- [A timestamp label](#timestamp-label).

### Standard Label

The standard label is used for content classification or to emphasise a value. For example to highlight commercial or premium content for the master brand, or to highlight a service tier in internal products. Custom labels may be created.

#### Standard Label Sizes

This table outlines the possible standard label sizes.

| Size  | Description                                 | Brand support                |
|-------|---------------------------------------------|------------------------------|
| big   | Label with increased font size and padding. | master, internal, whitelabel |
| small | Label with decreased font size and padding. | master, internal, whitelabel |

#### Standard Label States

This table outlines the possible standard label states. Custom states may also be created.

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

### Indicator Label

The indicator label is used to show story status with new, updated, and live variants. The indicator label only supports the master brand but [internal brand support is under consideration](https://github.com/Financial-Times/o-labels/issues/58).

#### Indicator Label Status

This table outlines the possible indicator label statuses:

| Size                 | Description                                                   | Brand support |
|----------------------|---------------------------------------------------------------|---------------|
| live                 | Indicate a story is live.                                     | master        |
| closed               | Indicate a live story is no longer live.                      | master        |
| new                  | Indicate a story is new.                                      | master        |
| updated              | Indicate a story has been updated.                            | master        |

### Timestamp Label

The timestamp label is used to show article status in place of an indicator label when the article is not new, updated, or live. The timestamp label only supports the master brand.

## Markup

### Standard Label Markup

The most minimal markup for a standard label is as follows:

```html
<span class="o-labels">Label</span>
```

Standard labels are displayed inline so including the above markup in a paragraph, for example, will make it sit alongside the text.

There are several size modifier classes which can be used to change the general appearance of a standard label:

```html
<span class="o-labels o-labels--big">Big Label</span>
<span class="o-labels o-labels--small">Small Label</span>
```

Labels can also have one of several states. The available states depend on which brand you are using (there are no states for whitelabel branded components):

The following master brand states are used to categorise content, mostly on FT.com:

```html
<span class="o-labels o-labels--content-commercial">Paid Post</span> (used for paid post and promoted content)
<span class="o-labels o-labels--content-premium">Premium</span> (used for premium-only content)
```

The following state is used to indicate that a feature is in a beta state:

```html
<span class="o-labels o-labels--lifecycle-beta">Beta</span>
```

The following internal brand states are used to represent the different support levels of Origami components:

```html
<span class="o-labels o-labels--support-active">Active</span>
<span class="o-labels o-labels--support-maintained">Maintained</span>
<span class="o-labels o-labels--support-experimental">Experimental</span>
<span class="o-labels o-labels--support-deprecated">Deprecated</span>
<span class="o-labels o-labels--support-dead">Dead</span>
```

The following internal brand states are used to represent the FT's service tiers:

```html
<span class="o-labels o-labels--support-platinum">Platinum</span>
<span class="o-labels o-labels--support-gold">Gold</span>
<span class="o-labels o-labels--support-silver">Silver</span>
<span class="o-labels o-labels--support-bronze">Bronze</span>
```

### Indicator Label Markup

Indicator labels have one of three statuses:
- `live`
- `closed`
- `updated`
- `new`

Use the following markup for a live label:
```html
<span class="o-labels-indicator o-labels-indicator--live">
    <span class="o-labels-indicator__status">
		live
    </span>
</span>
```

Use the modifier class `o-labels-indicator--closed` for a closed label:
```html
<span class="o-labels-indicator o-labels-indicator--closed">
    <span class="o-labels-indicator__status">
		closed
    </span>
</span>
```

For an updated or new label use the associated modifier class, e.g. `o-labels-indicator--updated`, and add a child element `o-labels-indicator__timestamp` to show the new/updated time. We recommend using [o-date](https://registry.origami.ft.com/components/o-date) to format the timestamp element.
```html
<span class="o-labels-indicator o-labels-indicator--new">
    <span class="o-labels-indicator__status">
        new
    </span>
    <time class="o-labels-indicator__timestamp">
        <!-- demo `time` element only (the datetime is not 1 hour ago) -->
        <time datetime="2020-07-09T12:52:33+0000" title="July 9 2020 1:52 pm" aria-label="1 hours ago">1 hour ago</time>
    </time>
</span>
```

Indicator labels also support an inverse theme for use on dark backgrounds. To use an inverse theme add the `o-labels-indicator--inverse` class to your markup.
```diff
-<span class="o-labels-indicator o-labels-indicator--live">
+<span class="o-labels-indicator o-labels-indicator--live o-labels-indicator--inverse">
    <span class="o-labels-indicator__status">
		live
    </span>
</span>
```

## Timestamp Markup

To include a timestamp label use the following markup. Note the timestamp label also supports an optional inverse variant for dark background with the `o-labels-timestamp--inverse` class:

```html
<time class="o-labels-timestamp o-labels-timestamp--inverse">
    <!-- demo `time` element only -->
    <time datetime="2016-02-29T12:35:48Z" title="February 29 2016 12:35 pm" aria-label="February 29 2016">February 29 2016</time>
</time>
```

As with the indicator label, we recommend using [o-date](https://registry.origami.ft.com/components/o-date) to format the timestamp element.

## Sass

Output all label styles with the `oLabels` mixin:

```scss
@include oLabels();
```

Or pass an options map `$opts` argument to output just the label styles you need. Options include:

- sizes: a list of standard label sizes to output (see [available sizes](#standard-label-sizes))
- states: a list of standard label states to output (see [available states](#standard-label-states)))
- indicators
	- status: a list of indicator label statuses to output (see [available statuses](#indicator-label-status))
	- inverse
- timestamp
	- inverse

```scss
@include oLabels($opts: (
	// standard label sizes to output
	// e.g. .o-labels--big
	'sizes': ('big'),
	// standard label states to output
	// e.g. .o-labels--content-commercial
	'states': (
		'content-commercial',
		'content-premium'
	),
	// indicator label labels to output
	// .o-labels-indicator
	'indicators': (
		// indicator label statuses to output
		// .o-labels-indicator--live
		'status': ('live'),
		// whether to output the indicator label inverse style
		// .o-labels-indicator--inverse
		'inverse': true,
	),
	// output the timestamp label label
	// .o-labels-timestamp
	'timestamp': (
		// whether to output the timestamp label inverse style
		// .o-labels-timestamp--inverse
		'inverse': true
	)
));
```

### Custom Standard Label State

Use `oLabelsAddState` mixin to add a custom label state for the standard label. See the [`oLabelsAddState` SassDoc](https://registry.origami.ft.com/components/o-labels/sassdoc?brand=master#mixin-olabelsaddstate) for more details.

```scss
// outputs a class .o-labels--citrus-fruit
@include oLabelsAddState('citrus-fruit', (
	background-color: oColorsByName('lemon')
));
```

### Custom Markup

When it's not possible to use an `o-labels` CSS class, for example within another Origami component, use:
- `oLabelsContent` to output a standard label with a custom class.
- `oLabelsIndicatorContent` to output an indicator label with a custom class.
- `oLabelsTimestampContent` to output a timestamp label with a custom class.

If it is possible to use `o-labels` classes we recommend [oLabels](#sass) and [oLabelsAddStates](#custom-standard-label-state) instead. Using these will help reduce the size of your CSS bundle where multiple labels are used.

### oLabelsContent

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

### oLabelsIndicatorContent

As styles for the indicator label apply to multiple html elements, the `oLabelsIndicatorContent` accepts an `$opts` argument to output styles for each element separately.

```scss
// equivalent to .o-labels-indicator
.my-indicator-label {
	@include oLabelsIndicatorContent($opts: ('block': true));
}
// equivalent to .o-labels-indicator--live
.my-indicator-label--live {
	@include oLabelsIndicatorContent($opts: ('block': true, 'modifier': 'live'));
}
// equivalent to .o-labels-indicator__status
.my-indicator-label__status {
	@include oLabelsIndicatorContent($opts: ('element': 'status'));
}
// equivalent to .o-labels-indicator__timestamp
.my-indicator-label__timestamp {
	@include oLabelsIndicatorContent($opts: ('element': 'timestamp'));
}
```

## Migration guide

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

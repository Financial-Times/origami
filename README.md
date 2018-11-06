# o-labels [![Build Status](https://circleci.com/gh/Financial-Times/o-labels.png?style=shield&circle-token=baf3bd7fe9625dfc5c7e24a5451253b348cd9102)](https://circleci.com/gh/Financial-Times/o-labels) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

Standard labels

- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

### Markup

Labels can have one of several states:

- `normal`: standard blue
- `active`: active/success state, default wasabi
- `error`: error/failure state, default crimson
- `pending`: an indeterminate state, default mandarin
- `live`: current in-progress state, default crimson
- `closed`: old closed content state, default grey
- `premium`: premium content state, default black
- `brand`: FT brand label state, default claret
- `commercial-content`: commercially promoted content (eg. native ads), default jade (50% brightness)

```html
<span class="o-labels">Label</span>
<span class="o-labels o-labels--active">Active</span>
<span class="o-labels o-labels--error">Error</span>
<span class="o-labels o-labels--pending">Pending</span>
<span class="o-labels o-labels--live">Live</span>
<span class="o-labels o-labels--closed">Closed</span>
<span class="o-labels o-labels--premium">Premium</span>
<span class="o-labels o-labels--brand">Brand</span>
<span class="o-labels o-labels--commercial-content">Commercial Content</span>
```

Use [o-typography](https://registry.origami.ft.com/components/o-typography) to control the sizing of labels. Use a label one size smaller than surrounding text, e.g. use `-2` label with `-1` text.

### Sass:

As with all Origami components, o-labels has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than incorporating its mixins into your own Sass) set `$o-labels-is-silent : false;` in your Sass before you import the o-labels Sass:

```sass
$o-labels-is-silent: false;
@import 'o-labels/main';
```

#### Using Sass mixins

The `oLabels` mixin can be used to create a label by passing in the desired `state` and `size` (based on the o-typography scale):


```sass
.my-label {
	@include oLabels('premium', -1);
}
```

The `oLabelState` mixin is used to output different coloured labels based on the available states ([see markup section for full list](#markup)).

```sass
.label--error {
	@include oLabelsState('error');
}
```

#### Controlling label size

To output different sized labels for your project, use the `oTypographySize` mixin to change the size of your label with different modifiers:

```sass
.label--big {
	@include oTypographySize(-1);
}
```


## Migration guide

**Migrating from v2 to v3**

V3 of o-labels removes the `oLabelSize` mixin. To create different sized labels for your product you should use the o-typography mixins as shown in the [controlling label size](#controlling-label-size) section.

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-labels/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

[bem]: http://getbem.com/naming/

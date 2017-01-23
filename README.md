# o-labels [![Build Status](https://circleci.com/gh/Financial-Times/o-labels.png?style=shield&circle-token=baf3bd7fe9625dfc5c7e24a5451253b348cd9102)](https://circleci.com/gh/Financial-Times/o-labels)

Standard labels

- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

## Usage

### Markup

Labels can have one of several states:

- `normal`: standard blue
- `active`: active/success state, default green
- `error`: error/failure state, default red
- `pending`: an indeterminate state, default orange
- `live`: current in-progress state, default red
- `closed`: old closed content state, default grey
- `premium`: premium content state, default black
- `brand`: FT brand label state, default claret

```html
<span class="o-labels">Label</span>
<span class="o-labels o-labels--active">Active</span>
<span class="o-labels o-labels--error">Error</span>
<span class="o-labels o-labels--pending">Pending</span>
<span class="o-labels o-labels--live">Live</span>
<span class="o-labels o-labels--closed">Closed</span>
<span class="o-labels o-labels--premium">Premium</span>
<span class="o-labels o-labels--brand">Brand</span>
```

Use [o-typography](https://registry.origami.ft.com/components/o-typography) to control the sizing of labels. Use a label one size smaller than surrounding text, e.g. an `s` label with `m` text.

### Sass:

As with all Origami components, o-labels has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than incorporating its mixins into your own Sass) set `$o-labels-is-silent : false;` in your Sass before you import the o-labels Sass:

```sass
$o-labels-is-silent: false;
@import 'o-labels/main';
```

#### Using Sass mixins

The `oLabels` mixin can be used to create a label by passing in the desired `state` and `size`:

```sass
.my-label {
	@include oLabels('premium', 'big');
}
```

Along with the main `oLabels` mixins there are two additional Sass mixins: `oLabelsSize` and `oLabelsState`. Using these along with the main `oLabels` mixin will allow you to include a range of labels in your project:

```sass
.label {
	@include oLabels;
}

.label--big {
	@include oLabelsSize('big');
}

.label--error {
	@include oLabelsState('error');
}
```


---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-labels/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

[bem]: http://getbem.com/naming/

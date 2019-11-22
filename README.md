
# o-stepped-progress [![Circle CI](https://circleci.com/gh/Financial-Times/o-stepped-progress/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-stepped-progress/tree/master)

Track progress through a multi-step process, such as a form.

- [Markup](#markup)
- [JavaScript](#javascript)
- [Sass](#sass)
- [Migration Guide](#migration)
- [Contact](#contact)
- [Licence](#licence)

## Markup

The markup for a stepped progress element is as follows. Markup is commented for clarity, and to explain why additional elements are used which may otherwise seem redundant.

```html
<!--
Base class and attribute hook for JavaScript
-->
<div class="o-stepped-progress" data-o-component="o-stepped-progress">

	<!--
	The steps live in an ordered list, which ensures that assistive
	technology can read this appropriately. Also if CSS does not load
	then a sensible fallback is in place
	-->
	<ol class="o-stepped-progress__steps">

		<!--
		Each step lives inside a list item. This item does not need any
		classes applied. The following modifiers are available to indicate
		the status of a step (each prefixed with o-stepped-progress):
		  - complete: a step that has been completed by the user
		  - current: the step the user is currently on
		  - error: a step that something went wrong with
		-->
		<li>

			<!--
			The step itself is either an anchor or span element. We encourage
			using an anchor for completed and current steps, as this offers a
			better experience for screen readers - all of the text inside is
			read as one block rather than each span separately.
			-->
			<a href="/step-1" class="o-stepped-progress__step o-stepped-progress__step--complete">
				<span class="o-stepped-progress__label">

					<!--
					The o-stepped-progress__status element is required to make
					the step label accessible for assistive technology, older
					browsers, and when CSS fails to load. This element is
					visually hidden otherwise
					-->
					Example Completed Step <span class="o-stepped-progress__status">(completed)</span>
				</span>
			</a>
		</li>

		<!--
		An example of the current step. Here using an anchor element
		and including accessible text in the label
		-->
		<li>
			<a href="/step-2" class="o-stepped-progress__step o-stepped-progress__step--current">
				<span class="o-stepped-progress__label">
					Example Current Step <span class="o-stepped-progress__status">(current step)</span>
				</span>
			</a>
		</li>

		<!--
		An example of a future step (with no modifier classes). Here
		we're using a span element as we don't want a user to jump
		ahead before completing the current step. Future steps do
		not require a status element
		-->
		<li>
			<span class="o-stepped-progress__step">
				<span class="o-stepped-progress__label">
					Example Future Step
				</span>
			</span>
		</li>

	</ol>
</div>
```

## JavaScript

No code will run automatically unless you are using the [Build Service](https://www.ft.com/__origami/service/build/). You must either construct an o-stepped-progress object or trigger an `o.DOMContentLoaded` event, which o-stepped-progress listens for.

### Constructing an o-stepped-progress instance manually

Assuming that you have an HTML element on the page to represent your stepped progress:

```js
import SteppedProgress from 'o-stepped-progress';
const steppedProgressElement = document.getElementById('my-stepped-progress');
const mySteppedProgress = new SteppedProgress(steppedProgressElement);
```

If you want to initialise every stepped progress element on the page (based on the presence of the attribute: `data-o-component="o-stepped-progress"`):

```js
import SteppedProgress from 'o-stepped-progress';
SteppedProgress.init();
```

### Constructing o-stepped-progress instances automatically

You can also rely on the `o.DOMContentLoaded` event to initialise all Origami components that have been included in your JavaScript. Either use [o-autoinit](https://github.com/Financial-Times/o-autoinit) or dispatch the event yourself once all of your page content has loaded:

```js
document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
```

## Interacting with an o-stepped-progress instance

Once you have stepped progress instances, you can interact with them using the methods below:

  - `mySteppedProgress.getSteps()`: Get an array of the steps in the stepped progress component
  - `mySteppedProgress.getCompletedSteps()`: Get an array of the steps that are completed
  - `mySteppedProgress.getCurrentStep()`: Get the step marked as current
  - `mySteppedProgress.isComplete()`: Get whether the stepped progress has been completed
  - `mySteppedProgress.progress()`: Mark the current step as complete, and move onto the next step

There is [full API documentation available in the Origami Registry](https://registry.origami.ft.com/components/o-stepped-progress/jsdoc).

## Sass

### Silent mode

As with all Origami components, o-stepped-progress has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than incorporating its mixins into your own Sass) set `$o-stepped-progress-is-silent: false;` in your Sass before you import the o-stepped-progress Sass:

```scss
$o-stepped-progress-is-silent: false;
@import 'o-stepped-progress/main';
```

### Mixin: `oSteppedProgress`

If using o-stepped-progress in silent mode, you'll need to use the mixins outlined here to output styles.

The `oSteppedProgress` mixin is used to output base styles as well as styles for all of the available themes. This output includes all of the `.o-stepped-progress` classes:

```scss
@include oSteppedProgress();
```

```css
.o-stepped-progress {
	/* styles */
}
.o-stepped-progress--heavy {
	/* styles */
}
/* etc. */
```

If you wish to specify a subset of themes to output styles for, you can pass in an `$opts` parameter (see [themes](#themes) for available options):

```scss
@include oSteppedProgress($opts: (
	'themes': (
		'heavy'
	)
));
```

There is [full Sass documentation available in the Origami Registry](https://registry.origami.ft.com/components/o-stepped-progress/sassdoc).


### Themes

This table outlines all of the possible themes you can request in the [`oSteppedProgress` mixin](#mixin-osteppedprogress):

| Theme  | Description                               | Brand support |
|--------|-------------------------------------------|---------------|
| heavy  | Label with heavier lines and larger type. | internal      |


## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 2 | N/A | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
⚠ maintained | 1 | 1.0 | N/A |

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-stepped-progress/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).


## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).


# o-stepped-progress [![Circle CI](https://circleci.com/gh/Financial-Times/o-stepped-progress/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-stepped-progress/tree/master)

Track progress through a multi-step process, such as a form.

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
- [Contributing](#contributing)
- [Contact](#contact)
- [Licence](#licence)


## Usage

### Markup

TODO

### JavaScript

No code will run automatically unless you are using the [Build Service](https://www.ft.com/__origami/service/build/). You must either construct an o-stepped-progress object or trigger an `o.DOMContentLoaded` event, which o-stepped-progress listens for.

#### Constructing an o-stepped-progress instance manually

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

#### Constructing o-stepped-progress instances automatically

You can also rely on the `o.DOMContentLoaded` event to initialise all Origami components that have been included in your JavaScript. Either use [o-autoinit](https://github.com/Financial-Times/o-autoinit) or dispatch the event yourself once all of your page content has loaded:

```js
document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
```

### Interacting with an o-stepped-progress instance

Once you have stepped progress instances, you can interact with them using the methods below:

  - `mySteppedProgress.getSteps()`: Get an array of the steps in the stepped progress component
  - `mySteppedProgress.getCompletedSteps()`: Get an array of the steps that are completed
  - `mySteppedProgress.getCurrent()`: Get the step marked as current
  - `mySteppedProgress.isComplete()`: Get whether the stepped progress has been completed
  - `mySteppedProgress.progress()`: Mark the current step as complete, and move onto the next step

There is [full API documentation available in the Origami Registry](https://registry.origami.ft.com/components/o-stepped-progress/jsdoc).

### Sass

TODO


## Contributing

If your component is particularly complicated (image sets fall into this category) then a contributing section or even a contributing.md might be useful.


---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-stepped-progress/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).


---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

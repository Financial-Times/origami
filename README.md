o-audio [![Circle CI](https://circleci.com/gh/Financial-Times/o-audio/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-audio/tree/master)
=================

_A short description of what this component does._


_A table of contents to help people find things_

- [Usage](#usage)
	- [Markup](#markup)
	- [JavaScript](#javascript)
	- [Sass](#sass)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage
_Whatever usage instructions your component has. We've broken this down by Markup, JavaScript and Sass, but it depends how complex your component is._

### Markup

_Common templating can go here, especially if there is only one template, but people can always check the demos for more._

_Remember to start your codeblocks with three backticks and "html" so your markup is syntax highlighted correctly._

```html
<div data-o-component="o-audio" class='o-audio'>
</div>
```

### JavaScript
_Remember to start your codeblocks with three backticks and "js" so your js is syntax highlighted correctly._

_Though it's not practical to repeat every aspect of Origami modules convention for every component, **A LOT** of people get tripped up by modules not auto initialising, so this line is useful if you have JavaScript:_

No code will run automatically unless you are using the Build Service.
You must either construct an `o-audio` object or fire the `o.DOMContentLoaded` event, which oComponent listens for.

#### Constructing an o-audio

```js
const oAudio = require('o-audio');
oAudio.init();
```

#### Firing an oDomContentLoaded event

```js
require('o-audio');

document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Sass
_Remember to start your codeblocks with three backticks and "sass" so your markup is syntax highlighted correctly._

_Though it's not practical to repeat every aspect of Origami modules convention for every component, **A LOT** of people get tripped up by silent mode, so this line (remember to change the o-audio to your component name) is useful if you have Sass:_

As with all Origami components, o-audio has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-audio-is-silent : false;` in your Sass before you import the o-audio Sass.

## Troubleshooting
_This is a good place to put problems that come up repeatedly_

### The thing with the thing isn't working
Fix it by turning it off and on again

## Contributing
If your component is particularly complicated (image sets fall into this category) then a contributing section or even a contributing.md might be useful.


## Migration guide
_Migration guides are very important! Always include one for major releases. To create a codeblock that has diff highligting, use three backticks followed by the word diff_

### Migrating from 1.X.X to 2.X.X

The 2.0.0 release changes the default behaviour of o-audio.

```diff
<div class="o-audio__container">
- remove this line
+ add this line
</div>
```

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-audio/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
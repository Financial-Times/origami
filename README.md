o-lazy-load [![Circle CI](https://circleci.com/gh/Financial-Times/o-lazy-load/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-lazy-load/tree/master)
=================

This component provides flexible lazy loading functionality for images, pictures, iframes and more. It is powered by [lozad.js](https://github.com/ApoorvSaxena/lozad.js) which uses the Intersection Observer API to detect when targetted elements enter the viewport.

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
<div data-o-component="o-lazy-load" class='o-lazy-load'>
</div>
```

### JavaScript
_Remember to start your codeblocks with three backticks and "js" so your js is syntax highlighted correctly._

_Though it's not practical to repeat every aspect of Origami modules convention for every component, **A LOT** of people get tripped up by modules not auto initialising, so this line is useful if you have JavaScript:_

No code will run automatically unless you are using the Build Service.
You must either construct an `o-lazy-load` object or fire the `o.DOMContentLoaded` event, which oComponent listens for.

#### Constructing an o-lazy-load

```js
const oLazy = require('o-lazy-load');

const oLazy = new oLazy();
```

#### Firing an oDomContentLoaded event

```js
document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

### Sass
_Remember to start your codeblocks with three backticks and "sass" so your markup is syntax highlighted correctly._

_Though it's not practical to repeat every aspect of Origami modules convention for every component, **A LOT** of people get tripped up by silent mode, so this line (remember to change the o-lazy-load to your component name) is useful if you have Sass:_

As with all Origami components, o-lazy-load has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-lazy-load-is-silent : false;` in your Sass before you import the o-lazy-load Sass.

## Troubleshooting
_This is a good place to put problems that come up repeatedly_

### The thing with the thing isn't working
Fix it by turning it off and on again

## Contributing
If your component is particularly complicated (image sets fall into this category) then a contributing section or even a contributing.md might be useful.


## Migration guide
_Migration guides are very important! Always include one for major releases. To create a codeblock that has diff highligting, use three backticks followed by the word diff_

### Migrating from 1.X.X to 2.X.X

The 2.0.0 release changes the default behaviour of o-lazy-load.

```diff
<div class="o-lazy-load__container">
- remove this line
+ add this line
</div>
```

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-lazy-load/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).
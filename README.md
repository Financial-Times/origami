# o-footer [![Build Status](https://circleci.com/gh/Financial-Times/o-footer.png?style=shield&circle-token=e3626fa5fcb3e2f16bbf587ee697d441b93a6aa2)](https://circleci.com/gh/Financial-Times/o-footer)

FT page footer component

- [Usage](#usage)
	- [Data](#data)
	- [Markup](#markup)
	- [Styles](#sass)
	- [JavaScript](#javascript)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)


## Usage
### Data

For convenience a JSON file with footer links has been provided (`footer.js`).

### Markup

There are full HTML examples in demos/src which you can copy and paste into your project to get started.

### Styles

If you're using the Build Service, there's not much to do except make sure the classes in your markup match up with those in the demos.

If you're not using the build service then you'll need to be aware of silent mode. As with all Origami components, o-footer has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-footer-is-silent : false;` in your Sass before you import the o-footer Sass.

```sass
$o-footer-is-silent: false;

// Output standard o-footer with dark theme and navigation matrix styles
@include oFooter;

// Output the footer with the light theme
@include oFooter($theme: 'light');

// Output the simple footer, with the dark theme.
// Use the method above for a light themed simple footer
@include oFooter($simple: true);

// Output o-footer without the standard top margin.
@include oFooter($margin: false);
```

### JavaScript

Unless you're using the Build Service no JS will run automatically.
You must either construct an `o-footer` object or fire the `o.DOMContentLoaded` event, which oFooter listens for.

#### Constructing an o-footer

```js
const oFooter = require('o-footer');

const ofooter = new oFooter();
```

#### Firing an oDomContentLoaded event

```js
document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

## Migration guide

### Upgrading from 5.x.x to 6.x.x

V5 -> V6 introduces the new majors of o-colors and o-typography. Updating to this new version will mean updating any other components that you have which are using o-colors and o-typography. There are no other breaking changes in this release.

### Upgrading from 4.x.x to 5.x.x
Version 5 has significant markup changes compared to version 4. If you want to upgrade, the best option is to look at the demos: [footer](https://github.com/Financial-Times/o-footer/blob/master/demos/src/footer.mustache) and [simple footer](https://github.com/Financial-Times/o-footer/blob/master/demos/src/simple-footer.mustache).
If you don't want to upgrade, some superficial visual changes have been back-ported to a minor version on 4.x.x.


### Upgrading from 3.x.x to 4.x.x


Note that o-footer v4 relies on o-grid v4.

#### Markup changes

```diff
 <nav class="o-footer__row o-footer__nav">
 	<div class="o-footer__col o-footer__col--full-width">
 		…
+ 		<div class="o-footer__divider"></div>
 	</div>
 </nav>
```

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-footer/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

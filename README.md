o-subs-card [![Circle CI](https://circleci.com/gh/Financial-Times/o-subs-card/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-subs-card/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)
=================

This component is used for showing information about various FT subscription packages.


- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
	- [JS](#js)
	- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

This component is largely Sass styles, but there is a small amount of JavaScript used to show and hide content at smaller screen widths.

### Markup

The subs card will expand to fill the width of its containing element, so you will need to build your own container system depending on how you want to arrange your page. An example of several subs packages together in a collection can be seen in the demos on the [registry](http://registry.origami.ft.com/components/o-subs-card)

```html
<div class='o-subs-card__container'>
	<div class="o-subs-card" data-o-component="o-subs-card">
		<div class="o-subs-card__top">
			<div class="o-subs-card__copy-title">Subscription title</div>
			<div class="o-subs-card__charge">
				<button class="o-subs-card__select-button">Select</button>
				<div class="o-subs-card__charge__value">£XX.XX per week</div>
			</div>
		</div>
		<div class="o-subs-card__copy-pitch">Access to FT.com on your desktop, mobile and tablet</div>
		<div class="o-subs-card__expander">
			<div class="o-subs-card__copy-details">
				<ul class="o-subs-card__copy-benefits">
					<li>...</li>
				</ul>
			</div>
			<div class='o-subs-card__read-more'>Read more</div>
		</div>
	</div>
</div>
```

### Sass

As with all Origami components, o-subs-card has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-subs-card-is-silent : false;` in your Sass before you import the o-subs-card Sass.

#### Themes

The subs card standard theme is teal. To differentiate amongst different subscription tiers, there are some additional themes which you can use with either the mixin or concrete classes:
- `oSubsCardDiscount` / `o-subs-card--discount`
- `oSubsCardB2B` / `o-subs-card--b2b`

### JavaScript

If you're using the [Build Service](https://www.ft.com/__origami/service/build/v2/) to get this component, you won't need to initialise your JavaScript, it should just work.

If you aren't using the Build Service, you'll need to fire an `o.DOMContentLoaded` event (which o-subs-card listens for) or construct an `oSubsCard` object.

Firing an o.DOMContentLoaded event

```js
document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

Instantiating your own oSubsCard:

```js
import { SubsCard } from 'o-subs-card';
subsCard.init();
```
This will instantiate all subs-cards within the document. Alternatively you can pass in a HTMLElement, or String to be used as a selector to limit the scope of the instantiated subs cards to only child elements of the passed in scope.

## Migration Guide

### Upgrading from v3.x.x to v4.x.x

The dependencies for this component have all been updated to the latest major
versions. If you have any conflicts while installing this version, you'll need
to first update its dependencies. See [the Bower config for these](./bower.json).

#### Color Use Cases

The following color use cases have been removed:

```diff
- o-subs-card
- o-subs-card-button
- o-subs-card-copy-details
- o-subs-card-read-more
- o-subs-card-discount
- o-subs-card-b2b
```

### Upgrading from v2.x.x to v3.x.x

o-subs-card v3.x.x changes the JavaScript from being a mix of ECMAScript Modules and CommonJS in a single file to being solely ECMAScript Modules. 

You will need to change from using a CommonJS `require` to an ECMAScript Module `import`:

```diff
- const SubsCard = require('o-subs-card');
+ import { SubsCard } from 'o-subs-card';
```

### Upgrading from v1.x.x to v2.x.x

o-subs-card v2.x.x changes the underlying style of all cards, removes two themes, adds a new B2B variation, and has updated markup. In this version, the expanding functionality is limited to the mobile and tablet viewports.

The following themes have been removed:

```diff
- oSubsCardPremium / 'o-subs-card--premium'
- oSubsCardPremiumPlus / 'o-subs-card--premium-plus'
```

And the available themes (and their respective classes) are now:  

```diff
+ oSubsCardB2B / 'o-subs-card--b2b'
oSubsCardDiscount / 'o-subs-card--discount' //no change
```

The markup has been rearranged, and some classes have been removed.

```diff
+ <div class='o-subs-card__container'>
		<div class="o-subs-card" data-o-component="o-subs-card">
			<div class="o-subs-card__top">
				<div class="o-subs-card__copy-title">Subscription title</div>
-				<img class="o-subs-card__copy-image" src='/demos/src/demo-placeholder.png' alt='photo of FT subscription options'>
				<div class="o-subs-card__charge">
-					<span class="o-subs-card__charge__value">£XX.XX</span> per week
+					<div class="o-subs-card__charge__value">£XX.XX per week </div>
					<button class="o-subs-card__select-button">Select</button>
				</div>
			</div>
-			<div class="o-subs-card__copy-pitch">Access to FT.com on your desktop, mobile and tablet</div>
				<div class="o-subs-card__expander">
-		 		<div class='o-subs-card__read-more'>Read more</div>
					<div class="o-subs-card__copy-details">
						<ul class="o-subs-card__copy-benefits">
							<li>...</li>
						</ul>
					</div>
+					<div class='o-subs-card__read-more'>Read more</div>
				</div>
		</div>
+ </div>
```
- There is now a container to wrap all cards in.
- The `<img>` tag has been removed.
- The charge value has been moved into a `div` of its down and has been moved below the 'select' button.
- The read more element has been moved to be the last child in the card.


---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-subs-card/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

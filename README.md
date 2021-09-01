# o-subs-card [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

This component is used for showing information about various FT subscription packages.

- [Usage](#usage)
- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Migration Guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Usage

Check out [how to include Origami components in your project](https://origami.ft.com/docs/components/#including-origami-components-in-your-project) to get started with `o-subs-card`.

## Markup

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
			<button class='o-subs-card__read-more'></button>
		</div>
	</div>
</div>
```

## Sass

To include all o-subs-card classes use the `oSubsCard` mixin with no arguments:

```scss
@include oSubsCard();
```

To include a specific theme, pass an options argument with the themes to include:

```scss
@include oSubsCard($opts: (
	'themes': ('discount', 'b2b')
));
```

### Themes

The subs card standard theme is teal. To differentiate amongst different subscription tiers, there are some additional themes which you can use with either the mixin or concrete classes:
- `oSubsCardDiscount` / `o-subs-card--discount`
- `oSubsCardB2B` / `o-subs-card--b2b`

## JavaScript

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
import { SubsCard } from '@financial-times/o-subs-card';
subsCard.init();
```
This will instantiate all subs-cards within the document. Alternatively you can pass in a HTMLElement, or String to be used as a selector to limit the scope of the instantiated subs cards to only child elements of the passed in scope.

## Migration guide

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 6 | N/A | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
⚠ maintained | 5 | 5.0.1 | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
⚠ maintained | 4 | 4.1 | [migrate to v4](MIGRATION.md#migrating-from-v3-to-v4) |
╳ deprecated | 3 | 3.1 | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
╳ deprecated | 2 | 2.4 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.1 | N/A |

***

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-subs-card/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

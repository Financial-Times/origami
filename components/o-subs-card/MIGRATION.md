# Migration Guide

## Migrating from v5 to v6

The "more/less" toggle has been updated to use a `button` element instead of a `div` to improve keyboard accessibility.

To upgrade, replace the "read more" `div` tag with a `button` tag in your markup.
```diff
- <div class='o-subs-card__read-more'>Read more</div>
+ <button class='o-subs-card__read-more'></button>
```

The button copy is added dynamically, and now includes hidden text to provide screen reader users more context based on the title of the card e.g. `Read more about Print`.
A new CSS class has been added to have visually hidden elements but to be used for screen reader users.
```
.o-subs-card-visually-hidden {
    @include oNormaliseVisuallyHidden;
}
```

## Migrating from v4 to v5

The mixin `oSubsCard` has been renamed to `oSubsCardBase`.
```diff
- @include oSubsCard;
+ @include oSubsCardBase;
```

A "primary mixin" has been added named `oSubsCard`. The primary mixin outputs all component CSS when no arguments are given.

```scss
@import '@financial-times/o-subs-card/main';
@include oSubsCard();
```

Support for Bower and version 2 of the Origami Build Service have been removed.

Follow [the migration guide on the Origami website](https://origami.ft.com/docs/tutorials/bower-to-npm/).

## Upgrading from v3 to v4

The dependencies for this component have all been updated to the latest major
versions. If you have any conflicts while installing this version, you'll need
to first update its dependencies. See [the Bower config for these](./bower.json).

## Color Use Cases

The following color use cases have been removed:

```diff
- o-subs-card
- o-subs-card-button
- o-subs-card-copy-details
- o-subs-card-read-more
- o-subs-card-discount
- o-subs-card-b2b
```

## Upgrading from v2 to v3

o-subs-card v3 changes the JavaScript from being a mix of ECMAScript Modules and CommonJS in a single file to being solely ECMAScript Modules.

You will need to change from using a CommonJS `require` to an ECMAScript Module `import`:

```diff
- const SubsCard = require('o-subs-card');
+ import { SubsCard } from 'o-subs-card';
```

## Upgrading from v1 to v2

o-subs-card v2 changes the underlying style of all cards, removes two themes, adds a new B2B variation, and has updated markup. In this version, the expanding functionality is limited to the mobile and tablet viewports.

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
<<<<<<< HEAD
-		 		<div class='o-subs-card__read-more'>Read more</div>
=======
-		 		<div class='o-subs-card__read-more'></div>
>>>>>>> de60d1048d796fe4bd53ccb4c8a7b39dccaece06
					<div class="o-subs-card__copy-details">
						<ul class="o-subs-card__copy-benefits">
							<li>...</li>
						</ul>
					</div>
<<<<<<< HEAD
+					<div class='o-subs-card__read-more'>Read more</div>
=======
+					<button class='o-subs-card__read-more'></button>
>>>>>>> de60d1048d796fe4bd53ccb4c8a7b39dccaece06
				</div>
		</div>
+ </div>
```
- There is now a container to wrap all cards in.
- The `<img>` tag has been removed.
- The charge value has been moved into a `div` of its down and has been moved below the 'select' button.
- The read more element has been moved to be the last child in the card.

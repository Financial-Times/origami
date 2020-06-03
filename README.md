# o-footer [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

FT page footer component

- [Markup](#markup)
- [Sass](#sass)
- [JavaScript](#javascript)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Markup

The basic structure of a simple footer has a theme and includes legal links, a copyright notice, and a logo:

```html
<footer class="o-footer o-footer--theme-dark" data-o-component="o-footer" data-o-footer--no-js="">
	<div class="o-footer__container">
		<div>
			<ul class="o-footer__legal-links">
				<li><a href="#"><!-- legal link 1--></a></li>
				<li><a href="#"><!-- legal link 2--></a></li>
				<li><a href="#"><!-- legal link 3--></a></li>
			</ul>
		</div>
		<div class="o-footer__copyright">
			<small>
				<!-- copyright notice -->
			</small>
		</div>
	</div>
	<div class="o-footer__brand">
		<div class="o-footer__container">
			<div class="o-footer__brand-logo"></div>
		</div>
	</div>
</footer>
```

### Themes

Themes include `o-footer--theme-dark` and `o-footer--theme-light`:

```diff
-<footer class="o-footer o-footer--theme-dark" data-o-component="o-footer" data-o-footer--no-js="">
+<footer class="o-footer o-footer--theme-light" data-o-component="o-footer" data-o-footer--no-js="">
	<!-- ... -->
</footer>
```

### Link Matrix

A more complex footer with a matrix of links is also supported. Add a row `o-footer__row` with `o-footer__matrix`. Links within the matrix are grouped by `o-footer__matrix-group`. Each group has a title `o-footer__matrix-title` and an element to contain the links `o-footer__matrix-content`. To display the links in columns within the group they are also wrapped in `o-footer__matrix-column`.

The width of the columns and the way they collapse on smaller viewports may be controlled by adding a modifier class to each group `o-footer__matrix-group--[NUMBER]`. Where `NUMBER` is the number of columns in a row on desktop (1, 2, 4, or 6).

```html
<footer class="o-footer o-footer--theme-dark" data-o-component="o-footer" data-o-footer--no-js="">
	<div class="o-footer__container">

		<div class="o-footer__row">
			<nav class="o-footer__matrix" role="navigation" aria-label="Useful links">
				<div class="o-footer__matrix-group o-footer__matrix-group--1">
					<h3 class="o-footer__matrix-title">
						<!-- link group title -->
					</h3>
					<div class="o-footer__matrix-content" id="o-footer-section-0">
						<div class="o-footer__matrix-column">
								<a class="o-footer__matrix-link" href="#"><!-- link 1 --></a>
								<a class="o-footer__matrix-link" href="#"><!-- link 2 --></a>
						</div>
					</div>
				</div>

				<div class="o-footer__matrix-group o-footer__matrix-group--1">
					<h3 class="o-footer__matrix-title">
						<!-- link group title -->
					</h3>
					<div class="o-footer__matrix-content" id="o-footer-section-1">
						<div class="o-footer__matrix-column">
							<a class="o-footer__matrix-link" href="#"><!-- link 1 --></a>
							<a class="o-footer__matrix-link" href="#"><!-- link 2 --></a>
						</div>
					</div>
				</div>

				<div class="o-footer__matrix-group o-footer__matrix-group--2">
					<h3 class="o-footer__matrix-title" aria-controls="o-footer-section-2">
						Services
					</h3>
					<div class="o-footer__matrix-content" id="o-footer-section-2">
							<div class="o-footer__matrix-column">
								<a class="o-footer__matrix-link" href="#"><!-- link 1 --></a>
								<a class="o-footer__matrix-link" href="#"><!-- link 2 --></a>
							</div>
							<div class="o-footer__matrix-column">
								<a class="o-footer__matrix-link" href="#"><!-- link 3 --></a>
								<a class="o-footer__matrix-link" href="#"><!-- link 4 --></a>
							</div>
					</div>
				</div>
			</nav>

			<h3 class="o-footer__external-link o-footer__matrix-title">
				<a class="o-footer__more-from-ft o-footer__matrix-title" href="#"><!-- link --></a>
			</h3>
		</div>

		<div class="o-footer__copyright">
			<small>
				<!-- copyright notice -->
			</small>
		</div>
	</div>
	<div class="o-footer__brand">
		<div class="o-footer__container">
			<div class="o-footer__brand-logo"></div>
		</div>
	</div>
</footer>
```

See [demos in the registry for full markup examples](https://registry.origami.ft.com/components/o-footer).

## Sass

To include all o-footer css call the `oFooter` mixin. However, to keep your CSS bundle size low, we recommend using the `$opts` argument to include only the features you need.

```scss
@import 'o-footer/main';
@include oFooter();
```

To output just the footer styles you need pass an options `$opts` map. The map accepts:

- `themes`: A list of themes to include. Available themes are `light` and `dark`.
- `matrix`: Whether to output styles for a complex navigation structure (not required for a simple footer).
- `margin`: A [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length) to set a custom top margin for o-footer.

E.g. include only the dark theme for a simple footer of legal links:
```scss
@include oFooter($opts: (
	'themes': ('dark')
));
```

E.g. include only the dark theme for a complex footer with a matrix of site links:
```scss
@include oFooter($opts: (
	'themes': ('dark'),
	'matrix': true
));
```

## JavaScript

Unless you're using the Build Service no JS will run automatically.
You must either construct an `o-footer` object or fire the `o.DOMContentLoaded` event, which oFooter listens for.

### Constructing an o-footer

```js
import oFooter from 'o-footer';

const ofooter = new oFooter();
```

### Firing an oDomContentLoaded event

```js
document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
```

## Migration guide

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 7 | N/A | [migrate to v7](MIGRATION.md#migrating-from-v6-to-v7) |
⚠ maintained | 6 | 6.1 | [migrate to v6](MIGRATION.md#migrating-from-v5-to-v6) |
╳ deprecated | 5 | 5.4 | [migrate to v5](MIGRATION.md#migrating-from-v4-to-v5) |
╳ deprecated | 4 | 4.1 | - |
╳ deprecated | 3 | 3.2 | - |
╳ deprecated | 2 | 2.0 | - |
╳ deprecated | 1 | 1.16 | - |


---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-footer/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

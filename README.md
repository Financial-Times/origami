# o-footer-services [![Circle CI](https://circleci.com/gh/Financial-Times/o-footer-services/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-footer-services/tree/master) [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

o-footer-services is a footer component for internal products and tooling at the FT.

-   [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
-   [Migration Guide](#migration-guide)
-   [Contact](#contact)
-   [Licence](#licence)

## Usage

### Markup

A footer requires the following markup:

```html
<footer class="o-footer-services">
	<div class="o-footer-services__container">
		<div class="o-footer-services__wrapper o-footer-services__wrapper--top">
			<p class="o-footer-services__logo">Origami</p>
			<a class="o-footer-services__icon-link o-footer-services__icon-link--github" href="http://github.com/financial-times/o-footer-services">View project on GitHub</a>
			<a class="o-footer-services__icon-link o-footer-services__icon-link--slack" href="https://slack.com/messages/[id]/">#slack-channel</a>
			<p class="o-footer-services__content">Help or advice can be found here <a href="mailto:an.email@someplace.com">an.email@someplace.com</a> and there are other places, <a class="o-footer-services__content--external" href='/somewhere'>like this one</a>.</p>
		</div>
	</div>
	<div class="o-footer-services__container">
		<div class="o-footer-services__wrapper o-footer-services__wrapper--legal">
			<div class="o-footer-services__links">
			<a href="http://help.ft.com/help/legal-privacy/cookies/">Cookies</a>
			<a href="http://help.ft.com/help/legal-privacy/copyright/copyright-policy/">Copyright</a>
			<a href="http://help.ft.com/help/legal-privacy/privacy/">Privacy</a>
			<a href="http://help.ft.com/help/legal-privacy/terms-conditions">Terms & Conditions</a>
		</div>
		<p><span>&copy; THE FINANCIAL TIMES LTD 2019.</span> FT and 'Financial Times' are trademarks of The Financial Times Ltd.</p>
	</div>
</footer>
```

All elements within the `.o-footer-services__wrapper--top` section are entirely optional. You can find examples of the variations [in the registry](https://registry.origami.ft.com/components/o-footer-services@1.0.2).

As a move to future proof this component and the products that may use it, **`.o-footer-services__wrapper--legal` is not optional.**

### Sass

As with all Origami components, o-footer-services has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-footer-services-is-silent: false;` in your Sass before you import the o-footer-services Sass.

If you would rather _not_ have origami classnames on your page, don't switch off silent mode, and use the mixin as shown below. This will only be available if you are _not_ using the Build Service.

```sass
@include oFooterServicesBase($class: 'my-footer');
```

This will only provide styling for footers without a logo, so if you are planning on incorporating a logo in your footer, you'll need to use the `oFooterServicesWithLogo` mixin. This mixin uses the [Image Service](https://www.ft.com/__origami/service/image/v2), so if you would like to add your logo to the [logo-images image set](https://registry.origami.ft.com/components/logo-images), please [get in touch with us](#contact).

```sass
@include oFooterServicesWithLogo($image: 'logo-name', class: 'my-footer');
```

## Migration

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.2.0 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0.2 | N/A |

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-footer-services/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

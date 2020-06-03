# o-footer-services [![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#licence)

o-footer-services is a footer component for internal products and tooling at the FT.

- [Markup](#markup)
- [Sass](#sass)
- [Migration guide](#migration-guide)
- [Contact](#contact)
- [Licence](#licence)

## Markup

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
		<p><span>&copy; THE FINANCIAL TIMES LTD 2020.</span> FT and 'Financial Times' are trademarks of The Financial Times Ltd.</p>
	</div>
</footer>
```

All elements within the `.o-footer-services__wrapper--top` section are entirely optional. You can find examples of the variations [in the registry](https://registry.origami.ft.com/components/o-footer-services@1.0.2).

As a move to future proof this component and the products that may use it, **`.o-footer-services__wrapper--legal` is not optional.**

## Sass

To output all `o-footer-services` CSS call `oFooterServices()`.

```scss
@include oFooterServices();
```

To keep your CSS bundle size small, include  `o-footer-services` features granularly using the `opts` argument.
E.g. to output styles with a project logo but without the default icon link to Github:

```scss
@include oFooterServices($opts: (
	'logo': 'ftlogo-v1:origami',
	'icons': ('slack')
));
```
All options include:

| Option    | Description                                                                                                                                         | Brand support                |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| logo      | A logo from the [image service](https://github.com/Financial-Times/origami-image-service.) to include in the footer (e.g. `ftlogo-v1:origami`).     | master, internal, whitelabel |
| icons     | A list of [social share](https://registry.origami.ft.com/components/social-images) icons to include links for, defaults to '('slack', 'github')`.         | master, internal, whitelabel |


Your project should call `oFooterServices` once, and add to the `opts` argument when new features are needed. However, if `oFooterServices` is called multiple times, for example for code splitting across multiple bundles, the `$include-base-styles` argument may be set to `false` to ommit fundamental base styles required by all options.
```scss
// Output o-footer-services with no icons.
@include oFooterServices($opts: (
	'logo': 'ftlogo-v1:origami',
	'icons': ()
));

// Include o-footer-services icons separately,
// without repeating base styles output above.
// This is *not* recommended.
@include oFooterServices($opts: (
	'icons': ('slack', 'github')
), $include-base-styles: false);
```

## Migration guide

State | Major Version | Last Minor Release | Migration guide |
:---: | :---: | :---: | :---:
✨ active | 3 | N/A | [migrate to v3](MIGRATION.md#migrating-from-v2-to-v3) |
⚠ maintained | 2 | 2.2.0 | [migrate to v2](MIGRATION.md#migrating-from-v1-to-v2) |
╳ deprecated | 1 | 1.0.2 | N/A |

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-footer-services/issues), visit [#origami-support](https://financialtimes.slack.com/messages/origami-support/) or email [Origami Support](mailto:origami-support@ft.com).

---

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

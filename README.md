o-footer-services [![Circle CI](https://circleci.com/gh/Financial-Times/o-footer-services/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/o-footer-services/tree/master)
=================

o-footer-services is a footer component for internal products and tooling  at the FT.

- [Usage](#usage)
	- [Markup](#markup)
	- [Sass](#sass)
- [Contact](#contact)
- [Licence](#licence)

## Usage

### Markup

For a simple footer, you'll need the following markup:

```html
<footer class="o-footer-services">
	<div class="o-footer-services__container">
		<p class="o-footer-services__source-code"><a href="http://github.com/financial-times/o-footer-services">View project on GitHub</a></p>
		<p class="o-footer-services__copyright">&copy; THE FINANCIAL TIMES LTD. FT and 'Financial Times' are trademarks of The Financial Times Ltd.</p>
	</div>
</footer>
```

If your footer has more information, a full footer uses markup like this:
```html
<footer class="o-footer-services">
	<div class="o-footer-services__container">
		<div class="o-footer-services__info">
			<span class="o-footer-services__logo">Origami</span>
			<p class="o-footer-services__contact-email">Help or advice can be found here <a class="link" href="mailto:an.email@someplace.com">an.email@someplace.com</a> and there are other places, <a href='/somewhere'>like this one</a> where you can find help, too.</p>
			<p class="o-footer-services__contact-slack"><img src='link/to/icon'/><a href="https://slack.com/messages/[id]/">#slack-channel</a></p>
		</div>
		<div class="o-footer-services__base">
			<p class="o-footer-services__source-code"><a href="http://github.com/financial-times/o-footer-services">View project on GitHub</a></p>
			<p class="o-footer-services__copyright">&copy; THE FINANCIAL TIMES LTD. FT and 'Financial Times' are trademarks of The Financial Times Ltd.</p>
		</div>
	</div>
</footer>
```

For the widest version of a footer, you can apply the variant `o-footer-services--wide` to the footer element: 
```html
<footer class="o-footer-services o-footer-services--wide">
	<!-- Footer elements -->
</footer>
```
### Sass

As with all Origami components, o-footer-services has a [silent mode](http://origami.ft.com/docs/syntax/scss/#silent-styles). To use its compiled CSS (rather than using its mixins with your own Sass) set `$o-footer-services-is-silent: false;` in your Sass before you import the o-footer-services Sass.

If you would rather _not_ have origami classnames on your page, don't switch off silent mode, and use the mixin as shown below. This will only be available if you are _not_ using the Build Service.

```sass
@include oFooterServicesBase($class: 'my-footer');
```

This will only provide styling for footers without a logo, so if you are planning on incorporating a logo in your footer, you'll need to use the `oFooterServicesWithLogo` mixin and provide the image for it.

```sass
@include oFooterServicesWithLogo($image: 'the/url/goes/here', class: 'my-footer');
```

---

## Contact

If you have any questions or comments about this component, or need help using it, please either [raise an issue](https://github.com/Financial-Times/o-footer-services/issues), visit [#ft-origami](https://financialtimes.slack.com/messages/ft-origami/) or email [Origami Support](mailto:origami-support@ft.com).

----

## Licence

This software is published by the Financial Times under the [MIT licence](http://opensource.org/licenses/MIT).

## Migration

### Migrating from v2 to v3

### Migrating from v1 to v2

This major includes a change in markup and an entirely new design, which is compliant with legal requirements within internal FT tooling and products.

All previous variations of the footer have been discontinued. To illustrate the change in markup, this difference is between the full footer and the new footer that has been introduced with this major:

```diff
<footer class="o-footer-services">
	<div class="o-footer-services__container">
-		<div class="o-footer-services__info">
+		<div class="o-footer-services__wrapper o-footer-services__wrapper--top">
-			<span class="o-footer-services__logo">Origami</span>
+			<p class="o-footer-services__logo">Origami</p>
+			<a class="o-footer-services__icon-link o-footer-services__icon-link--github" href="#">View project on GitHub</a>
+			<a class="o-footer-services__icon-link o-footer-services__icon-link--slack" href="#">#slack-channel</a>
-			<p class="o-footer-services__content">Help or advice can be found here <a class="link" href="mailto:an.email@someplace.com">an.email@someplace.com</a> and there are other places, <a href='/somewhere'>like this one</a> where you can find help, too.</p>
-			<p class="o-footer-services__contact-email">Help or advice can be found here <a class="link" href="mailto:an.email@someplace.com">an.email@someplace.com</a> and there are other places, <a class="o-footer-services__content--external" href='external-link'>like this one</a> where you can find help, too.</p>
-			<p class="o-footer-services__contact-slack"><img src='link/to/icon'/><a href="https://slack.com/messages/[id]/">#slack-channel</a></p>
		</div>
-		<div class="o-footer-services__base">
-			<p class="o-footer-services__source-code"><a href="http://github.com/financial-times/o-footer-services">View project on GitHub</a></p>
-			<p class="o-footer-services__copyright">&copy; THE FINANCIAL TIMES LTD. FT and 'Financial Times' are trademarks of The Financial Times Ltd.</p>
-		</div>
+		<div class="o-footer-services__container">
+			<div class="o-footer-services__wrapper o-footer-services__wrapper--legal">
+				<div class="o-footer-services__links">
+					<a href="http://help.ft.com/help/legal-privacy/cookies/">Cookies</a>
+					<a href="http://help.ft.com/help/legal-privacy/copyright/copyright-policy/">Copyright</a>
+					<a href="http://help.ft.com/help/legal-privacy/privacy/">Privacy</a>
+					<a href="http://help.ft.com/help/legal-privacy/terms-conditions">Terms & Conditions</a>
+				</div>
+				<p><span>&copy; THE FINANCIAL TIMES LTD 2019.</span> FT and 'Financial Times' are trademarks of The Financial Times Ltd.</p>
+			</div>
+		<div>
	</div>
</footer>
```

`o-footer-services--wide` is no longer an available class.

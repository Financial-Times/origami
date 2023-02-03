<script lang="ts">
	const currentYear = new Date().getFullYear()
</script>

<footer class="o-footer-services">
	<div class="o-footer-services__container">
		<div class="o-footer-services__wrapper o-footer-services__wrapper--top">
			<a
				class="o-footer-services__icon-link o-footer-services__icon-link--github"
				href="https://github.com/Financial-Times/origami"
				>View project on GitHub</a
			>
			<a
				class="o-footer-services__icon-link o-footer-services__icon-link--github"
				href="https://github.com/Financial-Times/origami/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc"
				>View proposals to Origami</a
			>
			<a
				class="o-footer-services__icon-link o-footer-services__icon-link--slack"
				href="https://financialtimes.slack.com/messages/origami-support"
				>#origami-support</a
			>
			<p class="o-footer-services__content">
				Get in touch at <a href="mailto:origami.support@ft.com"
					>origami.support@ft.com</a
				>
				for help or advice. Feel free to
				<a
					href="https://github.com/Financial-Times/origami/edit/main/apps/website/pages/storybook.html"
					>suggest an edit to this page</a
				>.
			</p>
		</div>
	</div>
	<div class="o-footer-services__container">
		<div class="o-footer-services__wrapper o-footer-services__wrapper--legal">
			<div class="o-footer-services__links">
				<a href="https://help.ft.com/help/legal-privacy/cookies/">Cookies</a>
				<a
					href="https://help.ft.com/help/legal-privacy/copyright/copyright-policy/"
					>Copyright</a
				>
				<a href="https://help.ft.com/help/legal-privacy/privacy/">Privacy</a>
				<a href="https://help.ft.com/help/legal-privacy/terms-conditions"
					>Terms &amp; Conditions</a
				>
				<a href="https://help.ft.com/legal-privacy/copyright-policy/"
					>Slavery Statement &amp; Policies</a
				>
			</div>
			<p>
				<span>© THE FINANCIAL TIMES LTD {currentYear}.</span> FT and 'Financial Times'
				are trademarks of The Financial Times Ltd.
			</p>
		</div>
	</div>
</footer>

<style lang="scss">
	@import "@financial-times/o-footer-services/main";
	@include oFooterServices();
</style>

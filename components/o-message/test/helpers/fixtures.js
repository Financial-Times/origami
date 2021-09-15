export default {
	main: `
		<div class="o-message o-message--alert o-message--error" data-o-component="o-message">
			<div class="o-message__container">
				<div class="o-message__content">
					<p class="o-message__content-main">
						<span class="o-message__content-highlight">Highlighted content</span>
						<span class="o-message__content-detail">Content detail</span>
					</p>
					<div class="o-message__action">
						<a href="#" class="o-message__actions__primary">Button</a>
						<a href="#" class="o-message__link o-message__actions__secondary">Text link</a>
					</div>
				</div>
			</div>
		</div>
	`,
	alert: `
			<div class="o-message__container">
				<div class="o-message__content">
					<p class="o-message__content-main">
						<span class="o-message__content-highlight">Important</span>
						<span class="o-message__content-detail"></span>
					</p>
					<div class="o-message__actions">
						<a href="#" class="o-message__actions__primary">a button</a>
						<a href="#" class="o-message__actions__secondary">a link</a>
					</div>
				</div>
			</div>
		`,
	notice: `
			<div class="o-message__container">
				<div class="o-message__content">
					<p class="o-message__content-main">Many things are here to be said about this message</p>
					<div class="o-message__actions">
						<a href="#" class="o-message__actions__primary">a button</a>
						<a href="#" class="o-message__actions__secondary">a link</a>
					</div>
				</div>
			</div>
		`,
	innerAlert: `
	<div class="o-message__container">
		<div class="o-message__content">
			<p class="o-message__content-main">
				<span class="o-message__content-highlight">Important</span>
				<span class="o-message__content-detail"></span>
			</p>
			<p class="o-message__content-additional">Additional info</p>
			<div class="o-message__actions">
				<a href="#" class="o-message__actions__primary">a button</a>
				<a href="#" class="o-message__actions__secondary">a link</a>
			</div>
		</div>
	</div>
		`,
	innerAlertWithOutAdditionalInfo: `
			<div class="o-message__container">
				<div class="o-message__content">
					<p class="o-message__content-main">
						<span class="o-message__content-highlight">Important</span>
						<span class="o-message__content-detail"></span>
					</p>
					<div class="o-message__actions">
						<a href="#" class="o-message__actions__primary">a button</a>
						<a href="#" class="o-message__actions__secondary">a link</a>
					</div>
				</div>
			</div>
		`,
	closeButton: `<button class="o-message__close" aria-label="close" title="Close"></button>`
};

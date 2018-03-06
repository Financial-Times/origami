export default {
	main: `
		<div class="o-message o-message--alert o-message--alert-error" data-o-component="o-message">
			<div class="o-message__container">
				<div class="o-message__content">
					<p class="o-message__highlight">Highlighted content<span class="o-message__detail">Content detail</span></p>
					<div class="o-message__action">
						<a href="#" class="o-message__action--primary">Button</a>
						<a href="#" class="o-message__link o-message__action--secondary">Text link</a>
					</div>
				</div>
			</div>
		</div>
	`,
	alert: `
			<div class="my-message__container">
				<div class="my-message__content">
					<p class="my-message__highlight">Important<span class="my-message__detail"></span></p>
					<div class="my-message__actions">
						<a href="#" class="my-message__action--primary">a button</a>
						<a href="#" class="my-message__action--secondary">a link</a>
					</div>
				</div>
			</div>
		`,
	innerAlert: `
	<div class="my-message__container">
		<div class="my-message__content">
			<p class="my-message__highlight">Important<span class="my-message__detail"></span></p>
			<p class="my-message__additional-info">Additional info</p>
			<div class="my-message__actions">
				<a href="#" class="my-message__action--primary">a button</a>
				<a href="#" class="my-message__action--secondary">a link</a>
			</div>
		</div>
	</div>
		`,
	innerAlertWithOutAdditionalInfo: `
			<div class="my-message__container">
				<div class="my-message__content">
					<p class="my-message__highlight">Important<span class="my-message__detail"></span></p>
					<div class="my-message__actions">
						<a href="#" class="my-message__action--primary">a button</a>
						<a href="#" class="my-message__action--secondary">a link</a>
					</div>
				</div>
			</div>
		`,
	closeButton: `<a class="my-message__close" role="button" href="#void" aria-label="close" title="Close"></a>`
};

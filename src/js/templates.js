
var message = function(content){
	return `
	<section class="message">
		<div class="message__content-wrapper">
			<a href="#" class="message__close message__close-js">Close</a>
			<div class="message__content">
				${content}
			</div>
		</div>
	</section>
`;
};

module.exports = {
	message : message
};

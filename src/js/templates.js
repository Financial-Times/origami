// jshint ignore: start
// obt jshint doesn't get ES6, so disabling it
"use strict";

var message = function(options){
	return `
	<section class="n-notification n-notification--js n-notification--${options.type}">
		<div class="n-notification__content-wrapper">
			<h3 class="n-notification__title">
				${options.title}
			</h3>
			<div class="n-notification__content">
				${options.content}
			</div>
		</div>
		<button class="n-notification__close n-notification__close-js">Close</button>

	</section>
`;
};

module.exports = {
	message : message
};

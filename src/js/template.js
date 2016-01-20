module.exports = function(options){
	return `
	<div class="n-notification__item n-notification--${options.type ? options.type : 'default'}" role="alert" data-trackable="${options.trackable}">
		<div class="n-notification__content-wrapper">` +
			(options.title ? `<h3 class="n-notification__title">${options.title}</h3>` : '') +
			(options.content ? `<div class="n-notification__content">${options.content}</div>` : '') +
		`</div>
		<button class="n-notification__close" data-trackable="close">Close</button>
	</div>
	`;
};

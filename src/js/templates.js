
var notification = function(content){
	return `
	<section class="notification">
		<a href="#" class="notification__close">Close</a>
		<div class="notification__content">
			${content}
		</div>
	</section>
`;
};

module.exports = {
	notification : notification
};


var notification = function(content){
	return `
	<section class="notification">
		<a href="#">Close</a>
		<div class="notification__content">
			${content}
		</div>
	</section>
`;
};

module.exports = {
	notification : notification
};

function click(el) {
	const evt = document.createEvent('MouseEvent');
	evt.initMouseEvent(
		'click',
		true, // bubble,
		true, // cancelable
		window
	);
	el.dispatchEvent(evt);
}

export default {
	click
};

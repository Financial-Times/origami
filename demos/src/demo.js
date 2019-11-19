import './../../main.js';

//mega hack because we currently have no way of requesting brands for origami.json dependencies
[...document.querySelectorAll('link')].forEach(link => {
	const isBuildServiceLink = (
		link.href.includes('origami-build.ft.com') ||
		link.href.includes('ft.com/__origami/service/build')
	);
	if (isBuildServiceLink && !link.href.includes('brand=')) {
		link.href += '&brand=internal';
	}
});

document.addEventListener('DOMContentLoaded', () => {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});

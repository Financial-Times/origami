import LazyLoad from './../../main.js';

// Viewport based demos cannot be setup declaratively because the document element
// and body element cannot currently be modified.
new LazyLoad(document.documentElement);

document.addEventListener('DOMContentLoaded', function () {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});

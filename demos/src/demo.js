import LazyLoad from './../../main.js';

document.addEventListener('DOMContentLoaded', function () {
	const doc = document.documentElement;

	// Viewport based demos cannot be viewed inside the registry iframes because
	// they will attempt to fit the content height (which we haven't loaded yet!)
	if (doc.classList.contains('demo-popout') && window.self !== window.top) {
		doc.style.height = '200px';
		doc.style.overflow = 'hidden';

		const p = document.createElement('p');
		p.classList.add('demo-popout-message');
		p.textContent = 'Please open this demo in a new window';
		document.body.insertBefore(p, document.body.firstElementChild);

		return;
	}

	// Viewport based demos cannot be setup declaratively because the document
	// element and body element cannot currently be configured.
	new LazyLoad(doc);

	// Trigger initialisation of demos with declarative configuration
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});

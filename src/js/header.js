import search from './search';
import mega from './mega';
import drawer from './drawer';
import subnav from './subnav';
import sticky from './sticky';

// Some assistive technologies, like screen readers, suggest to press 'space'
// when interacting with a link with a role of 'button'.
// We need to ensure that we replicate this functionality that exists on a button element.
// In the future we should consider using the 'button' element instead.
function handleSpaceKeydown (e) {
	// get the target element
	const target = e.target;
	const targetIsRoleButton = target.getAttribute('role') === 'button';
	// if the pressed key is a space, we'll simulate a click
	const keyPressIsSpace = e.keyCode === 32;
	if (targetIsRoleButton && keyPressIsSpace) {
		// prevent space from scrolling the page
		e.preventDefault();
		// trigger the target's click event
		target.click();
	}
}

class Header {

	constructor (headerEl) {
		if (!headerEl) {
			headerEl = document.querySelector('[data-o-component="o-header"]');
		} else if (typeof headerEl === 'string') {
			headerEl = document.querySelector(headerEl);
		}

		if (headerEl.hasAttribute('data-o-header--js')) {
			return;
		}

		this.headerEl = headerEl;

		search.init(this.headerEl);
		mega.init(this.headerEl);
		drawer.init(this.headerEl);
		subnav.init(this.headerEl);
		sticky.init(this.headerEl);

		headerEl.addEventListener('keydown', handleSpaceKeydown);

		this.headerEl.removeAttribute('data-o-header--no-js');
		this.headerEl.setAttribute('data-o-header--js', '');
	}

	static init (rootEl) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (/\bo-header\b/.test(rootEl.getAttribute('data-o-component'))) {
			return new Header(rootEl);
		}

		return [].map.call(rootEl.querySelectorAll('[data-o-component="o-header"]'), el => {
			if (!el.hasAttribute('data-o-header--js')) {
				return new Header(el);
			}
		}).filter((header) => {
			return header !== undefined;
		});
	}

}

export default Header;

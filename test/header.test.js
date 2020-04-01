/* eslint-env mocha */
/* global proclaim */

import Header from '../src/js/header';

describe('Header API', () => {
	it('is defined', () => {
		proclaim.isTypeOf(Header, 'function');
	});
});

describe('Header instance', () => {
	let headerEl;
	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		document.body.appendChild(containerEl);
		containerEl.innerHTML = `
			<header class="o-header" data-o-component="o-header"></header>
		`;
		headerEl = containerEl.querySelector('.o-header');
	});

	afterEach(() => {
		containerEl.removeChild(headerEl);
		headerEl = null;
		containerEl = null;
	});

	it('constructor', () => {
		const header = new Header(headerEl);
		proclaim.isInstanceOf(header, Header);
		proclaim.deepEqual(header.headerEl, headerEl);
		proclaim.isNotNull(headerEl.getAttribute('data-o-header--js'));
	});
});

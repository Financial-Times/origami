/* eslint-env mocha */
/* global proclaim */

import HeaderServices from '../../src/js/header';

describe('Header instance', () => {
	let headerEl;

	beforeEach(() => {
		document.body.innerHTML = `
			<header class="o-header-services" data-o-component="o-header-services"></header>
		`;
		headerEl = document.body.querySelector('.o-header-services');
	});

	afterEach(() => {
		document.body.removeChild(headerEl);
		headerEl = null;
	});

	it('constructor', () => {
		const header = new HeaderServices(headerEl);
		proclaim.isInstanceOf(header, HeaderServices);
	});
});

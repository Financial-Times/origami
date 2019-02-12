/* eslint-env mocha*/

import proclaim from 'proclaim';
import HeaderServices from '../../src/js/header';
import * as fixtures from '../helpers/fixtures';

describe('Drawer', () => {
	let headerEl;
	let primaryNav;
	let sandbox;

	beforeEach(() => {
		sandbox = document.createElement('div');
		sandbox.innerHTML = fixtures.withPrimaryNav;
		document.body.appendChild(sandbox);
		headerEl = document.body.querySelector('.o-header-services');
		new HeaderServices(headerEl);
		primaryNav = headerEl.querySelector('.o-header-services__primary-nav');
	});

	afterEach(() => {
		document.body.removeChild(sandbox);
	});

	context('on viewports above 740px', () => {
		it('primary nav is visibile', (done) => {
			setTimeout(() => {
				proclaim.isTrue(primaryNav.classList.contains('o-header-services__primary-nav--open'));
				done();
			}, 100);
		});
	});
});

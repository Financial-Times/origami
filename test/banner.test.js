/* eslint-env mocha, sinon, proclaim */

import Banner from './../src/js/banner';
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

describe('Banner', () => {

	describe('new Banner(bannerElement, options)', () => {
		let bannerElement;
		let options;

		beforeEach(() => {
			bannerElement = null;
			options = {};
			const banner = new Banner(bannerElement, options);
		});

		it('has some tests');
	});

	describe('.getOptions(bannerElement)', () => {
		it('has some tests');
	});

	describe('.checkOptions(options)', () => {
		it('has some tests');
	});

	describe('.init(rootElement, options)', () => {
		it('has some tests');
	});

});

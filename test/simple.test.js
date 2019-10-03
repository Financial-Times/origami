/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import Expander from './../main';

describe("Expander", () => {
	let collapseSpy;
	let expandSpy;

	before(() => {
		fixtures.simple();
		Expander.init();
		collapseSpy = sinon.spy(Expander.prototype, 'collapse');
		expandSpy = sinon.spy(Expander.prototype, 'expand');
	});

	after(() => {
		collapseSpy.restore();
		expandSpy.restore();
	});

	it('should toggle when "more" is clicked', (done) => {
		document.querySelector('.click-for-testing').click();
		setTimeout(function(){
			proclaim.isTrue(expandSpy.calledWith());
			done();
		}, 100);
	});

	it('should toggle when "less" is clicked', (done) => {
		document.querySelector('.click-for-testing').click();
		setTimeout(function(){
			proclaim.isTrue(collapseSpy.calledWith());
			done();
		}, 100);
	});
});

/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

import * as sandbox from './helpers/sandbox';

import oTable from './../main';

describe("oTable", () => {
	beforeEach(() => {
		sandbox.init();
		sandbox.setContents(`
			<table class="o-table" data-o-component="o-table">
				<thead>
					<th>Cheese</th>
				</thead>
				<tbody>
					<tr>
						<td>cheddar</td>
					</tr>
					<tr>
						<td>stilton</td>
					</tr>
					<tr>
						<td>red leicester</td>
					</tr>
				</tbody>
			</table>
		`);
	});

	afterEach(() => {
		sandbox.reset();
	});

	it('is defined', () => {
		proclaim.isFunction(oTable);
	});

	it('has a static init method', () => {
		proclaim.isFunction(oTable.init);
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(oTable, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.isTrue(initSpy.called);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(oTable, 'init');
		proclaim.isFalse(initSpy.called);
	});

	describe("init", () => {

		it("should create a single oTable when no element is passed in", () => {
			const otable = oTable.init();
			proclaim.equal(otable instanceof Array, true);
			proclaim.equal(otable[0] instanceof oTable, true);
		});

		it("should create an oTable for the element found within the passed in selector", () => {
			const otable = oTable.init('.o-table');
			proclaim.equal(otable instanceof oTable, true);
		});
	});
});

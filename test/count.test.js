/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import Count from '../src/js/count';

describe("Count", () => {	
	it("is defined", () => {
		proclaim.equal(typeof Count, 'function');
	});
	
		
	describe(".init()", () => {	
		describe("when element doesn't exist", () => {
			let count;

			beforeEach(() => {
				fixtures.htmlCode();
				count = new Count({
					articleIds: 'fake-id'
				});

			});

			afterEach(() => {
				fixtures.reset();
			});

			it("will throw an error", () => {
				proclaim.throws(() => count.init(), 'Element must be a HTMLElement');
			});
			
		});	
		
		describe("when element doesn't exist in the DOM", () => {
			beforeEach(() => {
				fixtures.htmlCode();
			});

			afterEach(() => {
				fixtures.reset();
			});

			it("will throw an error", () => {
				proclaim.throws(() => new Count({
					element: '#imNotReal',
					articleIds: 'fake-id'
				}), 'Element must be a HTMLElement');
			});
			
		});	


		describe("when element does exist", () => {
			let count;
			let rootElement;

			beforeEach(() => {
				fixtures.htmlCode();
				count = new Count({
					element: '#element',
					articleIds: 'fake-id'
				});

				rootElement = count.element;
			});

			afterEach(() => {
				fixtures.reset();
			});

			it("renders the count within the element", () => {
				proclaim.isDefined(rootElement.innerHTML);
			});
		});
	
	});
		
		
	describe(".getCount()", () => {
		it("is defined", () => {
			proclaim.equal(typeof new Count().getCount, 'function');
		});

		describe("when no id's exist", () => {
			it("returns null", () => {
				const count = new Count({}).getCount();
				
				proclaim.isNull(count)
				
			});
		});

		describe("when passed a single id", () => {
			it("returns a number", () => {
				const count = new Count({
					articleIds: 'fake-id'
				}).getCount();
				
				proclaim.isTypeOf(count, 'number')
			});

			describe("when the id is invalid", () => {
				it("returns null", () => {
					const count = new Count({
						articleIds: 'invalid-id'
					}).getCount();
					
					proclaim.isNull(count)
				});
			});
		});
		
		describe("when passed an array of articleIds", () => {
			it("returns an object", () => {
				const count = new Count({
					articleIds: ['fake-id', 'fake-id-2']
				}).getCount();
				
				proclaim.isObject(count)
			});
			
			it("sets the articleIds as keys in the object", () => {
				const count = new Count({
					articleIds: ['fake-id', 'fake-id-2']
				}).getCount();
				
				proclaim.isDefined(count['fake-id'])
				proclaim.isDefined(count['fake-id-2'])
			});

			it("sets the counts as the values in the object", () => {
				const count = new Count({
					articleIds: ['fake-id', 'fake-id-2']
				}).getCount();
				
				proclaim.isNumber(count['fake-id'])
				proclaim.isNumber(count['fake-id-2'])
			});
			
			it("removes any invalid id's", () => {
				const count = new Count({
					articleIds: ['fake-id', 'invalid-id']
				}).getCount();
				
				proclaim.isUndefined(count['invalid-id'])
				proclaim.isDefined(count['fake-id'])
			});
			
			it("returns null if all id's are invalid", () => {
				// I am not sure on this case
				// Would it be better to return an empty object?
				
				const count = new Count({
					articleIds: ['invalid-id', 'invalid-id']
				}).getCount();
				
				proclaim.isNull(count)
			});
		});
	});	
});


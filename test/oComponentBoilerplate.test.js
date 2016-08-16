/*global describe, it */
import expect from 'expect.js';

const ComponentBoilerplate = require('./../src/js/componentBoilerplate');

describe("ComponentBoilerplate", () => {
	it('is defined', () => {
		expect(ComponentBoilerplate).to.be.a('function');
	});
	it('has a static init method', () => {
		expect(ComponentBoilerplate.init).to.be.a('function');
	});
});

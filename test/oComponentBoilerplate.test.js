import expect from 'expect.js';

const oComponentBoilerplate = require('./../src/js/componentBoilerplate');

describe("oComponentBoilerplate", () => {
	it('is defined', () => {
		expect(oComponentBoilerplate).to.be.a('function');
	});
});

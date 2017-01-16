/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const Tooltip = require('./../main');

describe("Tooltip", () => {
	describe("constructor", () => {
		it("sets the opts if they're passed in");
		it("calls getOptions if none were passed in");
		it("sets calls checkopts and sets this.opts to the return value");
	});

	describe("getOptions", () => {
		it("sets arrowPosition if it's set on the tooltipEl");
		it("sets arrowTarget if it's set on the tooltipEl");
	});

	describe("checkOptions", () => {
		it("calls throwError if no target is provided");
		it("calls throwError if arrowDirection is not one of `top`, `bottom`, `left`, `right` or falsey");
		it("sets opts.arrowPosition to up if no arrow position was specified");
		it("returns the opts array");
	});

	describe("render", () => {
		it("adds a class for the arrow direction");
		it("defaults to an up-arrow");
		it("creates a div for the tooltip and adds it to the dom");
		it("gives the tooltip the aria-role `tooltip`");
		it("sets the z-index if a z-index was set in the opts");
		it("adds a close button with an aria label and a role");
	});
});

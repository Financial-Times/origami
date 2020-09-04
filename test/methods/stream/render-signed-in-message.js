/* eslint-env mocha */
/* global proclaim */
import * as fixtures from '../../helpers/fixtures.js';
import Stream from '../../../src/js/stream.js';

export default function renderSignedInMessage () {
	beforeEach(() => {
		fixtures.streamMarkup();
	});

	afterEach(() => {
		fixtures.reset();
	});

	it("creates a container element for the 'Signed in as' message", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		stream.renderSignedInMessage();
		const containerEl = document.querySelector('.o-comments__signed-in-container');

		proclaim.isTrue(Boolean(containerEl));
	});

	it("renders the display name in the 'Signed in as' message", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		stream.displayName = 'fake-display-name';
		stream.renderSignedInMessage();
		const displayNameEl = document.querySelector('.o-comments__signed-in-inner-text');

		proclaim.equal(displayNameEl.innerHTML, 'fake-display-name');
	});

	describe("signed in message already exists on the page", () => {
		it("removes the old message before inserting the new", () => {
			const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
			const stream = new Stream(mockStreamEl);
			stream.displayName = 'old-display-name';
			stream.renderSignedInMessage();

			stream.displayName = 'new-display-name';
			stream.renderSignedInMessage();

			const containerEls = document.querySelectorAll('.o-comments__signed-in-container');
			proclaim.equal(containerEls.length, 1);
		});
	});
}

/* eslint-env mocha */
/* global proclaim sinon */
import * as fixtures from '../../helpers/fixtures';
import Stream from '../../../src/js/stream';

export default function displayNamePrompt () {
	beforeEach(() => {
		fixtures.streamMarkup();
	});

	afterEach(() => {
		fixtures.reset();
		sinon.restore();
	});

	it("renders the display name prompt on the page", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		stream.displayNamePrompt();

		document.addEventListener('oOverlay.ready', () => {
			const displayNameForm = document.getElementById('o-comments-displayname-form');
			proclaim.isTrue(Boolean(displayNameForm));
		});
	});
}

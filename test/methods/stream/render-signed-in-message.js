import proclaim from 'proclaim';
import * as fixtures from '../../helpers/fixtures';
import Stream from '../../../src/js/stream';

module.exports = () => {
	beforeEach(() => {
		fixtures.streamMarkup();
	});

	afterEach(() => {
		fixtures.reset();
	});

	it("creates a div tag for the 'Signed in as' message", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		stream.renderSignedInMessage();
		const divTag = document.querySelector('.o-comments__signed-in-container');

		proclaim.isTrue(!!divTag);
	});
};

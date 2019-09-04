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

	it("creates a script tag", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);

		stream.renderComments();

		const scriptTag = document.querySelector('script[src="https://ft.staging.coral.coralproject.net/assets/js/embed.js"]');

		proclaim.isTrue(!!scriptTag);
	});
};

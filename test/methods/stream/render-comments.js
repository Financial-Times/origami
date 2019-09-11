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

	it("creates a script tag for production environment", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);

		stream.renderComments();

		const scriptTag = document.querySelector('script[src="https://ft.coral.coralproject.net/assets/js/embed.js"]');

		proclaim.isTrue(!!scriptTag);
	});

	it("creates a script tag for staging environment", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl, { useStagingEnvironment: true });

		stream.renderComments();

		const scriptTag = document.querySelector('script[src="https://ft.staging.coral.coralproject.net/assets/js/embed.js"]');

		proclaim.isTrue(!!scriptTag);
	});
};

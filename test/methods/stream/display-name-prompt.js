import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from '../../helpers/fixtures';
import Stream from '../../../src/js/stream';

const sandbox = sinon.createSandbox();

module.exports = () => {
	beforeEach(() => {
		fixtures.streamMarkup();
	});

	afterEach(() => {
		fixtures.reset();
		sandbox.restore();
	});

	it("renders the display name prompt on the page", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		stream.displayNamePrompt();

		document.addEventListener('oOverlay.ready', () => {
			const displayNameForm = document.getElementById('o-comments-displayname-form');
			proclaim.isTrue(!!displayNameForm);
		});
	});
};

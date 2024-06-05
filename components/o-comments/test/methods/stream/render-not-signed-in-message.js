/* eslint-env mocha */

import proclaim from 'proclaim';
import fixtures from '../../helpers/fixtures.js';
import Stream from '../../../src/js/stream.js';

export default function renderNotSignedInMessage () {
	beforeEach(() => {
		fixtures.streamMarkup();
	});

	afterEach(() => {
		fixtures.reset();
	});

	it("shows message for registered users to subscribe", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		stream.isRegistered  =true
		stream.renderNotSingedInMessage();
		const messageElement = mockStreamEl.querySelector("#coral-shadow-container").shadowRoot.querySelector('.coral-custom-message-content p')
		proclaim.isTrue(messageElement.innerText.indexOf('Subscribe to join the conversation.') === 0);
	});

	it("shows message for trials users to subscribe", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		stream.isTrial  =true
		stream.renderNotSingedInMessage();
		const messageElement = mockStreamEl.querySelector("#coral-shadow-container").shadowRoot.querySelector('.coral-custom-message-content p')
		proclaim.isTrue(messageElement.innerText.indexOf('View our full subscription packages to join the conversation.') === 0);
	});

	it("shows message for anonymous users to login subscribe", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		stream.renderNotSingedInMessage();
		const messageElement = mockStreamEl.querySelector("#coral-shadow-container").shadowRoot.querySelector('.coral-custom-message-content p')
		proclaim.isTrue(messageElement.innerText.indexOf('Please login or subscribe to join the conversation.') === 0);
	});
}

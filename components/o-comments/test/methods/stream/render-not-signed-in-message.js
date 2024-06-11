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
		stream.renderNotSignedInMessage();
		const messageElement = mockStreamEl.querySelector("#coral-shadow-container").shadowRoot.querySelector('.coral__custom-message-content p')
		proclaim.isTrue(messageElement.innerText.indexOf('Subscribe to join the conversation.') === 0);
	});

	it("shows message for trials users to subscribe", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		stream.isTrialist  =true
		stream.renderNotSignedInMessage();
		const messageElement = mockStreamEl.querySelector("#coral-shadow-container").shadowRoot.querySelector('.coral__custom-message-content p')
		proclaim.isTrue(messageElement.innerText.indexOf('View our full subscription packages to join the conversation.') === 0);
	});

	it("shows message for anonymous users to login subscribe", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		stream.renderNotSignedInMessage();
		const messageElement = mockStreamEl.querySelector("#coral-shadow-container").shadowRoot.querySelector('.coral__custom-message-content p')
		proclaim.isTrue(messageElement.innerText.indexOf('Please login or subscribe to join the conversation.') === 0);
	});
}

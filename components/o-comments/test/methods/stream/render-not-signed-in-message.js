/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
import fixtures from '../../helpers/fixtures.js';
import Stream from '../../../src/js/stream.js';
import auth from '../../../src/js/utils/auth.js';

let fetchJWTStub;

export default function renderNotSignedInMessage () {
	beforeEach(() => {
		fixtures.streamMarkup();
		fetchJWTStub = sinon.stub();
		sinon.stub(auth, 'fetchJsonWebToken').get(() => fetchJWTStub);
		fetchJWTStub.rejects();
	});

	afterEach(() => {
		fixtures.reset();
		sinon.restore();
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

	it("shows message for users that have a customer care error code", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		stream.errorCode = '12345'
		stream.renderNotSignedInMessage();
		const messageElement = mockStreamEl.querySelector("#coral-shadow-container").shadowRoot.querySelector('.coral__custom-message-content p')
		proclaim.isTrue(messageElement.innerText.indexOf('There was an error setting your display name. Please contact Customer Care quoting 12345.') === 0);
	});
}

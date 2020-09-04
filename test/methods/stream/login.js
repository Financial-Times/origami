/* eslint-env mocha */
/* global proclaim sinon */
import * as fixtures from '../../helpers/fixtures.js';
import Stream from '../../../src/js/stream.js';

export default function login () {
	beforeEach(() => {
		fixtures.streamMarkup();
	});

	afterEach(() => {
		fixtures.reset();
		sinon.restore();
	});

	describe("authenticationToken exists", () => {
		it("calls embed.login with the authentication token", () => {
			const loginStub = sinon.stub();
			const stream = new Stream();
			stream.authenticationToken = 'fake-jwt';

			stream.embed = {
				login: loginStub
			};

			stream.login();
			proclaim.isTrue(loginStub.calledWith('fake-jwt'));
		});
	});

	describe("displayName exists", () => {
		it("calls .renderSignedInMessage", () => {
			const loginStub = sinon.stub();
			const signedInMessageStub = sinon.stub();

			const stream = new Stream();
			stream.renderSignedInMessage = signedInMessageStub;
			stream.authenticationToken = 'fake-jwt';
			stream.displayName = 'fake-display-name';

			stream.embed = {
				login: loginStub
			};

			stream.login();
			proclaim.isTrue(signedInMessageStub.calledOnce);
		});
	});
}

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

	describe("authenticationToken exists", () => {
		it("calls embed.login with the authentication token", () => {
			const loginStub = sandbox.stub();
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
			const loginStub = sandbox.stub();
			const signedInMessageStub = sandbox.stub();

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
};

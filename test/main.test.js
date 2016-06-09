/* global describe, it, beforeEach, afterEach */
const sinon = require('sinon/pkg/sinon');
const main = require('../main.js');
const Brightcove = require('../src/models/brightcove');
const brightcoveResponse = require('./fixtures/brightcove.json');

describe('Main', () => {

	let containerEl;
	let fetchStub;

	beforeEach(() => {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-o-component', 'o-video');
		containerEl.setAttribute('data-o-video-id', '4084879507001');
		containerEl.setAttribute('data-o-video-source', 'Brightcove');
		document.body.appendChild(containerEl);
		fetchStub = sinon.stub(window, 'fetch');
		const res = new window.Response(JSON.stringify(brightcoveResponse), {
			status: 200,
			headers: {
				'Content-type': 'application/json'
			}
		});
		fetchStub.returns(Promise.resolve(res));
	});

	afterEach(() => {
		document.body.removeChild(containerEl);
		fetchStub.restore();
	});

	it('should exits', () => {
		main.should.exist;
	});

	it('should have an init property', () => {
		main.should.have.property('init');
	});

	it('should create a Video object and element', () => {
		return main.init().then(videos => {
			videos.should.have.length(1);
			videos[0].should.be.an.instanceOf(Brightcove);
			containerEl.children[0].should.eql(videos[0].el);
		});
	});

	it('should create Video objects only once', () => {
		return main.init().then(() => {
			main.init().then(videos => {
				videos.should.be.empty;
			});
		});
	});

	it('should allow setting the selector Video objects only once', () => {
		const className = 'js-video';

		return main.init({ selector: '.' + className }).then(videos => {
			containerEl.className = className;
			videos.should.be.empty;
			return main.init({ selector: '.' + className }).then(videos => {
				videos.should.have.length(1);
			});
		});
	});

	it('should allow setting options through attribute', () => {
		containerEl.setAttribute('data-o-video-opts-optimum-width', 300);
		containerEl.setAttribute('data-o-video-opts-placeholder', true);
		containerEl.setAttribute('data-o-video-opts-classes', 'a-class another-class');

		return main.init().then(videos => {
			videos.should.have.length(1);
			const placeholderEl = videos[0].containerEl.querySelector('img');
			placeholderEl.className.should.equal('o-video__placeholder');
			placeholderEl.getAttribute('src').should.contain('width=300');
		});
	});

});

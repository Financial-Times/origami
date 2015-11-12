/* global describe, it, beforeEach, afterEach, sinon */
require('es6-promise').polyfill();
require('isomorphic-fetch');
const main = require('../main.js');
const Brightcove = require('../src/models/brightcove');
const brightcoveResponse = require('./fixtures/brightcove.json');

describe('Main', () => {

	let containerEl;
	let server;

	beforeEach(() => {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-n-component', 'n-video');
		containerEl.setAttribute('data-n-video-id', '4084879507001');
		containerEl.setAttribute('data-n-video-source', 'Brightcove');
		document.body.appendChild(containerEl);
		server = sinon.fakeServer.create();
		server.autoRespond = true;
		server.respondWith(JSON.stringify(brightcoveResponse));
	});

	afterEach(() => {
		document.body.removeChild(containerEl);
		server.restore();
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
		containerEl.setAttribute('data-n-video-opts-optimum-width', 300);
		containerEl.setAttribute('data-n-video-opts-placeholder', true);
		containerEl.setAttribute('data-n-video-opts-classes', 'a-class another-class');

		return main.init().then(videos => {
			videos.should.have.length(1);
			const placeholderEl = videos[0].containerEl.querySelector('img');
			placeholderEl.className.should.equal('a-class another-class n-video__video');
			placeholderEl.getAttribute('src').should.contain('width=300');
		});
	});

});

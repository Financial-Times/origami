/* global describe, it, beforeEach, afterEach, sinon */
'use strict';
require('es6-promise').polyfill();
require('isomorphic-fetch');
var main = require('../main.js');
var Brightcove = require('../src/models/brightcove');
var brightcoveResponse = require('./fixtures/brightcove.json');

describe('Main', function () {

	var containerEl;
	var server;

	beforeEach(function () {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-n-component', 'n-video');
		containerEl.setAttribute('data-n-video-id', '4084879507001');
		containerEl.setAttribute('data-n-video-source', 'Brightcove');
		document.body.appendChild(containerEl);
		server = sinon.fakeServer.create();
		server.autoRespond = true;
		server.respondWith(JSON.stringify(brightcoveResponse));
	});

	afterEach(function () {
		document.body.removeChild(containerEl);
		server.restore();
	});

	it('should exits', function () {
		main.should.exist;
	});

	it('should have an init property', function () {
		main.should.have.property('init');
	});

	it('should create a Video object and element', function () {
		return main.init().then(function (videos) {
			videos.should.have.length(1);
			videos[0].should.be.an.instanceOf(Brightcove);
			containerEl.children[0].should.eql(videos[0].el);
		});
	});

	it('should create Video objects only once', function () {
		return main.init().then(function (videos) {
			main.init().then(function (videos) {
				videos.should.be.empty;
			});
		});
	});

	it('should allow setting the selector Video objects only once', function () {
		var className = 'js-video';

		return main.init({ selector: '.' + className }).then(function (videos) {
			containerEl.className = className;
			videos.should.be.empty;
			return main.init({ selector: '.' + className }).then(function (videos) {
				videos.should.have.length(1);
			});
		});
	});

	it('should allow setting options through attribute', function () {
		containerEl.setAttribute('data-n-video-opts-optimumWidth', 300);
		containerEl.setAttribute('data-n-video-opts-placeholder', true);
		containerEl.setAttribute('data-n-video-opts-classes', 'a-class another-class');

		return main.init().then(function (videos) {
			videos.should.have.length(1);
			var placeholderEl = videos[0].containerEl.querySelector('img');
			placeholderEl.className.should.equal('a-class another-class n-video__video');
			placeholderEl.getAttribute('src').should.contain('width=300');
		});
	});

});

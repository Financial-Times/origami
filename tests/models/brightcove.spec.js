/* global describe, it, beforeEach, afterEach, sinon, expect */
'use strict';

var Brightcove = require('../../src/models/brightcove');
var brightcoveResponse = require('../fixtures/brightcove.json');

describe('Brightcove', function () {

	var containerEl;
	var server;

	beforeEach(function () {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-n-video-id', '4084879507001');
		document.body.appendChild(containerEl);
		server = sinon.fakeServer.create();
		server.autoRespond = true;
		server.respondWith(JSON.stringify(brightcoveResponse));
	});

	afterEach(function () {
		document.body.removeChild(containerEl);
		server.restore();
	});

	it('should exist', function () {
		Brightcove.should.exist;
	});

	it('should be able to instantiate', function () {
		var brightcove = new Brightcove(containerEl);
		brightcove.should.exist;
	});

	it('should return a Promise on `init`', function () {
		var brightcove = new Brightcove(containerEl);
		brightcove.init().should.be.an.instanceOf(Promise);
	});

	it('should return the Brightcove instance on `init`', function () {
		var brightcove = new Brightcove(containerEl);
		brightcove.init().should.eventually.equal(brightcove);
	});

	it('should create a video element on `init`', function () {
		var brightcove = new Brightcove(containerEl);
		return brightcove
			.init()
			.then(function () {
				var videoEl = containerEl.querySelector('video');
				videoEl.getAttribute('poster').should.equal(
					'https://next-geebee.ft.com/image/v1/images/raw/' +
					'https%3A%2F%2Fbcsecure01-a.akamaihd.net%2F13%2F47628783001%2F201502%2F2470%2F47628783001_4085962850001_MAS-VIDEO-AuthersNote-stock-market.jpg%3FpubId%3D47628783001' +
					'?source=next'
				);
				videoEl.getAttribute('src').should.equal(
					'http://brightcove.vo.llnwd.net/v1/uds/pd/47628783001/201502/3842/47628783001_4085577922001_A-hated-rally.mp4'
				);
			});
	});

	it('should throw error if can\'t init', function () {
		var brightcove = new Brightcove(containerEl);
		server.respondWith([404, {}, '']);
		return brightcove.init().should.be.rejectedWith('Brightcove responded with a 404 (Not Found) for id 4084879507001');
	});

	it('should return the progress as a percentage', function () {
		var brightcove = new Brightcove(containerEl);
		return brightcove
			.init()
			.then(function () {
				// TODO: mock different values
				brightcove.getProgress().should.equal(0);
			});
	});

	it('should be able to create as a placeholder', function () {
		var brightcove = new Brightcove(containerEl, { placeholder: true });
		return brightcove
			.init()
			.then(function () {
				var placholderEl = containerEl.querySelector('img');
				placholderEl.getAttribute('src').should.equal(
					'https://next-geebee.ft.com/image/v1/images/raw/' +
					'https%3A%2F%2Fbcsecure01-a.akamaihd.net%2F13%2F47628783001%2F201502%2F2470%2F47628783001_4085962850001_MAS-VIDEO-AuthersNote-stock-market.jpg%3FpubId%3D47628783001' +
					'?source=next'
				);
				containerEl.querySelector('.n-video__play-button').should.exist;
			});
	});

	it('should be able to suppress placeholder play button', function () {
		var brightcove = new Brightcove(containerEl, { placeholder: true, playButton:false });
		return brightcove
			.init()
			.then(function () {
				expect(containerEl.querySelector('.n-video__play-button')).to.be.null;
			});
	});

	it('should send poster through image service if optimumWidth defined', function () {
		var brightcove = new Brightcove(containerEl, { optimumWidth: 300 });
		return brightcove
			.init()
			.then(function () {
				containerEl.querySelector('video').getAttribute('poster').should.equal(
					'https://next-geebee.ft.com/image/v1/images/raw/' +
					'https%3A%2F%2Fbcsecure01-a.akamaihd.net%2F13%2F47628783001%2F201502%2F2470%2F47628783001_4085962850001_MAS-VIDEO-AuthersNote-stock-market.jpg%3FpubId%3D47628783001' +
					'?source=next&fit=scale-down&width=300'
				);
			});
	});

	it('should add supplied classes to element', function () {
		var brightcove = new Brightcove(containerEl, { classes: ['class-one', 'class-two'] });
		return brightcove
			.init()
			.then(function () {
				containerEl.querySelector('video').className.should.equal('class-one class-two n-video__video');
			});
	});

	it('should not fetch from brightcove if full data provided in opts', function () {
		var brightcove = new Brightcove(containerEl, { data: {
			prop: 'val',
			videoStillURL: 'abc',
			renditions: []
		}});
		return brightcove
			.getData()
			.then(function () {

				brightcove.brightcoveData.prop.should.equal('val');
			});
	});

});

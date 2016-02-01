/* global describe, it, beforeEach, afterEach, sinon, expect */
const Brightcove = require('../../src/models/brightcove');
const brightcoveResponse = require('../fixtures/brightcove.json');

describe('Brightcove', () => {

	let containerEl;
	let fetchStub;

	beforeEach(() => {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-n-video-id', '4084879507001');
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

	it('should exist', () => {
		Brightcove.should.exist;
	});

	it('should be able to instantiate', () => {
		const brightcove = new Brightcove(containerEl);
		brightcove.should.exist;
	});

	it('should return a Promise on `init`', () => {
		const brightcove = new Brightcove(containerEl);
		brightcove.init().should.be.an.instanceOf(Promise);
	});

	it('should return the Brightcove instance on `init`', () => {
		const brightcove = new Brightcove(containerEl);
		brightcove.init().should.eventually.equal(brightcove);
	});

	it('should create a video element on `init`', () => {
		const brightcove = new Brightcove(containerEl);
		return brightcove
			.init()
			.then(() => {
				const videoEl = containerEl.querySelector('video');
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

	it('should throw error if can\'t init', () => {
		// bad response instead
		const badRes = new window.Response(null, {
			status: 404,
			statusText: 'Not Found'
		});
		fetchStub.returns(Promise.resolve(badRes));
		const brightcove = new Brightcove(containerEl);
		return brightcove.init().should.be.rejectedWith('Brightcove responded with a 404 (Not Found) for id 4084879507001');
	});

	it('should return the progress as a percentage', () => {
		const brightcove = new Brightcove(containerEl);
		return brightcove
			.init()
			.then(() => {
				// TODO: mock different values
				brightcove.getProgress().should.equal(0);
			});
	});

	it('should be able to create as a placeholder', () => {
		const brightcove = new Brightcove(containerEl, { placeholder: true });
		return brightcove
			.init()
			.then(() => {
				const placholderEl = containerEl.querySelector('img');
				placholderEl.getAttribute('src').should.equal(
					'https://next-geebee.ft.com/image/v1/images/raw/' +
					'https%3A%2F%2Fbcsecure01-a.akamaihd.net%2F13%2F47628783001%2F201502%2F2470%2F47628783001_4085962850001_MAS-VIDEO-AuthersNote-stock-market.jpg%3FpubId%3D47628783001' +
					'?source=next'
				);
				containerEl.querySelector('.n-video__play-button').should.exist;
			});
	});

	it('should be able to create a placeholder with a title', () => {
		const brightcove = new Brightcove(containerEl, { placeholder: true, placeholderTitle: true });
		return brightcove
			.init()
			.then(() => {
				const placholderEl = containerEl.querySelector('img');
				placholderEl.getAttribute('src').should.equal(
					'https://next-geebee.ft.com/image/v1/images/raw/' +
					'https%3A%2F%2Fbcsecure01-a.akamaihd.net%2F13%2F47628783001%2F201502%2F2470%2F47628783001_4085962850001_MAS-VIDEO-AuthersNote-stock-market.jpg%3FpubId%3D47628783001' +
					'?source=next'
				);
				containerEl.querySelector('.n-video__play-button').should.exist;
				containerEl.querySelector('.n-video__title').textContent.should.equal('A hated rally');
			});
	});

	it('should be able to suppress placeholder play button', () => {
		const brightcove = new Brightcove(containerEl, { placeholder: true, playButton:false });
		return brightcove
			.init()
			.then(() => {
				expect(containerEl.querySelector('.n-video__play-button')).to.be.null;
			});
	});

	it('should send poster through image service if optimumWidth defined', () => {
		const brightcove = new Brightcove(containerEl, { optimumWidth: 300 });
		return brightcove
			.init()
			.then(() => {
				containerEl.querySelector('video').getAttribute('poster').should.equal(
					'https://next-geebee.ft.com/image/v1/images/raw/' +
					'https%3A%2F%2Fbcsecure01-a.akamaihd.net%2F13%2F47628783001%2F201502%2F2470%2F47628783001_4085962850001_MAS-VIDEO-AuthersNote-stock-market.jpg%3FpubId%3D47628783001' +
					'?source=next&fit=scale-down&width=300'
				);
			});
	});

	it('should add supplied classes to element', () => {
		const brightcove = new Brightcove(containerEl, { classes: ['class-one', 'class-two'] });
		return brightcove
			.init()
			.then(() => {
				containerEl.querySelector('video').className.should.equal('class-one class-two n-video__video');
			});
	});

	it('should not fetch from brightcove if full data provided in opts', () => {
		const brightcove = new Brightcove(containerEl, { data: {
			prop: 'val',
			videoStillURL: 'abc',
			renditions: []
		}});
		return brightcove
			.getData()
			.then(() => {
				brightcove.brightcoveData.prop.should.equal('val');
			});
	});

});

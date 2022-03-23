/* eslint-env mocha */
/* global proclaim sinon */
import AudioPlayer from '../../main.js';

describe('AudioPlayer API', () => {
	it('is defined', () => {
		proclaim.equal(typeof AudioPlayer, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof AudioPlayer.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(AudioPlayer, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(AudioPlayer, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe('should create a new AudioPlayer instance', () => {
		let containerElement;
		let audioElement;
		const testAudioURL = 'demo.mp3';

		beforeEach(() => {
			containerElement = window.document.createElement('div');
			window.document.body.appendChild(containerElement);
			containerElement.innerHTML = `<span class="g-audio">
				Bring to the table win-win survival
				<audio controls>
					<source src="${testAudioURL}" type="audio/mpeg">
				</audio>
			</span>`;
			audioElement = containerElement.querySelector('.g-audio');
		});

		afterEach(() => {
			containerElement = null;
		});

		it('constructor', () => {
			const a = audioElement;
			const audioURL = a.getElementsByTagName('source')[0].getAttribute('src');
			const player = new AudioPlayer(a, audioURL);

			proclaim.equal(player instanceof AudioPlayer, true);
			proclaim.equal(a, audioElement);
			proclaim.equal(audioURL, testAudioURL);
		});
	});
});

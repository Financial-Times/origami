/*global describe, it, beforeEach, afterEach */

import expect from 'expect';
import AudioPlayer from './../src/js/audio';

describe('AudioPlayer API', () => {
	it('is defined', () => {
		expect(AudioPlayer).toBeA('function');
	});
});

describe('AudioPlayer instance', () => {
	let containerElement;
	let audioElement;
	const testAudioURL = 'demo.mp3';

	beforeEach(() => {
		containerElement = document.createElement('div');
		document.body.appendChild(containerElement);
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

		expect(player).toBeA(AudioPlayer);
		expect(a).toBe(audioElement);
		expect(audioURL).toBe(testAudioURL);
	});
});

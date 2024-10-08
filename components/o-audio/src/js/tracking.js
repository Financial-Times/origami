import Delegate from 'ftdomdelegate';
import * as Utils from '@financial-times/o-utils';

function fireEvent(action, audioObject, extraDetail = {}) {
	const error = audioObject.audio.error ? {
		code: audioObject.audio.error.code,
		message: audioObject.audio.error.message,
		currentTime: audioObject.audio.currentTime,
		src: audioObject.audio.currentSrc
	} : undefined;

	const event = new CustomEvent('oTracking.event', {
		detail: Object.assign({
			category: 'audio',
			action,
			duration: audioObject.audioLength,
			error,
		}, audioObject.trackingProperties, extraDetail),
		bubbles: true,
	});
	document.body.dispatchEvent(event);
}

const progressWindows = [
	[8, 12, 10],
	[23, 27, 25],
	[48, 52, 50],
	[73, 77, 75],
	[83, 87, 85],
	[88, 92, 90],
	[93, 97, 95]
];

function getProgressPoint(progress) {
	if (progress === 0 || progress === 100) {
		return progress;
	}
	// eslint-disable-next-line no-unused-vars
	const [lower, upper, point] = progressWindows.find(([lower, upper]) => {
		return progress >= lower && progress <= upper;
	}) || [];

	return point;
}

const EVENTS = [
	{ name: 'playing' },
	{ name: 'pause' },
	{ name: 'seeked', debounceEvery: 1000 },
	{ name: 'timeupdate' },
	{ name: 'ended' },
	{ name: 'error' },
	{ name: 'stalled' }
];

class AudioTracking {
	constructor(audio, trackingProperties = {}) {
		this.audio = audio;
		this.trackingProperties = trackingProperties;
		this.audioLength = undefined;
		this.lastTrackedProgressPoint = undefined;

		this.delegate = new Delegate(audio);
		this.delegate.on('loadedmetadata', this.extractMetadata.bind(this));

		this.attachListeners();
		this.extractMetadata();
	}

	attachListeners() {
		EVENTS.forEach(({ name, debounceEvery }) => {
			let listener = this.eventListener.bind(this);
			if (debounceEvery) {
				listener = Utils.debounce(listener, debounceEvery);
			}
			this.delegate.on(name, listener);
		});
	}

	extractMetadata() {
		this.audioLength = parseInt(this.audio.duration, 10);
	}

	eventListener (ev) {
		const progress = parseInt(100 * (this.audio.currentTime || 0) / this.audioLength, 10);

		if (ev.type !== 'timeupdate') {
			return fireEvent(ev.type, this, { progress });
		}

		const progressPoint = getProgressPoint(progress);
		if (progressPoint !== undefined && progressPoint !== this.lastTrackedProgressPoint && !this.audio.paused) {
			this.lastTrackedProgressPoint = progressPoint;
			// log as 'progress' to keep consistency with o-video
			fireEvent('progress', this, { progress: progressPoint });
		}
	}

	destroy() {
		this.delegate.destroy();
	}
}

export default AudioTracking;

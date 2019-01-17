import Delegate from 'dom-delegate';
import * as Utils from 'o-utils';

function fireEvent(action, audioObject, extraDetail = {}) {
	const event = new CustomEvent('oTracking.event', {
		detail: Object.assign({
			category: 'audio',
			action,
			duration: audioObject.audioLength,
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
	[93, 97, 95],
	[98, 100, 100]
];

function getProgressPoint(progress) {
	// eslint-disable-next-line no-unused-vars
	const [lower, upper, point] = progressWindows.find(([lower, upper]) => {
		return progress >= lower && progress < upper;
	}) || [0, 0, 0];

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

const TRACKING_ATTRIBUTES = [
	'contentId',
	'audioSubtype',
	'playerType'
];

function whitelistProps(props) {
	return TRACKING_ATTRIBUTES.reduce(
		(acc, propName) => Object.assign(
			{},
			acc,
			props[propName] ? { [propName]: props[propName] } : undefined
		),
		{}
	);
}

class AudioTracking {
	constructor(audio, trackingProperties = {}) {
		this.audio = audio;
		this.trackingProperties = whitelistProps(trackingProperties);
		this.audioLength = undefined;
		this.lastTrackedProgressPoint = undefined;
		this.amountListened = 0;
		this.dateTimePlayStart = undefined;

		this.delegate = new Delegate(audio);
		this.delegate.on('loadedmetadata', this.extractMetadata.bind(this));
		this.delegate.on('playing', this.startListeningTimer.bind(this));
		this.delegate.on('pause', this.stopListeningTimer.bind(this));

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
		if (progressPoint && progressPoint !== this.lastTrackedProgressPoint && !this.audio.paused) {
			this.lastTrackedProgressPoint = progressPoint;
			// log as 'progress' to keep consistency with o-video
			fireEvent('progress', this, { progress: progressPoint });
		}
	}

	startListeningTimer () {
		if (this.dateTimePlayStart === undefined) {
			this.dateTimePlayStart = Date.now();
		}
	}

	stopListeningTimer() {
		if (this.dateTimePlayStart !== undefined) {
			this.amountListened += Date.now() - this.dateTimePlayStart;
			this.dateTimePlayStart = undefined;
		}
	}

	dispatchListenedEvent() {
		this.stopListeningTimer();
		const amount = this.amountListened / 1000;
		fireEvent('listened', this, {
			amount: Number(amount.toFixed(2)),
			amountPercentage: Number((amount / this.audioLength * 100).toFixed(2)),
		});
	}

	destroy() {
		this.delegate.destroy();
	}
}

export default AudioTracking;

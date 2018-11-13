import Delegate from 'dom-delegate';

function fireEvent(action, audioObject, extraDetail = {}) {
	const event = new CustomEvent('oTracking.event', {
		detail: Object.assign({
			category: 'audio',
			// playerType,
			action,
			duration: audioObject.audioLength,
		}, audioObject.trackingAttributes, extraDetail),
		bubbles: true,
	});
	document.body.dispatchEvent(event);
}

const progressWindows = [
	[8, 12],   // 10%
	[23, 27],  // 25%
	[48, 52],  // 50%
	[73, 77]   // 75%
]

function getProgressPoint(progress) {
	const [lower, upper] = progressWindows.find(([lower, upper]) => {
		return progress >= lower && progress < upper;
	}) || [0,0]

	return upper - ((upper - lower) / 2)
}

const EVENTS = [
	'playing',
	'pause',
	// 'seeked', an audio element fires 'seeked' ALOT
	'timeupdate',
	'ended',
	'error',
	'stalled'
]

const TRACKING_ATTRIBUTES = [
	'contentId',
	'audioSubtype'
]

function whitelistAttrs(attrs) {
	return TRACKING_ATTRIBUTES.reduce(
		(acc, attrName) => Object.assign(
			{},
			acc,
			attrs[attrName] ? { [attrName]: attrs[attrName] } : undefined
		),
		{}
	);
}

class AudioTracking {
	constructor(audio, trackingAttributes = {}) {
		this.audio = audio;
		this.trackingAttributes = whitelistAttrs(trackingAttributes);
		this.delegate = new Delegate(audio);

		this.audioLength = undefined;
		this.lastTrackedProgressPoint = undefined;
		// amount of the audio, in milliseconds, that has actually been listened to
		this.amountListened = 0;
		this.dateTimePlayStart = undefined;

		this.delegate.on('loadedmetadata', this.loadMetadata.bind(this), false);
		this.delegate.on('playing', this.startListeningTimer.bind(this));
		this.delegate.on('pause', this.stopListeningTimer.bind(this));
	}

	loadMetadata() {
		this.audioLength = parseInt(this.audio.duration, 10);
		EVENTS.forEach(eventName => {
			this.delegate.on(eventName, this.eventListener.bind(this));
		});
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

	trackListeningTime() {
		this.stopListeningTimer();
		const amount = this.amountListened / 1000;
		fireEvent('listened', this, {
			amount: +amount.toFixed(2),
			amountPercentage: +((amount / this.audioLength) * 100).toFixed(2),
		});
	}

	destroy() {
		this.delegate.destroy();
	}
}

module.exports = AudioTracking;


function fireEvent(action, audioObject, extraDetail = {}) {
	const event = new CustomEvent('oTracking.event', {
		detail: Object.assign({
			category: 'audio',
			// playerType,
			action,
			// contentId: audioObject.audioURL,
			duration: audioObject.audioLength,
		}, extraDetail),
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

class AudioTracking {
	constructor(audio) {
		this.audio = audio;
		this.audioLength = undefined;
		// amount of the audio, in milliseconds, that has actually been listened to
		this.amountListened = 0;
		this.dateTimePlayStart = undefined;
		this.lastTrackedProgressPoint = undefined;

		this.audio.addEventListener('loadedmetadata', this.loadMetadata.bind(this), false);
		this.audio.addEventListener('playing', this.startListeningTimer.bind(this));
		this.audio.addEventListener('pause', this.stopListeningTimer.bind(this));
	}

	loadMetadata() {
		this.audioLength = parseInt(this.audio.duration, 10);
		this.addEvents();
		// [Q] how do this on mobile (ie. SPA) vs ft.com
		// send 'listened' event on page unload
		// const unloadEventName = ('onbeforeunload' in window) ? 'beforeunload' : 'unload';
		// window.addEventListener(unloadEventName, this.trackListeningTime.bind(this));
	}

	addEvents() {
		EVENTS.forEach(eventName => {
			this.audio.addEventListener(eventName, this.eventListener.bind(this));
		});
	}

	eventListener (ev) {
		const progress = parseInt(100 * this.audio.currentTime / this.audioLength, 10);

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

	destroy() {
		this.trackListeningTime();
		// return this.targetObject.getElementsByTagName('audio').destroy(); //?
	}

	trackListeningTime() {
		this.stopListeningTimer();

		// console.log('amt listened', +(this.amountListened / 1000).toFixed(2), (((this.amountListened / 1000) / (this.audioLength)) * 100).toFixed(2));
		fireEvent('listened', this, {
			amount: +(this.amountListened / 1000).toFixed(2),
			amountPercentage: +(((this.amountListened / 1000) / (this.audioLength)) * 100).toFixed(2),
		});
	}
}

module.exports = AudioTracking;

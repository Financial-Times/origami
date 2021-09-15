
class OTrackingCollector {
	constructor () {
		this.events = [];
		this.listener = null;
	}

	start () {
		if (!this.listener) {
			this.listener = ({ detail }) => this.events.push(detail);
			document.body.addEventListener('oTracking.event', this.listener);
		}
		this.events = [];
		return this.events;
	}

	stop () {
		document.body.removeEventListener('oTracking.event', this.listener);
	}
}

export default OTrackingCollector;
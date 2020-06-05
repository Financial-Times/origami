export function dispatch (target, type, eventProperties) {
	const event = new Event(type, { bubbles: true });
	for (const property in eventProperties) {
		if (eventProperties.hasOwnProperty(property)) {
			event[property] = eventProperties[property];
		}
	}
	target.dispatchEvent(event);
}

export function waitFor (target, events) {
	const promises = events.map(event => {
		return new Promise(resolve => target.addEventListener(event, resolve));
	});

	return Promise.all(promises);
}

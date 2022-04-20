// Count the number of times `o.DOMContentLoaded` is fired.
let eventCount = 0;
if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', () => {
		eventCount++;
	});
}

export default () => {
	return eventCount;
};

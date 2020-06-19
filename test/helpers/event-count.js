// Count the number of times `o.DOMContentLoaded` is fired.
let eventCount = 0;
document.addEventListener('o.DOMContentLoaded', () => {
	eventCount++;
});

export default () => {
	return eventCount;
};

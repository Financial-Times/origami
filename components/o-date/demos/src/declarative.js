import ODate from '../../main.js';

const now = new Date();
const sixHoursAgo = new Date();
sixHoursAgo.setHours(now.getHours() - 6);
const dates = document.querySelectorAll('time:not([datetime])');

for (let i = 0; i < dates.length; i++) {
	// the last 2 are being set to a specific time because otherwise the demo
	// changes on every build and upsets percy the hedgehog
	const date =
		i < dates.length - 2 ? sixHoursAgo.toISOString() : '1912-04-15T05:18Z';
	dates[i].setAttribute('datetime', date);
}

ODate.init();

import ODate from '../../main.js';

const now = new Date();
const today = new Date();
const dates = document.querySelectorAll('time:not([datetime])');
today.setHours(now.getHours() - 6);

for (let i = 0; i < dates.length; i++) {
	dates[i].setAttribute('datetime', today.toISOString());
}

// this one is being set to a specific time because otherwise
// the demo changes on every build
dates[dates.length - 1].setAttribute("datetime", "1912-04-15T05:18Z");

ODate.init();

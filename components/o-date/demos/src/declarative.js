import ODate from '../../main.js';

const now = new Date();
const today = new Date();
const dates = document.querySelectorAll('time:not([datetime])');
today.setHours(now.getHours() - 6);

for (let i = 0; i < dates.length; i++) {
	dates[i].setAttribute('datetime', today.toISOString());
}

ODate.init();

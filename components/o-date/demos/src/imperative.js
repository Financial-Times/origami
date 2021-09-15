import ODate from '../../main.js';

const times = document.querySelectorAll('[data-o-component="o-date"]');

const now = new Date();
const today = new Date();
today.setHours(now.getHours() - 6);
const lastMonth = new Date();
lastMonth.setMonth(now.getMonth() - 6);

times[0].setAttribute('datetime', today.toISOString());
times[1].setAttribute('datetime', new Date(today.getTime() - 1000 * 60 * 60 * 20).toISOString());
times[2].setAttribute('datetime', lastMonth.toISOString());

ODate.init();

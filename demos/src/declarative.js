const now = new Date();
const today = new Date();
today.setHours(now.getHours() - 6);
document.querySelector('time:not([datetime])').setAttribute('datetime', today.toISOString());

require('./demo');

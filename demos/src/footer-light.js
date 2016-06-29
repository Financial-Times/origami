const footer = require('./footer');
const clone = JSON.parse(JSON.stringify(footer));

module.exports = Object.assign(clone, { theme: 'theme-light' });

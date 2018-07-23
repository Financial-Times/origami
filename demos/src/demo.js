/*global require*/
import './../../main.js';

//mega hack because we currently have no way of requesting brands for origami.json dependencies
document.querySelector('link').href += "&brand=internal";

document.addEventListener('DOMContentLoaded', () => {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});

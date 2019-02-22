const hasFired = {};

function trigger(type) {
	if (type in hasFired) {
		return;
	}
	hasFired[type] = true;
	document.dispatchEvent(new CustomEvent('o.'+type));
}

window.addEventListener('load', trigger.bind(null, 'load'));
window.addEventListener('load', trigger.bind(null, 'DOMContentLoaded'));
document.addEventListener('DOMContentLoaded', trigger.bind(null, 'DOMContentLoaded'));

document.onreadystatechange = function () {
	if (document.readyState === 'complete') {
		trigger('DOMContentLoaded');
		trigger('load');
	} else if (document.readyState === 'interactive' && !document.attachEvent) {
		trigger('DOMContentLoaded');
	}
};

if (document.readyState === 'complete') {
	trigger('DOMContentLoaded');
	trigger('load');
} else if (document.readyState === 'interactive' && !document.attachEvent) {
	trigger('DOMContentLoaded');
}

import '../../main.js';

document.addEventListener('DOMContentLoaded', setupDemo);

document.onreadystatechange = function () {
	if (document.readyState === 'complete') {
		setupDemo();
	} else if (document.readyState === 'interactive' && !document.attachEvent) {
		setupDemo();
	}
};

if (document.readyState === 'complete') {
	setupDemo();
} else if (document.readyState === 'interactive' && !document.attachEvent) {
	setupDemo();
}


function setupDemo() {
	if (document.documentElement.classList.contains('demo-sticky')) {
		const p = document.createElement('p');
		p.className = 'demo-sticky-message demo-sticky-message--';

		if (window.self !== window.top) {
			p.className += 'popout';
			p.textContent = 'Please open this demo in a new window';
		} else {
			p.className += 'scroll';
			p.textContent = 'Scroll down';
		}

		document.body.appendChild(p);
	}

	document.documentElement.className = document.documentElement.className.replace('core', 'enhanced');
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
}

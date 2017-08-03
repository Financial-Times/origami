
import Banner from '../../main';

function initDemos() {
	document.addEventListener('DOMContentLoaded', function() {
		new Banner(null, {
			contentLong: 'Try the new compact homepage. A list view of today\'s homepage with fewer images.',
			contentShort: 'Try the new compact homepage.',
			buttonLabel: 'Try it now',
			buttonUrl: '#try-button',
			linkLabel: 'Give feedback',
			linkUrl: '#feedback-link'
		});
	});
}

initDemos();

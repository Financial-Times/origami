
import Banner from '../../main';

function initDemos() {
	document.addEventListener('DOMContentLoaded', () => {

		document.getElementById('banner-standard').addEventListener('click', () => {
			new Banner(null, {
				contentLong: 'Try the new compact homepage. A list view of today\'s homepage with fewer images.',
				contentShort: 'Try the new compact homepage.',
				buttonLabel: 'Try it now',
				buttonUrl: '#try-button',
				linkLabel: 'Give feedback',
				linkUrl: '#feedback-link'
			});
		});

		document.getElementById('banner-small').addEventListener('click', () => {
			new Banner(null, {
				contentLong: 'Try the new compact homepage. A list view of today\'s homepage with fewer images.',
				contentShort: 'Try the new compact homepage.',
				buttonLabel: 'Try it now',
				buttonUrl: '#try-button',
				theme: 'small'
			});
		});

		document.getElementById('banner-marketing-secondary').addEventListener('click', () => {
			new Banner(null, {
				contentLong: `
					<p><b>Save 25% today</b> Limited time only.  Resubscribe now and get:</p>
					<ul>
						<li>Reduced price full Standard FT digital package</li>
						<li>Access to the FT on your desktop and mobile devices</li>
						<li>Our 5-year company financials archive</li>
					</ul>
				`,
				contentShort: '<p><b>Save 25% today</b> Limited time only.</p>',
				buttonLabel: 'Subscribe now',
				buttonUrl: '#subscribe-button',
				theme: ['small', 'marketing-secondary']
			});
		});

		document.getElementById('banner-marketing-primary').addEventListener('click', () => {
			new Banner(null, {
				contentLong: `
					<p><b>Save 25% today</b> Limited time only.  Resubscribe now and get:</p>
					<ul>
						<li>Reduced price full Standard FT digital package</li>
						<li>Access to the FT on your desktop and mobile devices</li>
						<li>Our 5-year company financials archive</li>
					</ul>
				`,
				contentShort: '<p><b>Save 25% today</b> Limited time only.</p>',
				buttonLabel: 'Subscribe now',
				buttonUrl: '#subscribe-button',
				theme: ['small', 'marketing-primary']
			});
		});

	});
}

initDemos();

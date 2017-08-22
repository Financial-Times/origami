
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
					<p>
						<b>You qualify for a 25% subscription discount.</b><br/>
						Pay just £3.99 per week for annual Standard  Digital access.
					</p>
					<ul>
						<li>Access FT.com on your desktop, tablet &amp; mobile</li>
						<li>5 year company financials archive</li>
						<li>Personalised email briefings and market moving news</li>
					</ul>
				`,
				contentShort: `
					<p>
						<b>You qualify for a 25% subscription discount.</b><br/>
						Pay just £3.99 per week for annual Standard  Digital access.
					</p>
				`,
				buttonLabel: 'Save 25% now',
				buttonUrl: '#save-button',
				theme: ['small', 'marketing-secondary']
			});
		});

		document.getElementById('banner-marketing-primary').addEventListener('click', () => {
			new Banner(null, {
				contentLong: `
					<p>
						<b>You qualify for a 25% subscription discount.</b><br/>
						Pay just £3.99 per week for annual Standard  Digital access.
					</p>
					<ul>
						<li>Access FT.com on your desktop, tablet &amp; mobile</li>
						<li>5 year company financials archive</li>
						<li>Personalised email briefings and market moving news</li>
					</ul>
				`,
				contentShort: `
					<p>
						<b>You qualify for a 25% subscription discount.</b><br/>
						Pay just £3.99 per week for annual Standard  Digital access.
					</p>
				`,
				buttonLabel: 'Save 25% now',
				buttonUrl: '#save-button',
				theme: ['small', 'marketing-primary']
			});
		});

	});
}

initDemos();

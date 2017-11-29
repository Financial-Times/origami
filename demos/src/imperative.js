
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

		document.getElementById('banner-marketing').addEventListener('click', () => {
			new Banner(null, {
				contentLong: `
					<header class="o-banner__heading">
						<p>Limited time only</p>
						<h1>You qualify for a special offer: Save 33%</h1>
					</header>
					<p>Pay just $4.29 per week for annual Standard  Digital access.</p>
					<ul>
						<li>Global news and opinion from experts in 50+ countries</li>
						<li>Access on desktop and mobile</li>
						<li>Market-moving news, politics, tech, the arts and more</li>
					</ul>
				`,
				contentShort: `
					<h1>You qualify for a special offer: Save 33%</h1>
					<p>Pay just $4.29 per week for annual Standard  Digital access.</p>
				`,
				buttonLabel: 'Save 33% now',
				buttonUrl: '#save-button',
				theme: ['small', 'marketing']
			});
		});

		document.getElementById('banner-marketing-secondary').addEventListener('click', () => {
			new Banner(null, {
				contentLong: `
					<header class="o-banner__heading">
						<p>Limited time only</p>
						<h1>You qualify for a special offer: Save 33%</h1>
					</header>
					<p>Pay just $4.29 per week for annual Standard  Digital access.</p>
					<ul>
						<li>Global news and opinion from experts in 50+ countries</li>
						<li>Access on desktop and mobile</li>
						<li>Market-moving news, politics, tech, the arts and more</li>
					</ul>
				`,
				contentShort: `
					<h1>You qualify for a special offer: Save 33%</h1>
					<p>Pay just $4.29 per week for annual Standard  Digital access.</p>
				`,
				buttonLabel: 'Save 33% now',
				buttonUrl: '#save-button',
				theme: ['small', 'marketing-secondary']
			});
		});

		document.getElementById('banner-marketing-primary').addEventListener('click', () => {
			new Banner(null, {
				contentLong: `
					<header class="o-banner__heading">
						<p>Limited time only</p>
						<h1>You qualify for a special offer: Save 33%</h1>
					</header>
					<p>Pay just $4.29 per week for annual Standard  Digital access.</p>
					<ul>
						<li>Global news and opinion from experts in 50+ countries</li>
						<li>Access on desktop and mobile</li>
						<li>Market-moving news, politics, tech, the arts and more</li>
					</ul>
				`,
				contentShort: `
					<h1>You qualify for a special offer: Save 33%</h1>
					<p>Pay just $4.29 per week for annual Standard  Digital access.</p>
				`,
				buttonLabel: 'Save 33% now',
				buttonUrl: '#save-button',
				theme: ['small', 'marketing-primary']
			});
		});

	});
}

initDemos();

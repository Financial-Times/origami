
import Banner from '../../main';

const demoBannerConfigurations = [
	{
		elementId: 'banner-standard',
		config: {
			contentLong: `
				<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>
			`,
			contentShort: `
				<p>Try the new compact homepage.</p>
			`,
			buttonLabel: 'Try it now',
			linkLabel: 'Give feedback'
		}
	},
	{
		elementId: 'banner-small',
		config: {
			contentLong: `
				<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>
			`,
			contentShort: `
				<p>Try the new compact homepage.</p>
			`,
			buttonLabel: 'Try it now',
			linkLabel: 'Give feedback',
			layout: 'small'
		}
	},
	{
		elementId: 'banner-compact',
		config: {
			contentLong: `
				<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>
			`,
			contentShort: `
				<p>Try the new compact homepage.</p>
			`,
			buttonLabel: 'Try it now',
			linkLabel: 'Give feedback',
			layout: 'compact'
		}
	},
	{
		elementId: 'banner-marketing',
		config: {
			contentLong: `
				<header class="o-banner__heading">
					<p>Limited time only</p>
					<h1>You qualify for a special offer: Save 33%</h1>
				</header>
				<p>Pay just $4.29 per week for annual Standard Digital access.</p>
				<ul>
					<li>Global news and opinion from experts in 50+ countries</li>
					<li>Access on desktop and mobile</li>
					<li>Market-moving news, politics, tech, the arts and more</li>
				</ul>
			`,
			contentShort: `
				<h1>You qualify for a special offer: Save 33%</h1>
				<p>Pay just $4.29 per week for annual Standard Digital access.</p>
			`,
			buttonLabel: 'Save 33% now',
			linkLabel: 'Terms and conditions',
			theme: 'marketing'
		}
	},
	{
		elementId: 'banner-marketing-small',
		config: {
			contentLong: `
				<header class="o-banner__heading">
					<p>Limited time only</p>
					<h1>You qualify for a special offer: Save 33%</h1>
				</header>
				<p>Pay just $4.29 per week for annual Standard Digital access.</p>
				<ul>
					<li>Global news and opinion from experts in 50+ countries</li>
					<li>Access on desktop and mobile</li>
					<li>Market-moving news, politics, tech, the arts and more</li>
				</ul>
			`,
			contentShort: `
				<h1>You qualify for a special offer: Save 33%</h1>
				<p>Pay just $4.29 per week for annual Standard Digital access.</p>
			`,
			buttonLabel: 'Save 33% now',
			linkLabel: 'Terms and conditions',
			layout: 'small',
			theme: 'marketing'
		}
	},
	{
		elementId: 'banner-marketing-compact',
		config: {
			contentLong: `
				<header class="o-banner__heading">
					<p>Limited time only</p>
					<h1>You qualify for a special offer: Save 33%</h1>
				</header>
				<p>Pay just $4.29 per week for annual Standard Digital access.</p>
				<ul>
					<li>Global news and opinion from experts in 50+ countries</li>
					<li>Access on desktop and mobile</li>
					<li>Market-moving news, politics, tech, the arts and more</li>
				</ul>
			`,
			contentShort: `
				<h1>You qualify for a special offer: Save 33%</h1>
				<p>Pay just $4.29 per week for annual Standard Digital access.</p>
			`,
			buttonLabel: 'Save 33% now',
			linkLabel: 'Terms and conditions',
			layout: 'compact',
			theme: 'marketing'
		}
	},
	{
		elementId: 'banner-product',
		config: {
			contentLong: `
				<header class="o-banner__heading">
					<h1>FT Compact</h1>
				</header>
				<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>
			`,
			contentShort: `
				<header class="o-banner__heading">
					<h1>FT Compact</h1>
				</header>
				<p>Try the new compact homepage.</p>
			`,
			buttonLabel: 'Try it now',
			linkLabel: 'Give feedback',
			theme: 'product'
		}
	},
	{
		elementId: 'banner-product-small',
		config: {
			contentLong: `
				<header class="o-banner__heading">
					<h1>FT Compact</h1>
				</header>
				<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>
			`,
			contentShort: `
				<header class="o-banner__heading">
					<h1>FT Compact</h1>
				</header>
				<p>Try the new compact homepage.</p>
			`,
			buttonLabel: 'Try it now',
			linkLabel: 'Give feedback',
			layout: 'small',
			theme:  'product'
		}
	},
	{
		elementId: 'banner-product-compact',
		config: {
			contentLong: `
				<header class="o-banner__heading">
					<h1>FT Compact</h1>
				</header>
				<p>Try the new compact homepage. A list view of today's homepage with fewer images.</p>
			`,
			contentShort: `
				<header class="o-banner__heading">
					<h1>FT Compact</h1>
				</header>
				<p>Try the new compact homepage.</p>
			`,
			buttonLabel: 'Try it now',
			linkLabel: 'Give feedback',
			layout: 'compact',
			theme: 'product'
		}
	},
	{
		elementId: 'banner-form',
		config: {
			contentLong: `
				<header class="o-banner__heading">
					<p>Limited time only</p>
					<h1>You qualify for a special offer: Save 33%</h1>
				</header>
				<p>Pay just $4.29 per week for annual Standard Digital access.</p>
				<ul>
					<li>Global news and opinion from experts in 50+ countries</li>
					<li>Access on desktop and mobile</li>
					<li>Market-moving news, politics, tech, the arts and more</li>
				</ul>
			`,
			contentShort: `
				<h1>You qualify for a special offer: Save 33%</h1>
				<p>Pay just $4.29 per week for annual Standard Digital access.</p>
			`,
			buttonLabel: 'Save 33% now',
			linkLabel: 'Terms and conditions',
			layout: 'small',
			theme: 'marketing',
			formAction: '#form-submitted',
			formMethod: 'get'
		}
	}
];

function initDemos() {
	document.addEventListener('DOMContentLoaded', () => {
		demoBannerConfigurations.forEach(({elementId, config}) => {
			document.getElementById(elementId).addEventListener('click', () => {
				new Banner(null, config);
			});
		});
	});
}

initDemos();

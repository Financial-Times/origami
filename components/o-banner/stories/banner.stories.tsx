import {Banner} from '../src/tsx/banner';
import {useEffect} from 'react';
import javascript from '../main';
import './banner.scss';

export default {
	title: 'Components/o-banner',
	component: Banner,
	args: {},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=0%3A1489',
		},
		guidelines: {
			notion: '37cdc7ac2cac4d60a4c9f451c47a4647',
		},
		html: {},
	},
};

const Story = args => {
	useEffect(() => {
		let banners = javascript.init();
		return function cleanup() {
			banners = Array.isArray(banners) ? banners : [banners];
			banners.forEach(banner => banner.destroy());
		};
	}, [args.showCloseButton, args.closeButtonLabel]);
	return <Banner {...args} />;
};

export const Default = Story.bind({});
Default.args = {
	content:
		"Try the new compact homepage. A list view of today's homepage with fewer images.",
	abbreviatedContent: 'Try it now',
	navigationLabel: "Try the new homepage",
	showCloseButton: true,
	closeButtonLabel: 'Close',
	primaryAction: {
		copy: 'Try it now',
		url: '#',
	},
	secondaryAction: {
		copy: 'Give feedback',
		url: '#',
	},
	theme: '',
	layout: '',
};
// Exclude layout and heading controls to discourage use of the default layout with a heading.
// https://github.com/Financial-Times/origami/pull/523
Default.parameters = {
	controls: {exclude: ['heading', 'abbreviatedHeading', 'layout']},
};

export const FormPrimaryAction = Story.bind({});
FormPrimaryAction.args = {
	content:
		"Try the new compact homepage. A list view of today's homepage with fewer images.",
	abbreviatedContent: 'Try it now',
	navigationLabel: "Try the new homepage",
	showCloseButton: true,
	closeButtonLabel: 'Close',
	primaryAction: {
		action: '#',
		encoding: 'application/x-www-form-urlencoded',
		method: 'POST',
		copy: 'Try it now',
	},
	secondaryAction: {
		copy: 'Give feedback',
		url: '#',
	},
	theme: '',
	layout: '',
};
// Exclude layout and heading controls to discourage use of the default layout with a heading.
// https://github.com/Financial-Times/origami/pull/523
FormPrimaryAction.parameters = {
	controls: {exclude: ['heading', 'abbreviatedHeading', 'layout']},
};

export const Small = Story.bind({});
Small.args = {
	heading: 'FT Compact',
	abbreviatedHeading: 'FT Compact',
	content:
		"Try the new compact homepage. A list view of today's homepage with fewer images.",
	abbreviatedContent: 'Try it now',
	navigationLabel: "Try the new homepage",
	showCloseButton: true,
	closeButtonLabel: 'Close',
	primaryAction: {
		copy: 'Try it now',
		url: '#',
	},
	secondaryAction: {
		copy: 'Give feedback',
		url: '#',
	},
	theme: '',
	layout: 'small',
};
// Exclude layout to discourage use of the default layout with a heading.
// https://github.com/Financial-Times/origami/pull/523
Small.parameters = {controls: {exclude: ['layout']}};

export const Compact = Story.bind({});
Compact.args = {
	heading: 'FT Compact',
	abbreviatedHeading: 'FT Compact',
	content:
		"Try the new compact homepage. A list view of today's homepage with fewer images.",
	abbreviatedContent: 'Try it now',
	navigationLabel: "Try the new homepage",
	showCloseButton: true,
	closeButtonLabel: 'Close',
	primaryAction: {
		copy: 'Try it now',
		url: '#',
	},
	secondaryAction: {
		copy: 'Give feedback',
		url: '#',
	},
	theme: '',
	layout: 'compact',
};
// Exclude layout to discourage use of the default layout with a heading.
// https://github.com/Financial-Times/origami/pull/523
Compact.parameters = {controls: {exclude: ['layout']}};

export const Marketing = Story.bind({});
Marketing.args = {
	heading: 'FT Compact',
	abbreviatedHeading: 'FT Compact',
	content:
		"Try the new compact homepage. A list view of today's homepage with fewer images.",
	abbreviatedContent: 'Try it now',
	navigationLabel: "Try the new homepage",
	showCloseButton: true,
	closeButtonLabel: 'Close',
	primaryAction: {
		copy: 'Try it now',
		url: '#',
	},
	secondaryAction: {
		copy: 'Give feedback',
		url: '#',
	},
	theme: 'marketing',
	layout: 'small',
};

export const Product = Story.bind({});
Product.args = {
	heading: 'FT Compact',
	abbreviatedHeading: 'FT Compact',
	content:
		"Try the new compact homepage. A list view of today's homepage with fewer images.",
	abbreviatedContent: 'Try it now',
	navigationLabel: "Try the new homepage",
	showCloseButton: true,
	closeButtonLabel: 'Close',
	primaryAction: {
		copy: 'Try it now',
		url: '#',
	},
	secondaryAction: {
		copy: 'Give feedback',
		url: '#',
	},
	theme: 'product',
	layout: 'small',
};

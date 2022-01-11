import {withDesign} from 'storybook-addon-designs';
import {CookieMessage} from '../src/tsx/cookie-message';
import {useEffect} from 'react';
import javascript from '../main';
import './cookie-message.scss';
import withHtml from 'origami-storybook-addon-html';

export default {
	title: 'Cookie Message',
	component: CookieMessage,
	decorators: [withDesign, withHtml],
	args: {
	},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=0%3A1489',
		},
		guidelines: {},
		html: {},
	},
};

const Story = args => {
	useEffect(() => {
		let cookieMessages = javascript.init();
	});
	return <CookieMessage {...args} />;
};

export const Default = Story.bind({});
Default.args = {
	fullMarkup: true,
	heading: '',
	copy: '',
	primaryAction: {
		copy: "Accept &amp; continue",
		url: "https://consent.ft.com/__consent/consent-record-cookie?redirect=#",
	},
	secondaryAction: {
		copy: "Manage Cookies",
		url: "https://www.ft.com/preferences/manage-cookies?redirect=#"
	},
	theme: '',
};

export const Alternative = Story.bind({});
Alternative.args = {
	fullMarkup: true,
	heading: '',
	copy: '',
	primaryAction: {
		copy: "Accept &amp; continue",
		url: "https://consent.ft.com/__consent/consent-record-cookie?redirect=#",
	},
	secondaryAction: {
		copy: "Manage Cookies",
		url: "https://www.ft.com/preferences/manage-cookies?redirect=#"
	},
	theme: 'alternative'
};

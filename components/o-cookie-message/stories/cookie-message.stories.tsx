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
		return function cleanup() {
			cookieMessages = Array.isArray(cookieMessages) ? cookieMessages : [cookieMessages];
			cookieMessages.forEach(banner => banner.destroy());
		}
	}, [args]);
	return <CookieMessage {...args} />;
};
export const Default = Story.bind({});
Default.args = {
	fullMarkupForDefaultContent: false,
	heading: '',
	copy: '',
	redirect: '',
	primaryAction: {
		copy: ''
	},
	secondaryAction: {
		copy: ''
	},
	theme: '',
};

export const Alternative = Story.bind({});
Alternative.args = {
	fullMarkupForDefaultContent: false,
	heading: '',
	copy: '',
	redirect: '',
	primaryAction: {
		copy: ''
	},
	secondaryAction: {
		copy: ''
	},
	theme: 'alternative'
};

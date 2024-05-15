import {CookieMessage} from '../src/tsx/cookie-message';
import {useEffect} from 'react';
import javascript from '../main';
import './cookie-message.scss';

export default {
	title: 'Components/o-cookie-message',
	component: CookieMessage,
	args: {},
	parameters: {
		guidelines: {},
		html: {},
	},
};

const Story = args => {
	useEffect(() => {
		let cookieMessages = javascript.init();
		return function cleanup() {
			cookieMessages = Array.isArray(cookieMessages)
				? cookieMessages
				: [cookieMessages];
			cookieMessages.forEach(banner => banner.destroy());
		};
	}, [args]);
	return (
		<div>
			<CookieMessage {...args} />
		</div>
	);
};
const Default = Story.bind({});
Default.args = {
	fullMarkupForDefaultContent: false,
	heading: '',
	copy: '',
	redirect: '',
	primaryAction: {
		copy: '',
	},
	secondaryAction: {
		copy: '',
	},
	theme: '',
};

export {Default as CookieMessage};

export const AlternativeDesignCookieMessage = Story.bind({});
AlternativeDesignCookieMessage.args = {
	fullMarkupForDefaultContent: false,
	heading: '',
	copy: '',
	redirect: '',
	primaryAction: {
		copy: '',
	},
	secondaryAction: {
		copy: '',
	},
	theme: 'alternative',
};

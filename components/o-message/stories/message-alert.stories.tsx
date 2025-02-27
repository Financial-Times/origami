import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {AlertMessage} from '../src/tsx/message';
import javascript from '../main';
import './message.scss';

export default {
	title: 'Maintained/o-message',
	component: AlertMessage,
	parameters: {},
	args: {
		showCloseButton: true,
		inner: false,
		primaryAction: {
			text: 'Button',
			url: '#',
			openInNewWindow: false,
		},
		secondaryAction: {
			text: 'Text link',
			url: '#',
			openInNewWindow: false,
		},
	},
} as ComponentMeta<typeof AlertMessage>;

const innerDecorator = Story => (
	<div className="demo-inner-message">{Story()}</div>
);

const AlertStory = args => {
	useEffect(() => {
		let messages = javascript.init();
		return () => {
			messages = Array.isArray(messages) ? messages : [messages];
			messages.forEach(message => message.destroy());
		};
	}, [args.showCloseButton]);
	return <AlertMessage {...args} />;
};

export const AlertSuccess: ComponentStory<typeof AlertMessage> =
	AlertStory.bind({});
AlertSuccess.storyName = 'Alert: Success';
AlertSuccess.args = {
	state: 'success',
	content: {
		detail: 'The quick brown fox jumped over the lazy dogs!',
		highlight: 'Hooray!',
	},
};

export const AlertInnerSuccess: ComponentStory<typeof AlertMessage> =
	AlertStory.bind({});
AlertInnerSuccess.decorators = [innerDecorator];
AlertInnerSuccess.storyName = 'Alert Inner: Success';
AlertInnerSuccess.args = {
	state: 'success',
	content: {
		detail: 'The quick brown fox jumped over the lazy dogs!',
		highlight: 'Hooray!',
		additionalInfo:
			'Did you know that that sentence uses all of the letters in the alphabet at least once?',
	},
	inner: true,
};

export const AlertNeutral: ComponentStory<typeof AlertMessage> =
	AlertStory.bind({});
AlertNeutral.storyName = 'Alert: Neutral';
AlertNeutral.args = {
	state: 'neutral',
	content: {
		detail:
			"There's a fox, and some lazy dogs. Many lazy dogs. Many, many, many lazy dogs. Only one fox. Many, many, many lazy dogs.",
	},
};

export const AlertInnerNeutral: ComponentStory<typeof AlertMessage> =
	AlertStory.bind({});
AlertInnerNeutral.decorators = [innerDecorator];
AlertInnerNeutral.storyName = 'Alert Inner: Neutral';
AlertInnerNeutral.args = {
	state: 'neutral',
	content: {
		detail: 'The quick brown fox did no jump over the lazy dogs!',
		highlight: 'Meh.',
	},
	inner: true,
};

export const AlertError: ComponentStory<typeof AlertMessage> = AlertStory.bind(
	{}
);
AlertError.storyName = 'Alert: Error';
AlertError.args = {
	state: 'error',
	content: {
		detail: 'The quick brown fox did not jump over the lazy dogs.',
	},
};

export const AlertInnerError: ComponentStory<typeof AlertMessage> =
	AlertStory.bind({});
AlertInnerError.decorators = [innerDecorator];
AlertInnerError.storyName = 'Alert Inner: Error';
AlertInnerError.args = {
	state: 'error',
	content: {
		detail: 'The quick brown fox did not jump over the lazy dogs.',
		highlight: 'Oops.',
		additionalInfo:
			'But that sentence still uses all of the letters in the alphabet at least once!',
	},
	inner: true,
};

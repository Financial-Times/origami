import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Message} from '../src/tsx/messagge.tsx';
import './message.scss';

export default {
	title: 'Components/o-message',
	component: Message,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
} as ComponentMeta<typeof Message>;

const MessageStory = args => <Message {...args} />;
export const DefaultMessage: ComponentStory<typeof Message> = MessageStory.bind(
	{}
);

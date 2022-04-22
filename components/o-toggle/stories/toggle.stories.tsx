import './toggle.scss';
import javascript from '../main';
import withHtml from 'origami-storybook-addon-html';
import {Toggle} from '../src/tsx/toggle';
import {useEffect} from 'react';

export default {
	title: 'Components/o-toggle',
	component: Toggle,
	decorators: [withHtml],
	args: {},
	parameters: {
		html: {},
	},
};

const Story = args => {
	useEffect(() => void setTimeout(javascript.init.bind(javascript), 1000), []);
	return <Toggle {...args} />;
};

export const Example = Story.bind({});

Example.args = {
	label: 'Click me',
	children: 'I was hidden, but now I am exposed',
	id: 'display-toggle',
};

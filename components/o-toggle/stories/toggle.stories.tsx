import './toggle.scss';
import withHtml from 'origami-storybook-addon-html';
import {Toggle} from '../src/tsx/toggle';

export default {
	title: 'Components/o-toggle',
	component: Toggle,
	decorators: [withHtml],
	args: {},
	parameters: {
		html: {},
	},
};

const Story = args => <Toggle {...args} />;

export const Display = Story.bind({});

Display.args = {
	type: 'display',
	label: 'Click me',
	children: 'I was hidden completely',
};

export const Visibility = Story.bind({});

Visibility.args = {
	type: 'visibility',
	label: 'Click me',
	children: 'I was hidden, but my space was held for me.',
};

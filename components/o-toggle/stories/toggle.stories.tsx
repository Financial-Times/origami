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
	useEffect(() => {
		const toggles = javascript.init();
		return () => {
			toggles.forEach(toggle => {
				toggle.destroy();
			});
		};
	}, []);
	return <Toggle {...args} />;
};

export const Example = Story.bind({});

Example.args = {
	label: 'Click me',
	children: 'I was hidden, but now I am exposed',
	id: 'display-toggle',
};

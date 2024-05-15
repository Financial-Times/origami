import {useEffect} from 'react';
import {SteppedProgress} from '../src/tsx/stepped-progress';
import './stepped-progress.scss';
import javascript from '@financial-times/o-stepped-progress';

export default {
	title: 'Components/o-stepped-progress',
	component: SteppedProgress,
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/xxJEMk0fnzEhoDFaKtM5fz/Stepped-progress-bar-component?node-id=6%3A3537',
		},
	},
	args: {
		steps: [{label: 'default', state: 'complete', current: false}],
	},
};

const Story = args => {
	useEffect(() => void javascript.init(), []);
	return <SteppedProgress {...args} />;
};

const Example = Story.bind({});
Example.args = {
	steps: [
		{label: 'Wake up', state: 'complete'},
		{label: 'Eat a egg', state: 'complete'},
		{label: 'Leave the house', state: 'current'},
		{label: 'Defeat everyone'},
	],
};

export {Example as SteppedProgress};

export const ErrorStep = Story.bind({});
ErrorStep.args = {
	steps: [
		{label: 'Wake up', state: 'complete'},
		{
			label: 'Eat a egg',
			state: 'complete',
			url: 'https://en.wikipedia.org/wiki/Egg_as_food',
		},
		{label: 'Leave the house', state: 'error'},
		{label: 'Defeat everyone'},
	],
};

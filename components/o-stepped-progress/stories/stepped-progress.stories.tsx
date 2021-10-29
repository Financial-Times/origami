import {withDesign} from 'storybook-addon-designs';
import {useEffect} from 'react';
import {SteppedProgress, Step} from '../src/tsx/stepped-progress';
import javascript from '@financial-times/o-stepped-progress';
import withHtml from 'origami-storybook-addon-html';
import './stepped-progress.scss';

export default {
	title: 'Stepped Progress',
	component: SteppedProgress,
	subcomponents: {Step},
	decorators: [withDesign, withHtml],
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/xxJEMk0fnzEhoDFaKtM5fz/Stepped-progress-bar-component?node-id=6%3A3537',
		},
	},
	argTypes: {
		'Number of steps': {
			control: {
				type: 'range',
				max: 10,
				min: 1,
			},
		},
		steps: {
			table: {disable: true},
		},
		...Array.from(Array(10)).reduce((args, _, index) => {
			args[`Step ${index + 1} label`] = {control: {type: 'text'}};
			args[`Step ${index + 1} state`] = {
				control: {type: 'inline-radio'},
				options: ['current', 'complete', 'error', 'default'],
			};
			return args;
		}, {}),
	},
	args: {
		'Number of steps': 4,
		...Array.from(Array(10)).reduce((args, _, index) => {
			args[`Step ${index + 1} label`] = 'step';
			args[`Step ${index + 1} state`] = '';
			return args;
		}, {}),
	},
};

function generateArgs(args) {
	let steps = Array.from(Array(args['Number of steps']), (_, index) => {
		return {
			label: args[`Step ${index + 1} label`],
			state: args[`Step ${index + 1} state`],
		};
	});
	return {steps, ...args};
}

const Story = args => {
	useEffect(() => void javascript.init(), []);
	let props = generateArgs(args);
	return <SteppedProgress {...props} />;
};
export const Normal = Story.bind({});
let args = {
	'Number of steps': 4,
	'Step 1 label': 'Wake up',
	'Step 1 state': 'complete',
	'Step 2 label': 'Eat a egg',
	'Step 2 state': 'complete',
	'Step 3 label': 'Leave the house',
	'Step 3 state': 'current',
	'Step 4 label': 'Defeat everyone',
};
Normal.args = args;

export const Error = Story.bind({});
Error.args = {...args, 'Step 3 state': 'error'};

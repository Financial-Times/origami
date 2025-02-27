import './big-number.scss';
import {BigNumber} from '../src/tsx/big-number';

export default {
	title: 'Deprecated/o-big-number',
	component: BigNumber,
	args: {},
	parameters: {
		html: {},
	},
};

const Story = args => <BigNumber {...args} />;

export const Example = Story.bind({});

Example.args = {
	title: '£13.7m',
	content: 'Cost expected to increase by £13.7m a year.',
};

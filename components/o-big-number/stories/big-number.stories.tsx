import './big-number.scss';
import withHtml from 'origami-storybook-addon-html';
import {BigNumber} from '../src/tsx/big-number';

export default {
	title: 'Components/o-big-number',
	component: BigNumber,
	decorators: [withHtml],
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

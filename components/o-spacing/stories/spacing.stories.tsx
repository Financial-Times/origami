import './spacing.scss';
import {SpacingDemo} from './spacing-demo';

export default {
	title: 'Deprecated/o-spacing',
	component: SpacingDemo,
	parameters: {
		guidelines: {},
		html: {},
	},
};

export const Spacing = SpacingDemo.bind({});
Spacing.args = {
	name: 'm12',
};

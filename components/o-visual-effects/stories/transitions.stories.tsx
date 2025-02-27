import './visual-effects.scss';
import {TransitionDemo} from './transition-demo';

export default {
	title: 'Maintained/o-visual-effects',
	component: TransitionDemo,
	parameters: {
		guidelines: {},
		html: {},
	},
};

export const Expand = TransitionDemo.bind({});
Expand.args = {
	transition: 'expand',
	timing: 0.3,
};

export const Slide = TransitionDemo.bind({});
Slide.args = {
	transition: 'slide',
	timing: 0.3,
};

export const Fade = TransitionDemo.bind({});
Fade.args = {
	transition: 'fade',
	timing: 0.3,
};

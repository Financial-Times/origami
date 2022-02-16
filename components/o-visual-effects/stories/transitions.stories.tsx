import {withDesign} from 'storybook-addon-designs';
import './visual-effects.scss';
import withHtml from 'origami-storybook-addon-html';
import {TransitionDemo} from './transition-demo';

export default {
	title: 'Components/o-visual-effects',
    component: TransitionDemo,
	decorators: [withDesign, withHtml],
	parameters: {
		guidelines: {},
		html: {},
	},
};

export const Expand = TransitionDemo.bind({});
Expand.args = {
    transition: 'expand',
    timing: 0.3
};

export const Slide = TransitionDemo.bind({});
Slide.args = {
    transition: 'slide',
    timing: 0.3
};

export const Fade = TransitionDemo.bind({});
Fade.args = {
    transition: 'fade',
    timing: 0.3
};

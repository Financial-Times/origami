import './visual-effects.scss';
import {ShadowDemo} from './shadows-demo';

export default {
	title: 'Components/o-visual-effects',
    component: ShadowDemo,
	parameters: {
		guidelines: {},
		html: {},
	},
};

export const Shadows = ShadowDemo.bind({});
Shadows.args = {
    depth: 'mid'
};

import {Loading} from '../src/tsx/loading';
import './loading.scss';

export default {
	title: 'Components/o-loading',
	component: Loading,
	argTypes: {
		size: {
			options: ['mini', 'small', 'medium', 'large'],
			defaultValue: 'medium',
		},
		theme: {
			options: ['dark', 'light'],
			defaultValue: 'dark',
		},
	},
}

export const DarkMini = {
	render: args => {
		return <Loading {...args} size="mini" theme="dark" />;
	},
}

export const LightLarge = {
	render: args => {
		return <Loading {...args} size="large" theme="light" />;
	},
}

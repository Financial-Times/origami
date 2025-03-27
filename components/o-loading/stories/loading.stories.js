import {Loading} from '../src/tsx/loading';
import './loading.scss';

export default {
	title: 'Maintained/o-loading',
	component: Loading,

	parameters: {
		design: {},
		guidelines: {},
		html: {},
	},
};

export const DarkMini = {
	render: () => <Loading size="mini" theme="dark" />,
	name: 'Dark mini',
};

export const DarkSmall = {
	render: () => <Loading size="small" theme="dark" />,
	name: 'Dark small',

	args: {
		size: 'small',
		theme: 'dark',
	},
};

export const DarkMedium = {
	render: () => <Loading size="medium" theme="dark" />,
	name: 'Dark medium',

	args: {
		size: 'medium',
		theme: 'dark',
	},
};

export const DarkLarge = {
	render: () => <Loading size="large" theme="dark" />,
	name: 'Dark large',

	args: {
		size: 'large',
		theme: 'dark',
	},
};

export const LightMini = {
	render: () => <Loading size="mini" theme="light" />,
	name: 'Light mini',

	parameters: {
		origamiBackground: 'slate',
	},
};

export const LightSmall = {
	render: () => <Loading size="small" theme="light" />,
	name: 'Light small',

	parameters: {
		origamiBackground: 'slate',
	},
};

export const LightMedium = {
	render: () => <Loading size="medium" theme="light" />,
	name: 'Light medium',

	parameters: {
		origamiBackground: 'slate',
	},
};

export const LightLarge = {
	render: () => <Loading size="large" theme="light" />,
	name: 'Light large',

	parameters: {
		origamiBackground: 'slate',
	},
};

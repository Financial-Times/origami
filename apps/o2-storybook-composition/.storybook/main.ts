import type {StorybookConfig} from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: ['../stories/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-docs',
		'../addons/html/src/preset/',
	],
	refs: {
		'o2-core': {
			title: 'Core',
			url: 'https://o2-core.origami.ft.com',
			expanded: false,
		},
		'o2-internal': {
			title: 'Internal',
			url: 'https://o2-internal.origami.ft.com',
			expanded: false,
		},
		'o2-whitelabel': {
			title: 'Whitelabel',
			url: 'https://o2-whitelabel.origami.ft.com',
			expanded: false,
		},
	},
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
};
export default config;

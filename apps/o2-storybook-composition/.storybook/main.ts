import type {StorybookConfig} from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: [
		'../stories/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',
		'../../../libraries/o-tracking/stories/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',
	],
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
			url: 'https://main--655e0e31554f2044e99ab763.chromatic.com',
			expanded: false,
		},
		'o2-internal': {
			title: 'Internal',
			url: 'https://main--655e310aa5b077441db35a73.chromatic.com',
			expanded: false,
		},
		'o2-whitelabel': {
			title: 'Whitelabel',
			url: 'https://main--655e316ac888d527a0be5f2b.chromatic.com',
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

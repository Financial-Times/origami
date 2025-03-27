import {dirname, join} from 'path';
import type {StorybookConfig} from '@storybook/react-webpack5';

const config = {
	stories: ['../stories/*.@(mdx|stories.@(js|jsx|mjs|ts|tsx))'],

	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-interactions'),
		'../addons/html/src/preset/',
		'@storybook/addon-webpack5-compiler-swc',
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
		name: getAbsolutePath('@storybook/react-webpack5'),
		options: {
			builder: {
				useSWC: true,
			},
		},
	},
	// Configures SWC compiler to import React automatically in story files
	swc: () => ({
		jsc: {
			transform: {
				react: {
					runtime: 'automatic',
				},
			},
		},
	}),
	docs: {
		autodocs: 'tag',
	},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
};
export default config;

function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')));
}

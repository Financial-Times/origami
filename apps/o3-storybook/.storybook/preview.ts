import {allModes} from './modes';

export const parameters = {
	docs: {
		codePanel: true
	},
	viewport: {
		viewports: {
			default: {name: 'Default', styles: {width: '240px', height: '900px'}},
			s: {name: 'Small', styles: {width: '490px', height: '900px'}},
			m: {name: 'Medium', styles: {width: '740px', height: '900px'}},
			l: {name: 'Large', styles: {width: '980px', height: '900px'}},
			xl: {name: 'XLarge', styles: {width: '1220px', height: '900px'}},
		},
	},
	chromatic: {
		modes: {
			mobile: allModes['360px'],
			desktop: allModes['1220px'],
		},
	},
	html: {
		prettier: {
			tabWidth: 2,
			useTabs: false,
			htmlWhitespaceSensitivity: 'ignore',
		},
	},
	backgrounds: {
		default: null,
		values: [
			{
				name: 'paper',
				value: '#fff1e5ff',
			},
			{
				name: 'slate',
				value: '#262a33ff',
			},
			{
				name: 'wheat',
				value: '#f2dfceff',
			},
			{
				name: 'white',
				value: '#ffffff',
			},
		],
	},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	o3BrandSelector: {
		brands: [
			{
				name: 'core',
				background: {
					standard: 'paper',
					inverse: 'slate',
					mono: 'paper',
					neutral: 'paper',
				},
			},
			{
				name: 'professional',
				background: {
					standard: 'paper',
					inverse: 'slate',
					mono: 'paper',
					neutral: 'paper',
				},
			},
			{
				name: 'sustainable-views',
				background: {
					standard: 'white',
					inverse: 'slate',
					mono: 'white',
					neutral: 'white',
				},
			},
			{
				name: 'internal',
				background: {
					standard: 'white',
					inverse: 'slate',
					mono: 'white',
					neutral: 'white',
				},
			},
			{
				name: 'whitelabel',
				background: {
					standard: 'white',
					inverse: 'slate',
					mono: 'white',
					neutral: 'white',
				},
			},
		],
	},
};

export const initialGlobals = {
	backgrounds: {value: 'paper'},
};

export const globalTypes = {
	selectedBrand: {
		name: 'Brand',
		description: 'Selected brand for decorator',
		defaultValue: 'core',
	},
};
export const tags = ['autodocs'];

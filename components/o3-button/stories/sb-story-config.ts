import type {Meta} from '@storybook/react';

export const TemplateSBConfig: Meta = {
	argTypes: {
		theme: {
			options: ['standard', 'inverse', 'mono', 'neutral'],
			mapping: {
				standard: '',
				inverse: 'inverse',
				mono: 'mono',
				neutral: 'neutral',
			},
		},
		size: {
			options: ['default', 'small'],
			mapping: {
				default: '',
				small: 'small',
			},
		},
	},
	parameters: {
		controls: {exclude: ['attributes', 'onClick']},
	},
};

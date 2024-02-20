import type { Meta } from '@storybook/react';


export const TemplateSBConfig: Meta = {
	argTypes: {
		theme: {
			options: ['standard', 'inverse', 'mono'],
			mapping: {
				standard: '',
				inverse: 'inverse',
				mono: 'mono',
			}
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
		controls: { exclude: ['attributes', 'onClick'] },
	},
};

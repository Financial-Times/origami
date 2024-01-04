import type { Meta } from '@storybook/react';


export const TemplateSBConfig: Meta = {
	argTypes: {
		theme: {
			options: ['default','inverse', 'mono',],
			mapping: {
				default: '',
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

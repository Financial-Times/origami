import type { Meta } from '@storybook/react';


export const TemplateSBConfig: Meta = {
	argTypes: {
		theme: {
			control: {
				type: 'radio',
				labels: {
					inverse: 'inverse',
					mono: 'mono',
					standard: 'standard',
				},
			},
			options: ['inverse', 'mono', 'standard'],
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

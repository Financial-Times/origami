import type { Meta } from '@storybook/react';


export const TemplateSBConfig: Meta = {
	argTypes: {
		theme: {
			control: {
				type: 'radio',
				labels: {
					inverse: 'Inverse',
					mono: 'Mono',
					standard: 'Standard',
				},
			},
			options: ['inverse', 'mono', 'standard'],
		},
		size: {
			control: {
				type: 'radio',
				labels: {
					small: 'Small',
					standard: 'Standard',
				},
			},
			options: ['small', 'standard'],
		},
	},
	parameters: {
		controls: { exclude: ['attributes', 'onClick'] },
	},
};

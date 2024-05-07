import type {Meta} from '@storybook/react';

export const TemplateSBConfig: Meta = {
	argTypes: {
		theme: {
			options: ['standard', 'inverse'],
			control: {
				type: 'radio',
			},
		},
		type: {
			options: ['headline large', 'headline', 'subheading', 'chapter', 'label'],
			mapping: {
				'headline large': 'headline-large',
				'headline': 'headline',
				'subheading': 'subheading',
				'chapter': 'chapter',
				'label': 'label',
			},
			control: {
				type: 'radio',
			},
		}
	}
};

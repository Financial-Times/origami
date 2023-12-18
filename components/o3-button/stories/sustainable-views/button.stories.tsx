import type {Meta} from '@storybook/react';
import {Button as ButtonTsx} from '../../src/tsx/button';
import * as ButtonStories from '../story-templates';
import {Pagination as PaginationTemplate} from '../pagination-template';

import '../../src/css/brands/sustainable-views.css';

export default {
	title: 'Sustainable Views/o3-button',
	component: ButtonTsx,
	decorators: [
		Story => (
			<div className="o3-brand-sustainable-views">
				<Story />
			</div>
		),
	],
	argTypes: {
		theme: {
			options: ['inverse', 'mono'],
			control: { type: 'radio' },
		},
		type: {
			options: ['primary', 'secondary'],
			control: { type: 'radio' },
		}
	},
	parameters: {
		backgrounds: {default: 'slate'},
	},
} as Meta;

const DesignParams = {
	type: 'figma',
	url: 'https://www.figma.com/file/VVM0PixrY3IRZq2ZUTdWfU/Core---Design-System?type=design&node-id=2819%3A133&mode=design&t=ISOqmF4aDY2CfuUR-1'
}

export const Button = ButtonStories.Button;
Button.argTypes = {
	theme: {
		options: ['inverse', 'mono'],
		control: { type: 'radio' },
	},
	type: {
		options: ['primary', 'secondary'],
		control: { type: 'radio' },
	}
}
Button.parameters = {
	theme: {default: 'inverse'},
	design: DesignParams,
}
export const LinkAsButton = ButtonStories.LinkAsButton;
LinkAsButton.parameters = {
	design: DesignParams,
}
LinkAsButton.argTypes = {
	theme: {
		options: ['inverse', 'mono'],
		control: { type: 'radio' },
	},
	type: {
		options: ['primary', 'secondary'],
		control: { type: 'radio' },
	}
}
export const GroupedButtons = ButtonStories.GroupedButtons;
GroupedButtons.argTypes = {
	theme: {
		options: ['inverse', 'mono'],
		control: { type: 'radio' },
	},
	type: {
		options: ['primary', 'secondary'],
		control: { type: 'radio' },
	}
}
export const Pagination = PaginationTemplate;
Pagination.argTypes = {
	theme: {
		options: ['inverse', 'mono'],
		control: { type: 'radio' },
	},
	type: {
		options: ['primary', 'secondary'],
		control: { type: 'radio' },
	}
}

import type {Meta} from '@storybook/react';
import {Button as ButtonTsx} from '../../../src/tsx/button';
import * as ButtonStories from '../../story-templates';
import {Pagination as PaginationTemplate} from '../../pagination-template';

import '../../../src/css/brands/professional.css';

export default {
	title: 'Core/Professional/o3-button',
	component: ButtonTsx,
	decorators: [
		Story => (
			<div className="o3-brand-professional">
				<Story />
			</div>
		),
	],
	argTypes: Object.assign(ButtonStories.Button.argTypes, {
		theme: {
			options: ['default', 'inverse'],
			mapping: {
				default: '',
				inverse: 'inverse',
			}
		},
	}),
	parameters: {
		backgrounds: {default: 'paper'},
	},
} as Meta;


const DesignParams = {
	type: 'figma',
	url: 'https://www.figma.com/file/qfi6fTq5V05b0mnXw3F7q5/Professional---Design-System?type=design&node-id=3604%3A103&mode=design&t=MlrSqBrw4e7aDJ00-1',
}

export const Button = ButtonStories.Button;
Button.parameters = {
	design: DesignParams,
}
export const LinkAsButton = ButtonStories.LinkAsButton;
LinkAsButton.parameters = {
	design: DesignParams,
}
export const GroupedButtons = ButtonStories.GroupedButtons;
export const Pagination = PaginationTemplate;

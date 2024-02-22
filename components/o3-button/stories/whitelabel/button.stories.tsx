import type {Meta} from '@storybook/react';
import {Button as ButtonTsx} from '../../src/tsx/button';
import * as ButtonStories from '../story-templates';
import {Pagination as PaginationTemplate} from '../pagination-template';

import '../../src/css/brands/whitelabel.css';

export default {
	title: 'Whitelabel/o3-button',
	component: ButtonTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		controls: {include: ['label', 'type', 'size', 'icon', 'iconOnly']},
		backgrounds: {
			disable: true,
		},
	},
} as Meta;

const DesignParams = {
	type: 'figma',
	url: 'https://www.figma.com/file/5ATknbGociZMlnNXX4sy4f/Whitelabel---Design-System?type=design&node-id=3312%3A89&mode=design&t=TROJD67flS5URgLJ-1',
};

export const Button = ButtonStories.Button;
Button.parameters = {
	design: DesignParams,
};
export const LinkAsButton = ButtonStories.LinkAsButton;
LinkAsButton.parameters = {
	design: DesignParams,
};
export const GroupedButtons = ButtonStories.GroupedButtons;
export const Pagination = PaginationTemplate;

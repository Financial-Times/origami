import type {StoryObj} from '@storybook/react';
import {
	Button as ButtonTsx,
	LinkButton,
	ButtonProps,
	LinkButtonProps,
} from '../src/tsx/button';
import {ButtonGroup} from '../src/tsx/group';

import {TemplateSBConfig} from './sb-story-config';

type ButtonStory = Omit<StoryObj, 'args'> & {
	args: ButtonProps & {disabled: Boolean}
};
type LinkButtonStory = Omit<StoryObj, 'args'> & {
	args: LinkButtonProps & {disabled: Boolean}
};
type ButtonGroupStory = Omit<StoryObj, 'args'> & {
	args: {
		buttons: ButtonProps[];
	};
};

export type TemplateType = StoryObj & {
	render: (args) => JSX.Element;
};

const ButtonTemplate: TemplateType = {
	...TemplateSBConfig,
	render: args => {
		return <ButtonTsx {...args} attributes={{disabled: args.disabled}} />;
	},
};

const LinkButtonTemplate: TemplateType = {
	...TemplateSBConfig,
	render: args => {
		return <LinkButton {...args} attributes={{disabled: args.disabled}} />;
	},
};

const ButtonGroupTemplate: TemplateType = {
	...TemplateSBConfig,
	render: args => {
		return (
			<ButtonGroup>
				{args.buttons.map((buttonProps, index) => (
					<ButtonTsx {...buttonProps} key={index} />
				))}
			</ButtonGroup>
		);
	},
};

export const Button: ButtonStory = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'primary',
		disabled: false
	},
};

export const LinkAsButton: LinkButtonStory = {
	...LinkButtonTemplate,
	args: {
		label: 'Link button',
		type: 'secondary',
		href: '#',
		disabled: false
	},
};

export const GroupedButtons: ButtonGroupStory = {
	...ButtonGroupTemplate,
	args: {
		buttons: [
			{
				label: 'button one',
				type: 'secondary',
			},
			{
				label: 'button two',
				type: 'secondary',
			},
			{
				label: 'button three',
				type: 'secondary',
			},
		],
	},
	parameters: {
		controls: {include: ['buttons']},
	},
};

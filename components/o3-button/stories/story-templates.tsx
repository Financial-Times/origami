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
	args: ButtonProps;
};
type LinkButtonStory = Omit<StoryObj, 'args'> & {
	args: LinkButtonProps;
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
		return <ButtonTsx {...args} />;
	},
};

const LinkButtonTemplate: TemplateType = {
	...TemplateSBConfig,
	render: args => {
		return <LinkButton {...args} />;
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
	},
};

export const LinkAsButton: LinkButtonStory = {
	...LinkButtonTemplate,
	args: {
		label: 'Link button',
		type: 'secondary',
		href: '#',
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

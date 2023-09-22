import type {StoryObj} from '@storybook/react';
import {
	Button,
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
		return <Button {...args} />;
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
					<Button {...buttonProps} key={index} />
				))}
			</ButtonGroup>
		);
	},
};

export const PrimaryButton: ButtonStory = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'primary',
	},
};
export const SecondaryButton: ButtonStory = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'secondary',
	},
};

export const GhostButton: ButtonStory = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'ghost',
	},
};

export const BigButton: ButtonStory = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'secondary',
		size: 'big',
	},
};

export const InverseButton: ButtonStory = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'secondary',
		theme: 'inverse',
	},
	parameters: {
		origamiBackground: 'slate',
	},
};

export const MonoButton: ButtonStory = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'secondary',
		theme: 'mono',
	},
};

export const ButtonWithIcon: ButtonStory = {
	...ButtonTemplate,
	args: {
		label: 'Cross',
		type: 'secondary',
		icon: 'cross',
	},
};

export const IconOnlyButton: ButtonStory = {
	...ButtonTemplate,
	args: {
		label: 'Cross',
		type: 'secondary',
		icon: 'cross',
		iconOnly: true,
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

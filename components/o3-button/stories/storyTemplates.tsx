import {
	Button,
	LinkButton,
	ButtonProps,
	LinkButtonProps,
} from '../src/tsx/button';
import {ButtonGroup, ButtonGroupProps} from '../src/tsx/group';

type ButtonArgTypes = {
	args: ButtonProps;
	parameters?: {
		origamiBackground: string;
	};
};

const ButtonTemplate = {
	render: (args: ButtonProps) => {
		return <Button {...args} />;
	},
};

const LinkButtonTemplate = {
	render: (args: LinkButtonProps) => {
		return <LinkButton {...args} />;
	},
};

const ButtonGroupTemplate = {
	render: (args: ButtonGroupProps) => {
		const buttons = args?.children
			? args.children
			: [
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
			  ];
		return (
			<ButtonGroup>
				{buttons.map((buttonProps, index) => (
					<Button {...buttonProps} key={index} />
				))}
			</ButtonGroup>
		);
	},
};

export const PrimaryButton: ButtonArgTypes = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'primary',
	},
};
export const SecondaryButton: ButtonArgTypes = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'secondary',
	},
};

export const GhostButton: ButtonArgTypes = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'ghost',
	},
};

export const BigButton: ButtonArgTypes = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'secondary',
		size: 'big',
	},
};

export const InverseButton: ButtonArgTypes = {
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

export const MonoButton: ButtonArgTypes = {
	...ButtonTemplate,
	args: {
		label: 'Press button',
		type: 'secondary',
		theme: 'mono',
	},
};

export const ButtonWithIcon: ButtonArgTypes = {
	...ButtonTemplate,
	args: {
		label: 'Cross',
		type: 'secondary',
		icon: 'cross',
	},
};

export const IconOnlyButton: ButtonArgTypes = {
	...ButtonTemplate,
	args: {
		label: 'Cross',
		type: 'secondary',
		icon: 'cross',
		iconOnly: true,
	},
};

export const LinkAsButton: {args: LinkButtonProps} = {
	...LinkButtonTemplate,
	args: {
		label: 'Link button',
		type: 'secondary',
		href: '#',
	},
};

export const GroupedButtons: {args: ButtonGroupProps} = {
	...ButtonGroupTemplate,
	args: {
		children: null,
	},
};

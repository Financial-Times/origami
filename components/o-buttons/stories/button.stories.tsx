import {withDesign} from 'storybook-addon-designs';
import {Button} from '../src/tsx/button';
import './button.scss';
import withHtml from 'origami-storybook-addon-html';

export default {
	title: 'Components/o-buttons',
	component: Button,
	decorators: [withDesign, withHtml],
	args: {
		iconOnly: false,
	},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=29%3A1131',
		},
		guidelines: {
			notion: '448d914df4fd4bb68fdf5bc5e85c4b46',
		},
		html: {},
	},
};

const Story = args => <Button {...args} />;

export const PrimaryButton = Story.bind({});
PrimaryButton.args = {
	label: 'Press button',
	type: 'primary',
};

export const SecondaryButton = Story.bind({});
SecondaryButton.args = {
	label: 'Press button',
	type: 'secondary',
};

export const BigButton = Story.bind({});
BigButton.args = {
	size: 'big',
	label: 'Press button',
};

export const InverseButton = Story.bind({});
InverseButton.args = {
	label: 'Press button',
	theme: 'inverse',
};
InverseButton.parameters = {
	backgrounds: {
		default: 'slate',
	},
};

export const MonoButton = Story.bind({});
MonoButton.args = {
	label: 'Press button',
	theme: 'mono',
};

export const ButtonWithIcon = Story.bind({});
ButtonWithIcon.args = {
	label: 'Upload',
	icon: 'upload',
};

export const IconOnlyButton = Story.bind({});
IconOnlyButton.args = {
	label: 'Next',
	icon: 'arrow-right',
	iconOnly: true,
};

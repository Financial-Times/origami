import {withDesign} from 'storybook-addon-designs';
import {Button, LinkButton} from '../src/tsx/button';
import './button.scss';
import withHtml from 'origami-storybook-addon-html';

export default {
	title: 'Components/o-buttons',
	component: Button,
	decorators: [withDesign, withHtml],
	args: {
		onClick: {
			table: {
				disable: true
			}
		}
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

const ButtonStory = args => <Button {...args} />;
const LinkButtonStory = args => <LinkButton {...args} />;

export const PrimaryButton = ButtonStory.bind({});
PrimaryButton.args = {
	label: 'Press button',
	type: 'primary',
};

export const SecondaryButton = ButtonStory.bind({});
SecondaryButton.args = {
	label: 'Press button',
	type: 'secondary',
};

export const LinkAsButton = LinkButtonStory.bind({});
LinkAsButton.args = {
	label: 'Link button',
	type: 'secondary',
	href: '#',
};

export const BigButton = ButtonStory.bind({});
BigButton.args = {
	size: 'big',
	label: 'Press button',
};

export const InverseButton = ButtonStory.bind({});
InverseButton.args = {
	label: 'Press button',
	theme: 'inverse',
};
InverseButton.parameters = {
	origamiBackground: 'slate',
};

export const MonoButton = ButtonStory.bind({});
MonoButton.args = {
	label: 'Press button',
	theme: 'mono',
};

export const GhostButton = ButtonStory.bind({});
GhostButton.args = {
	label: 'Press button',
	type: 'ghost',
};

export const ButtonWithIcon = ButtonStory.bind({});
ButtonWithIcon.args = {
	label: 'Upload',
	icon: 'upload',
};

export const IconOnlyButton = ButtonStory.bind({});
IconOnlyButton.args = {
	label: 'Next',
	icon: 'arrow-right',
	iconOnly: true,
};

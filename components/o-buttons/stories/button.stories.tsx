import {withDesign} from 'storybook-addon-designs';
import {Button} from '../src/tsx/button';
import './button.scss';
import withHtml from 'origami-storybook-addon-html';

export default {
	title: 'Button',
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

export const Primary = Story.bind({});
Primary.args = {
	label: 'Press button',
	type: 'primary',
};

export const Secondary = Story.bind({});
Secondary.args = {
	label: 'Press button',
	type: 'secondary',
};

export const Big = Story.bind({});
Big.args = {
	size: 'big',
	label: 'Press button',
};

export const Inverse = Story.bind({});
Inverse.args = {
	label: 'Press button',
	theme: 'inverse',
};
Inverse.parameters = {
	backgrounds: {
		default: 'slate',
	},
};

export const Mono = Story.bind({});
Mono.args = {
	label: 'Press button',
	theme: 'mono',
};

export const Icon = Story.bind({});
Icon.args = {
	label: 'Upload',
	icon: 'upload',
};

export const IconOnly = Story.bind({});
IconOnly.args = {
	label: 'Next',
	icon: 'arrow-right',
	iconOnly: true,
};

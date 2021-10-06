import {withDesign} from 'storybook-addon-designs';

import {Button} from '../src/tsx/button';
import './button.scss';

export default {
	title: 'Button',
	component: Button,
	decorators: [withDesign],
	args: {
		iconOnly: false
	},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=29%3A1131'
		}
	}
};

function Story(args) {
	let elements = [<Button {...args} />];
	if (args.theme == 'inverse') {
		elements.push(
			<style>
				.sb-show-main {'{'}
				background: var(--o-colors-slate)!important;
				{'}'}
			</style>
		);
	}
	return elements;
}

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

export const Mono = Story.bind({});
Mono.args = {
	label: 'Press button',
	theme: 'mono'
}

export const Icon = Story.bind({});
Icon.args = {
	label: 'Upload',
	icon: 'upload'
}


export const IconOnly = Story.bind({});
IconOnly.args = {
	label: 'Next',
	icon: 'arrow-right',
	iconOnly: true
}

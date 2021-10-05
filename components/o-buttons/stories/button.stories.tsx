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

const Story = args => {
	// this overrides what was set in ./button.scss
	let slate = ':root {--background: var(--o-colors-slate)}';
	return [
		<style>{args.theme == 'inverse' ? slate : ''}</style>,
		<Button {...args} />
	];
}

export const Primary = Story.bind({});
Primary.args = { 
	label: 'Press button',
	type: 'primary'
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
	theme: 'inverse'
}

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

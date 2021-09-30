import React from 'react';

import {Button} from '../src/tsx/button';
import "./button.scss";

export default {
	title: 'Button',
	component: Button
};

const Template = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { 
	label: 'Press button',
	type: "primary"
};

export const Secondary = Template.bind({});
Secondary.args = {
	label: "Press button",
	type: 'secondary',
};

export const Big = Template.bind({});
Big.args = {
	size: 'big',
	label: 'Press button',
};

export const Inverse = Template.bind({});
Inverse.args = {
	label: "Press button",
	theme: "inverse"
}

export const Mono = Template.bind({});
Mono.args = {
	label: "Press button",
	theme: "mono"
}

export const Icon = Template.bind({});
Icon.args = {
	label: "Upload",
	icon: "upload"
}


export const IconOnly = Template.bind({});
IconOnly.args = {
	label: "Next",
	icon: "arrow-right",
	iconOnly: true
}

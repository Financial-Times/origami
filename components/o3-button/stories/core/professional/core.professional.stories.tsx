import { Button } from "../../../src/tsx/buttons";
import "../../button.css";

export default {
	title: "Core/Professional/o3-button",
	component: Button,
	args: {
	},
};

const ButtonStory = args => (<div className='o-brand-professional'><Button {...args} /></div>);

export const PrimaryButton = ButtonStory.bind({});
PrimaryButton.args = {
	label: "Press button",
	type: "primary",
};


export const SecondaryButton = ButtonStory.bind({});
SecondaryButton.args = {
	label: "Press button",
	type: "secondary",
};

import { withDesign } from "storybook-addon-designs";
import "./spacing.scss";
import { SpacingDemo } from "./spacing-demo";
import withHtml from "origami-storybook-addon-html";

export default {
	title: "Components/o-spacing",
	component: SpacingDemo,
	decorators: [withDesign, withHtml],
	parameters: {
		guidelines: {},
		html: {},
	},
};

export const Spacing = SpacingDemo.bind({});
Spacing.args = {
	name: "m12",
};

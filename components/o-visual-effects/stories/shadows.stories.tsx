import { withDesign } from "storybook-addon-designs";
import "./visual-effects.scss";
import withHtml from "origami-storybook-addon-html";
import { ShadowDemo } from "./shadows-demo";

export default {
	title: "Components/o-visual-effects",
	component: ShadowDemo,
	decorators: [withDesign, withHtml],
	parameters: {
		guidelines: {},
		html: {},
	},
};

export const Shadows = ShadowDemo.bind({});
Shadows.args = {
	depth: "mid",
};

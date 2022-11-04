import type { ComponentMeta, ComponentStory } from "@storybook/react";
import withHtml from "origami-storybook-addon-html";
import { withDesign } from "storybook-addon-designs";
import { icons } from "../src/tsx/data";
import { Icon } from "../src/tsx/icon";
import "./icons.scss";

export default {
	title: "Components/o-icons",
	component: Icon,
	decorators: [withDesign, withHtml],
	argTypes: {
		icon: {
			control: "select",
			options: icons,
		},
	},
} as ComponentMeta<typeof Icon>;

export const Icons: ComponentStory<typeof Icon> = args => <Icon {...args} />;
Icons.args = { icon: "arrow-down" };

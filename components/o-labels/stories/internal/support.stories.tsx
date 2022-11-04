import withHtml from "origami-storybook-addon-html";
import { withDesign } from "storybook-addon-designs";
import { SupportLabel } from "../../src/tsx/label";
import "../labels.scss";

const ComponentDescription = {
	title: "Components/o-labels",
	component: SupportLabel,
	argTypes: {
		state: { defaultValue: "support-active" },
		size: {
			options: ["small", "default", "big"],
			defaultValue: "default",
		},
		text: {
			name: "text",
			type: { name: "string", required: false },
			control: {
				type: "text",
			},
		},
	},
	decorators: [withDesign, withHtml],
};

export default ComponentDescription;

export const SupportStatusLabel = args => {
	const copy = args.text || args.state.replace("support-", "");
	if (args.size === "default") {
		delete args.size;
	}
	return <SupportLabel {...args}>{copy}</SupportLabel>;
};

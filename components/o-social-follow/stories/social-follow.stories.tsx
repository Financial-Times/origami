import { withDesign } from "storybook-addon-designs";
import { SocialFollow } from "../src/tsx/social-follow";
import "./social-follow.scss";
import withHtml from "origami-storybook-addon-html";

export default {
	title: "Components/o-social-follow",
	component: SocialFollow,
	decorators: [withDesign, withHtml],
	args: {
		icons: ["twitter", "facebook", "linkedin", "youtube", "instagram"],
		standalone: false,
		theme: "",
	},
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/?node-id=2606%3A2409",
		},
		guidelines: {
			notion: "072c8d4797ad47d39142b4396592070a",
		},
		html: {},
	},
};

const Story = args => <SocialFollow {...args} />;

export const SocialFollowContainer = Story.bind({});

export const SocialFollowInverse = Story.bind({});
SocialFollowInverse.args = {
	theme: "inverse",
};
SocialFollowInverse.parameters = {
	origamiBackground: "slate",
};

export const SocialFollowStandAlone = Story.bind({});
SocialFollowStandAlone.args = {
	standalone: true,
};

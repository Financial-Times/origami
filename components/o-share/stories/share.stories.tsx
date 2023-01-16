import { Story, ComponentMeta } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import withHtml from "origami-storybook-addon-html";

import { Share } from "../src/tsx/share";
import { ShareIcon, UrlProps } from "../src/tsx/shareIcon";
import { useEffect, ComponentProps } from "react";
import javascript from "../main";
import "./share.scss";

export default {
	title: "Components/o-share",
	component: Share,
	decorators: [withDesign, withHtml],
	args: {
		title: "US drugs",
		url: "http://on.ft.com/1mUdgA2",
		titleExtra: "FT.com | Pharmaceuticals",
		summary: "US drugs group vows to maintain big British presence",
		relatedTwitterAccounts: "ftcompanies",
		small: false,
		inverse: false,
		vertical: false,
	},
} as ComponentMeta<typeof Share>;

type ShareProps = ComponentProps<typeof Share> & UrlProps;

const StoryTemplate: Story<ShareProps> = args => {
	useEffect(() => void javascript.init(), []);
	const shareProps = {
		small: args.small,
		vertical: args.vertical,
		inverse: args.inverse,
	};
	const shareIconProps = {
		url: args.url,
		title: args.title,
		titleExtra: args.titleExtra,
		summary: args.summary,
		relatedTwitterAccounts: args.relatedTwitterAccounts,
	};
	return (
		<Share {...shareProps}>
			<ShareIcon icon="twitter" urlProps={shareIconProps} />
			<ShareIcon icon="facebook" urlProps={shareIconProps} />
			<ShareIcon icon="linkedin" urlProps={shareIconProps} />
			<ShareIcon icon="whatsapp" urlProps={shareIconProps} />
		</Share>
	);
};

export const Horizontal: Story<ShareProps> = StoryTemplate.bind({});
export const Small: Story<ShareProps> = StoryTemplate.bind({});
Small.args = {
	small: true,
};
export const Inverse: Story<ShareProps> = StoryTemplate.bind({});

Inverse.args = {
	inverse: true,
};
Inverse.parameters = {
	origamiBackground: "slate",
};
export const Vertical: Story<ShareProps> = StoryTemplate.bind({});
Vertical.args = {
	vertical: true,
};

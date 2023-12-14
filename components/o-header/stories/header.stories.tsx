import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useEffect } from "react";
import {
	MainHeader,
	LogoOnly,
	NoOutboundLinksHeader,
	InverseHeader,
} from "../src/tsx/header";
import javascript from "../main";
import "./header.scss";
import storyData from "./storybook-data";
import profileStoryData from "./storybook-data/profile";
import { argTypes } from "./arg-types";
import { Drawer } from "../src/tsx/drawer";
export default {
	title: "Components/o-header",
	component: MainHeader,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		currentPath: "/",
	},
	argTypes,
} as ComponentMeta<typeof MainHeader>;

export const HeaderPrimary: ComponentStory<typeof MainHeader> = args => {
	useEffect(() => void javascript.init(), []);
	return (
		<>
			<MainHeader {...args} />
			<Drawer
				data={args.data}
				userIsLoggedIn={args.userIsLoggedIn}
				userIsSubscribed={args.userIsSubscribed}
			/>
			<p className="demo-sticky-message demo-sticky-message--scroll">
				Scroll down
			</p>
		</>
	);
};
HeaderPrimary.storyName = "Default header with drawer and sticky header";
HeaderPrimary.args = {
	...storyData,
	variant: "simple",
	showSubNavigation: true,
	showMegaNav: true,
	showUserNavigation: true,
	userIsLoggedIn: false,
	userIsSubscribed: false,
	showLogoLink: true,
	showStickyHeader: true,
};
HeaderPrimary.parameters = {
	controls: {
		exclude: ["data", "variant", "userIsAnonymous", "extraHeaderProps"],
	},
};

export const DefaultHeaderWithRightAlignedSubnav: ComponentStory<
	typeof MainHeader
> = args => {
	useEffect(() => void javascript.init(), []);
	return (
		<>
			<MainHeader {...args} />;
			<Drawer
				data={args.data}
				userIsLoggedIn={args.userIsLoggedIn}
				userIsSubscribed={args.userIsSubscribed}
			/>
		</>
	);
};
DefaultHeaderWithRightAlignedSubnav.storyName =
	"Default header with right aligned subnav";
DefaultHeaderWithRightAlignedSubnav.args = {
	...profileStoryData,
	showSubNavigation: true,
	showMegaNav: true,
	showUserNavigation: true,
	userIsLoggedIn: true,
	showLogoLink: false,
};
DefaultHeaderWithRightAlignedSubnav.parameters = {
	controls: {
		exclude: [
			"data",
			"variant",
			"userIsSubscribed",
			"userIsAnonymous",
			"extraHeaderProps",
		],
	},
};

export const LogoOnlyHeader: ComponentStory<typeof LogoOnly> = args => {
	useEffect(() => void javascript.init(), []);
	return <LogoOnly {...args} />;
};
LogoOnlyHeader.args = {
	variant: "simple",
	showLogoLink: false,
};
LogoOnlyHeader.argTypes = {
	variant: {
		control: {
			type: "radio",
			options: { default: "simple", large: "large" },
		},
	},
};
LogoOnlyHeader.parameters = {
	controls: {
		exclude: [
			"data",
			"currentPath",
			"userIsLoggedIn",
			"showSubNavigation",
			"showUserNavigation",
			"showMegaNav",
			"userIsSubscribed",
			"showStickyHeader",
			"userIsAnonymous",
			"extraHeaderProps",
			"data",
		],
	},
};

export const NoOutboundLinks: ComponentStory<
	typeof NoOutboundLinksHeader
> = args => {
	useEffect(() => void javascript.init(), []);
	return <NoOutboundLinksHeader {...args} />;
};

NoOutboundLinks.storyName = "No Outbound links";
NoOutboundLinks.args = {
	...storyData,
	showSubNavigation: true,
	showUserNavigation: true,
	userIsLoggedIn: false,
	showLogoLink: false,
};

NoOutboundLinks.parameters = {
	controls: {
		exclude: [
			"data",
			"currentPath",
			"variant",
			"showMegaNav",
			"userIsSubscribed",
			"showStickyHeader",
			"userIsAnonymous",
			"extraHeaderProps",
			"data",
		],
	},
};

export const InverseSimpleHeader: ComponentStory<
	typeof InverseHeader
> = args => {
	useEffect(() => void javascript.init(), []);
	return <InverseHeader {...args} />;
};
InverseSimpleHeader.storyName = "Simple transparent (inverse) header";
InverseSimpleHeader.args = {
	...storyData,
	showUserNavigation: true,
	userIsLoggedIn: false,
};
InverseSimpleHeader.parameters = {
	origamiBackground: "slate",
	controls: {
		exclude: [
			"data",
			"currentPath",
			"variant",
			"showMegaNav",
			"showSubNavigation",
			"showLogoLink",
			"showStickyHeader",
			"userIsSubscribed",
			"userIsAnonymous",
			"extraHeaderProps",
		],
	},
};

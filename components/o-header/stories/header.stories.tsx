import {StoryObj, Meta} from "@storybook/react"
import {useEffect} from "react"
import {
	MainHeader,
	LogoOnly,
	NoOutboundLinksHeader,
	InverseHeader,
} from "../src/tsx/header"
import javascript from "../main"
import "./header.scss"
import storyData from "./storybook-data"
import profileStoryData from "./storybook-data/profile"
import {argTypes} from "./arg-types"
import {Drawer} from "../src/tsx/drawer"
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
} as Meta<typeof MainHeader>

export const HeaderPrimary: StoryObj<typeof MainHeader> = {
	render: args => {
		useEffect(() => void javascript.init(), [])
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
		)
	},

	name: "Default header with drawer and sticky header",

	args: {
		...storyData,
		variant: "simple",
		showSubNavigation: true,
		showMegaNav: true,
		showUserNavigation: true,
		userIsLoggedIn: false,
		userIsSubscribed: false,
		showLogoLink: true,
		showStickyHeader: true,
	},

	parameters: {
		controls: {
			exclude: ["data", "variant", "userIsAnonymous", "extraHeaderProps"],
		},
	},
}

export const DefaultHeaderWithRightAlignedSubnav: StoryObj<typeof MainHeader> =
	{
		render: args => {
			useEffect(() => void javascript.init(), [])
			return (
				<>
					<MainHeader {...args} />;
					<Drawer
						data={args.data}
						userIsLoggedIn={args.userIsLoggedIn}
						userIsSubscribed={args.userIsSubscribed}
					/>
				</>
			)
		},

		name: "Default header with right aligned subnav",

		args: {
			...profileStoryData,
			showSubNavigation: true,
			showMegaNav: true,
			showUserNavigation: true,
			userIsLoggedIn: true,
			showLogoLink: false,
		},

		parameters: {
			controls: {
				exclude: [
					"data",
					"variant",
					"userIsSubscribed",
					"userIsAnonymous",
					"extraHeaderProps",
				],
			},
		},
	}

export const LogoOnlyHeader: StoryObj<typeof LogoOnly> = {
	render: args => {
		useEffect(() => void javascript.init(), [])
		return <LogoOnly {...args} />
	},

	args: {
		variant: "simple",
		showLogoLink: false,
	},

	argTypes: {
		variant: {
			control: {
				type: "radio",
				options: {default: "simple", large: "large"},
			},
		},
	},

	parameters: {
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
	},
}

export const NoOutboundLinks: StoryObj<typeof NoOutboundLinksHeader> = {
	render: args => {
		useEffect(() => void javascript.init(), [])
		return <NoOutboundLinksHeader {...args} />
	},

	name: "No Outbound links",

	args: {
		...storyData,
		showSubNavigation: true,
		showUserNavigation: true,
		userIsLoggedIn: false,
		showLogoLink: false,
	},

	parameters: {
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
	},
}

export const InverseSimpleHeader: StoryObj<typeof InverseHeader> = {
	render: args => {
		useEffect(() => void javascript.init(), [])
		return <InverseHeader {...args} />
	},

	name: "Simple transparent (inverse) header",

	args: {
		...storyData,
		showUserNavigation: true,
		userIsLoggedIn: false,
	},

	parameters: {
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
	},
}

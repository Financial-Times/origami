import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withDesign } from "storybook-addon-designs";
import withHtml from "origami-storybook-addon-html";

import { Share } from "../src/tsx/share";
import { useEffect, useState } from "react";
import javascript from "../main";
import "./share.scss";

export default {
	title: "Components/o-share",
	component: Share,
	decorators: [withDesign, withHtml],
	args: {
		title: "US drugs",
		socialNetworks: [
			{
				name: "Twitter",
				iconUrl:
					"https://www.ft.com/__origami/service/image/v2/images/raw/ftsocial-v2:twitter?source=origami-build-service&format=svg",
			},
			{
				name: "Facebook",
				iconUrl:
					"https://www.ft.com/__origami/service/image/v2/images/raw/ftsocial-v2:facebook?source=origami-build-service&format=svg",
			},
			{
				name: "LinkedIn",
				iconUrl:
					"https://www.ft.com/__origami/service/image/v2/images/raw/ftsocial-v2:linkedin?source=origami-build-service&format=svg",
			},
			{
				name: "Whatsapp",
				iconUrl:
					"https://www.ft.com/__origami/service/image/v2/images/raw/ftsocial-v2:whatsapp?source=origami-build-service&format=svg",
			},
			{
				name: "Pinterest",
				iconUrl:
					"https://www.ft.com/__origami/service/image/v2/images/raw/ftsocial-v2:pinterest?source=origami-build-service&format=svg",
			},
			{
				name: "Share",
				showLabel: true,
				customAction: '#',
				iconUrl:
					"https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1:share?source=origami-build-service&format=svg",
			},
		],
		url: "http://on.ft.com/1mUdgA2",
		titleExtra: "FT.com | Pharmaceuticals",
		summary: "US drugs group vows to maintain big British presence",
		relatedTwitterAccounts: "ftcompanies",
		small: false,
		inverse: false,
		vertical: false,
	},
} as ComponentMeta<typeof Share>;

function extractPathValues(svg: string): string[] {
	// Create a new DOMParser to parse the SVG string
	const parser = new DOMParser();
	const svgDoc = parser.parseFromString(svg, "image/svg+xml");

	const pathElements = svgDoc.getElementsByTagName("path");
	return Array.from(pathElements).map(pathElement =>
		pathElement.getAttribute("d")
	);
}

async function fetchSvgCode(iconUrl: string) {
	const response = await fetch(iconUrl);
	const data = await response.text();
	return extractPathValues(data);
}

const Story: ComponentStory<typeof Share> = args => {
	const [socialNetworks, setSocialNetworks] = useState([]);
	useEffect(() => {
		async function extractSvgPaths() {
			const response = await Promise.all(
				args.socialNetworks.map(async ({ name, iconUrl, showLabel }) => {
					const paths = await fetchSvgCode(iconUrl);
					return { name, svgPaths: paths, showLabel };
				})
			);
			setSocialNetworks(response);
		}
		extractSvgPaths();
		void javascript.init();
	}, []);
	return <Share {...args} socialNetworks={socialNetworks} />;
};

export const Horizontal: ComponentStory<typeof Share> = Story.bind({});
export const Small: ComponentStory<typeof Share> = Story.bind({});
Small.args = {
	small: true,
};
export const Inverse: ComponentStory<typeof Share> = Story.bind({});

Inverse.args = {
	inverse: true,
};
Inverse.parameters = {
	origamiBackground: "slate",
};
export const Vertical: ComponentStory<typeof Share> = Story.bind({});
Vertical.args = {
	vertical: true,
};

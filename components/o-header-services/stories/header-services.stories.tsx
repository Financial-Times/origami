import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HeaderServices } from "../src/tsx/header-services";
import "./header-services.scss";
import {
	DummyText,
	primaryNavData,
	secondaryNavData,
	relatedContent,
} from "./fixtures";
import js from "../main";
import { useEffect } from "react";

const Brand = process.env.ORIGAMI_STORYBOOK_BRAND;
const ThemeMapping = {
	B2B: "b2b",
	B2C: "b2c",
	Default: undefined,
};

const DummyTextDecorator = Story => (
	<>
		<Story />
		{DummyText}
	</>
);
export default {
	title: "Components/o-header-services",
	component: HeaderServices,
	decorators: [DummyTextDecorator],
	parameters: {
		layout: "fullscreen",
	},
	args: {
		bleeedHeader: false,
		relatedContentAlwaysVisible: false
	},
	argTypes: {
		theme: {
			table: {
				disable: Brand !== "core" && true,
			},
			options: Object.keys(ThemeMapping),
			mapping: ThemeMapping,
			control: "select",
		},
	},
} as ComponentMeta<typeof HeaderServices>;

const HeaderServicesStory = args => {
	useEffect(() => void js.init(document.body), []);
	return <HeaderServices {...args} />;
};

export const HeaderWithPrimaryAndSecondaryNavigation: ComponentStory<
	typeof HeaderServices
> = HeaderServicesStory.bind({});

HeaderWithPrimaryAndSecondaryNavigation.args = {
	title: "Financial Times",
	tagline: "The world’s leading global business publication",
	titleUrl: "https://www.ft.com",
	relatedContent,
	primaryNavData,
	secondaryNavData,
};

export const HeaderWithTitleSection: ComponentStory<typeof HeaderServices> =
	HeaderServicesStory.bind({});

HeaderWithTitleSection.args = {
	title: "Financial Times",
	tagline: "The world’s leading global business publication",
	titleUrl: "https://www.ft.com",
	relatedContent,
};

HeaderWithTitleSection.argTypes = {
	primaryNavData: {
		table: {
			disable: true,
		},
	},
	secondaryNavData: {
		table: {
			disable: true,
		},
	},
};

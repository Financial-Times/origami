import withHtml from "origami-storybook-addon-html";
import { withDesign } from "storybook-addon-designs";
import { ComponentMeta, Story } from "@storybook/react";
import { DefaultLayout as Layout, DocsLayout } from "../src/tsx/layout";
import "./layout.scss";
import javascript from "../main.js";

import { HeaderWithTitleSection } from "@financial-times/o-header-services/stories/header-services.stories";
import Table from "@financial-times/o-table/main";
import SyntaxHighlight from "@financial-times/o-syntax-highlight/main";
import Tabs from "@financial-times/o-tabs/main";
import Forms from "@financial-times/o-forms/main";
import { useEffect, ComponentProps } from "react";
import { DemoFooter, DemoMainContent } from "./fixtures";

export type AdditionalSbProps = {
	headerControls: { title: string };
}

type LayoutStoryProps = ComponentProps<typeof Layout> & AdditionalSbProps
type DocsLayoutStoryProps = ComponentProps<typeof DocsLayout> & AdditionalSbProps

export default {
	title: "Components/o-layout",
	component: Layout,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {
		headerControls: HeaderWithTitleSection.args,
	},
} as ComponentMeta<typeof Layout>;



export const DefaultLayout: Story<LayoutStoryProps> = args => {
	useEffect(() => {
		Table.init();
		SyntaxHighlight.init();
		Tabs.init();
		Forms.init();
		javascript.init();
	});
	args.header = <HeaderWithTitleSection {...args.headerControls} />;
	return <Layout {...args} />;
};

DefaultLayout.args = {
	mainContent: <DemoMainContent />,
	footer: <DemoFooter />,
	bleed: false
};

export const LayoutWithCustomSidebar: Story<DocsLayoutStoryProps> = args => {
	useEffect(() => {
		Table.init();
		SyntaxHighlight.init();
		Tabs.init();
		Forms.init();
		javascript.init();
	});
	args.header = <HeaderWithTitleSection {...args.headerControls} />;
	return <Layout {...args} />;
};
LayoutWithCustomSidebar.args = {
	mainContent: <DemoMainContent />,
	footer: <DemoFooter />,
	sidebar: {
		customNavHeadingSelector: "#asides",
		customNavigation: (
			<nav className="o-layout__navigation">
				<ol>
					<li>
						<a href="#this-is-a-title">This is a title</a>
					</li>
				</ol>
			</nav>
		),
	},
};

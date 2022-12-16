import withHtml from "origami-storybook-addon-html";
import { withDesign } from "storybook-addon-designs";
import { ComponentMeta, Story } from "@storybook/react";
import { useEffect, ComponentProps } from "react";

import { HeaderWithTitleSection } from "@financial-times/o-header-services/stories/header-services.stories";
import Table from "@financial-times/o-table/main";
import SyntaxHighlight from "@financial-times/o-syntax-highlight/main";
import Tabs from "@financial-times/o-tabs/main";
import Forms from "@financial-times/o-forms/main";

import { DefaultLayout as Layout, DocsLayout } from "../src/tsx/layout";
import javascript from "../main.js";
import "./layout.scss";
import { DemoFooter, DemoMainContent } from "./fixtures";

export type AdditionalSbProps = {
	headerControls: { title: string };
};

type LayoutStoryProps = ComponentProps<typeof Layout> & AdditionalSbProps;
type DocsLayoutStoryProps = ComponentProps<typeof DocsLayout> &
	AdditionalSbProps;

export default {
	title: "Components/o-layout",
	component: Layout,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {
		headerControls: HeaderWithTitleSection.args,
		mainContent: <DemoMainContent />,
		footer: <DemoFooter />,
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
	bleed: false,
};

export const DocumentationLayout: Story<DocsLayoutStoryProps> = args => {
	useEffect(() => {
		Table.init();
		SyntaxHighlight.init();
		Tabs.init();
		Forms.init();
		javascript.init();
	});
	args.header = <HeaderWithTitleSection {...args.headerControls} />;
	return (
		<DocsLayout {...args}>
			{/* Passing children to Docs layout will render custom sidebar instead of the default one. Custom sidebar can be an <ol> or a <ul> */}
			{/* Uncommenting code bellow will result in custom Navigation */}
			{/* <ol>
				<li>
					<a href="#this-is-a-title">This is a title</a>
				</li>
			</ol> */}
		</DocsLayout>
	);
};
DocumentationLayout.args = {
	sidebar: true,
	customNavHeadingSelector: "",
};

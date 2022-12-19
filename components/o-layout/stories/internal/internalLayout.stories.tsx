import withHtml from "origami-storybook-addon-html";
import { withDesign } from "storybook-addon-designs";
import { ComponentMeta, Story } from "@storybook/react";
import {
	DefaultLayout as Layout,
	LandingLayout,
	QueryLayout,
} from "../../src/tsx/layout";
import { HeaderWithTitleSection } from "@financial-times/o-header-services/stories/header-services.stories";
import { OverviewSections, ArticleList } from "../../src/tsx/landingPartials";
import "../layout.scss";
import javascript from "../../main.js";
import Table from "@financial-times/o-table/main";
import SyntaxHighlight from "@financial-times/o-syntax-highlight/main";
import Tabs from "@financial-times/o-tabs/main";
import Forms from "@financial-times/o-forms/main";
import { useEffect, ComponentProps } from "react";
import {
	DemoFooter,
	overviewActionElements,
	overviewElements,
	articleList,
	DemoHero,
	QueryLayout as QueryLayoutData,
} from "./fixtures";
import { AdditionalSbProps } from "../layout.stories";

type LandingStoryProps = ComponentProps<typeof LandingLayout> &
	AdditionalSbProps;
type QueryStoryProps = ComponentProps<typeof QueryLayout> & AdditionalSbProps;

export default {
	title: "Components/o-layout",
	component: Layout,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {
		headerControls: HeaderWithTitleSection.args,
	},
} as ComponentMeta<typeof Layout>;

const LandingLayoutStory: Story<LandingStoryProps> = args => {
	useEffect(() => {
		Table.init();
		SyntaxHighlight.init();
		Tabs.init();
		Forms.init();
		javascript.init();
	});
	args.header = <HeaderWithTitleSection {...args.headerControls} />;
	return <LandingLayout {...args} />;
};

export const LandingLayoutWithHero: Story<LandingStoryProps> =
	LandingLayoutStory.bind({});
LandingLayoutWithHero.args = {
	mainContent: (
		<div data-o-component="o-syntax-highlight">
			<h2>Some Information</h2>
			<OverviewSections sections={overviewElements} consistentColumns={true} />
			<h2>Some Choices To Make</h2>

			<OverviewSections
				sections={overviewActionElements}
				hasAction={true}
				consistentColumns={true}
			/>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum quam
				iure quas velit animi sunt aliquid quos esse ea, dolor eaque non
				repellendus commodi id inventore quae, dicta ducimus? Similique.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sapiente.
			</p>
		</div>
	),
	footer: <DemoFooter />,
	hero: {
		muted: false,
		heroContent: DemoHero,
	},
};

export const LandingLayoutWithArticleList: Story<LandingStoryProps> =
	LandingLayoutStory.bind({});

LandingLayoutWithArticleList.args = {
	displayArticleList: true,
	mainContent: (
		<div data-o-component="o-syntax-highlight">
			<ArticleList articles={articleList} />
		</div>
	),
	footer: <DemoFooter />,
	hero: {
		muted: true,
		heroContent: (
			<>
				<h1>An Example Landing Page</h1>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			</>
		),
	},
};

export const QueryLayoutDemo: Story<QueryStoryProps> = args => {
	useEffect(() => {
		Table.init();
		SyntaxHighlight.init();
		Tabs.init();
		Forms.init();
		let layouts = javascript.init();
		return function cleanup() {
			layouts = Array.isArray(layouts) ? layouts : [layouts];
			layouts.forEach(layout => layout.destroy());
		};
	}, [args.constructNav]);
	args.header = <HeaderWithTitleSection {...args.headerControls} />;
	return <QueryLayout {...args} />;
};

QueryLayoutDemo.storyName = "Query Layout";
QueryLayoutDemo.args = {
	...QueryLayoutData,
	constructNav: false, // toggling this on and off will not cause the constructed nav to dismount from dom.
	footer: <DemoFooter />,
};

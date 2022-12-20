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
	overviewActionElements,
	overviewElements,
	articleList,
	DemoHero,
	QueryLayout as QueryLayoutData,
} from "./fixtures";
import { AdditionalSbProps, defaultControlsToProps } from "../layout.stories";

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
		mainControls: "",
		footerControls: "", // TODO: replace this with footer story args once we have footer tsx template
	},
} as ComponentMeta<typeof Layout>;

function convertControlsToProps(args, displayArticleListDemo) {
	console.log({displayArticleListDemo})
	const ArticleListDemo = () => (
		<div>
			<ArticleList articles={articleList} />
		</div>
	);
	const OverviewSectionsDemo = () => (
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
	);
	args = defaultControlsToProps(args);
	args.mainContent = args.mainControls ? (
		<>{args.mainControls}</>
	) : displayArticleListDemo ? (
		<ArticleListDemo />
	) : (
		<OverviewSectionsDemo />
	);
	const heroDemo = args.heroControls ? (
		args.heroControls
	) : args.heroMuted ? (
		<>
			<h1>An Example Landing Page</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
		</>
	) : (
		DemoHero
	);
	args.hero = {
		muted: args.heroMuted,
		children: heroDemo,
	};
	args.styleMainContent = displayArticleListDemo && false
	return args;
}

const LandingLayoutStory: Story<LandingStoryProps> = args => {
	useEffect(() => {
		Table.init();
		SyntaxHighlight.init();
		Tabs.init();
		Forms.init();
		javascript.init();
	});
	args = convertControlsToProps(args, args.displayArticleListDemo);
	return <LandingLayout {...args} />;
};

export const LandingLayoutWithHero: Story<LandingStoryProps> =
	LandingLayoutStory.bind({});
LandingLayoutWithHero.args = {
	heroMuted: false,
	heroControls: ''
};

export const LandingLayoutWithArticleList: Story<LandingStoryProps> =
	LandingLayoutStory.bind({});

LandingLayoutWithArticleList.args = {
	displayArticleListDemo: true,
	heroMuted: true,
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
	args = defaultControlsToProps(args);
	return <QueryLayout {...args} />;
};

QueryLayoutDemo.storyName = "Query Layout";
QueryLayoutDemo.args = {
	...QueryLayoutData,
	constructNav: false,
};

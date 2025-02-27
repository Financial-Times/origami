import {ComponentMeta, Story} from '@storybook/react';
import {
	DefaultLayout as Layout,
	LandingLayout,
	QueryLayout,
} from '../../src/tsx/layout';
import {HeaderWithTitleSection} from '@financial-times/o-header-services/stories/header-services.stories';
import {OverviewSections, ArticleList} from '../../src/tsx/landingPartials';
import '../layout.scss';
import javascript from '../../main.js';
import Table from '@financial-times/o-table/main';
import SyntaxHighlight from '@financial-times/o-syntax-highlight/main';
import Tabs from '@financial-times/o-tabs/main';
import Forms from '@financial-times/o-forms/main';
import {useEffect, ComponentProps} from 'react';
import {
	overviewActionElements,
	overviewElements,
	articleList,
	DemoHero,
	QueryLayout as QueryLayoutData,
} from './fixtures';
import {DemoFooter} from '../fixtures';
import {AdditionalSbProps, defaultControlsToProps} from '../layout.stories';

type LandingStoryProps = ComponentProps<typeof LandingLayout> &
	AdditionalSbProps;
type QueryStoryProps = ComponentProps<typeof QueryLayout> & AdditionalSbProps;

export default {
	title: 'Maintained/o-layout',
	component: Layout,
	parameters: {},
	args: {
		footer: <DemoFooter />,
		headerControls: HeaderWithTitleSection.args,
	},
	argTypes: {
		mainContent: {control: {disable: true}},
		footer: {control: {disable: true}},
		header: {control: {disable: true}},
		bleed: {control: {disable: true}},
		queryHeading: {control: {disable: true}},
		querySideBar: {control: {disable: true}},
		asideSideBar: {control: {disable: true}},
	},
} as ComponentMeta<typeof Layout>;

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
			consistentColumns={true}
		/>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum quam iure
			quas velit animi sunt aliquid quos esse ea, dolor eaque non repellendus
			commodi id inventore quae, dicta ducimus? Similique.
		</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, sapiente.
		</p>
	</div>
);

const LandingLayoutStory: Story<LandingStoryProps> = args => {
	useEffect(() => {
		Table.init();
		SyntaxHighlight.init();
		Tabs.init();
		Forms.init();
		javascript.init();
	});
	args = defaultControlsToProps(args);
	return <LandingLayout {...args} />;
};

export const LandingLayoutWithHero: Story<LandingStoryProps> =
	LandingLayoutStory.bind({});
LandingLayoutWithHero.args = {
	mainContent: <OverviewSectionsDemo />,
	hero: {
		muted: false,
		children: DemoHero,
	},
};

LandingLayoutWithHero.parameters = {
	controls: {
		include: ['headerControls'],
	},
	layout: 'fullscreen',
};

export const LandingLayoutWithArticleList: Story<LandingStoryProps> =
	LandingLayoutStory.bind({});

LandingLayoutWithArticleList.args = {
	addTypographyStyling: false,
	mainContent: <ArticleListDemo />,
	hero: {
		muted: true,
		children: (
			<>
				<h1>An Example Landing Page</h1>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			</>
		),
	},
};

LandingLayoutWithArticleList.parameters = {
	controls: {
		include: ['headerControls'],
	},
	layout: 'fullscreen',
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

QueryLayoutDemo.storyName = 'Query Layout';
QueryLayoutDemo.args = {
	...QueryLayoutData,
	constructNav: false,
};

QueryLayoutDemo.parameters = {
	controls: {
		include: ['headerControls', 'constructNav'],
	},
};

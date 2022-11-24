import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Layout, QueryLayout} from '../../src/tsx/layout';
import {OverviewSections, ArticleList} from '../../src/tsx/landingPartials';
import '../layout.scss';
import javascript from '../../main.js';
import Table from '@financial-times/o-table/main';
import SyntaxHighlight from '@financial-times/o-syntax-highlight/main';
import Tabs from '@financial-times/o-tabs/main';
import HeaderServices from '@financial-times/o-header-services/main';
import Forms from '@financial-times/o-forms/main';
import {useEffect} from 'react';
import {
	DemoHeader,
	DemoFooter,
	overviewActionElements,
	overviewElements,
	articleList,
	DemoHero,
	QueryLayout as QueryLayoutData,
} from './fixtures';

export default {
	title: 'Components/o-layout',
	component: Layout,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
	argTypes: {
		layoutType: {
			options: ['default', 'bleed', 'docs', 'landing', 'query'],
		},
	},
};

const LayoutStory = args => {
	useEffect(() => {
		Table.init();
		SyntaxHighlight.init();
		Tabs.init();
		HeaderServices.init();
		Forms.init();
		javascript.init();
	});
	return <Layout {...args} />;
};

export const LandingLayoutWithHero: ComponentStory<typeof Layout> =
	LayoutStory.bind({});
LandingLayoutWithHero.args = {
	layoutType: 'landing',
	header: <DemoHeader />,
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

LandingLayoutWithHero.argTypes = {
	overviewSections: {
		control: false,
	},
	displayArticleList: {
		control: false,
	},
	sidebar: {
		control: false,
	},
};

export const LandingLayoutWithArticleList: ComponentStory<typeof Layout> =
	LayoutStory.bind({});

LandingLayoutWithArticleList.args = {
	layoutType: 'landing',
	displayArticleList: true,
	header: <DemoHeader />,
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

LandingLayoutWithArticleList.argTypes = {
	overviewSections: {
		table: {disable: true},
	},
	sidebar: {
		table: {disable: true},
	},
};

export const QueryLayoutDemo = args => {
	useEffect(() => {
		Table.init();
		SyntaxHighlight.init();
		Tabs.init();
		HeaderServices.init();
		Forms.init();
		javascript.init();
	});

	return <QueryLayout {...args} />;
};

QueryLayoutDemo.storyName = 'Query Layout';
QueryLayoutDemo.args = {
	...QueryLayoutData,
	footer: <DemoFooter />,
};

QueryLayoutDemo.argTypes = {
	layoutType: {
		table: {
			disable: true,
		},
	},
	overviewSections: {
		table: {
			disable: true,
		},
	},
	hero: {
		table: {
			disable: true,
		},
	},
	sidebar: {
		table: {
			disable: true,
		},
	},
	displayArticleList: {
		table: {
			disable: true,
		},
	},
};

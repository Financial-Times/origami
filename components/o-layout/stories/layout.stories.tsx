import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Layout} from '../src/tsx/layout';
import './layout.scss';
import javascript from '../main.js';
import Table from '@financial-times/o-table/main';
import SyntaxHighlight from '@financial-times/o-syntax-highlight/main';
import Tabs from '@financial-times/o-tabs/main';
import HeaderServices from '@financial-times/o-header-services/main';
import Forms from '@financial-times/o-forms/main';
import {useEffect} from 'react';
import {DemoHeader, DemoFooter, DemoMainContent} from './fixtures';

const brand = process.env.ORIGAMI_STORYBOOK_BRAND || 'core';

export default {
	title: 'Components/o-layout',
	component: Layout,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
	argTypes: {
		layoutType: {
			options:
				brand === 'core'
					? ['default', 'bleed', 'docs']
					: ['default', 'bleed', 'docs', 'landing', 'query'],
		},
	},
} as ComponentMeta<typeof Layout>;

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
export const DefaultLayout: ComponentStory<typeof Layout> = LayoutStory.bind(
	{}
);

DefaultLayout.args = {
	layoutType: 'default',
	header: <DemoHeader />,
	mainContent: <DemoMainContent />,
	footer: <DemoFooter />,
};

export const LayoutWithCustomSidebar: ComponentStory<typeof Layout> =
	LayoutStory.bind({});
LayoutWithCustomSidebar.args = {
	layoutType: 'docs',
	header: <DemoHeader />,
	mainContent: <DemoMainContent />,
	footer: <DemoFooter />,
	sidebar: {
		customNavHeadingSelector: '#asides',
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

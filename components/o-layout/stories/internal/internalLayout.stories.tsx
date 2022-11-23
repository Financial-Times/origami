import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Layout, OverviewSections} from '../../src/tsx/layout';
import '../layout.scss';
import javascript from '../../main.js';
import {useEffect} from 'react';
import {
	DemoHeader,
	DemoFooter,
	overviewActionElements,
	overviewElements,
	DemoHero,
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
} as ComponentMeta<typeof Layout>;

const LayoutStory = args => {
	useEffect(() => {
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

			<OverviewSections sections={overviewActionElements} hasAction={true} consistentColumns={true} />
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
		heroContent: <DemoHero />,
	},
};

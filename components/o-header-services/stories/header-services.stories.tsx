import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {HeaderServices} from '../src/tsx/header-services';
import './header-services.scss';

export default {
	title: 'Components/o-header-services',
	component: HeaderServices,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
} as ComponentMeta<typeof HeaderServices>;

const HeaderServicesStory = args => <HeaderServices {...args} />;
export const HeaderWithTitleSection: ComponentStory<typeof HeaderServices> =
	HeaderServicesStory.bind({});

HeaderWithTitleSection.args = {
	title: 'Financial Times',
	tagline: 'The world’s leading global business publication',
	titleUrl: 'https://www.ft.com',
	relatedContent: [<a href="/xxx">XXXX</a>, <a href="/login}">Sign in</a>],
};

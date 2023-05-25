import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {TopBanner} from '../src/tsx/top-banner';
import './top-banner.scss';

export default {
	title: 'Components/o-top-banner',
	component: TopBanner,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
} as ComponentMeta<typeof TopBanner>;

const TopBannerStory = args => <TopBanner {...args} />;
export const DefaultTopBanner: ComponentStory<typeof TopBanner> = TopBannerStory.bind(
	{}
);

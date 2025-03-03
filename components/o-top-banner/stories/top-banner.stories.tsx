import {ComponentStory, ComponentMeta} from '@storybook/react';
import {TopBanner} from '../src/tsx/top-banner';
import './top-banner.scss';

export default {
	title: 'Maintained/o-top-banner',
	component: TopBanner,
	parameters: {},
	args: {},
} as ComponentMeta<typeof TopBanner>;

const TopBannerStory = args => <TopBanner {...args} />;

export const NewWorldTopBanner: ComponentStory<typeof TopBanner> =
	TopBannerStory.bind({});
NewWorldTopBanner.args = {
	heading: 'Make sense of it all.',
	content: 'Become an FT subscriber. Pay annually and save 20%',
	primaryAction: {
		copy: 'Subscribe now',
		url: '#',
	},
	theme: 'new-world',
};

export const InverseProfessionalTopBanner: ComponentStory<typeof TopBanner> =
	TopBannerStory.bind({});
InverseProfessionalTopBanner.args = {
	heading: 'You can now access Workspace',
	content: 'Only available with your FT Professional subscription',
	primaryAction: {
		copy: 'Visit Workspace',
		url: '#',
	},
	theme: 'professional-inverse',
};

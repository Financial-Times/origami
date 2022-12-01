import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {HeaderServices} from '../src/tsx/header-services';
import './header-services.scss';
import {
	DummyText,
	primaryNavData,
	secondaryNavData,
	relatedContent,
} from './fixtures';
import js from '../main';
import {useEffect} from 'react';

const Brand = process.env.ORIGAMI_STORYBOOK_BRAND;

export default {
	title: 'Components/o-header-services',
	component: HeaderServices,
	decorators: [withDesign, withHtml],
	parameters: {
		layout: 'fullscreen'
	},
	args: {
		bleeedHeader: false,
	},
	argTypes: {
		modifier: {
			table: {
				disable: Brand !== 'core' && true,
			},
			control: {
				type: 'select',
				labels: {
					b2b: 'B2B',
					b2c: 'B2C',
					default: 'Default',
				},
			},
		},
	},
} as ComponentMeta<typeof HeaderServices>;

const HeaderServicesStory = args => {
	useEffect(() => void js.init(document.body), []);
	return (
		<>
			<HeaderServices {...args} />
			{DummyText}
		</>
	);
};


export const HeaderWithPrimaryAndSecondaryNavigation: ComponentStory<
	typeof HeaderServices
> = HeaderServicesStory.bind({});

HeaderWithPrimaryAndSecondaryNavigation.args = {
	title: 'Financial Times',
	tagline: 'The world’s leading global business publication',
	titleUrl: 'https://www.ft.com',
	relatedContent,
	primaryNav: true,
	primaryNavData,
	secondaryNav: true,
	secondaryNavData,
};

export const HeaderWithTitleSection: ComponentStory<typeof HeaderServices> =
	HeaderServicesStory.bind({});

HeaderWithTitleSection.args = {
	title: 'Financial Times',
	tagline: 'The world’s leading global business publication',
	titleUrl: 'https://www.ft.com',
	relatedContent,
};

HeaderWithTitleSection.argTypes = {
	primaryNavData: {
		table: {
			disable: true
		}
	},
	secondaryNavData: {
		table: {
			disable: true
		}
	},
	primaryNav: {
		table: {
			disable: true
		}
	},
	secondaryNav: {
		table: {
			disable: true
		}
	},
}

// export const HeaderWithPrimaryNavigation: ComponentStory<
// 	typeof HeaderServices
// > = HeaderServicesStory.bind({});

// HeaderWithPrimaryNavigation.args = {
// 	title: 'Financial Times',
// 	tagline: 'The world’s leading global business publication',
// 	titleUrl: 'https://www.ft.com',
// 	relatedContent,
// 	primaryNav: true,
// 	primaryNavData,
// };


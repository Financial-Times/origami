import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {DefaultHeader} from '../src/tsx/header';
import javascript from '../main';
import './header.scss';
import storyData from './storybook-data';
import profileStoryData from './storybook-data/profile';
import {argTypes} from './arg-types';

export default {
	title: 'Components/o-header',
	component: DefaultHeader,
	args: {
		currentPath: '/',
	},
	argTypes,
	decorators: [withDesign, withHtml],
} as ComponentMeta<typeof DefaultHeader>;

export const HeaderPrimary: ComponentStory<typeof DefaultHeader> = args => {
	useEffect(() => void javascript.init(), []);
	return (
		<>
			<DefaultHeader {...args} />
			<p className="demo-sticky-message demo-sticky-message--scroll">
				Scroll down
			</p>
		</>
	);
};
HeaderPrimary.storyName = 'Default header with drawer and sticky header';
HeaderPrimary.args = {
	...storyData,
	variant: 'simple',
	showSubNavigation: true,
	showMegaNav: true,
	showUserNavigation: true,
	userIsLoggedIn: false,
	userIsSubscribed: false,
	showLogoLink: true,
	showStickyHeader: true,
};

export const DefaultHeaderWithRightAlignedSubnav: ComponentStory<
	typeof DefaultHeader
> = args => {
	useEffect(() => void javascript.init(), []);
	return (
		<>
			<DefaultHeader {...profileStoryData} {...args} />
		</>
	);
};
DefaultHeaderWithRightAlignedSubnav.storyName =
	'Default header with right aligned subnav';
DefaultHeaderWithRightAlignedSubnav.args = {
	showSubNavigation: true,
	showMegaNav: true,
	showUserNavigation: true,
	userIsLoggedIn: true,
	showLogoLink: false,
};

// export const HeaderWithSubnavAndRightAlignedItems: ComponentStory<
// 	typeof OHeader
// > = Story.bind({});
// HeaderWithSubnavAndRightAlignedItems.args = {
// 	...subNavRightAlignData,
// 	type: 'subnav',
// };

// export const LogoOnlyHeader: ComponentStory<typeof MainHeader> = Story.bind({});
// LogoOnlyHeader.args = {
// 	type: 'logo-only',
// };

// export const SimpleHeader: ComponentStory<typeof MainHeader> = Story.bind({});
// SimpleHeader.args = {
// 	...headerData,
// 	type: 'simple',
// };

// inverse demo

// subBrand demo

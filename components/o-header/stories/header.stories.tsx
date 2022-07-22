import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {DefaultHeader} from '../src/tsx/header';
import javascript from '../main';
import './header.scss';
import storyData from './storybook-data';
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

// const Story: ComponentStory<typeof MainHeader> = args => {
// 	useEffect(() => void javascript.init(), []);
// 	return <OHeader {...args} />;
// };

export const HeaderPrimary: ComponentStory<typeof DefaultHeader> = args => {
	useEffect(() => void javascript.init(), []);
	return <DefaultHeader {...args} />;
};
HeaderPrimary.storyName = 'Default header with drawer';
HeaderPrimary.args = {
	...storyData,
	variant: 'simple',
	showSubNavigation: true,
	showMegaNav: true,
	showUserNavigation: true,
	userIsLoggedIn: false,
	userIsSubscribed: false,
	showLogoLink: true,
};

// export const MegaMenu: ComponentStory<typeof MainHeader> = Story.bind({});
// MegaMenu.args = {...megaMenuData, type: 'megamenu'};

// export const HeaderWithSubnav: ComponentStory<typeof MainHeader> = Story.bind({});
// HeaderWithSubnav.args = {...subnavData, type: 'subnav'};

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

import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {
	DefaultHeader,
	LogoOnly,
	NoOutboundLinksHeader,
	InverseHeader,
} from '../src/tsx/header';
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
HeaderPrimary.parameters = {
	controls: {
		exclude: ['data', 'variant', 'userIsAnonymous', 'extraHeaderProps', 'showSubbrand'],
	},
};

export const DefaultHeaderWithRightAlignedSubnav: ComponentStory<
	typeof DefaultHeader
> = args => {
	useEffect(() => void javascript.init(), []);
	return <DefaultHeader {...args} />;
};
DefaultHeaderWithRightAlignedSubnav.storyName =
	'Default header with right aligned subnav';
DefaultHeaderWithRightAlignedSubnav.args = {
	...profileStoryData,
	showSubNavigation: true,
	showMegaNav: true,
	showUserNavigation: true,
	userIsLoggedIn: true,
	showLogoLink: false,
};
DefaultHeaderWithRightAlignedSubnav.parameters = {
	controls: {
		exclude: [
			'data',
			'variant',
			'userIsSubscribed',
			'userIsAnonymous',
			'extraHeaderProps',
			'showSubbrand',
		],
	},
};

export const LogoOnlyHeader: ComponentStory<typeof LogoOnly> = args => {
	useEffect(() => void javascript.init(), []);
	return <LogoOnly {...args} />;
};
LogoOnlyHeader.args = {
	variant: 'simple',
	showLogoLink: false,
};
LogoOnlyHeader.argTypes = {
	variant: {
		control: {
			type: 'radio',
			options: {default: 'simple', large: 'large'},
		},
	},
};
LogoOnlyHeader.parameters = {
	controls: {
		exclude: [
			'data',
			'currentPath',
			'userIsLoggedIn',
			'showSubNavigation',
			'showUserNavigation',
			'showMegaNav',
			'userIsSubscribed',
			'showStickyHeader',
			'userIsAnonymous',
			'extraHeaderProps',
			'data',
			'showSubbrand',
		],
	},
};

export const NoOutboundLinks: ComponentStory<
	typeof NoOutboundLinksHeader
> = args => {
	useEffect(() => void javascript.init(), []);
	return <NoOutboundLinksHeader {...args} />;
};

NoOutboundLinks.storyName = 'No Outbound links';
NoOutboundLinks.args = {
	...storyData,
	showSubNavigation: true,
	showUserNavigation: true,
	userIsLoggedIn: false,
	showLogoLink: false,
};

NoOutboundLinks.parameters = {
	controls: {
		exclude: [
			'data',
			'currentPath',
			'variant',
			'showMegaNav',
			'userIsSubscribed',
			'showStickyHeader',
			'userIsAnonymous',
			'extraHeaderProps',
			'data',
			'showSubbrand',
		],
	},
};

export const InverseSimpleHeader: ComponentStory<
	typeof InverseHeader
> = args => {
	useEffect(() => void javascript.init(), []);
	return <InverseHeader {...args} />;
};
InverseSimpleHeader.storyName = 'Simple transparent (inverse) header';
InverseSimpleHeader.args = {
	...storyData,
	showUserNavigation: true,
	userIsLoggedIn: false,
};
InverseSimpleHeader.parameters = {
	origamiBackground: 'slate',
	controls: {
		exclude: [
			'data',
			'currentPath',
			'variant',
			'showMegaNav',
			'showSubNavigation',
			'showLogoLink',
			'showStickyHeader',
			'userIsSubscribed',
			'userIsAnonymous',
			'extraHeaderProps',
			'showSubbrand',
		],
	},
};


export const SubbrandedHeader: ComponentStory<
	typeof InverseHeader
> = args => {
	useEffect(() => void javascript.init(), []);
	return <DefaultHeader {...args} />;
};
SubbrandedHeader.args = {
	...storyData,
	showSubbrand: true,
	showSubNavigation: true,
	showUserNavigation: true,
	userIsLoggedIn: false,
	showLogoLink: false,
};
SubbrandedHeader.parameters = {
	controls: {
		exclude: [
			'data',
			'currentPath',
			'variant',
			'showSubNavigation',
			'showMegaNav',
			'userIsSubscribed',
			'showStickyHeader',
			'userIsAnonymous',
			'extraHeaderProps',
		],
	},
};

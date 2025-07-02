import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {
	MainHeader,
	LogoOnly,
	NoOutboundLinksHeader,
	InverseHeader,
} from '../src/tsx/header';
import javascript from '../main';
import './header.scss';
import storyData from './storybook-data';
import profileStoryData from './storybook-data/profile';
import {argTypes} from './arg-types';
import {Drawer} from '../src/tsx/drawer';

const Brand = process.env.STORYBOOK_BRAND;

export default {
	title: 'Maintained/o-header',
	component: MainHeader,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		currentPath: '/',
	},
	argTypes,
} as ComponentMeta<typeof MainHeader>;

export const HeaderPrimary: ComponentStory<typeof MainHeader> = args => {
	useEffect(() => void javascript.init(), []);
	return (
		<div data-o3-brand={Brand}>
			<MainHeader {...args} />
			<Drawer
				data={args.data}
				showAskButton={args.showAskButton}
				userIsLoggedIn={args.userIsLoggedIn}
				userIsSubscribed={args.userIsSubscribed}
			/>
			<p className="demo-sticky-message demo-sticky-message--scroll">
				Scroll down
			</p>
		</div>
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
	showAskButton: true,
};
HeaderPrimary.parameters = {
	controls: {
		exclude: ['data', 'variant', 'userIsAnonymous', 'extraHeaderProps'],
	},
};

export const DefaultHeaderWithRightAlignedSubnav: ComponentStory<
	typeof MainHeader
> = args => {
	useEffect(() => void javascript.init(), []);
	return (
		<div data-o3-brand={Brand}>
			<MainHeader {...args} />;
			<Drawer
				data={args.data}
				showAskButton={args.showAskButton}
				userIsLoggedIn={args.userIsLoggedIn}
				userIsSubscribed={args.userIsSubscribed}
			/>
		</div>
	);
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
	showAskButton: true,
};
DefaultHeaderWithRightAlignedSubnav.parameters = {
	controls: {
		exclude: [
			'data',
			'variant',
			'userIsSubscribed',
			'userIsAnonymous',
			'extraHeaderProps',
		],
	},
};

export const LogoOnlyHeader: ComponentStory<typeof LogoOnly> = args => {
	useEffect(() => void javascript.init(), []);
	return (
		<div data-o3-brand={Brand}>
			<LogoOnly {...args} />
		</div>
	)
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
			'showAskButton',
			'showSubNavigation',
			'showUserNavigation',
			'showMegaNav',
			'userIsSubscribed',
			'showStickyHeader',
			'userIsAnonymous',
			'extraHeaderProps',
			'data',
		],
	},
};

export const NoOutboundLinks: ComponentStory<
	typeof NoOutboundLinksHeader
> = args => {
	useEffect(() => void javascript.init(), []);
	return (
		<div data-o3-brand={Brand}>
			<NoOutboundLinksHeader {...args} />
		</div>
	)
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
			'showAskButton',
			'showMegaNav',
			'userIsSubscribed',
			'showStickyHeader',
			'userIsAnonymous',
			'extraHeaderProps',
			'data',
		],
	},
};

export const InverseSimpleHeader: ComponentStory<
	typeof InverseHeader
> = args => {
	useEffect(() => void javascript.init(), []);
	return (
		<div data-o3-brand={Brand}>
			<InverseHeader {...args} />
		</div>
	) 
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
			'showAskButton',
			'showMegaNav',
			'showSubNavigation',
			'showLogoLink',
			'showStickyHeader',
			'userIsSubscribed',
			'userIsAnonymous',
			'extraHeaderProps',
		],
	},
};

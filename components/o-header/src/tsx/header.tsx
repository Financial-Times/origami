import {Header} from './header-default';
import {MegaMenu} from './mega-menu';
import {HeaderProps} from './Props';
import {Subnav} from './subnav';
import {LogoOnlyHeader} from './logo-only';
import {SimpleHeader} from './simple-header';
import {HeaderWrapper} from './top';

export function OHeader({
	currentNav,
	top,
	nav,
	search,
	subnav,
	anon,
	sticky,
	simple,
	transparent,
	megamenu,
	drawer,
	type,
}) {
	console.log({
		props: {
			type,
			top,
			nav,
			search,
			subnav,
			currentNav,
			anon,
			sticky,
			simple,
			transparent,
			megamenu,
			drawer,
		},
	});

	const typeMapping = {
		primary: nav && drawer ? <Header {...nav} drawer={drawer} /> : null,
		megamenu: nav ? <MegaMenu {...nav} /> : null,
		subnav:
			nav && currentNav ? <Subnav {...nav} currentNav={currentNav} /> : null,
		'logo-only': <LogoOnlyHeader />,
		simple: drawer ? <SimpleHeader drawer={drawer} /> : null,
	};

	return typeMapping[type];
}

export function DefaultHeader(props: HeaderProps) {
	const {
		data,
		showLogoLink,
		showMegaNav,
		showStickyHeader,
		showSubNavigation,
		showUserNavigation,
		userIsAnonymous,
		userIsLoggedIn,
		userIsSubscribed,
		variant,
	} = props;

	const includeUserActionsNav = showUserNavigation && !userIsLoggedIn;
	const includeSubNavigation =
		showSubNavigation && (data.breadcrumb || data.subsections);

	const defaultHeaderProps = {
		includeUserActionsNav,
		includeSubNavigation,
		showLogoLink,
		showUserNavigation,
		userIsLoggedIn,
		userIsSubscribed,
		variant,
		data
	};

	return (
		<>
			<HeaderWrapper variant={variant}>
				<Header {...defaultHeaderProps} />
			</HeaderWrapper>
		</>
	);
}

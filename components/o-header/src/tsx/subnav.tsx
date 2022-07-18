import {NavMobile, NavDesktop, SubNavigation} from './nav';
import {CurrentNav, Nav, NavDesktopItem, NavItem} from './Props';

export function Subnav({
	mobile,
	desktop,
	isSignedIn,
	currentNav,
}: {
	mobile: NavItem[];
	desktop: NavDesktopItem[];
	isSignedIn: boolean;
	currentNav: CurrentNav;
}) {
	return (
		<header
			className="o-header"
			data-o-component="o-header"
			data-o-header--no-js>
			<NavMobile navItems={mobile} />

			<NavDesktop navItems={desktop} isSignedIn={isSignedIn} />
			<SubNavigation currentNav={currentNav}/>
		</header>
	);
}

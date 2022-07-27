import {
	HeaderWrapper,
	TopWrapper,
	TopColumnCenter,
	TopColumnRight,
} from './top';
import {UserActionsNav} from './user';
import {NavMobile, NavDesktop} from './nav';
export function InverseSimpleHeader({
	includeUserActionsNav,
	userIsLoggedIn,
	showUserNavigation,
	data,
}) {
	const userNavItems = includeUserActionsNav && data['navbar-right-anon'].items;
	const mobileNavItems = data['navbar-simple'].items;
	const desktopNavItems = data.navbar.items;
	const rightNavItems = data['navbar-right'].items;
	return (
		<HeaderWrapper additionalClassName="o-header--transparent">
			{includeUserActionsNav && <UserActionsNav userNavItems={userNavItems} />}
			<TopWrapper>
				<div className="o-header__top-column o-header__top-column--left"></div>
				<TopColumnCenter />
				<TopColumnRight
					userIsLoggedIn={userIsLoggedIn}
					userNavItems={userNavItems}
				/>
			</TopWrapper>
			<NavMobile navItems={mobileNavItems} />
			<NavDesktop
				navItems={desktopNavItems}
				userIsLoggedIn={userIsLoggedIn}
				showUserNavigation={showUserNavigation}
				rightNavItems={rightNavItems}
			/>
		</HeaderWrapper>
	);
}

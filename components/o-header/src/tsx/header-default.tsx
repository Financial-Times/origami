import {NavMobile, NavDesktop} from './nav';
// import {DrawerProps, NavItem, NavDesktopItem} from './Props';
// import {Drawer} from './drawer';
import {Search} from './search';
import {UserActionsNav} from './user';
import {SubNavigation} from './subnavigation';
import {
	TopWrapper,
	TopColumnCenter,
	TopColumnLeft,
	TopColumnRight,
} from './top';

export function Header({
	includeUserActionsNav,
	includeSubNavigation,
	showLogoLink,
	showUserNavigation,
	userIsSubscribed,
	userIsLoggedIn,
	variant,
	data,
}) {
	const userNavItems = includeUserActionsNav && data['navbar-right-anon'].items;
	const breadcrumb = data.breadcrumb;
	const subsections = data.subsections;
	const rightSubSection = data['navbar-right-subsection'];
	const mobileNavItems = data['navbar-simple'].items
	return (
		<>
			{includeUserActionsNav && <UserActionsNav userNavItems={userNavItems} />}
			<TopWrapper>
				<TopColumnLeft instance='primary'/>
				<TopColumnCenter />
				<TopColumnRight
					userIsLoggedIn={userIsLoggedIn}
					userIsSubscribed={userIsSubscribed}
					variant={variant}
					userNavItems={userNavItems}
				/>
			</TopWrapper>
			<Search instance="primary" />
			{/* <NavMobile navItems={mobileNavItems}/> */}
			{includeSubNavigation && (
				<SubNavigation
					breadcrumb={breadcrumb}
					subsections={subsections}
					rightSubsection={rightSubSection}
				/>
			)}

			{/* <NavMobile navItems={mobile} /> */}
			{/* <NavDesktop navItems={desktop} isSignedIn={isSignedIn} /> */}

			{/* <Drawer {...drawer} /> */}
		</>
	);
}

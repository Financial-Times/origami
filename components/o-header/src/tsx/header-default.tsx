import {NavMobile, NavDesktop} from './nav';
import {Search} from './search';
import {THeaderProps} from './Props';
import {UserActionsNav} from './user';
import {SubNavigation} from './subnavigation';
import {
	TopWrapper,
	TopColumnCenter,
	TopColumnLeft,
	TopColumnRight,
} from './top';
export function Header({
	showLogoLink,
	showMegaNav,
	showSubNavigation,
	showUserNavigation,
	userIsSubscribed,
	userIsLoggedIn,
	variant,
	data,
}: THeaderProps) {
	const includeUserActionsNav = showUserNavigation && !userIsLoggedIn;
	const includeSubNavigation =
		showSubNavigation && (data.breadcrumb || data.subsections);
	const userNavItems = includeUserActionsNav && data['navbar-right-anon'].items;
	const breadcrumb = data.breadcrumb;
	const subsections = data.subsections;
	const rightSubSection = data['subsections-right'];
	const mobileNavItems = data['navbar-simple'].items;
	const desktopNavItems = data.navbar.items;
	const rightNavItems = data['navbar-right'].items;
	return (
		<>
			{includeUserActionsNav && <UserActionsNav userNavItems={userNavItems} />}
			<TopWrapper>
				<TopColumnLeft />
				<TopColumnCenter showLogoLink={showLogoLink} />
				<TopColumnRight
					userIsLoggedIn={userIsLoggedIn}
					userIsSubscribed={userIsSubscribed}
					variant={variant}
					userNavItems={userNavItems}
				/>
			</TopWrapper>
			<Search />
			<NavMobile navItems={mobileNavItems} />
			<NavDesktop
				navItems={desktopNavItems}
				userIsLoggedIn={userIsLoggedIn}
				showUserNavigation={showUserNavigation}
				rightNavItems={rightNavItems}
				showMegaNav={showMegaNav}
			/>

			{includeSubNavigation && (
				<SubNavigation
					breadcrumb={breadcrumb}
					subsections={subsections}
					rightSubsection={rightSubSection}
				/>
			)}
		</>
	);
}

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
	showAskButton,
	variant,
	data,
}: THeaderProps) {
	const includeSubNavigation =
		showSubNavigation && (data.breadcrumb || data.subsections);

	const userNavData = userIsLoggedIn ? data['navbar-top-right'] : data['navbar-top-right-anon'];
	const userNavItems = userNavData.items;

	const breadcrumb = data.breadcrumb;
	const subsections = data.subsections;
	const rightSubSection = data['subsections-right'];
	const mobileNavItems = data['navbar-simple'].items;
	const desktopNavItems = data.navbar.items;
	const rightNavItems = data['navbar-right'].items;
	return (
		<>
			{showUserNavigation && <UserActionsNav userNavItems={userNavItems} />}
			<TopWrapper>
				<TopColumnLeft showAskButton={showAskButton} />
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

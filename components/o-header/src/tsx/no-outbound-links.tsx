import {HeaderProps} from './Props';
import {HeaderWrapper} from './top';
import {TopWrapper, TopColumnCenter} from './top';
import {UserActionsNav} from './user';
import {NavRight} from './nav';
import {SubNavigation} from './subnavigation';

export function NoOutboundLinks(props: HeaderProps) {
	const {
		data,
		showLogoLink,
		showMegaNav,
		showSubNavigation,
		showUserNavigation,
		userIsLoggedIn,
	} = props;
	const includeUserActionsNav = showUserNavigation && !userIsLoggedIn;
	const userNavItems = includeUserActionsNav && data['navbar-right-anon'].items;
	const desktopNavItems = data.navbar.items;
	const rightNavItems = data['navbar-right'].items;
	const includeSubNavigation =
		showSubNavigation && (data.breadcrumb || data.subsections);
	const breadcrumb = data.breadcrumb;
	const subsections = data.subsections;
	const rightSubSection = data['subsections-right'];
	return (
		<HeaderWrapper>
			{includeUserActionsNav && <UserActionsNav userNavItems={userNavItems} />}
			<TopWrapper>
				<TopColumnCenter showLogoLink={showLogoLink} />
			</TopWrapper>
			<nav
				id="o-header-nav-desktop"
				className="o-header__row o-header__nav o-header__nav--desktop"
				role="navigation"
				data-trackable="header-nav:desktop"
				aria-label="Primary navigation">
				<div className="o-header__container">
					<NavRight userIsLoggedIn={userIsLoggedIn} items={rightNavItems} />
				</div>
			</nav>
			{includeSubNavigation && (
				<SubNavigation
					breadcrumb={breadcrumb}
					subsections={subsections}
					rightSubsection={rightSubSection}
				/>
			)}
		</HeaderWrapper>
	);
}

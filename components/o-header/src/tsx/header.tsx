import {Header} from './header-default';
import {THeaderProps} from './Props';
import {HeaderWrapper} from './top';
// import {Drawer} from './drawer';
import {StickyHeader} from './sticky';
import {LogoOnlyHeader} from './logo-only';
import {NoOutboundLinks} from './no-outbound-links';
import {InverseSimpleHeader} from './inverse-header';

export function MainHeader(props: THeaderProps) {
	const {
		data,
		showAskButton,
		showLogoLink,
		showMegaNav,
		showStickyHeader,
		showSubNavigation,
		showUserNavigation,
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
		showAskButton,
		showLogoLink,
		showSubNavigation,
		showUserNavigation,
		userIsLoggedIn,
		showMegaNav,
		userIsSubscribed,
		variant,
		data,
	};

	const stickyHeaderProps = {
		userIsLoggedIn,
		showAskButton,
		showUserNavigation,
		userIsSubscribed,
		includeUserActionsNav,
		data,
	};

	return (
		<>
			<HeaderWrapper variant={variant}>
				<Header {...defaultHeaderProps} />
			</HeaderWrapper>
			{showStickyHeader && <StickyHeader {...stickyHeaderProps} />}
			
		</>
	);
}

export function LogoOnly({
	showLogoLink,
	variant,
}: {
	showLogoLink?: boolean;
	variant?: string;
}) {
	return <LogoOnlyHeader variant={variant} showLogoLink={showLogoLink} />;
}

export function NoOutboundLinksHeader(props: THeaderProps) {
	return <NoOutboundLinks {...props} />;
}

export function InverseHeader(props: THeaderProps) {
	const inverseProps = {
		includeUserActionsNav: props.showUserNavigation && !props.userIsLoggedIn,
		data: props.data,
		userIsLoggedIn: props.userIsLoggedIn,
		showUserNavigation: props.showUserNavigation,
	};
	return <InverseSimpleHeader {...inverseProps} />;
}

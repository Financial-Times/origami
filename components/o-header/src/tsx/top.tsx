import {NavMenuItem, HeaderVariant} from './Props';

export function HeaderWrapper({
	variant,
	additionalClassName,
	children,
}: {
	variant?: HeaderVariant;
	additionalClassName?: string;
	children: JSX.Element[] | JSX.Element;
}) {
	const headerClassNames = `o-header o-header--${
		variant || 'simple'
	} ${additionalClassName}`;
	return (
		<header
			id="site-navigation"
			className={headerClassNames}
			data-o-component="o-header"
			data-o-header--no-js={true}
			tabIndex={-1}>
			{children}
		</header>
	);
}

export const TopWrapper = ({
	children,
}: {
	children: JSX.Element | JSX.Element[];
}) => (
	<div className="o-header__row o-header__top">
		<div className="o-header__container">
			<div className="o-header__top-wrapper">{children}</div>
		</div>
	</div>
);

export function TopColumnLeft({isSticky}: {isSticky?: boolean}) {
	const drawerLabel = isSticky ? 'Menu' : 'Open side navigation menu';
	const searchProps = {
		href: isSticky ? '#o-header-search-sticky' : '#o-header-search',
		'aria-controls': isSticky ? 'o-header-search-sticky' : 'o-header-search',
		tabIndex: isSticky ? -1 : undefined,
	};
	return (
		<div className="o-header__top-column o-header__top-column--left">
			<a
				href="#o-header-drawer"
				className="o-header__top-icon-link o-header__top-icon-link--menu"
				aria-controls="o-header-drawer"
				title="Open side navigation menu"
				tabIndex={isSticky ? -1 : undefined}>
				<span className="o-header__top-link-label">{drawerLabel}</span>
			</a>
			<a
				{...searchProps}
				className="o-header__top-icon-link o-header__top-icon-link--search"
				title="Open search bar">
				<span className="o-header__top-link-label">Open search bar</span>
			</a>
		</div>
	);
}

export function TopColumnCenter({showLogoLink}: {showLogoLink?: boolean}) {
	if (showLogoLink) {
		return (
			<div className="o-header__top-column o-header__top-column--center">
				<a
					className="o-header__top-logo"
					href="/"
					title="Go to Financial Times homepage">
					<span className="o-header__visually-hidden">Financial Times</span>
				</a>
			</div>
		);
	}
	return (
		<div className="o-header__top-column o-header__top-column--center">
			<div className="o-header__top-logo">
				<span className="o-header__visually-hidden">Financial Times</span>
			</div>
		</div>
	);
}

export function TopColumnRight({
	userIsLoggedIn,
	userIsSubscribed,
	variant,
	userNavItems,
}: {
	userIsLoggedIn: boolean;
	userIsSubscribed?: boolean;
	variant?: HeaderVariant;
	userNavItems: NavMenuItem[];
}) {
	if (userIsLoggedIn) {
		return (
			<TopColumnRightLoggedIn
				items={userNavItems}
				variant={variant}
				userIsSubscribed={userIsSubscribed}
			/>
		);
	} else {
		return <TopColumnRightAnon items={userNavItems} variant={variant} />;
	}
}
const TopColumnRightLoggedIn = ({
	items,
	userIsSubscribed,
	variant,
}: {
	items: NavMenuItem[];
	userIsSubscribed: boolean;
	variant: HeaderVariant;
}) => {
	const subscribeAction = items?.[1];
	return (
		<div className="o-header__top-column o-header__top-column--right">
			{!userIsSubscribed && subscribeAction && (
				<SubscribeButton
					item={subscribeAction}
					variant={variant}
					className="o-header__top-button--hide-m"
				/>
			)}
			<MyFt className="" />
		</div>
	);
};

const SignInLink = ({
	item,
	variant,
	className,
}: {
	item: NavMenuItem;
	variant?: string;
	className?: string;
}) => {
	const setTabIndex = variant === 'sticky' ? {tabIndex: -1} : null;
	return (
		<a
			className={`o-header__top-link ${className}`}
			href={item.url || undefined}
			{...setTabIndex}>
			{item.label}
		</a>
	);
};
export const SubscribeButton = ({
	item,
	variant,
	className,
}: {
	item: NavMenuItem;
	variant?: string;
	className?: string;
}) => {
	const setTabIndex = variant === 'sticky' ? {tabIndex: -1} : null;
	return (
		<a
			className={`o-header__top-button ${className}`}
			// Added as the result of a DAC audit. This will be confusing for users of voice activation software
			// as it looks like a button but behaves like a link without this role.
			role="button"
			href={item.url || undefined}
			{...setTabIndex}>
			{item.label}
		</a>
	);
};

export const TopColumnRightAnon = ({
	items,
	variant,
}: {
	items: NavMenuItem[];
	variant?: string;
}) => {
	// If user is anonymous the second list item is styled as a button
	const [signInAction, subscribeAction] = items;
	return (
		<div className="o-header__top-column o-header__top-column--right">
			{subscribeAction && (
				<SubscribeButton
					item={subscribeAction}
					variant={variant}
					className="o-header__top-button--hide-m"
				/>
			)}
			{signInAction && (
				<SignInLink
					item={signInAction}
					variant={variant}
					className="o-header__top-link--hide-m"
				/>
			)}
			<MyFt className="o-header__top-icon-link--show-m" />
		</div>
	);
};

const MyFt = ({className}: {className?: string}) => (
	<a
		className={`o-header__top-icon-link o-header__top-icon-link--myft ${className}`}
		id="o-header-top-link-myft"
		href="/myft"
		aria-label="My F T">
		<span className="o-header__visually-hidden">myFT</span>
	</a>
);

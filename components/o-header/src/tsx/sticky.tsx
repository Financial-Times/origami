import {NavMenuItem} from './Props';
import {
	TopColumnLeft,
	TopWrapper,
	SubscribeButton,
	TopColumnRightAnon,
} from './top';

export function StickyHeader({
	userIsLoggedIn,
	showUserNavigation,
	userIsSubscribed,
	includeUserActionsNav,
	data,
}) {
	const userNavItems = includeUserActionsNav && data['navbar-right-anon'].items;
	const navBarItems = data.navbar.items;
	return (
		<header
			className="o-header o-header--simple o-header--sticky o--if-js"
			data-o-component="o-header"
			data-o-header--sticky
			aria-hidden="true"
			role="presentation">
			<TopWrapper>
				<TopColumnLeft isSticky={true} />
				<StickyTopColumnCenter navBarItems={navBarItems} />
				<TopRightSTicky
					userIsLoggedIn={userIsLoggedIn}
					showUserNavigation={showUserNavigation}
					userIsSubscribed={userIsSubscribed}
					userNavItems={userNavItems}
				/>
			</TopWrapper>
			<StickySearch />
		</header>
	);
}

const StickyTopColumnCenter = ({navBarItems}: {navBarItems: NavMenuItem[]}) => {
	return (
		<div className="o-header__top-column o-header__top-column--center">
			<Navigation navBarItems={navBarItems} />
			<a
				className="o-header__top-logo"
				href="/"
				title="Go to Financial Times homepage"
				tabIndex={-1}>
				<span className="o-header__visually-hidden">Financial Times</span>
			</a>
		</div>
	);
};
const Navigation = ({navBarItems}: {navBarItems: NavMenuItem[]}) => (
	<div className="o-header__top-takeover">
		<div className="o-header__nav">
			<ul className="o-header__nav-list o-header__nav-list--left">
				{navBarItems.map((item, index) => (
					<li className="o-header__nav-item" key={`link-${index}`}>
						<a
							className="o-header__nav-link o-header__nav-link--primary"
							href={item.url}
							tabIndex={-1}>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	</div>
);

function TopRightSTicky({
	userIsLoggedIn,
	showUserNavigation,
	userIsSubscribed,
	userNavItems,
}: {
	userIsLoggedIn: boolean;
	showUserNavigation: boolean;
	userIsSubscribed: boolean;
	userNavItems: NavMenuItem[];
}) {
	const subscribeAction = userNavItems?.[1];
	let children = null;
	if (userIsLoggedIn) {
		return (
			<div className="o-header__top-column o-header__top-column--right">
				{userIsSubscribed && subscribeAction && (
					<SubscribeButton variant="sticky" item={subscribeAction} />
				)}
				<MyFtSticky />
			</div>
		);
	} else if (showUserNavigation) {
		children = <TopColumnRightAnon items={userNavItems} variant="sticky" />;
	}

	return (
		<div className="o-header__top-column o-header__top-column--right">
			{children}
		</div>
	);
}
function MyFtSticky() {
	return (
		<a
			className="o-header__top-icon-link o-header__top-icon-link--hide-s o-header__top-icon-link--myft"
			href="/myft"
			aria-label="My F T"
			tabIndex={-1}>
			<span className="o-header__visually-hidden">myFT</span>
		</a>
	);
}
const StickySearch = () => {
	return (
		<div
			id="o-header-search-sticky"
			className="o-header__row o-header__search o--if-js"
			role="search"
			data-o-header-search>
			<div className="o-header__container">
				<form
					className="o-header__search-form"
					action="/search"
					role="search"
					aria-label="Site search">
					<label
						className="o-header__visually-hidden"
						htmlFor="o-header-search-term-js">
						Search the <abbr title="Financial Times">FT</abbr>
					</label>
					<input
						className="o-header__search-term"
						id="o-header-search-term-js"
						name="q"
						type="text"
						placeholder="Search the FT"
					/>
					<button className="o-header__search-submit" type="submit">
						Search
					</button>
					<button
						className="o-header__search-close"
						type="button"
						aria-controls="o-header-search-sticky"
						title="Close search bar">
						<span className="o-header__visually-hidden">Close search bar</span>
					</button>
				</form>
			</div>
		</div>
	);
};

import {THeaderProps, TNavMenuItem} from './Props';
import {
	TopColumnLeft,
	TopWrapper,
	SubscribeButton,
	TopColumnRightAnon,
	TopColumnRight,
} from './top';

export function StickyHeader({
	userIsLoggedIn,
	showUserNavigation,
	userIsSubscribed,
	showAskButton,
	data,
}: THeaderProps) {
	const userNavData = userIsLoggedIn
		? data['navbar-top-right']
		: data['navbar-top-right-anon'];
	const userNavItems = userNavData.items;
	const navBarItems = data.navbar.items;
	return (
		<header
			className="o-header o-header--simple o-header--sticky o--if-js"
			data-o-component="o-header"
			data-o-header--sticky
			aria-hidden="true"
			role="presentation">
			<TopWrapper>
				<TopColumnLeft isSticky={true} showAskButton={showAskButton} />
				<StickyTopColumnCenter navBarItems={navBarItems} />
				<TopColumnRight
					variant="sticky"
					userNavItems={userNavItems}
					userIsLoggedIn={userIsLoggedIn}
					userIsSubscribed={userIsSubscribed}
				/>
			</TopWrapper>
			<StickySearch />
		</header>
	);
}

const StickyTopColumnCenter = ({
	navBarItems,
}: {
	navBarItems: TNavMenuItem[];
}) => {
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
const Navigation = ({navBarItems}: {navBarItems: TNavMenuItem[]}) => (
	<div className="o-header__top-takeover">
		<div className="o-header__nav">
			<ul className="o-header__nav-list o-header__nav-list--left">
				{navBarItems.map((item, index) => (
					<li className="o-header__nav-item" key={`link-${index}`}>
						<a
							className="o-header__nav-link o-header__nav-link--primary"
							href={item.url || undefined}
							tabIndex={-1}>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	</div>
);

const StickySearch = () => {
	const stickySearchDivId = 'o-header-search-sticky';
	const inputFieldId = 'o-header-search-term-js';

	return (
		<div
			id={stickySearchDivId}
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
						htmlFor={inputFieldId}
						className="o-header__search-term o-forms-field o-forms-field--optional">
						<span className="o-forms-title o-header__visually-hidden">
							<span className="o-forms-title__main">
								Search the <abbr title="Financial Times">FT</abbr>
							</span>
						</span>
						<span className="o-forms-input o-forms-input--text o-forms-input--suffix">
							<input
								id={inputFieldId}
								name="q"
								type="search"
								placeholder="Search for stories, topics or securities"
							/>
							<button className="o-header__search-submit" type="submit">
								<span
									aria-hidden="true"
									className="o-header__search-icon"></span>
								<span>Search</span>
							</button>
							<button
								className="o-header__search-close o--if-js"
								type="button"
								aria-controls={stickySearchDivId}
								title="Close search bar">
								<span className="o-header__visually-hidden">
									Close search bar
								</span>
								<span>Close</span>
							</button>
						</span>
					</label>
				</form>
			</div>
		</div>
	);
};

import {MegaNav} from './mega-nav';
import {NavMenuItem} from './Props';

export function NavMobile({navItems}: {navItems: NavMenuItem[]}) {
	return (
		<nav
			id="o-header-nav-mobile"
			className="o-header__row o-header__nav o-header__nav--mobile"
			role="navigation"
			data-trackable="header-nav:mobile"
			aria-label="Primary navigation">
			<NavList navItems={navItems} mobile={true} />
		</nav>
	);
}

export function NavDesktop({
	userIsLoggedIn,
	navItems,
	showUserNavigation,
	showMegaNav,
	rightNavItems,
}: {
	userIsLoggedIn: boolean;
	navItems: NavMenuItem[];
	showUserNavigation?: boolean;
	showMegaNav?: boolean;
	rightNavItems?: NavMenuItem[];
}) {
	console.log({navItems});

	return (
		<nav
			id="o-header-nav-desktop"
			className="o-header__row o-header__nav o-header__nav--desktop"
			role="navigation"
			data-trackable="header-nav:desktop"
			aria-label="Primary navigation">
			<div className="o-header__container">
				<NavList navItems={navItems} showMegaNav={showMegaNav} />
				{showUserNavigation && (
					<NavRight userIsLoggedIn={userIsLoggedIn} items={rightNavItems} />
				)}
			</div>
		</nav>
	);
}

function NavList({
	navItems,
	mobile,
	showMegaNav,
}: {
	navItems: NavMenuItem[];
	mobile?: boolean;
	showMegaNav?: boolean;
}) {
	const wrapperClassName = mobile
		? 'o-header__nav-list'
		: 'o-header__nav-list o-header__nav-list--left';
	return (
		<ul className={wrapperClassName}>
			{navItems.map((navItem, i) => {
				// const {label, selected, index, hasMega, articles, subsections} = navItem;
				const {label, selected, index, url, meganav} = navItem;
				const ariaLabel = selected ? label + ', current page' : undefined;
				const ariaCurrent = selected ? 'page' : undefined;
				const ariaControls = !selected ? 'o-header-mega-' + index : undefined;
				return (
					<li className="o-header__nav-item" key={'nav-item' + i}>
						<a
							className="o-header__nav-link o-header__nav-link--primary"
							href={url}
							aria-label={ariaLabel}
							aria-current={ariaCurrent}
							aria-controls={ariaControls}
							id={`o-header-link-${index}`}>
							{label}
						</a>
						{showMegaNav && meganav && (
							<MegaNav meganav={meganav} label={label} index={index} />
						)}
					</li>
				);
			})}
		</ul>
	);
}

function NavRight({
	userIsLoggedIn,
	items,
}: {
	userIsLoggedIn: boolean;
	items: NavMenuItem[];
}) {
	if (userIsLoggedIn) {
		return (
			<ul
				className="o-header__nav-list o-header__nav-list--right"
				data-trackable="user-nav">
				{items.map((item, index) => (
					<li className="o-header__nav-item" key={`link-${index}`}>
						<a
							className="o-header__nav-link"
							href={item.url}
							data-trackable={item.label}>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		);
	}
	return null;
}

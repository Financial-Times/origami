import { MegaNav } from "./mega-nav";
import { TNavMenuItem } from "./Props";

export function NavMobile({ navItems }: { navItems: TNavMenuItem[] }) {
	return (
		<nav
			id="o-header-nav-mobile"
			className="o-header__row o-header__nav o-header__nav--mobile"
			role="navigation"
			aria-label="Primary navigation"
		>
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
	navItems?: TNavMenuItem[];
	showUserNavigation?: boolean;
	showMegaNav?: boolean;
	rightNavItems?: TNavMenuItem[];
}) {
	return (
		<nav
			id="o-header-nav-desktop"
			className="o-header__row o-header__nav o-header__nav--desktop"
			role="navigation"
			aria-label="Primary navigation"
		>
			<div className="o-header__container">
				{navItems && <NavList navItems={navItems} showMegaNav={showMegaNav} />}
				{showUserNavigation && rightNavItems && (
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
	navItems: TNavMenuItem[];
	mobile?: boolean;
	showMegaNav?: boolean;
}) {
	const wrapperClassName = mobile
		? "o-header__nav-list"
		: "o-header__nav-list o-header__nav-list--left";
	return (
		<ul className={wrapperClassName}>
			{navItems.map((navItem, i) => {
				const { label, selected, url, meganav } = navItem;
				const index = navItem.index || i;
				const ariaLabel = selected ? label + ", current page" : undefined;
				const ariaCurrent = selected ? "page" : undefined;
				const ariaControls = !selected ? "o-header-mega-" + index : undefined;
				return (
					<li className="o-header__nav-item" key={"nav-item" + i}>
						<a
							className="o-header__nav-link o-header__nav-link--primary"
							href={url || undefined}
							aria-label={ariaLabel}
							aria-current={ariaCurrent}
							aria-controls={ariaControls}
							id={`o-header-link-${index}`}
						>
							{label}
						</a>
						{showMegaNav && meganav && (
							<MegaNav meganav={meganav} index={index} />
						)}
					</li>
				);
			})}
		</ul>
	);
}

export function NavRight({
	userIsLoggedIn,
	items,
}: {
	userIsLoggedIn: boolean;
	items: TNavMenuItem[];
}) {
	if (userIsLoggedIn) {
		return (
			<ul className="o-header__nav-list o-header__nav-list--right">
				{items.map((item, index) => (
					<li className="o-header__nav-item" key={`link-${index}`}>
						<a className="o-header__nav-link" href={item.url || undefined}>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		);
	}
	return null;
}

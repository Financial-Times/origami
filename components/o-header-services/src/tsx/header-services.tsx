import {PrimaryNav, SecondaryNav, SecondaryNavProps, NavItem, ListItem} from './navs';

type TitleProps = {
	title: string;
	tagline?: string;
	titleUrl?: string;
	relatedContent?: ListItem[];
	primaryNav?: boolean;
	secondaryNav?: boolean;
}

interface HeaderServicesProps extends TitleProps {
	primaryNavData?: NavItem[];
	secondaryNavData?: SecondaryNavProps;
	modifier?: 'b2b' | 'b2c' | 'default';
	bleeedHeader?: boolean;
};

export function HeaderServices({
	title,
	tagline,
	titleUrl,
	relatedContent,
	primaryNav,
	primaryNavData,
	secondaryNav,
	secondaryNavData,
	modifier,
	bleeedHeader,
}: HeaderServicesProps) {
	const classNames = ['o-header-services'];
	modifier &&
		modifier !== 'default' &&
		classNames.push(`o-header-services--${modifier}`);
	bleeedHeader && classNames.push('o-header-services--bleed');
	return (
		<header
			className={classNames.join(' ')}
			data-o-component="o-header-services">
			<Title
				title={title}
				tagline={tagline}
				titleUrl={titleUrl}
				relatedContent={relatedContent}
				primaryNav={primaryNav}
				secondaryNav={secondaryNav}
			/>
			{primaryNav && <PrimaryNav navItems={primaryNavData} />}
			{secondaryNav && <SecondaryNav {...secondaryNavData} />}
		</header>
	);
}

function Title({
	title,
	tagline,
	titleUrl,
	relatedContent,
	primaryNav,
	secondaryNav,
}: TitleProps) {
	const homeUrl = titleUrl || '/';
	const hasHamburgerMenu =
		relatedContent?.length > 0 || primaryNav || secondaryNav;
	return (
		<div className="o-header-services__top">
			{hasHamburgerMenu && (
				<div className="o-header-services__hamburger">
					<a
						className="o-header-services__hamburger-icon"
						href="#core-nav-fallback"
						role="button">
						<span className="o-header-services__visually-hidden">
							Open primary navigation
						</span>
					</a>
				</div>
			)}
			<div className="o-header-services__logo"></div>
			<div className="o-header-services__title">
				<a className="o-header-services__product-name" href={homeUrl}>
					{title}
				</a>
				{tagline && (
					<span className="o-header-services__product-tagline">{tagline}</span>
				)}
			</div>
			{relatedContent && (
				<ul className="o-header-services__related-content">
					{relatedContent.map((element, i) => (
						<li key={i}><a href={element.label}>{element.label}</a></li>
					))}
				</ul>
			)}
		</div>
	);
}

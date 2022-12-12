import {
	PrimaryNav,
	SecondaryNav,
	SecondaryNavProps,
	NavItem,
	ListItem,
} from './navs';

type TitleProps = {
	title: string;
	tagline?: string;
	titleUrl?: string;
	relatedContent?: ListItem[];
	primaryNavData?: NavItem[];
};

interface HeaderServicesProps extends TitleProps {
	secondaryNavData?: SecondaryNavProps;
	theme?: 'b2b' | 'b2c';
	bleeedHeader?: boolean;
}

export function HeaderServices({
	title,
	tagline,
	titleUrl,
	relatedContent,
	primaryNavData,
	secondaryNavData,
	theme,
	bleeedHeader,
}: HeaderServicesProps) {
	const classNames = ['o-header-services'];
	theme && classNames.push(`o-header-services--${theme}`);
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
				primaryNavData={primaryNavData}
			/>
			{primaryNavData && <PrimaryNav navItems={primaryNavData} />}
			{secondaryNavData && <SecondaryNav {...secondaryNavData} />}
		</header>
	);
}

function Title({
	title,
	tagline,
	titleUrl,
	relatedContent,
	primaryNavData,
}: TitleProps) {
	const homeUrl = titleUrl || '/';
	const hasHamburgerMenu = relatedContent?.length > 0 || primaryNavData;
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
						<li key={i}>
							<a href={element.label}>{element.label}</a>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

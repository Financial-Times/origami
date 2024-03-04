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
	relatedContent?: (ListItem | JSX.Element)[];
	primaryNavData?: NavItem[];
	relatedContentAlwaysVisible?: boolean;
};

interface HeaderServicesProps extends TitleProps {
	secondaryNavData?: SecondaryNavProps;
	theme?: 'b2b' | 'b2c';
	bleeedHeader?: boolean;
	relatedContentAlwaysVisible?: boolean;
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
	relatedContentAlwaysVisible,
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
				relatedContentAlwaysVisible={relatedContentAlwaysVisible}
			/>
			{/*{primaryNavData && <PrimaryNav navItems={primaryNavData} />}*/}
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
	relatedContentAlwaysVisible,
}: TitleProps) {
	const homeUrl = titleUrl || '/';
	const hasHamburgerMenu = relatedContent?.length > 0 || !!primaryNavData;
	const relatedClassNames = ['o-header-services__related-content'];
	relatedContentAlwaysVisible &&
		relatedClassNames.push(
			'o-header-services__related-content--always-visible'
		);
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
				<ul className={relatedClassNames.join(' ')}>
					{relatedContent.map((element, i) => {
						if ('url' in element && 'label' in element) {
							return (
								<li key={i}>
									<a href={element.url}>{element.label}</a>
								</li>
							);
						} else return element;
					})}
				</ul>
			)}
		</div>
	);
}

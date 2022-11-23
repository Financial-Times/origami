type ChildrenType = JSX.Element | JSX.Element[];

type SideBarProps = {
	customNavHeadingSelector?: string;
	customNavigation?: JSX.Element | JSX.Element[];
};

type OverviewSectionItemProps = {
	element: ChildrenType;
	actionElement?: ChildrenType;
};

type OverviewSectionsProps = {
	sections: OverviewSectionItemProps[];
	hasAction?: boolean;
	consistentColumns?: boolean;
};

type HeroProps = {
	heroContent?: ChildrenType;
	muted?: boolean;
};

type LayoutProps = {
	layoutType: 'default' | 'bleed' | 'docs' | 'landing' | 'query';
	header: ChildrenType;
	mainContent: ChildrenType;
	overviewSections: OverviewSectionsProps;
	hero?: HeroProps;
	sidebar?: SideBarProps;
	children: ChildrenType;
	footer: ChildrenType;
};

export function Layout({
	layoutType,
	header,
	mainContent,
	hero,
	sidebar,
	footer,
}: LayoutProps) {
	const classNames =
		layoutType === 'default' ? 'o-layout' : `o-layout o-layout--${layoutType}`;
	const isSidebarVisible = layoutType === 'docs' || layoutType === 'query';
	return (
		<div
			className={classNames}
			data-o-component="o-layout"
			data-o-layout-nav-heading-selector={sidebar?.customNavHeadingSelector}
			data-o-layout-construct-nav={sidebar?.customNavigation && 'false'}>
			<Header>{header}</Header>
			{isSidebarVisible && <SideBar {...sidebar} />}
			{layoutType === 'landing' && hero && (
				<Hero {...hero}>{hero.heroContent}</Hero>
			)}
			<MainContent>{mainContent}</MainContent>
			<Footer>{footer}</Footer>
		</div>
	);
}

function Header({children}: {children: ChildrenType}) {
	return <div className="o-layout__header">{children}</div>;
}

function MainContent({children}: {children: ChildrenType}) {
	return <div className="o-layout__main o-layout-typography">{children}</div>;
}

function Footer({children}: {children: ChildrenType}) {
	return <div className="o-layout__footer">{children}</div>;
}

function SideBar({customNavigation}: SideBarProps) {
	return <div className="o-layout__sidebar">{customNavigation}</div>;
}

function Hero({muted, heroContent}: HeroProps) {
	console.log({muted, heroContent});
	const classNames = ["o-layout__hero o-layout-typography"];
	muted && classNames.push('o-layout__hero--muted')
	return <div className={classNames.join(' ')}>{heroContent}</div>;
}

export function OverviewSections({
	sections,
	hasAction,
	consistentColumns,
}: OverviewSectionsProps) {
	const classNames = ['o-layout__overview'];
	hasAction && classNames.push('o-layout__overview--actions')
	consistentColumns && classNames.push('o-layout__overview--consistent-columns')
	return (
		<div className={classNames.join(' ')}>
			{sections.map((el, i) => {
				return (
					<div className="o-layout-item" key={i}>
						<div className="o-layout-item__content">{el.element}</div>
						{el?.actionElement && (
							<div className="o-layout-item__footer">{el.actionElement}</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

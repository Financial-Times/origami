import {Hero} from './landingPartials';
type ChildrenType = JSX.Element | JSX.Element[];

type SideBarProps = {
	customNavHeadingSelector?: string;
	customNavigation?: JSX.Element | JSX.Element[];
};

type OverviewSectionItemProps = {
	element: ChildrenType;
	actionElement?: ChildrenType;
};

export type OverviewSectionsProps = {
	sections: OverviewSectionItemProps[];
	hasAction?: boolean;
	consistentColumns?: boolean;
};

export type HeroProps = {
	heroContent?: ChildrenType;
	muted?: boolean;
};
export type ArticleListProps = {
	title: string;
	description: string;
	meta: ChildrenType;
	url: string;
};

type LayoutProps = {
	layoutType: 'default' | 'bleed' | 'docs' | 'landing' | 'query';
	header: ChildrenType;
	mainContent: ChildrenType;
	overviewSections: OverviewSectionsProps;
	hero?: HeroProps;
	sidebar?: SideBarProps;
	footer: ChildrenType;
	displayArticleList?: boolean;
};

export function Layout({
	layoutType,
	header,
	mainContent,
	hero,
	sidebar,
	footer,
	displayArticleList,
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
			<MainContent displayArticleList={displayArticleList}>
				{mainContent}
			</MainContent>
			<Footer>{footer}</Footer>
		</div>
	);
}

function Header({children}: {children: ChildrenType}) {
	return <div className="o-layout__header">{children}</div>;
}

function MainContent({
	displayArticleList,
	children,
}: {
	displayArticleList?: boolean;
	children: ChildrenType;
}) {
	const classNames = displayArticleList
		? 'o-layout__main'
		: 'o-layout__main o-layout-typography';
	return <div className={classNames}>{children}</div>;
}

function Footer({children}: {children: ChildrenType}) {
	return <div className="o-layout__footer">{children}</div>;
}

function SideBar({customNavigation}: SideBarProps) {
	return <div className="o-layout__sidebar">{customNavigation}</div>;
}

export type QueryLayoutProps = {
	header: ChildrenType;
	mainContent: ChildrenType;
	querySideBar: ChildrenType;
	footer: ChildrenType;
	queryHeading: ChildrenType;
	asideSideBar?: ChildrenType;
};

export function QueryLayout({
	header,
	queryHeading,
	querySideBar,
	mainContent,
	asideSideBar,
	footer,
}: QueryLayoutProps) {
	return (
		<div
			className="o-layout o-layout--query"
			data-o-component="o-layout"
			data-o-layout-construct-nav={querySideBar && 'true'}>
			<Header>{header}</Header>
			<QueryHeading>{queryHeading}</QueryHeading>
			<div className="o-layout__query-sidebar o-layout-typography">
				{querySideBar}
			</div>
			<MainContent>{mainContent}</MainContent>
			<div className="o-layout__aside-sidebar o-layout-typography">
				{asideSideBar}
			</div>
			<Footer>{footer}</Footer>
		</div>
	);
}

function QueryHeading({children}: {children: ChildrenType}) {
	return (
		<div className="o-layout__heading o-layout-typography">{children}</div>
	);
}

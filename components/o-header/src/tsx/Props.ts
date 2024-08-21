export type TNavMenuKeys =
	| 'account'
	| 'anon'
	| 'drawer-international'
	| 'drawer-uk'
	| 'footer'
	| 'navbar-international'
	| 'navbar-uk'
	| 'navbar-right'
	| 'navbar-right-anon'
	| 'navbar-top-right'
	| 'navbar-top-right-anon'
	| 'navbar-simple'
	| 'user';

export type TNavMenuKeysForEdition =
	| 'account'
	| 'anon'
	| 'drawer'
	| 'footer'
	| 'navbar'
	| 'navbar-right'
	| 'navbar-right-anon'
	| 'navbar-top-right'
	| 'navbar-top-right-anon'
	| 'navbar-simple'
	| 'user';

export type TNavMenus = {[key in TNavMenuKeys]: TNavMenu};

export type TNavMenusForEdition = {[key in TNavMenuKeysForEdition]: TNavMenu};

export type THeaderProps = THeaderOptions & {
	data: TNavigationData;
};
export type TNavigationData = TNavMenusForEdition &
	TNavSubNavigation & {
		editions: TNavEditions;
		subscribeAction?: TNavAction;
		currentPath?: string;
	};

export type THeaderOptions = {
	variant?: THeaderVariant;
	userIsAnonymous?: boolean;
	userIsLoggedIn?: boolean;
	userIsSubscribed?: boolean;
	showSubNavigation?: boolean;
	showUserNavigation?: boolean;
	showStickyHeader?: boolean;
	showMegaNav?: boolean;
	showLogoLink?: boolean;
	extraHeaderProps?: any;
  	showAskButton?: boolean;
};

export type THeaderVariant = 'simple' | 'large-logo' | string;

export type TNavMenu = {
	label: string | null;
	items: TNavMenuItem[];
};
/** Menu data for the footer will be split into "columns" by the Next navigation API */
export type TNavMenuWithColumns = {
	label: string | null;
	items: TNavMenuItem[][];
};

export type TNavMenuItem = {
	label: string | null;
	url: string | null;
	index?: number;
	selected?: boolean;
	submenu?: TNavMenu | TNavMenuWithColumns;
	meganav?: TNavMeganav[];
	disableTracking?: boolean;
};

export type TNavMeganav = TNavMeganavSections | NavMeganavArticles;

export interface TNavMeganavSections {
	component: 'sectionlist';
	dataset: 'subsections';
	title: string;
	/** This data has been split into "columns" by the Next navigation API */
	data: TNavMenuItem[][];
}

export interface NavMeganavArticles {
	component: 'articlelist';
	dataset: 'popular';
	title: string;
	data: TNavMenuItem[];
}

export type TNavAction = {
	name: string;
	id: string;
	url: string;
};

export type TNavSubNavigation = {
	breadcrumb?: TNavMenuItem[];
	subsections?: TNavMenuItem[];
	'subsections-right'?: TNavMenuItem[];
};

export type TNavEditions = {
	current: TNavEdition;
	others: TNavEdition[];
};

export type TNavEdition = {
	name: string;
	id: string;
	url: string;
};

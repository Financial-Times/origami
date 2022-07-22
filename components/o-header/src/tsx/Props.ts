export type NavMenuKeys =
	| 'account'
	| 'anon'
	| 'drawer-international'
	| 'drawer-uk'
	| 'footer'
	| 'navbar-international'
	| 'navbar-uk'
	| 'navbar-right'
	| 'navbar-right-anon'
	| 'navbar-simple'
	| 'user';

export type NavMenuKeysForEdition =
	| 'account'
	| 'anon'
	| 'drawer'
	| 'footer'
	| 'navbar'
	| 'navbar-right'
	| 'navbar-right-anon'
	| 'navbar-simple'
	| 'user';

export type NavMenus = {[key in NavMenuKeys]: NavMenu};

export type NavMenusForEdition = {[key in NavMenuKeysForEdition]: NavMenu};

export type HeaderProps = HeaderOptions & {
	data: NavigationData;
};
export type NavigationData = NavMenusForEdition &
	NavSubNavigation & {
		editions: NavEditions;
		subscribeAction?: NavAction;
		currentPath?: string;
	};
export type HeaderOptions = {
	variant?: HeaderVariant;
	userIsAnonymous?: boolean;
	userIsLoggedIn?: boolean;
	userIsSubscribed?: boolean;
	showSubNavigation?: boolean;
	showUserNavigation?: boolean;
	showStickyHeader?: boolean;
	showMegaNav?: boolean;
	showLogoLink?: boolean;
	extraHeaderProps?: any;
};

export type HeaderVariant = 'simple' | 'large-logo' | string;

export type NavMenu = {
	label: string | null;
	items: NavMenuItem[];
};

export type NavMenuItem = {
	label: string | null;
	url: string | null;
	index?: number;
	selected?: boolean;
	submenu?: NavMenu | null;
	meganav?: NavMeganav[];
	disableTracking?: boolean;
};

export type NavMeganav = NavMeganavSections | NavMeganavArticles;

export interface NavMeganavSections {
	component: 'sectionlist';
	dataset: 'subsections';
	title: string;
	/** This data has been split into "columns" by the Next navigation API */
	data: NavMenuItem[][];
}

export interface NavMeganavArticles {
	component: 'articlelist';
	dataset: 'popular';
	title: string;
	data: NavMenuItem[];
}

export type NavAction = {
	name: string;
	id: string;
	url: string;
};

export type NavSubNavigation = {
	breadcrumb?: NavMenuItem[];
	subsections?: NavMenuItem[];
	'subsections-right'?: NavMenuItem[];
};

export type NavEditions = {
	current: EditionType;
	others: EditionType[];
};

export type EditionType = {
	name: string;
	id: string;
	url: string;
};

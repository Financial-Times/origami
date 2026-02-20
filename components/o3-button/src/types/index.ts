// Button types
export interface ButtonProps {
	label: string;
	type: 'primary' | 'secondary' | 'ghost';
	size?: 'small' | '';
	fluid?: boolean;
	theme?: 'inverse' | 'mono' | 'neutral';
	ref?:
		| LegacyRef<HTMLButtonElement | null>
		| MutableRef<HTMLButtonElement | null>;
	icon?:
		| 'chevron-left'
		| 'chevron-right'
		| 'upload'
		| 'tick'
		| 'plus'
		| 'chevron-down'
		| 'chevron-up'
		| 'edit'
		| 'download'
		| 'notification'
		| 'outside-page'
		| 'search'
		| 'settings'
		| 'refresh'
		| 'cross'
		| 'link'
		| 'calendar'
		| 'scroll-to'
		| 'sparkles'
		| 'first'
		| 'last'
		| 'list'
		| 'grid'
		| 'play'
		| 'note'
		| 'radar';
	iconPosition?: 'start' | 'end';
	iconOnly?: boolean;
	visuallyHideDisabled?: boolean;
	attributes?: {
		[attribute: string]: string | boolean | Function;
	};
	onClick?: Function;
}

export interface LinkButtonProps extends ButtonProps {
	href: string;
}

// Pagination types
export type ButtonPaginationProps = Pick<ButtonProps, 'theme'> & {
	previousPager: ButtonPaginationPager;
	pages: ButtonPaginationItem[];
	nextPager: ButtonPaginationPager;
	currentPageOnly?: boolean;
};
export interface ButtonPaginationItem {
	href?: string;
	current: boolean;
	number: number;
	onClick?: any;
}
export interface ButtonPaginationPager {
	label: string;
	href?: string;
	onClick?: any;
	attributes?: {
		[attribute: string]: string | boolean;
	};
}

export type Ellipsis = Pick<ButtonProps, 'theme'> & {
	attributes?: {
		[attribute: string]: string | boolean;
	};
};

// ButtonGroup types
export interface ButtonGroupProps {
	children: React.JSX.Element[];
}

export interface MutableRef<T> {
	current: T;
}

export type RefObject<T> = {
	readonly current: T | null;
};

export type RefCallback<T> = (instance: T | null) => void;

export type Ref<T> = RefCallback<T> | RefObject<T> | null;

export type LegacyRef<T> = string | Ref<T>;

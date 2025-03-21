// Button types
export interface ButtonProps {
	label: string;
	type: 'primary' | 'secondary' | 'ghost';
	size?: 'small' | '';
	fluid?: boolean;
	theme?: 'inverse' | 'mono';
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
		| 'search'
		| 'refresh'
		| 'cross';
	iconOnly?: boolean;
	visuallyHideDisabled?: boolean;
	attributes?: {
		[attribute: string]: string | boolean;
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
	children: JSX.Element[];
}

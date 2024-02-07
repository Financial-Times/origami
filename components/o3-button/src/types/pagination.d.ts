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
}

export type Ellipsis = Pick<ButtonProps, 'theme'> & {
	attributes?: {
		[attribute: string]: string | boolean;
	};
};

export interface ButtonProps {
	label: string;
	type: 'primary' | 'secondary' | 'ghost';
	size?: 'small' | '';
	theme?: 'inverse' | 'mono';
	icon?:
		| 'arrow-left'
		| 'arrow-right'
		| 'upload'
		| 'tick'
		| 'plus'
		| 'arrow-down'
		| 'arrow-up'
		| 'edit-outlined'
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

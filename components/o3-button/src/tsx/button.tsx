import type {ButtonProps, LinkButtonProps} from '../types/index';

type ButtonClassProps = Pick<
	ButtonProps,
	| 'visuallyHideDisabled'
	| 'type'
	| 'size'
	| 'icon'
	| 'iconOnly'
	| 'iconPosition'
> & {
	customClasses: string | boolean;
};

function makeClassNames({
	customClasses,
	visuallyHideDisabled,
	type,
	size,
	icon,
	iconOnly,
	iconPosition,
}: ButtonClassProps) {
	const classNames = ['o3-button', `o3-button--${type}`, customClasses];

	if (size) {
		classNames.push(`o3-button--${size}`);
	}

	if (icon) {
		classNames.push(`o3-button-icon o3-button-icon--${icon}`);
	}

	if (icon && iconPosition === 'end') {
		classNames.push('o3-button-icon--end');
	}

	if (icon && iconOnly) {
		classNames.push('o3-button-icon--icon-only');
	}

	if (visuallyHideDisabled) {
		classNames.push('o3-button--hide-disabled');
	}

	return classNames.join(' ');
}

export function Button({
	label,
	type = 'secondary',
	size = '',
	fluid = false,
	theme,
	icon,
	iconPosition,
	iconOnly = false,
	visuallyHideDisabled = false,
	attributes = {},
	onClick,
	ref,
}: ButtonProps) {
	// Combine custom classes with first party o3-button classes,
	// rather than override them.
	const customClasses =
		typeof attributes.className === 'string' ? attributes.className : '';
	delete attributes.className;
	if (theme) {
		attributes['data-o3-theme'] = theme;
	}
	if (fluid) {
		attributes['data-o3-fluid'] = '';
	}
	return (
		<button
			ref={ref}
			onClick={onClick ? event => onClick(event) : undefined}
			className={makeClassNames({
				customClasses,
				visuallyHideDisabled,
				type,
				size,
				icon,
				iconPosition,
				iconOnly,
			})}
			{...attributes}>
			{icon && iconOnly ? (
				<span className="o3-button-icon__label">{label}</span>
			) : (
				label
			)}
		</button>
	);
}

export function LinkButton({
	label,
	type = 'secondary',
	size = '',
	fluid = false,
	theme,
	icon,
	iconPosition,
	iconOnly = false,
	visuallyHideDisabled = false,
	attributes = {},
	href = '',
	onClick,
}: LinkButtonProps) {
	// Combine custom classes with first party o3-button classes,
	// rather than override them.
	const customClasses =
		typeof attributes.className === 'string' ? attributes.className : '';
	delete attributes.className;
	if (theme) {
		attributes['data-o3-theme'] = theme;
	}
	if (fluid) {
		attributes['data-o3-fluid'] = '';
	}
	const classNames =
		makeClassNames({
			customClasses,
			visuallyHideDisabled,
			type,
			size,
			icon,
			iconPosition,
			iconOnly,
		}) + ' o3-apply-focus-rings';
	return (
		<a
			href={href}
			onClick={onClick ? event => onClick(event) : undefined}
			className={classNames}
			{...attributes}>
			{icon && iconOnly ? (
				<span className="o3-button-icon__label">{label}</span>
			) : (
				label
			)}
		</a>
	);
}

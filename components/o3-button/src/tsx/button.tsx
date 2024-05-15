import type {ButtonProps, LinkButtonProps} from '../types/index';

type ButtonClassProps = Pick<
	ButtonProps,
	'visuallyHideDisabled' | 'type' | 'size' | 'icon' | 'iconOnly'
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
}: ButtonClassProps) {
	const classNames = ['o3-button', `o3-button--${type}`, customClasses];

	if (size) {
		classNames.push(`o3-button--${size}`);
	}

	if (icon) {
		classNames.push(`o3-button-icon o3-button-icon--${icon}`);
	}

	if (iconOnly) {
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
	iconOnly = false,
	visuallyHideDisabled = false,
	attributes = {},
	onClick,
}: ButtonProps) {
	// Combine custom classes with first party o3-button classes,
	// rather than override them.
	const customClasses = attributes.className;
	delete attributes.className;
	if (theme) {
		attributes['data-o3-theme'] = theme;
	}
	if (fluid) {
		attributes['data-o3-fluid'] = '';
	}
	return (
		<button
			onClick={onClick ? event => onClick(event) : undefined}
			className={makeClassNames({
				customClasses,
				visuallyHideDisabled,
				type,
				size,
				icon,
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
	iconOnly = false,
	visuallyHideDisabled = false,
	attributes = {},
	href = '',
	onClick,
}: LinkButtonProps) {
	// Combine custom classes with first party o3-button classes,
	// rather than override them.
	const customClasses = attributes.className;
	delete attributes.className;
	if (theme) {
		attributes['data-o3-theme'] = theme;
	}
	if (fluid) {
		attributes['data-o3-fluid'] = '';
	}
	const classNames = makeClassNames({
		customClasses,
		visuallyHideDisabled,
		type,
		size,
		icon,
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

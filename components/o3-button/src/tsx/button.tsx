export interface ButtonProps {
	label: string;
	type: "primary" | "secondary" | "ghost";
	size?: "small" | "";
	theme?: "inverse" | "mono";
	icon?:
		| "arrow-left"
		| "arrow-right"
		| "upload"
		| "tick"
		| "plus"
		| "arrow-down"
		| "arrow-up"
		| "edit-outlined"
		| "download"
		| "search"
		| "refresh"
		| "cross";
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

type ButtonClassProps = Pick<ButtonProps, "visuallyHideDisabled" | "type" | "size" | "theme" | "icon" | "iconOnly"> & {
	customClasses: string | string[];
};

function makeClassNames({customClasses, visuallyHideDisabled, type, size, theme, icon, iconOnly}: ButtonClassProps) {
	const userClasses = Array.isArray(customClasses) ? customClasses : [customClasses];
	const classNames = ['o3-button', `o3-button--${type}`, ...userClasses];

	if (size) {
		classNames.push(`o3-button--${size}`);
	}

	if (theme) {
		classNames.push(`o3-button--${theme}`);
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
	return (
		<button
			onClick={onClick ? event => onClick(event) : null}
			className={makeClassNames({customClasses, visuallyHideDisabled, type, size, theme, icon, iconOnly})}
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
	theme,
	icon,
	iconOnly = false,
	visuallyHideDisabled = false,
	attributes = {},
	href = "",
	onClick,
}: LinkButtonProps) {
	// Combine custom classes with first party o3-button classes,
	// rather than override them.
	const customClasses = attributes.className;
	delete attributes.className;
	return (
		<a
			href={href}
			onClick={onClick ? event => onClick(event) : null}
			className={makeClassNames({customClasses, visuallyHideDisabled, type, size, theme, icon, iconOnly})}
			{...attributes}>
			{icon && iconOnly ? (
				<span className="o3-button-icon__label">{label}</span>
			) : (
				label
			)}
		</a>
	);
}

export interface ButtonProps {
	label: string;
	type: "primary" | "secondary" | "ghost";
	size?: "big" | "";
	theme?: "inverse" | "mono" | "";
	icon?:
		| "arrow-left"
		| "arrow-right"
		| "upload"
		| "tick"
		| "plus"
		| "warning"
		| "arrow-down"
		| "arrow-up"
		| "grid"
		| "list"
		| "edit"
		| "download"
		| "search"
		| "refresh"
		| "cross"
		| ""
		| (string & Record<never, never>);
	iconOnly?: boolean;
	attributes?: {
		[attribute: string]: string | boolean;
	};
	onClick?: Function;
}

interface LinkButtonProps extends ButtonProps {
	href: string;
}

function makeClassNames({ type, size, theme, icon, iconOnly }) {
	const classNames = ["o-buttons", `o-buttons--${type}`];

	if (size) {
		classNames.push(`o-buttons--${size}`);
	}

	if (theme) {
		classNames.push(`o-buttons--${theme}`);
	}

	if (icon) {
		classNames.push(`o-buttons-icon o-buttons-icon--${icon}`);
	}

	if (iconOnly) {
		classNames.push("o-buttons-icon--icon-only");
	}
	return classNames.join(" ");
}

export function Button({
	label,
	type = "secondary",
	size = "",
	theme,
	icon,
	iconOnly = false,
	attributes = {},
	onClick,
}: ButtonProps) {
	return (
		<button
			onClick={onClick ? event => onClick(event) : null}
			className={makeClassNames({ type, size, theme, icon, iconOnly })}
			{...attributes}
		>
			{icon && iconOnly ? (
				<span className="o-buttons-icon__label">{label}</span>
			) : (
				label
			)}
		</button>
	);
}

export function LinkButton({
	label,
	type = "secondary",
	size = "",
	theme,
	icon,
	iconOnly = false,
	attributes = {},
	href = null,
	onClick,
}: LinkButtonProps) {
	return (
		<a
			href={href}
			onClick={onClick ? event => onClick(event) : null}
			className={makeClassNames({ type, size, theme, icon, iconOnly })}
			{...attributes}
		>
			{icon && iconOnly ? (
				<span className="o-buttons-icon__label">{label}</span>
			) : (
				label
			)}
		</a>
	);
}

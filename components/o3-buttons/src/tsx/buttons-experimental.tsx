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
		| (string & Record<never, never>); // Support IDE autocomplete whilst allowing any string https://github.com/microsoft/TypeScript/issues/29729#issuecomment-1331857805
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
	const classNames = ["o3-buttons", `o3-buttons--${type}`];

	if (size) {
		classNames.push(`o-buttons-experimental--${size}`);
	}

	if (theme) {
		classNames.push(`o-buttons-experimental--${theme}`);
	}

	if (icon) {
		classNames.push(`o-buttons-experimental-icon o-buttons-experimental-icon--${icon}`);
	}

	if (iconOnly) {
		classNames.push("o-buttons-experimental-icon--icon-only");
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
				<span className="o-buttons-experimental-icon__label">{label}</span>
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
				<span className="o-buttons-experimental-icon__label">{label}</span>
			) : (
				label
			)}
		</a>
	);
}

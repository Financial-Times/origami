export interface ButtonProps {
	label: string;
	type: 'primary' | 'secondary' | 'ghost';
	size?: 'big' | '';
	theme?: 'inverse' | 'mono' | '';
	icon?:
		| 'arrow-left'
		| 'arrow-right'
		| 'upload'
		| 'tick'
		| 'plus'
		| 'warning'
		| 'arrow-down'
		| 'arrow-up'
		| 'grid'
		| 'list'
		| 'edit'
		| 'download'
		| 'search'
		| 'refresh'
		| 'cross'
		| ''
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

function makeClassNames({type, size, theme, icon, iconOnly}) {
	const classNames = ['o3-button', `o3-button--${type}`];
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

	return classNames.join(' ');
}

export function Button({
	label,
	type = 'secondary',
	size = '',
	theme,
	icon,
	iconOnly = false,
	attributes = {},
	onClick,
}: ButtonProps) {
	return (
		<button
			onClick={onClick ? event => onClick(event) : null}
			className={makeClassNames({type, size, theme, icon, iconOnly})}
			{...attributes}>
			{icon && iconOnly ? (
				<span className="o3-button-icon__label">{label}</span>
			) : (
				label
			)}
		</button>
	);
}
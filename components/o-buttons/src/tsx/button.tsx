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
		| '';
	iconOnly?: boolean;
	attributes?: {
		[attribute: string]: string | boolean;
	};
}

interface LinkButtonProps extends ButtonProps {
	href: string;
}

function ButtonTemplate({
	label,
	type = 'secondary',
	size = '',
	theme,
	icon,
	iconOnly = false,
	href = '',
	attributes = {},
}: ButtonProps | LinkButtonProps) {
	const classNames = ['o-buttons', `o-buttons--${type}`];

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
		classNames.push('o-buttons-icon--icon-only');
	}

	const HtmlTag = href ? 'a' : 'button';

	return (
		<HtmlTag
			{...(href ? {href} : {})}
			className={classNames.join(' ')}
			{...attributes}>
			{icon && iconOnly ? (
				<span className="o-buttons-icon__label">{label}</span>
			) : (
				label
			)}
		</HtmlTag>
	);
}

export function Button({
	label,
	type = 'secondary',
	size = '',
	theme,
	icon,
	iconOnly = false,
	attributes = {},
}: ButtonProps) {
	return ButtonTemplate({
		label,
		type,
		size,
		theme,
		icon,
		iconOnly,
		attributes,
	});
}

export function LinkButton({
	label,
	type = 'secondary',
	size = '',
	theme,
	icon,
	iconOnly = false,
	attributes = {},
	href = '',
}: LinkButtonProps) {
	return ButtonTemplate({
		label,
		type,
		size,
		theme,
		icon,
		iconOnly,
		href,
		attributes,
	});
}

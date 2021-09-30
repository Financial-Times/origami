import PropTypes from 'prop-types';

export interface ButtonProps {
	label: string;
	type: 'primary' | 'secondary';
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
}

export function Button({
	label,
	type = 'primary',
	size = '',
	theme,
	icon,
	iconOnly = false,
}: ButtonProps) {
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

	return (
		<button className={classNames.join(' ')}>
			{iconOnly ? (
				<span className="o-buttons-icon__label">{label}</span>
			) : (
				label
			)}
		</button>
	);
}

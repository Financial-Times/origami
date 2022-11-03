interface RadioBoxLinksProps {
	children: JSX.Element | JSX.Element[];
}
interface RadioBoxLinkProps {
	href: string;
	isCurrent?: boolean;
	value?: string;
	children?: JSX.Element | JSX.Element[] | string;
}

export function RadioBoxLinks({children}: RadioBoxLinksProps) {
	return (
		<div className="o-forms-input o-forms-input--pseudo-radio-link">
			{children}
		</div>
	);
}

export function RadioBoxLink({
	href,
	isCurrent,
	children,
	value,
}: RadioBoxLinkProps) {
	return (
		<a
			className={`o-forms-input__link ${
				isCurrent ? 'o-forms-input__link--current' : ''
			}`}
			href={href}>
			{children || value}
		</a>
	);
}

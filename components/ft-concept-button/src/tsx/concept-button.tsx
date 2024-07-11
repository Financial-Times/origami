export interface ConceptButtonProps {
	// button text
	label: string;
	// text to announce to screenreaders
	ariaLiveText?: string;
	// descriptive label for button
	ariaLabel?: string;
	// button theme
	theme?:
		| 'standard'
		| 'inverse'
		| 'opinion'
		| 'monochrome'
		| 'inverse-monochrome'
		| 'professional-inverse';
	// button type
	type?: 'concept' | 'follow';
	// whether the button is currently pressed
	pressed?: boolean;
	// for props that aren't appropriate in Origami
	extraButtonProps: any;
}
export interface ConceptLinkProps {
	// link text
	label: string;
	href: string;
	// for attributes which aren't appropriate in Origami
	attributes?: {
		[attribute: string]: string | boolean;
	};
	onClick?: Function;
}

function ConceptButton({
	label,
	ariaLabel = label,
	theme,
	extraButtonProps,
	pressed,
	ariaLiveText = null,
	type = 'concept',
}: ConceptButtonProps) {
	return (
		<div
			className={`ft-concept-button ${
				type == 'follow' ? 'ft-concept-button--follow' : ''
			} ${theme ? `ft-concept-button--${theme}` : ''}`}
			data-o-component="ft-concept-button">
			<div className="ft-concept-button__announcement" aria-live="assertive">
				{ariaLiveText}
			</div>
			<button
				aria-pressed={pressed}
				aria-label={ariaLabel}
				type="submit"
				className="ft-concept-button__button"
				{...extraButtonProps}>
				{label}
			</button>
		</div>
	);
}

function ConceptLink({
	label,
	href,
	attributes,
	onClick
}: ConceptLinkProps) {
	return (
		<div
			className="ft-concept-button">
			<a
				className="ft-concept-button__link"
				href={href}
				{...attributes}
				onClick={onClick ? event => onClick(event) : null}>
				{label}
			</a>
		</div>
	);
}

export {ConceptButton, ConceptLink};
export default ConceptButton;

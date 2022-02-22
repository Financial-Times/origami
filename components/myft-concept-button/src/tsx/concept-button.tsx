export interface ConceptButtonProps {
	// button text
	label: string;
	// text to announce to screenreaders
	ariaLiveText?: string;
	// descriptive label for button
	ariaLabel?: string;
	// button theme
	theme?: 'standard' | 'inverse' | 'opinion' | 'monochrome';
	// button type
	type?: 'concept' | 'follow';
	// whether the button is currently pressed
	pressed?: boolean;
	// for props that aren't appropriate in Origami
	extraButtonProps: any;
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
			className={`myft-concept-button ${
				type == 'follow' ? 'myft-concept-button--follow' : ''
			} ${theme ? `myft-concept-button--${theme}` : ''}`}
			data-o-component="myft-concept-button">
			<div className="myft-concept-button__announcement" aria-live="assertive">
				{ariaLiveText}
			</div>
			<button
				aria-pressed={pressed}
				aria-label={ariaLabel}
				type="submit"
				className="myft-concept-button__button"
				{...extraButtonProps}>
				{label}
			</button>
		</div>
	);
}

export {ConceptButton};
export default ConceptButton;

export const classBuilder = (
	base: string,
	addBaseToClasses: boolean = true
): [Function, Function] => {
	const classes: string[] = [addBaseToClasses ? base : ''];

	const addProperty = (property: string, addSeparator: boolean = true) => {
		classes.push(`${base}${addSeparator ? '--' : ''}${property}`);
	};

	const getClasses = () => {
		return classes.join(' ');
	};
	return [addProperty, getClasses];
};

interface getInputClassesArgs {
	highlight?: string;
	highlightValid?: boolean;
	errorMessage?: string;
	isSmall?: boolean;
	inlineInput?: boolean;
	hasSuffix?: boolean;
	hasChildren?: boolean;
	inputType?: string;
	state?: string;
}
export function getInputClasses({
	highlight,
	highlightValid,
	errorMessage,
	isSmall,
	inlineInput,
	hasSuffix,
	hasChildren,
	inputType,
	state,
}: getInputClassesArgs) {
	const [addClass, getClasses] = classBuilder('o-forms-input');

	if (highlightValid && !errorMessage) addClass('valid');
	if (highlight) addClass(highlight); /* todo - us one highlight type */
	if (errorMessage) addClass('invalid');
	if (isSmall) addClass('small');
	if (inlineInput) addClass('inline');
	if (inputType) addClass(inputType);
	if ((hasSuffix || hasChildren) && hasSuffix !== false) addClass('suffix');
	if (state) addClass(state);
	return getClasses();
}

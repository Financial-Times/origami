interface EditorialLayoutHeadingProps {
	headingLevel: '1' | '2' | '3' | '4' | '5';
	children: string | React.JSX.Element | React.JSX.Element[]
}
export const EditorialLayoutHeading = ({headingLevel, children}: EditorialLayoutHeadingProps) => {
	const Heading: keyof JSX.IntrinsicElements = `h${headingLevel}`;
	const headingClass = `o-editorial-layout-heading-${headingLevel}`
	return <Heading className={headingClass}>{children}</Heading>;
};

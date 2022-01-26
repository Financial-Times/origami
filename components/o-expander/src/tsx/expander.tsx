export interface ExpanderProps {
	/**
	 * will always be shown outside of the collapsed content
	 */
	header?: JSX.Element;
	/**
	 * children will be put in o-expander__content
	 */
	children: JSX.Element | JSX.Element[];

	/**
	 * false by default. if it's true then `aria-hidden="false"` is set on
	 * content
	 */
	expanded: boolean;

	/**
	 * toggle button content when hidden
	 */
	collapsedText: string;

	/**
	 * toggle button content when hidden
	 */
	expandedText: string;

	togglePosition: 'before content' | 'after content';
}

export function Expander({
	header,
	children,
	expanded,
	collapsedText = 'show',
	expandedText = 'hide',
	togglePosition = 'before content',
}: ExpanderProps) {
	return (
		<div
			data-o-component="o-expander"
			className="o-expander"
			data-o-expander-shrink-to="hidden">
			{header}
			{togglePosition == 'before content' ? (
				<button className="o-expander__toggle">
					{expanded ? expandedText : collapsedText}
				</button>
			) : null}
			<div
				className="o-expander__content"
				aria-hidden={expanded ? 'false' : 'true'}>
				{children}
			</div>
			{togglePosition == 'after content' ? (
				<button className="o-expander__toggle">
					{expanded ? expandedText : collapsedText}
				</button>
			) : null}
		</div>
	);
}

export default Expander;

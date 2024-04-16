export interface ExpanderProps {
	/**
	 * will always be shown outside of the collapsed content
	 */
	header?: JSX.Element;
	/**
	 * children will be put in `o-expander__content`
	 */
	children: JSX.Element | JSX.Element[];

	/**
	 * `false` by default. if `true` then content is in open-state
	 */
	expanded?: boolean;

	/**
	 * toggle button content when closed
	 */
	collapsedText?: string;

	/**
	 * toggle button content when open
	 */
	expandedText?: string;
}

export function Expander({header = undefined, children, expanded}: ExpanderProps) {
	return (
		<div
			data-o-component="o-expander"
			className="o-expander"
			data-o-expander-shrink-to="hidden">
			{header}
			<button className="o-expander__toggle">
				{expanded ? 'hide' : 'show'}
				{!expanded && (
					<span className="o-expander__visually-hidden">
						(content will be added above button)
					</span>
				)}
			</button>
			<div
				className="o-expander__content"
				aria-hidden={expanded ? 'false' : 'true'}>
				{children}
			</div>
		</div>
	);
}

export default Expander;

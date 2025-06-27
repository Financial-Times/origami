const BaseLink = ({url, attrs = {}, children}) => {
	if (url) {
		return (
			<a href={url} {...attrs}>
				{children}
			</a>
		);
	} else {
		return <span {...attrs}>{children}</span>;
	}
};
// customElements are not passed down to this component from any parent component.
interface LinkProps {
	customElements?: any;
	url?: string | undefined;
	attrs?: {
		'data-trackable'?: string;
		'aria-label'?: string;
		'aria-hidden'?: 'true' | 'false' | undefined;
		className?: string;
		tabIndex?: number;
	};
	children?: React.JSX.Element | React.JSX.Element[] | string;
}

export default ({customElements = {}, ...props}: LinkProps) => {
	const Link = customElements.Link || BaseLink;
	return <Link {...props} />;
};

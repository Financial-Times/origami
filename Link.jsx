import { h } from '@financial-times/x-engine';

const BaseLink = ({ url, attrs = {}, children }) => (
	<a href={url} {...attrs}>{children}</a>
);

export default ({ customElements = {}, ...props }) => {
	if (!props.url) {
		return <span>{props.children}</span>;
	}

	const Link = customElements.Link || BaseLink;
	return <Link {...props} />;
};

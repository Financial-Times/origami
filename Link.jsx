import { h } from '@financial-times/x-engine';

const BaseLink = ({ url, title, attrs, children }) => {
	attrs.href = url;
	if (title) {
		attrs.title = title;
	}

	return <a {...attrs}>{children}</a>;
};

export default ({ customElements = {}, ...props }) => {
	if (!props.url) {
		return <span>{props.children}</span>;
	}

	const Link = customElements.Link || BaseLink;
	return <Link {...props} />;
};

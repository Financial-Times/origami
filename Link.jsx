import { h } from '@financial-times/x-engine'

const BaseLink = ({ url, attrs = {}, children }) => {
	if (url) {
		return (
			<a href={url} {...attrs}>
				{children}
			</a>
		)
	} else {
		return <span {...attrs}>{children}</span>
	}
}

export default ({ customElements = {}, ...props }) => {
	const Link = customElements.Link || BaseLink
	return <Link {...props} />
}

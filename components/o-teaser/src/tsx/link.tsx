import {LinkProps} from './prop-types';


export function Link({url, attrs, children}: LinkProps) {
	if (url) {
		return (
			<a href={url} {...attrs}>
				{children}
			</a>
		);
	} else {
		return <span {...attrs}>{children}</span>;
	}
}

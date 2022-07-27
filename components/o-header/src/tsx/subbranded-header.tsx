import { SubbrandItem } from "./Props";

export function Subbrand({label, url, imageUrl}: SubbrandItem) {
	return (
		<div className="o-header__subbrand" data-o-header-subbrand>
			<a
				className="o-header__subbrand-logo"
				style={{backgroundImage: `url(${imageUrl})`}}
				href={url}
				title={`Go to the ${label} page`}>
				<span className="o-header__visually-hidden">{label}</span>
			</a>
		</div>
	);
}

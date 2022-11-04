import Link from "./link";
import { Standfirst } from "./props";

interface StandfirstProps extends Standfirst {
	headlineTesting?: boolean;
	relativeUrl?: string;
	url?: string;
}

export default ({
	standfirst,
	altStandfirst,
	headlineTesting,
	relativeUrl,
	url,
	...props
}: StandfirstProps) => {
	const displayStandfirst =
		headlineTesting && altStandfirst ? altStandfirst : standfirst;
	const displayUrl = relativeUrl || url;
	return displayStandfirst ? (
		<p className="o-teaser__standfirst">
			<Link
				{...props}
				url={displayUrl}
				attrs={{
					"data-trackable": "standfirst-link",
					tabIndex: -1,
					className: "js-teaser-standfirst-link",
				}}
			>
				{displayStandfirst}
			</Link>
		</p>
	) : null;
};

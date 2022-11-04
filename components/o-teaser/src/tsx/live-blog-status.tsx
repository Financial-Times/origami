import { Status } from "./props";

const LiveBlogLabels = {
	inprogress: "Live",
	comingsoon: "Coming Soon",
	closed: "",
};

const LiveBlogModifiers = {
	inprogress: "live",
	comingsoon: "pending",
	closed: "closed",
};

export default (props: Status) =>
	props.status && props.status !== "closed" ? (
		<div
			className={`o-teaser__timestamp o-teaser__timestamp--${
				LiveBlogModifiers[props.status]
			}`}
		>
			<span className="o-teaser__timestamp-prefix">{` ${
				LiveBlogLabels[props.status]
			} `}</span>
		</div>
	) : null;

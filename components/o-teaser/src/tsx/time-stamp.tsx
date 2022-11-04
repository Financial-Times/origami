import dateformat from "dateformat";
import { DateLike } from "./props";

export default ({ publishedDate }: { publishedDate: DateLike }) => (
	<div className="o-teaser__timestamp">
		<time
			className="o-teaser__timestamp-date"
			dateTime={dateformat(publishedDate, dateformat.masks.isoDateTime, true)}
		>
			{dateformat(publishedDate, dateformat.masks.longDate, true)}
		</time>
	</div>
);

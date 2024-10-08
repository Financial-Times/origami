import TimeStamp from './time-stamp';
import RelativeTime from './relative-time';
import LiveBlogStatus from './live-blog-status';
import AlwaysShowTimestamp from './always-show-timestamp';
import { Status } from './props';

interface StatusProps extends Status {
	useRelativeTimeIfToday?: boolean;
}

export default (props: StatusProps) => {
	if (props.status) {
		return <LiveBlogStatus {...props} />;
	}

	if (props.publishedDate) {
		if (props.useRelativeTimeIfToday) {
			return <AlwaysShowTimestamp {...props} />;
		} else if (props.useRelativeTime) {
			return <RelativeTime {...props} />;
		} else {
			return <TimeStamp {...props} />;
		}
	}

	return null;
};

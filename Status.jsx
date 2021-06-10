import { h } from '@financial-times/x-engine'
import TimeStamp from './TimeStamp'
import RelativeTime from './RelativeTime'
import LiveBlogStatus from './LiveBlogStatus'
import AlwaysShowTimestamp from './AlwaysShowTimestamp'

export default (props) => {
	if (props.status) {
		return <LiveBlogStatus {...props} />
	}

	if (props.publishedDate) {
		if (props.alwaysDisplayTimestamp) {
			return <AlwaysShowTimestamp {...props} />
		} else if (props.useRelativeTime) {
			return <RelativeTime {...props} />
		} else {
			return <TimeStamp {...props} />
		}
	}

	return null
}

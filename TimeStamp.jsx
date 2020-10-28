import { h } from '@financial-times/x-engine'
import dateformat from 'dateformat'

export default ({ publishedDate }) => (
	<div className="o-teaser__timestamp">
		<time
			className="o-teaser__timestamp-date"
			dateTime={dateformat(publishedDate, dateformat.masks.isoDateTime, true)}>
			{dateformat(publishedDate, dateformat.masks.longDate, true)}
		</time>
	</div>
)

import { h } from '@financial-times/x-engine'

const LiveBlogLabels = {
	inprogress: 'Live',
	comingsoon: 'Coming Soon',
	closed: ''
}

const LiveBlogModifiers = {
	inprogress: 'live',
	comingsoon: 'pending',
	closed: 'closed'
}

export default ({ status }) =>
	status && status !== 'closed' ? (
		<div className={`o-teaser__timestamp o-teaser__timestamp--${LiveBlogModifiers[status]}`}>
			<span className="o-teaser__timestamp-prefix">{` ${LiveBlogLabels[status]} `}</span>
		</div>
	) : null

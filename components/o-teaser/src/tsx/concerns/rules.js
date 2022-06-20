/**
 * Rules are sets of exclusive properties.
 * They are used to ensure that only one property can take precedence.
 */
const rulesets = {
	media: (props) => {
		// If this condition evaluates to true then no headshot nor image will be displayed.
		if (props.showVideo && props.video && props.video.url) {
			return 'video'
		}

		if (props.showHeadshot && props.headshot && props.indicators.isColumn) {
			return 'headshot'
		}

		if (props.showImage && props.image && props.image.url) {
			return 'image'
		}
	},
	theme: (props) => {
		if (props.theme) {
			return props.theme
		}

		if (props.status === 'inprogress') {
			return 'live'
		}

		if (props.indicators && props.indicators.isOpinion) {
			return 'opinion'
		}

		if (props.indicators && props.indicators.isEditorsChoice) {
			return 'highlight'
		}

		if (props.parentTheme) {
			return props.parentTheme
		}
	}
}

/**
 * Rules
 * @param {String} rule
 * @param {Props} props
 * @returns {String|null}
 */
export default function rules(rule, props) {
	if (rulesets.hasOwnProperty(rule)) {
		return rulesets[rule](props)
	} else {
		throw Error(`No ruleset available named ${rule}`)
	}
}

export const media = (props) => rules('media', props)
export const theme = (props) => rules('theme', props)

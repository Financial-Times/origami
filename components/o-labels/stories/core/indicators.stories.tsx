import ODate from "@financial-times/o-date/main"
import {Date as DateTSX} from "@financial-times/o-date/src/tsx/date"
import type {Meta, StoryFn} from "@storybook/react"
import {useEffect} from "react"
import {
	IndicatorLabel as OIndicatorLabel,
	IndicatorLabelProps,
} from "../../src/tsx/label"
import "../labels.scss"

export default {
	title: "Components/o-labels",
	component: OIndicatorLabel,
	argTypes: {
		inverse: {control: "boolean", defaultValue: false},
		dateTime: {control: "date"},
		timestamp: {
			table: {
				disable: true,
			},
		},
		indicator: {
			table: {
				disable: true,
			},
		},
	},
} as Meta<IndicatorLabelProps>

type IndicatorStory = StoryFn<IndicatorLabelProps & {dateTime: Date | number}>
const Template: IndicatorStory = args => {
	useEffect(() => {
		let dates = ODate.init()
		return function cleanup() {
			dates = Array.isArray(dates) ? dates : [dates]
			dates.forEach(date => date.destroy())
		}
	})
	const dateString = args.dateTime && new Date(args.dateTime).toISOString()
	if (dateString) {
		args.timestamp = <DateTSX dateTime={dateString} />
	}
	return <OIndicatorLabel {...args} />
}

export const LiveIndicatorLabel: IndicatorStory = {
	render: Template,

	args: {
		indicator: "live",
		status: "live",
		badge: false,
	},

	argTypes: {
		dateTime: {
			table: {
				disable: true,
			},
		},
	},
}

export const ClosedIndicatorLabel: IndicatorStory = {
	render: Template,

	args: {
		indicator: "closed",
		status: "closed",
		badge: false,
	},

	argTypes: {
		dateTime: {
			table: {
				disable: true,
			},
		},
	},
}

export const NewIndicatorLabel: IndicatorStory = {
	render: Template,

	args: {
		indicator: "new",
		status: "new",
		badge: false,
		dateTime: Date.now(),
	},

	argTypes: {
		badge: {
			table: {
				disable: true,
			},
		},
	},
}

export const UpdatedIndicatorLabel: IndicatorStory = {
	render: Template,

	args: {
		indicator: "updated",
		status: "updated",
		dateTime: Date.now(),
	},

	argTypes: {
		badge: {
			table: {
				disable: true,
			},
		},
	},
}

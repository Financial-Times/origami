import type {Meta, StoryFn} from "@storybook/react"
import {ComponentProps, useEffect} from "react"
import javascript from "../main"
import {Date as ODate, DatePrinter} from "../src/tsx/date"

// the storybook args are slightly different to the Date props as dateTime is a
// UNIX timestamp, the format storybook uses in its controls
type DateStory = StoryFn<
	Omit<ComponentProps<typeof ODate>, "dateTime"> & {
		dateTime: number
	}
>

const defaultDateTimeObj = new Date()
defaultDateTimeObj.setHours(new Date().getHours() - 6)
const defaultDateTime = defaultDateTimeObj.getTime()

export default {
	title: "Components/o-date",
	component: ODate,
	argTypes: {
		dateTime: {control: "date", defaultValue: defaultDateTime},
		format: {
			control: "select",
			options: [
				"today-or-yesterday-or-nothing",
				"date-only",
				"time-ago-limit-4-hours",
				"time-ago-limit-24-hours",
				"time-ago-abbreviated",
				"time-ago-abbreviated-limit-4-hours",
				"time-ago-no-seconds",
			],
		},
	},
	parameters: {controls: {sort: "requiredFirst"}},
} as Meta<typeof ODate>

const Template: DateStory = args => {
	useEffect(() => {
		let dates = javascript.init()
		return function cleanup() {
			dates = Array.isArray(dates) ? dates : [dates]
			dates.forEach(date => date.destroy())
		}
	})
	return (
		<ODate {...{...args, dateTime: new Date(args.dateTime).toISOString()}} />
	)
}

export const Abbreviated: DateStory = {
	render: Template,

	args: {
		dateTime: new Date("2000-06-14T23:00:00.000Z").getTime(),
		children: "June 15, 2000",
	},
}

export const Relative: DateStory = {
	render: Template,
	args: {
		dateTime: new Date("2000-06-14T23:00:00.000Z").getTime(),
		children: "May 10, 2000"
	},
}

export const TodayOrYesterday: DateStory = {
	render: Template,
	args: {
		format: "today-or-yesterday-or-nothing",
		children: "May 10, 2000",
		dateTime: new Date(Date.now() - (60 * 60 * 1000)).getTime(),
	},
}

export const FourHourLimit: DateStory = {
	render: Template,
	name: "4 Hour Limit",

	args: {
		format: "time-ago-limit-4-hours",
		dateTime: new Date(Date.now() - (60 * 60 * 1000)).getTime(),
	},
}

export const TwentyFourHourLimit: DateStory = {
	render: Template,
	name: "24 Hour Limit",

	args: {
		format: "time-ago-limit-24-hours",
		dateTime: new Date(Date.now() - (60 * 60 * 1000)).getTime(),
	},
}

export const CustomFormatting: DateStory = {
	render: Template,

	args: {
		dateTime: new Date("1912-04-15T05:18Z").getTime(),
		format: "h:mm a",
	},

	argTypes: {
		format: {control: "text"},
	},
}

export const Multiple: DateStory = {
	render: Template,

	args: {
		dateTime: new Date("1912-04-15T05:18Z").getTime(),
		format: "date-only",
		children: (
			<>
				<DatePrinter /> <DatePrinter format={"time-ago-limit-4-hours"} />{" "}
				<DatePrinter format={"h:mm"} />
			</>
		),
	},
}

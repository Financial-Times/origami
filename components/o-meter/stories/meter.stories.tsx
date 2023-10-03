import {Fragment} from "react"
import {StoryObj, Meta} from "@storybook/react"

import {Meter} from "../src/tsx/meter"
import "./meter.scss"
import {higherIsBetterDemoData, lowerIsBetterDemoData} from "./meterData"

export default {
	title: "Components/o-meter",
	component: Meter,
	args: {
		min: 0,
		max: 100,
		low: 0,
		high: 100,
		optimum: 100,
		valueBox: false,
	},
} as Meta<typeof Meter>

const ComplexStory = args => {
	let meters = args.items
	return (
		<Fragment>
			{meters.map(({description, meterArgs}, i) => (
				<Fragment key={i}>
					<p dangerouslySetInnerHTML={{__html: description}} />
					<Meter {...meterArgs}></Meter>
				</Fragment>
			))}
		</Fragment>
	)
}

export const simpleMeter: StoryObj<typeof Meter> = {
	args: {
		label: "demo meter 33",
		value: 33,
	},
}

export const higherIsBetter = {
	render: ComplexStory,
	name: "Simple Meter With Different Values Where Higher Is Better",

	args: {
		items: higherIsBetterDemoData,
	},
}

export const lowerIsBetter = {
	render: ComplexStory,
	name: "Simple Meter With Different Values Where Lower Is Better",

	args: {
		items: lowerIsBetterDemoData,
	},
}

export const optionalBox: StoryObj<typeof Meter> = {
	name: "Meter With Optional Value Box",

	args: {
		label: "demo meter 2.5",
		value: 2.5,
		max: 10,
		high: 10,
		valueBox: true,
	},
}

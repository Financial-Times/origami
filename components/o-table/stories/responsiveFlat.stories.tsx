import {useEffect} from "react"
import javascript from "../main"
import {ResponsiveFlatTable} from "../src/tsx/table"
import {baseTableContents} from "./baseTableContents"
import {Meta} from "@storybook/react"

export default {
	title: "Components/o-table/Responsive",
	component: ResponsiveFlatTable,
	args: {
		horizontalLines: true,
		compact: false,
		stripes: false,
	},
} as Meta<typeof ResponsiveFlatTable>

export const TableWithResponsiveFlat = {
	render: args => {
		useEffect(() => {
			javascript.init()
		})
		return (
			<ResponsiveFlatTable {...args}>{baseTableContents}</ResponsiveFlatTable>
		)
	},
}

import {Table} from "../src/tsx/table"
import {baseTableContents} from "./baseTableContents"
import {useEffect} from "react"
import javascript from "../main"
import {Filter} from "../src/tsx/components"
import {Select} from "@financial-times/o-forms/src/tsx/Select"
import {Meta} from "@storybook/react"

export default {
	title: "Components/o-table/Table with Filter",
	component: Table,
	args: {
		horizontalLines: true,
		compact: false,
		stripes: false,
	},
} as Meta<typeof Table>

const selectFilter = (
	<Select
		name="Test"
		title="Filter by characteristic:"
		isOptional={false}
		inlineField={true}
		isVerticalCenter={true}>
		<option value="">All</option>
		<option value="Juicy">Juicy</option>
		<option value="Smelly">Smelly</option>
		<option value="Chewy">Chewy</option>
		<option value="Sweet">Sweet</option>
		<option value="Crunchy">Crunchy</option>
	</Select>
)

const TextInputFilter = () => {
	return (
		<label className="o-forms-field o-forms-field--inline o--if-js o-forms-field--demo">
			<span className="o-forms-title o-forms-title--vertical-center o-forms-title--shrink">
				<span className="o-forms-title__main">Filter by characteristic:</span>
			</span>

			<span className="o-forms-input o-forms-input--text o-forms-input--invalid">
				<input
					type="text"
					data-o-table-filter-id="fruit-filter"
					data-o-table-filter-column="2"
					id="filter"
					className="o-forms__text"
				/>
			</span>
		</label>
	)
}
export const TableWithSelectFilter = {
	render: _args => {
		useEffect(() => {
			javascript.init()
		})
		return (
			<>
				<div id="demo-table-caption">
					<h2 className="o-typography-heading-level-2">
						What fruit is the frutiest?
					</h2>

					<Filter
						id="filter-fruity-fruit"
						filterId="fruit-filter"
						filterColumn="2"
						filterComponent={selectFilter}
					/>
				</div>
				<Table id="fruit-filter" aria-describedby="demo-table-caption">
					{baseTableContents}
				</Table>
			</>
		)
	},
}

export const TableWithTextInput = {
	render: _args => {
		useEffect(() => {
			javascript.init()
		})
		return (
			<>
				<div id="demo-table-caption">
					<h2 className="o-typography-heading-level-2">
						What fruit is the frutiest?
					</h2>

					<TextInputFilter />
				</div>
				<Table id="fruit-filter" aria-describedby="demo-table-caption">
					{baseTableContents}
				</Table>
			</>
		)
	},
}

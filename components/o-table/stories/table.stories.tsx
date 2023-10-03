import "./table.scss"
import {Table} from "../src/tsx/table"
import {
	TableBody,
	TableCaption,
	TableData,
	TableFoot,
	TableFootnote,
	TableHead,
	TableHeading,
	TableRow,
} from "../src/tsx/components"

import {useEffect} from "react"
import javascript from "../main"
import {baseTableContents} from "./baseTableContents"
import {Meta} from "@storybook/react"

export default {
	title: "Components/o-table/Basic",
	component: Table,
	args: {
		horizontalLines: true,
		compact: false,
		stripes: false,
	},
} as Meta<typeof Table>

const Template = args => {
	useEffect(() => {
		javascript.init()
	})

	return <Table {...args}>{baseTableContents}</Table>
}
export const BasicTable = {
	render: Template,
}

export const BasicTableWithCaptionAndFootnote = {
	render: args => {
		useEffect(() => {
			javascript.init()
		})

		return (
			<Table {...args}>
				<TableCaption>
					<h2 className="o-typography-heading-level-2">
						Origami Team's Favourite Fruit
					</h2>
				</TableCaption>
				{baseTableContents}
				<TableFoot>
					<TableRow>
						<TableFootnote colspan="5">
							Source: The Origami team&apos;s love of fruit.
						</TableFootnote>
					</TableRow>
				</TableFoot>
			</Table>
		)
	},
}

export const BasicTableWithLinks = {
	render: args => {
		useEffect(() => {
			javascript.init()
		})

		return (
			<Table {...args}>
				<TableHead className="example">
					<TableRow>
						<TableHeading>Fruit</TableHeading>
						<TableHeading>Genus</TableHeading>
						<TableHeading>Characteristic</TableHeading>
						<TableHeading dataType="numeric">Cost&#xA0;(GBP)</TableHeading>
						<TableHeading dataType="numeric">Cost&#xA0;(EUR)</TableHeading>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableData>
							<a
								className="o-typography-link"
								href="https://en.wikipedia.org/wiki/Pitaya">
								Dragonfruit
							</a>
						</TableData>
						<TableData>Stenocereus</TableData>
						<TableData>Juicy</TableData>
						<TableData dataType="numeric">3</TableData>
						<TableData dataType="numeric">2.72</TableData>
					</TableRow>
					<TableRow>
						<TableData>
							<a
								className="o-typography-link"
								href="https://en.wikipedia.org/wiki/Durian">
								Durian
							</a>
						</TableData>
						<TableData>Durio</TableData>
						<TableData>Smelly</TableData>
						<TableData dataType="numeric">1.75</TableData>
						<TableData dataType="numeric">1.33</TableData>
					</TableRow>
					<TableRow>
						<TableData>
							<a
								className="o-typography-link"
								href="https://en.wikipedia.org/wiki/Manilkara_zapota">
								Naseberry
							</a>
						</TableData>
						<TableData>Manilkara</TableData>
						<TableData>Chewy</TableData>
						<TableData dataType="numeric">2</TableData>
						<TableData dataType="numeric">1.85</TableData>
					</TableRow>
					<TableRow>
						<TableData>
							<a
								className="o-typography-link"
								href="https://en.wikipedia.org/wiki/Strawberry">
								Strawberry
							</a>
						</TableData>
						<TableData>Fragaria</TableData>
						<TableData>Sweet</TableData>
						<TableData dataType="numeric">1.5</TableData>
						<TableData dataType="numeric">1.69</TableData>
					</TableRow>
					<TableRow>
						<TableData>
							<a
								className="o-typography-link"
								href="https://en.wikipedia.org/wiki/Apple">
								Apple
							</a>
						</TableData>
						<TableData>Malus</TableData>
						<TableData>Crunchy</TableData>
						<TableData dataType="numeric">0.5</TableData>
						<TableData dataType="numeric">0.56</TableData>
					</TableRow>
				</TableBody>
			</Table>
		)
	},
}

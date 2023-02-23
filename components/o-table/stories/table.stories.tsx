import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import './table.scss';
import {
	NumericTableData,
	NumericTableHeading,
	Table,
	TableBody, TableCaption,
	TableData, TableFoot, TableFootnote,
	TableHead,
	TableHeading,
	TableRow
} from "../src/tsx/table";

export default {
	title: 'Components/o-table',
	component: Table,
	decorators: [withDesign, withHtml]
};

const Template = (args) => {

	return <Table {...args}>
		{baseTableContents}
	</Table>;
}
export const BasicTable = Template.bind({});

export const BasicTableWithCaptionAndFootnote = (args) => {
	return <Table {...args}>
		<TableCaption>
			<h2 className="o-typography-heading-level-2">Table Caption</h2>
		</TableCaption>
		{baseTableContents}
		<TableFoot>
			<TableRow>
				<TableFootnote>Source: The Origami team&apos;s love of fruit.</TableFootnote>
			</TableRow>
		</TableFoot>
	</Table>
}


const baseTableContents = (
	<>
		<TableHead className='example'>
			<TableRow>
				<TableHeading>Fruit</TableHeading>
				<TableHeading>Genus</TableHeading>
				<TableHeading>Characteristic</TableHeading>
				<NumericTableHeading>
					Cost&#xA0;(GBP)
				</NumericTableHeading>
				<NumericTableHeading>
					Cost&#xA0;(EUR)
				</NumericTableHeading>
			</TableRow>
		</TableHead>
		<TableBody>
			<TableRow>
				<TableData>Dragonfruit</TableData>
				<TableData>Stenocereus</TableData>
				<TableData>Juicy</TableData>
				<NumericTableData>3</NumericTableData>
				<NumericTableData>2.72</NumericTableData>
			</TableRow>
			<TableRow>
				<TableData>Durian</TableData>
				<TableData>Durio</TableData>
				<TableData>Smelly</TableData>
				<NumericTableData>1.75</NumericTableData>
				<NumericTableData>1.33</NumericTableData>
			</TableRow>
			<TableRow>
				<TableData>Naseberry</TableData>
				<TableData>Manilkara</TableData>
				<TableData>Chewy</TableData>
				<NumericTableData>2</NumericTableData>
				<NumericTableData>1.85</NumericTableData>
			</TableRow>
			<TableRow>
				<TableData>Strawberry</TableData>
				<TableData>Fragaria</TableData>
				<TableData>Sweet</TableData>
				<NumericTableData>1.5</NumericTableData>
				<NumericTableData>1.69</NumericTableData>
			</TableRow>
			<TableRow>
				<TableData>Apple</TableData>
				<TableData>Malus</TableData>
				<TableData>Crunchy</TableData>
				<NumericTableData>0.5</NumericTableData>
				<NumericTableData>0.56</NumericTableData>
			</TableRow>
		</TableBody>
	</>)

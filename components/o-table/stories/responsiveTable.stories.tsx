import {useEffect} from "react";
import {ResponsiveFlatTable, ResponsiveOverflowTable, ResponsiveScrollTable} from "../src/tsx/table";
import withHtml from 'origami-storybook-addon-html';
import javascript from '../main';
import {withDesign} from "storybook-addon-designs";
import {
	NumericTableData,
	NumericTableHeading,
	TableBody,
	TableData,
	TableHead,
	TableHeading,
	TableRow
} from "../src/tsx/components";
import {baseTableContents} from "./baseTableContents";

export default {
	title: 'Components/o-table/Responsive',
	component: ResponsiveScrollTable,
	decorators: [withDesign, withHtml]
};

export const TableWithResponsiveOverflow = (args) => {
	useEffect(() => {
		javascript.init();
	})
	return <ResponsiveOverflowTable {...args}>{baseTableContents}</ResponsiveOverflowTable>
}
export const TableWithResponsiveScroll = (args) => {
	useEffect(() => {
		javascript.init();
	})
	return <ResponsiveScrollTable {...args}>{baseTableContents}</ResponsiveScrollTable>
}
export const TableWithResponsiveFlat = (args) => {
	useEffect(() => {
		javascript.init();
	})
	return <ResponsiveFlatTable {...args}>{baseTableContents}</ResponsiveFlatTable>
}
TableWithResponsiveFlat.bind({});
TableWithResponsiveFlat.args = {
	expanded: false,
	minimumRows: 5
}

export const ExpandingTable = (args) => {
	useEffect(() => {
		javascript.init();
	});

	return <ResponsiveOverflowTable minimumRows={args.minimumRows} {...args}>
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
			<TableRow>
				<TableData>Peach</TableData>
				<TableData>Prunus</TableData>
				<TableData>Sweet</TableData>
				<NumericTableData>1.5</NumericTableData>
				<NumericTableData>1.56</NumericTableData>
			</TableRow>
			<TableRow>
				<TableData>Tomato</TableData>
				<TableData>Solanum</TableData>
				<TableData>Umami</TableData>
				<NumericTableData>1.80</NumericTableData>
				<NumericTableData>2.03</NumericTableData>
			</TableRow>
		</TableBody>
	</ResponsiveOverflowTable>
}
ExpandingTable.args = {
	minimumRows: 2,
}

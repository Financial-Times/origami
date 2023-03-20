import {useEffect} from "react";
import {ResponsiveFlatTable, ResponsiveOverflowTable, ResponsiveScrollTable} from "../src/tsx/table";
import withHtml from 'origami-storybook-addon-html';
import javascript from '../main';
import {withDesign} from "storybook-addon-designs";
import {
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
				<TableHeading dataType='numeric'>
					Cost&#xA0;(GBP)
				</TableHeading>
				<TableHeading dataType='numeric'>
					Cost&#xA0;(EUR)
				</TableHeading>
			</TableRow>
		</TableHead>
		<TableBody>
			<TableRow>
				<TableData>Dragonfruit</TableData>
				<TableData>Stenocereus</TableData>
				<TableData>Juicy</TableData>
				<TableData dataType='numeric'>3</TableData>
				<TableData dataType='numeric'>2.72</TableData>
			</TableRow>
			<TableRow>
				<TableData>Durian</TableData>
				<TableData>Durio</TableData>
				<TableData>Smelly</TableData>
				<TableData dataType='numeric'>1.75</TableData>
				<TableData dataType='numeric'>1.33</TableData>
			</TableRow>
			<TableRow>
				<TableData>Naseberry</TableData>
				<TableData>Manilkara</TableData>
				<TableData>Chewy</TableData>
				<TableData dataType='numeric'>2</TableData>
				<TableData dataType='numeric'>1.85</TableData>
			</TableRow>
			<TableRow>
				<TableData>Strawberry</TableData>
				<TableData>Fragaria</TableData>
				<TableData>Sweet</TableData>
				<TableData dataType='numeric'>1.5</TableData>
				<TableData dataType='numeric'>1.69</TableData>
			</TableRow>
			<TableRow>
				<TableData>Apple</TableData>
				<TableData>Malus</TableData>
				<TableData>Crunchy</TableData>
				<TableData dataType='numeric'>0.5</TableData>
				<TableData dataType='numeric'>0.56</TableData>
			</TableRow>
			<TableRow>
				<TableData>Peach</TableData>
				<TableData>Prunus</TableData>
				<TableData>Sweet</TableData>
				<TableData dataType='numeric'>1.5</TableData>
				<TableData dataType='numeric'>1.56</TableData>
			</TableRow>
			<TableRow>
				<TableData>Tomato</TableData>
				<TableData>Solanum</TableData>
				<TableData>Umami</TableData>
				<TableData dataType='numeric'>1.80</TableData>
				<TableData dataType='numeric'>2.03</TableData>
			</TableRow>
		</TableBody>
	</ResponsiveOverflowTable>
}
ExpandingTable.args = {
	minimumRows: 2,
}

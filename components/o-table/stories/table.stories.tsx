import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import './table.scss';
import {Table, TableBody, TableData, TableHead, TableHeading, TableRow} from "../src/tsx/table";

export default {
	title: 'Components/o-table',
	component: Table,
	decorators: [withDesign, withHtml]
};

export const Template = () => {
	return <Table>
		<TableHead className='example'>
		<TableRow>
			<TableHeading scope="col" role="columnheader">Fruit</TableHeading>
			<TableHeading scope="col" role="columnheader">Genus</TableHeading>
			<TableHeading scope="col" role="columnheader">Characteristic</TableHeading>
			<TableHeading scope="col" role="columnheader" data-o-table-data-type="numeric" className="o-table__cell--numeric">
				Cost&#xA0;(GBP)
			</TableHeading>
			<TableHeading scope="col" role="columnheader" data-o-table-data-type="numeric" className="o-table__cell--numeric">
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
			<td>Strawberry</td>
			<td>Fragaria</td>
			<td>Sweet</td>
			<td className="o-table__cell--numeric">1.5</td>
			<td className="o-table__cell--numeric">1.69</td>
		</TableRow>
		<TableRow>
			<td>Apple</td>
			<td>Malus</td>
			<td>Crunchy</td>
			<td className="o-table__cell--numeric">0.5</td>
			<td className="o-table__cell--numeric">0.56</td>
		</TableRow>
		</TableBody>
	</Table>;
}
export const BaseTable = Template.bind({});

import {
	TableBody,
	TableData,
	TableHead,
	TableHeading,
	TableRow
} from "../src/tsx/components";

export const baseTableContents = (
	<>
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
		</TableBody>
	</>)

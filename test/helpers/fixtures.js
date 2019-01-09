
const longTableWithContainer = `
<div class="o-table-container">
	<div class="o-table-overlay-wrapper">
		<div class="o-table-scroll-wrapper">
			<table class="o-table" data-o-component="o-table">
				<thead>
					<tr>
						<th scope="col" role="columnheader">Fruit</th>
						<th scope="col" role="columnheader">Genus</th>
						<th scope="col" role="columnheader">Characteristic</th>
						<th scope="col" role="columnheader" data-o-table-data-type="numeric" class="o-table__cell--numeric">Cost&nbsp;(GBP)</th>
						<th scope="col" role="columnheader" data-o-table-data-type="numeric" class="o-table__cell--numeric">Cost&nbsp;(EUR)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Dragonfruit</td>
						<td>Stenocereus</td>
						<td>Juicy</td>
						<td class="o-table__cell--numeric">3</td>
						<td class="o-table__cell--numeric">2.72</td>
					</tr>
					<tr>
						<td>Durian</td>
						<td>Durio</td>
						<td>Smelly</td>
						<td class="o-table__cell--numeric">1.75</td>
						<td class="o-table__cell--numeric">1.33</td>
					</tr>
					<tr>
						<td>Naseberry</td>
						<td>Manilkara</td>
						<td>Chewy</td>
						<td class="o-table__cell--numeric">2</td>
						<td class="o-table__cell--numeric">1.85</td>
					</tr>
					<tr>
						<td>Strawberry</td>
						<td>Fragaria</td>
						<td>Sweet</td>
						<td class="o-table__cell--numeric">1.5</td>
						<td class="o-table__cell--numeric">1.69</td>
					</tr>
					<tr>
						<td>Apple</td>
						<td>Malus</td>
						<td>Crunchy</td>
						<td class="o-table__cell--numeric">0.5</td>
						<td class="o-table__cell--numeric">0.56</td>
					</tr>
					<tr>
						<td>Dragonfruit</td>
						<td>Stenocereus</td>
						<td>Juicy</td>
						<td class="o-table__cell--numeric">3</td>
						<td class="o-table__cell--numeric">2.72</td>
					</tr>
					<tr>
						<td>Durian</td>
						<td>Durio</td>
						<td>Smelly</td>
						<td class="o-table__cell--numeric">1.75</td>
						<td class="o-table__cell--numeric">1.33</td>
					</tr>
					<tr>
						<td>Naseberry</td>
						<td>Manilkara</td>
						<td>Chewy</td>
						<td class="o-table__cell--numeric">2</td>
						<td class="o-table__cell--numeric">1.85</td>
					</tr>
					<tr>
						<td>Strawberry</td>
						<td>Fragaria</td>
						<td>Sweet</td>
						<td class="o-table__cell--numeric">1.5</td>
						<td class="o-table__cell--numeric">1.69</td>
					</tr>
					<tr>
						<td>Apple</td>
						<td>Malus</td>
						<td>Crunchy</td>
						<td class="o-table__cell--numeric">0.5</td>
						<td class="o-table__cell--numeric">0.56</td>
					</tr>
					<tr>
						<td>Dragonfruit</td>
						<td>Stenocereus</td>
						<td>Juicy</td>
						<td class="o-table__cell--numeric">3</td>
						<td class="o-table__cell--numeric">2.72</td>
					</tr>
					<tr>
						<td>Durian</td>
						<td>Durio</td>
						<td>Smelly</td>
						<td class="o-table__cell--numeric">1.75</td>
						<td class="o-table__cell--numeric">1.33</td>
					</tr>
					<tr>
						<td>Naseberry</td>
						<td>Manilkara</td>
						<td>Chewy</td>
						<td class="o-table__cell--numeric">2</td>
						<td class="o-table__cell--numeric">1.85</td>
					</tr>
					<tr>
						<td>Strawberry</td>
						<td>Fragaria</td>
						<td>Sweet</td>
						<td class="o-table__cell--numeric">1.5</td>
						<td class="o-table__cell--numeric">1.69</td>
					</tr>
					<tr>
						<td>Apple</td>
						<td>Malus</td>
						<td>Crunchy</td>
						<td class="o-table__cell--numeric">0.5</td>
						<td class="o-table__cell--numeric">0.56</td>
					</tr>
					<tr>
						<td>Dragonfruit</td>
						<td>Stenocereus</td>
						<td>Juicy</td>
						<td class="o-table__cell--numeric">3</td>
						<td class="o-table__cell--numeric">2.72</td>
					</tr>
					<tr>
						<td>Durian</td>
						<td>Durio</td>
						<td>Smelly</td>
						<td class="o-table__cell--numeric">1.75</td>
						<td class="o-table__cell--numeric">1.33</td>
					</tr>
					<tr>
						<td>Naseberry</td>
						<td>Manilkara</td>
						<td>Chewy</td>
						<td class="o-table__cell--numeric">2</td>
						<td class="o-table__cell--numeric">1.85</td>
					</tr>
					<tr>
						<td>Strawberry</td>
						<td>Fragaria</td>
						<td>Sweet</td>
						<td class="o-table__cell--numeric">1.5</td>
						<td class="o-table__cell--numeric">1.69</td>
					</tr>
					<tr>
						<td>Apple</td>
						<td>Malus</td>
						<td>Crunchy</td>
						<td class="o-table__cell--numeric">0.5</td>
						<td class="o-table__cell--numeric">0.56</td>
					</tr>
					<tr>
						<td>Dragonfruit</td>
						<td>Stenocereus</td>
						<td>Juicy</td>
						<td class="o-table__cell--numeric">3</td>
						<td class="o-table__cell--numeric">2.72</td>
					</tr>
					<tr>
						<td>Durian</td>
						<td>Durio</td>
						<td>Smelly</td>
						<td class="o-table__cell--numeric">1.75</td>
						<td class="o-table__cell--numeric">1.33</td>
					</tr>
					<tr>
						<td>Naseberry</td>
						<td>Manilkara</td>
						<td>Chewy</td>
						<td class="o-table__cell--numeric">2</td>
						<td class="o-table__cell--numeric">1.85</td>
					</tr>
					<tr>
						<td>Strawberry</td>
						<td>Fragaria</td>
						<td>Sweet</td>
						<td class="o-table__cell--numeric">1.5</td>
						<td class="o-table__cell--numeric">1.69</td>
					</tr>
					<tr>
						<td>Apple</td>
						<td>Malus</td>
						<td>Crunchy</td>
						<td class="o-table__cell--numeric">0.5</td>
						<td class="o-table__cell--numeric">0.56</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
`;

const shortTableWithContainer = `
<div class="o-table-container">
	<div class="o-table-overlay-wrapper">
		<div class="o-table-scroll-wrapper">
			<table class="o-table" data-o-component="o-table">
				<thead>
					<tr>
						<th scope="col" role="columnheader">Fruit</th>
						<th scope="col" role="columnheader">Genus</th>
						<th scope="col" role="columnheader">Characteristic</th>
						<th scope="col" role="columnheader" data-o-table-data-type="numeric" class="o-table__cell--numeric">Cost&nbsp;(GBP)</th>
						<th scope="col" role="columnheader" data-o-table-data-type="numeric" class="o-table__cell--numeric">Cost&nbsp;(EUR)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Dragonfruit</td>
						<td>Stenocereus</td>
						<td>Juicy</td>
						<td class="o-table__cell--numeric">3</td>
						<td class="o-table__cell--numeric">2.72</td>
					</tr>
					<tr>
						<td>Durian</td>
						<td>Durio</td>
						<td>Smelly</td>
						<td class="o-table__cell--numeric">1.75</td>
						<td class="o-table__cell--numeric">1.33</td>
					</tr>
					<tr>
						<td>Naseberry</td>
						<td>Manilkara</td>
						<td>Chewy</td>
						<td class="o-table__cell--numeric">2</td>
						<td class="o-table__cell--numeric">1.85</td>
					</tr>
					<tr>
						<td>Strawberry</td>
						<td>Fragaria</td>
						<td>Sweet</td>
						<td class="o-table__cell--numeric">1.5</td>
						<td class="o-table__cell--numeric">1.69</td>
					</tr>
					<tr>
						<td>Apple</td>
						<td>Malus</td>
						<td>Crunchy</td>
						<td class="o-table__cell--numeric">0.5</td>
						<td class="o-table__cell--numeric">0.56</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
`;
const tableWithContainerAndComplexHeadings = `
<div class="o-table-container">
	<div class="o-table-overlay-wrapper">
		<div class="o-table-scroll-wrapper">
			<table class="o-table" data-o-component="o-table">
				<thead>
					<tr>
						<th scope="col" role="columnheader"><abbr title="Fruit">F</abbr></th>
						<th scope="col" role="columnheader"><b>Genus</b></th>
						<th scope="col" role="columnheader"><div>Characteristic</div></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Dragonfruit</td>
						<td>Stenocereus</td>
						<td>Juicy</td>
					</tr>
					<tr>
						<td>Durian</td>
						<td>Durio</td>
						<td>Smelly</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
`;

export {
	longTableWithContainer,
	shortTableWithContainer,
	tableWithContainerAndComplexHeadings,
};

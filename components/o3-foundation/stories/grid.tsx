import {useEffect, useState} from 'react';
import '../src/css/components/grid.css';

const itemDetails = [
	{
		id: 1,
		span: `content-start / content-end`,
		text: 'Full content',
	},
	{
		id: 2,
		span: `content-start / span 6`,
		text: 'Span 6',
	},
	{
		id: 3,
		span: `span 3`,
		text: 'Span 3',
	},
	{
		id: 4,
		span: `span 1 / content-end`,
		text: 'Span 1',
	},
	{
		id: 5,
		span: `bleed-left / bleed-right`,
		text: 'Full bleed',
	},
	{
		id: 6,
		span: `bleed-left / content-end`,
		text: 'Bleed only left',
	},
];

export function O3Grid() {
	// on window resize update the grid
	const [gridItems, setGridItems] = useState(itemDetails);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 740) {
				const newGridItems = [...itemDetails];
				itemDetails[1].span = `content-start / span 4`;
				itemDetails[1].text = `Span 4`;
				itemDetails[2].span = `content-start / span 2`;
				itemDetails[2].text = `Span 2`;

				setGridItems(newGridItems);
			} else if (window.innerWidth < 980) {
				const newGridItems = [...itemDetails];
				itemDetails[2].span = `span 2`;
				itemDetails[2].text = `Span 2`;
				setGridItems(newGridItems);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<div className="o3-grid" style={{marginTop: '20px'}}>
			{gridItems.map(item => (
				<div
					key={item.id}
					className="o3-grid-item"
					style={{
						gridColumn: `${item.span}`,
					}}>
					{item.text}
				</div>
			))}
			<div
				className="o3-grid-item"
				style={{
					gridColumn: `content-start / content-end`,
					backgroundColor: 'tomato',
				}}>
				Full Content with Nested Grid
				<div
					style={{
						'--o3-grid-columns-to-span-count': 2,
						width: 'var(--o3-grid-columns-to-span-width)',
						backgroundColor: 'lightblue',
					}}>
					Nested Element span 2
				</div>
			</div>
		</div>
	);
}

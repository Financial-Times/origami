import {ButtonPagination} from '@financial-times/o3-button';

function ButtonPaginationPreview() {
	return (
		// <preview>
		<ButtonPagination
			previousPager={{label: 'previous', href: '#previous'}}
			nextPager={{label: 'next', href: '#next'}}
			pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(p => ({
				href: `#${p}`,
				current: p === 5,
				number: p,
			}))}
			theme="inverse"
		/>
		// </preview>
	);
}

export const filePath =
	'src/components/button/preview/ButtonPagination-inverse.tsx';
export {ButtonPaginationPreview as preview};

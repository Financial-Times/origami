import {ButtonProps, Button, LinkButton} from './button';

export type ButtonPaginationProps = Pick<
	ButtonProps,
	'size' | 'theme'
> & {
	previousPager: ButtonPaginationPager;
	pages: ButtonPaginationItem[];
	nextPager: ButtonPaginationPager;
};
export interface ButtonPaginationItem {
	href?: string;
	current: boolean;
	number: number;
	onClick?: any;
}
export interface ButtonPaginationPager {
	label: string;
	href?: string;
	onClick?: any;
}

const Ellipsis = () => {
	let classNames = 'o3-button-pagination__ellipsis';
	return <span className={classNames}>...</span>;
};

function splitPages(pages, currentPage) {
	const nextPage = currentPage.number + 1;
	const previousPage = currentPage.number - 1;

	const secondPageNumberFromEnd = pages.length + 1 - 2;
	const thirdPageNumberFromEnd = pages.length + 1 - 3;
	const fourthPageNumberFromEnd = pages.length + 1 - 4;
	const lastPageNumber = pages.length;

	const pagesBetweenNumbers = (from, to) => {
		return pages.filter(page => page.number >= from && page.number <= to);
	};

	const pagesMatchingNumber = pageNumber => {
		return pages.filter(page => page.number === pageNumber);
	};

	const numberOfPagesToShowAtATime = 7;
	if (pages.length <= numberOfPagesToShowAtATime) {
		return [pages];
	}

	if (!currentPage) {
		return [pages.slice(0, 7)];
	}

	if (currentPage.number < 3 || currentPage.number >= secondPageNumberFromEnd) {
		return [
			pagesBetweenNumbers(0, 3),
			pagesBetweenNumbers(thirdPageNumberFromEnd, lastPageNumber),
		];
	}

	if (currentPage.number === 3) {
		return [
			pagesBetweenNumbers(0, 4),
			pagesBetweenNumbers(secondPageNumberFromEnd, lastPageNumber),
		];
	}

	if (currentPage.number === thirdPageNumberFromEnd) {
		return [
			pagesBetweenNumbers(0, 2),
			pagesBetweenNumbers(fourthPageNumberFromEnd, lastPageNumber),
		];
	}

	const threeOrMoreIn =
		currentPage.number <= thirdPageNumberFromEnd && currentPage.number >= 3;
	if (threeOrMoreIn) {
		return [
			pagesMatchingNumber(1),
			pagesBetweenNumbers(previousPage, nextPage),
			pagesMatchingNumber(lastPageNumber),
		];
	}
}

function getPagesInNarrowMode(pages, currentPage) {
	const thirdPageNumberFromEnd = pages.length + 1 - 3;
	const lastPageNumber = pages.length;
	const numberOfPagesToShowAtATime = 5;

	const pagesBetweenNumbers = (from, to) =>
		pages.filter(page => page.number >= from && page.number <= to);

	const pageMatchingNumber = pageNumber =>
		pages.filter(page => page.number === pageNumber);

	if (pages.length <= numberOfPagesToShowAtATime) {
		return [...pages];
	}

	if (!currentPage) {
		return [...pages.slice(0, numberOfPagesToShowAtATime)];
	}

	if (currentPage.number <= 3) {
		return [
			...pagesBetweenNumbers(1, 3),
			...pageMatchingNumber(lastPageNumber),
		];
	}

	if (currentPage.number >= thirdPageNumberFromEnd) {
		return [
			...pageMatchingNumber(1),
			...pagesBetweenNumbers(thirdPageNumberFromEnd, lastPageNumber),
		];
	}

	if (currentPage.number > 3) {
		return [
			...pageMatchingNumber(1),
			...pageMatchingNumber(currentPage.number),
			...pageMatchingNumber(lastPageNumber),
		];
	}
}

export function ButtonPagination({
	size = '',
	theme,
	previousPager,
	pages,
	nextPager,
}: ButtonPaginationProps) {
	const NextTag = nextPager.href ? LinkButton : Button;
	const PreviousTag = previousPager.href ? LinkButton : Button;
	const currentPage = pages.find(page => page.current);

	const pagesToDisplayInGroupsWideMode = splitPages(pages, currentPage);
	const pagesInNarrowMode = getPagesInNarrowMode(pages, currentPage);

	const lastPageIsSelected = currentPage === pages[pages.length - 1];
	const firstPageIsSelected = currentPage === pages[0];

	const pageElementsInGroups = pagesToDisplayInGroupsWideMode!.map(pageGroup =>
		pageGroup.map(page => {
			const PageTag = page.href ? LinkButton : Button;

			const pageAttributes = {};
			if (page.current && page.href) {
				pageAttributes['aria-current'] = 'page';
			}
			if (page.current && !page.href) {
				pageAttributes['aria-selected'] = true;
			}
			if (page.onClick) {
				pageAttributes['onClick'] = page.onClick;
			}

			if (!pagesInNarrowMode.includes(page)) {
				pageAttributes['data-hide-when-narrow'] = 'true';
			}

			return (
				<PageTag
					key={page.number}
					href={page.href}
					label={page.number.toString()}
					attributes={pageAttributes}
					theme={theme}
					size={size}
					type='secondary'></PageTag>
			);
		})
	);
	const classNames = ['o3-button-pagination'];
	if (size === 'small') {
		classNames.push(' o3-button-pagination--small');
	}

	return (
		<div className={classNames.join(' ')}>
			<PreviousTag
				attributes={
					firstPageIsSelected
						? {disabled: true}
						: {onClick: previousPager.onClick}
				}
				href={previousPager.href}
				label={previousPager.label}
				icon={'arrow-left'}
				iconOnly={true}
				theme={theme}
				size={size}
				type='secondary'></PreviousTag>
				{pageElementsInGroups.flatMap((pageElementGroup, pageGroupIndex) => {
					const elementGroup = [];
					if (pageGroupIndex > 0) {
						elementGroup.push(<Ellipsis key={pageGroupIndex}></Ellipsis>);
					}
					elementGroup.push(pageElementGroup);
					return elementGroup;
				})}
			<NextTag
				attributes={
					lastPageIsSelected ? {disabled: true} : {onClick: nextPager.onClick}
				}
				href={nextPager.href}
				label={nextPager.label}
				icon={'arrow-right'}
				iconOnly={true}
				theme={theme}
				size={size}
				type='secondary'></NextTag>
		</div>
	);
}

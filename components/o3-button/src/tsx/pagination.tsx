// @ts-nocheck

//  TODO: remove @ts-nocheck and fix types
import {Button, LinkButton} from './button';
import type {
	ButtonProps,
	Ellipsis,
	ButtonPaginationProps,
} from '../types/index';

const Ellipsis = ({attributes, theme}: Ellipsis) => {
	let classNames = ['o3-button-pagination__ellipsis'];
	if (theme) {
		classNames.push('o3-button-pagination__ellipsis--' + theme);
	}
	return (
		<span {...attributes} className={classNames.join(' ')}>
			...
		</span>
	);
};

function getPagesInWideMode(pages, currentPage) {
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
		return [pages];
	}

	if (!currentPage) {
		return [pages.slice(0, numberOfPagesToShowAtATime)];
	}

	if (currentPage.number <= 3) {
		return [pagesBetweenNumbers(1, 3), pageMatchingNumber(lastPageNumber)];
	}

	if (currentPage.number >= thirdPageNumberFromEnd) {
		return [
			pageMatchingNumber(1),
			pagesBetweenNumbers(thirdPageNumberFromEnd, lastPageNumber),
		];
	}

	if (currentPage.number > 3) {
		return [
			pageMatchingNumber(1),
			pageMatchingNumber(currentPage.number),
			pageMatchingNumber(lastPageNumber),
		];
	}
}

export function ButtonPagination({
	theme,
	previousPager,
	pages,
	nextPager,
	currentPageOnly,
}: ButtonPaginationProps) {
	const mapPagesToElements = (mode, pages, index, pagesGroup) => {
		pages = pages.map(page => {
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

			pageAttributes['data-o3-button-show-when'] = mode;

			return (
				<PageTag
					key={`page-${mode}-${page.number}`}
					href={page.href}
					label={page.number.toString()}
					attributes={pageAttributes}
					theme={theme}
					type="secondary"></PageTag>
			);
		});
		if (pagesGroup.length !== index + 1) {
			pages.push(
				<Ellipsis
					theme={theme}
					attributes={{'data-o3-button-show-when': mode}}
					key={`ellipsis-${mode}-${index}`}></Ellipsis>
			);
		}
		return pages;
	};

	const currentPage = pages.find(page => page.current);
	const lastPageIsSelected = currentPage === pages[pages.length - 1];
	const firstPageIsSelected = currentPage === pages[0];

	const pagesToDisplayInGroupsWideMode = getPagesInWideMode(pages, currentPage);
	const paginationElementsWide = pagesToDisplayInGroupsWideMode?.flatMap(
		(pages, index, pagesGroup) =>
			mapPagesToElements('wide', pages, index, pagesGroup)
	);

	const pagesInNarrowMode = getPagesInNarrowMode(pages, currentPage);
	const paginationElementsNarrow = pagesInNarrowMode?.flatMap(
		(pages, index, pagesGroup) =>
			mapPagesToElements('narrow', pages, index, pagesGroup)
	);

	const PageTag = currentPage.href ? LinkButton : Button;
	const paginationElements = currentPageOnly
		? [
				<PageTag
					key={`page-current-only-${currentPage.number}`}
					href={currentPage.href}
					label={currentPage.number.toString()}
					attributes={(() => {
						const pageAttributes = {};
						if (currentPage.href) {
							pageAttributes['aria-current'] = 'page';
						}
						if (!currentPage.href) {
							pageAttributes['aria-selected'] = true;
						}
						if (currentPage.onClick) {
							pageAttributes['onClick'] = currentPage.onClick;
						}
						return pageAttributes;
					})()}
					theme={theme}
					type="secondary"></PageTag>,
		  ]
		: [...paginationElementsWide, ...paginationElementsNarrow];

	const NextTag = nextPager.href ? LinkButton : Button;
	const PreviousTag = previousPager.href ? LinkButton : Button;

	const classNames = ['o3-button-pagination'];

	const mandatedPreviousAttributes = {
		disabled: firstPageIsSelected,
		...(!firstPageIsSelected && {onClick: previousPager.onClick}),
	};

	const mandatedNextAttributes = {
		disabled: lastPageIsSelected,
		...(!lastPageIsSelected && {onClick: nextPager.onClick}),
	};

	return (
		<div className={classNames.join(' ')}>
			<PreviousTag
				attributes={{
					...previousPager.attributes,
					...mandatedPreviousAttributes,
				}}
				href={previousPager.href}
				label={previousPager.label}
				icon={'chevron-left'}
				iconOnly={true}
				theme={theme}
				type="secondary"></PreviousTag>

			{paginationElements}

			<NextTag
				attributes={{...nextPager.attributes, ...mandatedNextAttributes}}
				href={nextPager.href}
				label={nextPager.label}
				icon={'chevron-right'}
				iconOnly={true}
				theme={theme}
				type="secondary"></NextTag>
		</div>
	);
}

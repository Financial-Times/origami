import {ButtonPagination} from '../src/tsx/pagination';
import './button.scss';
import { useState } from 'react';

export default {
	title: 'Components/o-buttons',
	component: ButtonPagination,
	args: {},
	parameters: {
		design: {},
		guidelines: {},
		html: {},
	},
};

const ButtonPaginationStory = args => {
	const configuredCurrentPage = args.pages.find(page => page.current);
	const [currentPageSelection, setCurrentPageSelection] = useState(configuredCurrentPage ? configuredCurrentPage.number : 0);

	function updatePages(currentPageSelection) {
		setCurrentPageSelection(currentPageSelection);
		args.pages.forEach(p => p.current = p.number === currentPageSelection);
	}

	args.pages.forEach(page => {
		page.onClick = e => {
			e.preventDefault();
			updatePages(page.number);
		};
	});

	args.nextPager.onClick = e => {
		e.preventDefault();
		updatePages(currentPageSelection + 1);
	};

	args.previousPager.onClick = e => {
		e.preventDefault();
		updatePages(currentPageSelection - 1);
	};

	return <ButtonPagination {...args} />
};

export const Pagination = ButtonPaginationStory.bind({});
Pagination.args = {
	type: 'secondary',
	size: 'big',
	previousPager: {
		href: '#previous',
		label: 'previous results'
	},
  	pages: Array(10).fill(null).map((page, index) => {
		const number = index + 1;
		const currentPageNumber = 3;
		return {
			href: '#',
			current: number === currentPageNumber,
			number,
		};
	}),
	nextPager: {
		href: '#next',
		label: 'next results'
	},
};

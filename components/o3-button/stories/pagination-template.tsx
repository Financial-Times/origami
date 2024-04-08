import type {StoryObj} from '@storybook/react';
import type {TemplateType} from './story-templates';
import {useArgs} from '@storybook/preview-api';
import {ButtonPagination} from '../src/tsx/pagination';
import type {ButtonPaginationProps} from '../src/types/index';
import {TemplateSBConfig} from './sb-story-config';
type PaginationStory = Omit<StoryObj, 'args'> & {
	args: ButtonPaginationProps;
};

type PageType = {
	href: string;
	current?: boolean;
	number: number;
	onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const ButtonPaginationTemplate: TemplateType = {
	...TemplateSBConfig,
	parameters: {
		controls: {include: ['theme']},
	},
	render: args => {
		// const configuredCurrentPage = args.pages.find(page => page.current);
		// const [currentPageSelection, setCurrentPageSelection] = useState(
		// 	configuredCurrentPage ? configuredCurrentPage.number : 0
		// );
		const [{pages}, updateArgs] = useArgs();
		const currentPageSelection = pages.find(
			(page: PageType) => page.current
		).number;
		function updatePages(currentPageSelection: number) {
			const updatedPages: PageType[] = pages.map((page: PageType) => {
				page.current = page.number === currentPageSelection;
				return page;
			});
			updateArgs({pages: updatedPages});
		}

		args.pages.forEach((page: PageType) => {
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
		return <ButtonPagination {...args} pages={pages} />;
	},
};

export const Pagination: PaginationStory = {
	...ButtonPaginationTemplate,
	args: {
		previousPager: {
			href: '#previous',
			label: 'previous results',
		},
		pages: Array(10)
			.fill(null)
			.map((page, index) => {
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
			label: 'next results',
		},
	},
};

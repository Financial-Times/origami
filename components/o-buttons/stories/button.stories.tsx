import {withDesign} from 'storybook-addon-designs';
import {Button, LinkButton} from '../src/tsx/button';
import {ButtonGroup} from '../src/tsx/group';
import {ButtonPagination} from '../src/tsx/pagination';
import './button.scss';
import withHtml from 'origami-storybook-addon-html';
import { nanoid } from 'nanoid'
import { useState } from 'react';

export default {
	title: 'Components/o-buttons',
	component: Button,
	decorators: [withDesign, withHtml],
	args: {
		iconOnly: false,
	},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=29%3A1131',
		},
		guidelines: {
			notion: '448d914df4fd4bb68fdf5bc5e85c4b46',
		},
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
const ButtonStory = args => <Button {...args} />;
const LinkButtonStory = args => <LinkButton {...args} />;
const ButtonGroupStory = args => <ButtonGroup>
	{args.buttons.map(buttonProps => <Button {...buttonProps} key={nanoid()}/>)}
</ButtonGroup>;

export const PrimaryButton = ButtonStory.bind({});
PrimaryButton.args = {
	label: 'Press button',
	type: 'primary',
};

export const SecondaryButton = ButtonStory.bind({});
SecondaryButton.args = {
	label: 'Press button',
	type: 'secondary',
};

export const LinkAsButton = LinkButtonStory.bind({});
LinkAsButton.args = {
	label: 'Link button',
	type: 'secondary',
	href: '#',
};

export const BigButton = ButtonStory.bind({});
BigButton.args = {
	size: 'big',
	label: 'Press button',
};

export const InverseButton = ButtonStory.bind({});
InverseButton.args = {
	label: 'Press button',
	theme: 'inverse',
};
InverseButton.parameters = {
	backgrounds: {
		default: 'slate',
	},
};

export const MonoButton = ButtonStory.bind({});
MonoButton.args = {
	label: 'Press button',
	theme: 'mono',
};

export const ButtonWithIcon = ButtonStory.bind({});
ButtonWithIcon.args = {
	label: 'Upload',
	icon: 'upload',
};

export const IconOnlyButton = ButtonStory.bind({});
IconOnlyButton.args = {
	label: 'Next',
	icon: 'arrow-right',
	iconOnly: true,
};

export const GroupedButtons = ButtonGroupStory.bind({});
GroupedButtons.args = {
	buttons: [{
		label: 'button one',
		type: 'secondary',
	}, {
		label: 'button two',
		type: 'secondary',
	}, {
		label: 'button three',
		type: 'secondary',
	}]
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

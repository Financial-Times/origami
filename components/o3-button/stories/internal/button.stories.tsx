import {Button} from '../../src/tsx/button';
import * as ButtonStories from '../storyTemplates';
import {Pagination as PaginationTemplate} from '../paginationTemplate';

import '../button.css';

export default {
	title: 'Internal/o3-button',
	component: Button,
	decorators: [
		Story => (
			<div className="o-brand-internal">
				<Story />
			</div>
		),
	],
	args: {},
};

export const PrimaryButton = ButtonStories.PrimaryButton;
export const SecondaryButton = ButtonStories.SecondaryButton;
export const GhostButton = ButtonStories.GhostButton;
export const BigButton = ButtonStories.BigButton;
export const InverseButton = ButtonStories.InverseButton;
export const MonoButton = ButtonStories.MonoButton;
export const ButtonWithIconOnly = ButtonStories.IconOnlyButton;
export const ButtonWithIcon = ButtonStories.ButtonWithIcon;
export const LinkAsButton = ButtonStories.LinkAsButton;
export const GroupedButtons = ButtonStories.GroupedButtons;
export const Pagination = PaginationTemplate;

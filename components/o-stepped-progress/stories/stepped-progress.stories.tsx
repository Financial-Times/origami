import {withDesign} from 'storybook-addon-designs';
import {useEffect} from 'react';
import {SteppedProgress, Step} from '../src/tsx/stepped-progress';
import './stepped-progress.scss';
import javascript from '@financial-times/o-stepped-progress';
import withHtml from 'origami-storybook-addon-html';

export default {
	title: 'Stepped Progress',
	component: SteppedProgress,
	subcomponents: {Step},
	decorators: [withDesign, withHtml],
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/xxJEMk0fnzEhoDFaKtM5fz/Stepped-progress-bar-component?node-id=6%3A3537',
		},
	},
};

export const Normal = () => {
	useEffect(() => javascript.init(), []);
	return (
		<SteppedProgress>
			<Step label="Wake up" state="complete" />
			<Step
				label="Eat a egg"
				state="complete"
				url="https://en.wikipedia.org/wiki/Egg_as_food"
			/>
			<Step label="Leave the house" state="current" />
			<Step label="Defeat everyone" />
		</SteppedProgress>
	);
};

export const Error = () => {
	useEffect(() => javascript.init(), []);
	return (
		<SteppedProgress>
			<Step label="Wake up" state="complete" />
			<Step
				label="Eat a egg"
				state="complete"
				url="https://en.wikipedia.org/wiki/Egg_as_food"
			/>
			<Step label="Leave the house" state="error" />
			<Step label="Defeat everyone" />
		</SteppedProgress>
	);
};

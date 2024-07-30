import type {Meta} from '@storybook/react';
import '../../src/css/brands/core.css';
import './grid.css';

export default {
	title: 'Core/o3-grid-playground',
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		controls: {exclude: ['children']},
	},
} as Meta;


export const GridStories = {
	render: (args) => {
			return <div className="grid-wrapper">
				<div className='item-1'>Item 1</div>
				<div>Item 2</div>
				<div>Item 3</div>
				<div>Item 4</div>
				<div>Item 4</div>
				<div>Item 4</div>
				<div>Item 4</div>
				<div>Item 4</div>
				<div>Item 4</div>
				<div>Item 4</div>
				<div>Item 4</div>
				<div>Item 4</div>
			</div>
	},
};

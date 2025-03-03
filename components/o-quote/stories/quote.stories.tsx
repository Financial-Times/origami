import {Quote} from '../src/tsx/quote';
import './quote.scss';

export default {
	title: 'Deprecated/o-quote',
	component: Quote,
	args: {
		iconOnly: false,
	},
	parameters: {
		design: {},
		guidelines: {},
		html: {},
	},
};

const Story = args => <Quote {...args} />;

// @todo - show editorial quote only when the core brand is selected https://github.com/Financial-Times/origami/issues/617
export const EditorialQuote = Story.bind({});
EditorialQuote.args = {
	type: 'editorial',
	copy: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente placeat ducimus blanditiis, deleniti necessitatibus quo vel itaque omnis ipsum voluptas. Debitis omnis nobis optio minus vero quaerat quasi perspiciatis aliquid?',
	author: 'Lorem ipsum',
	source: 'Lorem, ipsum dolor.',
};

export const StandardQuote = Story.bind({});
StandardQuote.args = {
	type: 'standard',
	copy: 'Origami is about empowering developers of all levels to build robust, on-brand products ranging from simple static sites through to rich, dynamic web applications, to do it faster, to do it cheaper, and leave them more supportable and more maintainable.',
	author: 'Financial Times',
	source: 'The Origami Specification',
};

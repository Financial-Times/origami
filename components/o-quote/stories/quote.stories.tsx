import {Quote} from "../src/tsx/quote"
import "./quote.scss"

export default {
	title: "Components/o-quote",
	component: Quote,
	args: {
		iconOnly: false,
	},
	parameters: {
		guidelines: {},
		html: {},
	},
}

export const EditorialQuote = {
	args: {
		type: "editorial",
		copy: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente placeat ducimus blanditiis, deleniti necessitatibus quo vel itaque omnis ipsum voluptas. Debitis omnis nobis optio minus vero quaerat quasi perspiciatis aliquid?",
		author: "Lorem ipsum",
		source: "Lorem, ipsum dolor.",
	},
}

export const StandardQuote = {
	args: {
		type: "standard",
		copy: "Origami is about empowering developers of all levels to build robust, on-brand products ranging from simple static sites through to rich, dynamic web applications, to do it faster, to do it cheaper, and leave them more supportable and more maintainable.",
		author: "Financial Times",
		source: "The Origami Specification",
	},
}

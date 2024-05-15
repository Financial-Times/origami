import {Body, List, ListItem} from '../src/tsx/typography';
import './typography.scss';

export default {
	title: 'Components/o-typography',
	component: List,
    args: {},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=0%3A1433',
		},
		guidelines: {
			notion: 'f82c8bd1ef1f4f649a61d17d5d49750c',
		},
		html: {},
	},
};

const items = ['Apples', 'Bananas', 'Oranges', 'Pears', 'Tangelos'];
const Story = args => <Body>
    <List {...args} children={args.items.map(item => <ListItem key={item}>{item}</ListItem>)} />
</Body>;

export const UnorderedList = Story.bind({});
UnorderedList.args = {
	items,
	ordered: false
};

export const OrderedList = Story.bind({});
OrderedList.args = {
	items,
    ordered: true
};

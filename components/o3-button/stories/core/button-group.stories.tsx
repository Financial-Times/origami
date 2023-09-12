import {Button} from '../../src/tsx/buttons';
import {ButtonGroup} from '../../src/tsx/group';
import '../button.css';

export default {
	title: 'Core/o3-button',
	component: ButtonGroup,
	decorators: [],
	args: {},
	parameters: {
		design: {},
		guidelines: {},
		html: {},
	},
};

const ButtonGroupStory = args => <ButtonGroup>
	{args.buttons.map((buttonProps, index) => <Button {...buttonProps} key={index}/>)}
</ButtonGroup>;

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

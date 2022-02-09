import {withDesign} from 'storybook-addon-designs';
import {Button} from '../src/tsx/button';
import {ButtonGroup} from '../src/tsx/group';
import './button.scss';
import withHtml from 'origami-storybook-addon-html';

export default {
	title: 'Components/o-buttons',
	component: ButtonGroup,
	decorators: [withDesign, withHtml],
	args: {},
	parameters: {
		design: {},
		guidelines: {},
		html: {},
	},
};

const ButtonGroupStory = args => <ButtonGroup>
	{args.buttons.map(buttonProps => <Button {...buttonProps} key={buttonProps.label + buttonProps.type}/>)}
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

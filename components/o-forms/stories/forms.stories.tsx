import withHtml from 'origami-storybook-addon-html';
import { withDesign } from 'storybook-addon-designs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useEffect } from 'react';
import { Forms } from '../src/tsx/forms';
import './forms.scss';
import javascript from '../main.js'
export default {
	title: 'Components/o-forms',
	component: Forms,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
} as ComponentMeta<typeof Forms>;

const FormsStory = args => {
	useEffect(() => {
		let form = javascript.init();
		console.log('forms', form)
		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <Forms {...args} />;
};

export const BoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);

export const HiglightBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);

export const MultipleBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);

export const DisabledBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);

export const ErrorBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);

export const VCenteredBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);

export const LongTitleBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);

export const SavedStateBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);

export const SavingStateBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);

BoxRadioButton.args = {
	inputs: [
		{
			type: "radio",
			name: "negative",
			value: "Daily",
			checked: true
		},
		{
			type: "radio",
			name: "negative",
			value: "Weekly"
		}
	],
	formField: {
		field: {
			type: "radio-box",
			aria: {
				label: "negative-radio-box-group-title",
				info: "negative-radio-box-group-info"
			}
		},
		title: {
			mainTitle: "Box Radio Button",
			promptTitle: "This is a box radio button sample"
		}
	},

}

HiglightBoxRadioButton.args = {
	inputs: [
		{
			type: "radio",
			name: "default",
			value: "Daily"
		},
		{
			type: "radio",
			name: "default",
			value: "Weekly",
			checked: true,
			modifier: ["negative"]
		}
	],
	formField: {
		field: {
			type: "radio-box",
			aria: {
				label: "radio-box-group-title",
				info: "radio-box-group-info"
			},
		},
		title: {
			mainTitle: "Box Radio Button",
			promptTitle: "Optional prompt text"
		}
	},

}

MultipleBoxRadioButton.args = {
	inputs: [
		{
			type: "radio",
			name: "multiple",
			value: "Daily"
		},
		{
			type: "radio",
			name: "multiple",
			value: "Weekly",
			checked: true
		},
		{
			type: "radio",
			name: "multiple",
			value: "Monthly"
		}
	],
	formField: {
		field: {
			type: "radio-box",
			aria: {
				label: "multiple-radio-box-group-title"
			}
		},
		title: {
			mainTitle: "Multiple box-styled radio buttons"
		},
	},

}


DisabledBoxRadioButton.args = {
	inputs: [
		{
			type: "radio",
			name: "disabled",
			value: "Daily",
			checked: true,
			disabled: true
		},
		{
			type: "radio",
			name: "disabled",
			value: "Monthly",
			disabled: true
		}
	],
	formField: {
		field: {
			type: "radio-box",
			aria: {
				label: "disabed-radio-box-group-title"
			}
		},
		title: {
			mainTitle: "Disabled box-styled radio buttons"
		},
	},

}



ErrorBoxRadioButton.args = {
	inputs: [
		{
			type: "radio",
			name: "error",
			value: "Yes"
		},
		{
			type: "radio",
			name: "error",
			value: "No"
		}
	],
	formField: {
		field: {
			type: "radio-box",
			aria: {
				label: "error-radio-box-group-title"
			},
			error: "Please select an option",
			modifiers: ["invalid"]
		},
		title: {
			mainTitle: "Error box-style radio buttons"
		},
	},

}


VCenteredBoxRadioButton.args = {
	inputs: [
		{
			type: "radio",
			name: "inline",
			value: "Daily",
			checked: true
		},
		{
			type: "radio",
			name: "inline",
			value: "Weekly"
		}
	],
	formField: {
		field: {
			type: "radio-box",
			aria: {
				label: "inline-radio-box-group-title"
			},
			error: "Please select an option",
			modifiers: ["inline"]
		},
		title: {
			mainTitle: "V-centered inline radio box"
		},
	},

}


LongTitleBoxRadioButton.args = {
	inputs: [
		{
			type: "radio",
			name: "saving",
			value: "Daily",
			checked: true
		},
		{
			type: "radio",
			name: "saving",
			value: "Weekly"
		}
	],
	formField: {
		field: {
			type: "radio-box",
			aria: {
				label: "saving-state-group-title-long",
				info: "saving-state-group-info-long"
			},
			modifiers: ["saving"],
			state: "Saving",
			icon: true
		},
		title: {
			mainTitle: "Inline box-style radio buttons with very long title. Inline box-style radio buttons with very long title",
			promptTitle: "With a stacked saving state"
		},
	},

}


SavedStateBoxRadioButton.args = {
	inputs: [
		{
			type: "radio",
			name: "saved",
			value: "Daily"
		},
		{
			type: "radio",
			name: "saved",
			value: "Weekly",
			checked: true
		}
	],
	formField: {
		field: {
			type: "radio-box",
			aria: {
				label: "saved-state-group-title"
			},
			modifiers: ["saved", "inline"],
			state: "Saved",
			icon: true
		},
		title: {
			mainTitle: "Inline saved state"
		},
	},

}


SavingStateBoxRadioButton.args = {
	inputs: [
		{
			type: "radio",
			name: "icon",
			value: "Daily"
		},
		{
			type: "radio",
			name: "icon",
			value: "Weekly",
			checked: true
		}
	],
	formField: {
		field: {
			type: "radio-box",
			aria: {
				label: "saving-state-group-title",
				info: "saving-state-group-info"
			},
			modifiers: ["saving", "inline"],
			state: "Saving",
			icon: true
		},
		title: {
			mainTitle: "Inline saving state",
			promptTitle: "Icon only—also available for saved state"
		},
	},

}

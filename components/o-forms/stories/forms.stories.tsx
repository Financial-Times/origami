import withHtml from 'origami-storybook-addon-html';
import { withDesign } from 'storybook-addon-designs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useEffect } from 'react';
import { Forms } from '../src/tsx/forms';
import './forms.scss';
import javascript from '../main.js'

export default {
	title: 'Components/o-forms/radio-box-buttons',
	component: Forms,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {
		highlight: false,
		centered: false
	}
} as ComponentMeta<typeof Forms>;

const FormsStory = args => {
	useEffect(() => {
		let form = javascript.init();
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

export const MultipleBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);

export const DisabledBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);

export const ErrorBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
	{}
);


export const StateBoxRadioButton: ComponentStory<typeof Forms> = FormsStory.bind(
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
				label: "disabled-radio-box-group-title"
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


StateBoxRadioButton.args = {
	saved: false,
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
			mainTitle: "Radio box with state",
			promptTitle: "Icon available for saved/saving states"
		},
	}
}

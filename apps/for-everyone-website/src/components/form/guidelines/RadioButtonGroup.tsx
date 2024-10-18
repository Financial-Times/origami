import {
	Form,
	RadioButtonGroup,
	CheckBoxGroup,
	CheckBoxItem,
	RadioButtonItem,
} from '@financial-times/o3-form';

const legend = 'Notification preferences';
const legendDescription = 'How would you like to be updated?';

const items: string[] = [
	'Email notifications',
	'SMS notifications',
	'In-app notifications',
];

function convertToLowercaseAndRemoveSpaces(item: string) {
	return item.toLowerCase().replace(/\s+/g, '');
}

export function RadioGroup() {
	return (
		<Form>
			<RadioButtonGroup label={legend} description={legendDescription}>
				{items.map((item) => {
					return (
						<RadioButtonItem
							key={item}
							radioButtonLabel={item}
							inputId={convertToLowercaseAndRemoveSpaces(`radio-button-${item}`)}
						/>
					);
				})}
			</RadioButtonGroup>
		</Form>
	);
}

export function CheckboxGroup() {
	return (
		<Form>
			<CheckBoxGroup label={legend} description={legendDescription}>
				{items.map((item) => {
					return (
						<CheckBoxItem
							key={item}
							checkboxLabel={item}
							inputId={convertToLowercaseAndRemoveSpaces(`checkbox-${item}`)}
						/>
					)
				})}
			</CheckBoxGroup>
		</Form>
	);
}


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
							radioButtonLabel={item}
							inputId={convertToLowercaseAndRemoveSpaces(`checkbox-${item}`)}
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
				<CheckBoxItem
					checkboxLabel={items[0]}
					inputId={convertToLowercaseAndRemoveSpaces(`checkbox-${items[0]}`)}
				/>
				<CheckBoxItem
					checkboxLabel={items[1]}
					inputId={convertToLowercaseAndRemoveSpaces(`checkbox-${items[1]}`)}
				/>
				<CheckBoxItem
					checkboxLabel={items[2]}
					inputId={convertToLowercaseAndRemoveSpaces(`checkbox-${items[2]}`)}
				/>
			</CheckBoxGroup>
		</Form>
	);
}


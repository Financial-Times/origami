import {
	Form,
	RadioButtonGroup,
	RadioButtonItem,
} from '@financial-times/o3-form';

function ButtonPreview() {
	return (
		<div style={{width: '50%'}}>
			<meta itemProp="@preview" />
			<Form>
				<RadioButtonGroup label="How often would you like to receive our emails?">
					<RadioButtonItem
						radioButtonLabel="Daily"
						inputId="radio-button-daily"
						attributes={{defaultChecked: true}}
					/>
					<RadioButtonItem
						radioButtonLabel="Weekly"
						inputId="radio-button-weekly"
					/>
					<RadioButtonItem
						radioButtonLabel="Monthly"
						inputId="radio-button-monthly"
					/>
				</RadioButtonGroup>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath = 'src/components/forms/preview/Radio-group.tsx';

export {ButtonPreview as preview};

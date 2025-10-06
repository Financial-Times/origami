import {Form, RadioButtonItem} from '@financial-times/o3-form';

function CheckboxPreview() {
	return (
		<div style={{width: '50%'}}>
			<meta itemProp="@preview" />
			<Form>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: '30px',
					}}>
					<RadioButtonItem
						radioButtonLabel="Option 1"
						inputId="disabled-radio-1"
						attributes={{disabled: true}}
					/>
					<RadioButtonItem
						radioButtonLabel="Option 2"
						inputId="disabled-radio-2"
						attributes={{disabled: true}}
					/>
				</div>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath =
	'src/components/forms/preview/Radio-button-selection-disabled.tsx';

export {CheckboxPreview as preview};

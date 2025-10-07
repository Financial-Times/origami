import {Form, RadioButtonItem} from '@financial-times/o3-form';

function RadioButtonPreview() {
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
						inputId="deselected-radio"
					/>
					<RadioButtonItem
						radioButtonLabel="Option 2"
						inputId="selected-radio"
						attributes={{defaultChecked: true}}
					/>
				</div>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath =
	'src/components/forms/preview/Radio-button-selection-default.tsx';

export {RadioButtonPreview as preview};

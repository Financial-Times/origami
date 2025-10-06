import {Form, CheckBoxItem} from '@financial-times/o3-form';

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
					<CheckBoxItem
						checkboxLabel="Unchecked"
						inputId="unchecked-checkbox"
						attributes={{disabled: true}}
					/>
					<CheckBoxItem
						checkboxLabel="Checked"
						inputId="checked-checkbox"
						attributes={{defaultChecked: true, disabled: true}}
					/>
					<CheckBoxItem
						checkboxLabel="Indeterminate"
						inputId="indeterminate-checkbox"
						attributes={{disabled: true}}
					/>
				</div>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath =
	'src/components/forms/preview/Checkbox-selection-disabled.tsx';

export {CheckboxPreview as preview};

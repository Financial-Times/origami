import {Form, CheckBoxItem} from '@financial-times/o3-form';

function CheckboxPreview() {
	return (
		<div style={{width: '50%'}}>
			<meta itemProp="@preview" />
			<Form>
				<CheckBoxItem
					checkboxLabel="Checkbox label"
					inputId="unchecked-checkbox"
					attributes={{disabled: true, defaultChecked: true}}
				/>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath = 'src/components/forms/preview/Checkbox-disabled.tsx';

export {CheckboxPreview as preview};

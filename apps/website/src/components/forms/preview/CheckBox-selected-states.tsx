import {Form, CheckBoxItem} from '@financial-times/o3-form';

function ButtonPreview() {
	return (
		<div style={{width: '50%'}}>
			<meta itemProp="@preview" />
			<Form>
				<CheckBoxItem checkboxLabel="Unchecked" inputId="unchecked-checkbox" />
				<CheckBoxItem
					checkboxLabel="Checked"
					inputId="checked-checkbox"
					attributes={{defaultChecked: true}}
				/>
				<CheckBoxItem
					checkboxLabel="Indeterminate"
					inputId="indeterminate-checkbox"
				/>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath =
	'src/components/forms/preview/Checkbox-selected-states.tsx';

export {ButtonPreview as preview};

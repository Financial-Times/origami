import {Form, CheckBox} from '@financial-times/o3-form';

function ButtonPreview() {
	return (
		<div style={{width: "50%"}}>
			<meta itemProp="@preview" />
			<Form>
				<CheckBox checkboxLabel='Unchecked'	inputId='unchecked-checkbox'/>
				<CheckBox checkboxLabel='Checked' inputId='checked-checkbox' attributes={{checked: true}}/>
				<CheckBox checkboxLabel='Indeterminate' inputId='indeterminate-checkbox' />
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath = 'src/components/form/preview/Checkbox-selected-states.tsx';

export {ButtonPreview as preview};

import {Form, RadioButtonItem} from '@financial-times/o3-form';

function CheckboxPreview() {
	return (
		<div style={{width: '50%'}}>
			<meta itemProp="@preview" />
			<Form>
				<RadioButtonItem
					radioButtonLabel="Option 1"
					inputId="unchecked-radio"
					attributes={{disabled: true}}
				/>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath =
	'src/components/forms/preview/Radio-button-disabled.tsx';

export {CheckboxPreview as preview};

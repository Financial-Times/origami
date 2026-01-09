import {Form, SelectInput} from '@financial-times/o3-form/esm';

function SelectPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<SelectInput
					label="Title"
				>
					<option value="Option 1">Option 1</option>
				</SelectInput>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/forms/preview/Select-input-standard-size.tsx';

export {SelectPreview as preview};

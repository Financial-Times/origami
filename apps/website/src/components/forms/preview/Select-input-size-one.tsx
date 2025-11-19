import {Form, SelectInput} from '@financial-times/o3-form/esm';

function SelectPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<SelectInput
					label="Initial"
					length={1}
				>
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="C">C</option>
				</SelectInput>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/forms/preview/Select-input-size-one.tsx';

export {SelectPreview as preview};

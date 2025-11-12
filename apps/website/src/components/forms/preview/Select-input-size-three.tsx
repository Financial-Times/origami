import {Form, SelectInput} from '@financial-times/o3-form/esm';

function SelectPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<SelectInput
					label="Title"
					length={3}
				>
					<option value="Option 1">Mrs</option>
					<option value="Option 1">Mr</option>
					<option value="Option 1">Mx</option>
				</SelectInput>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/forms/preview/Select-input-size-three.tsx';

export {SelectPreview as preview};

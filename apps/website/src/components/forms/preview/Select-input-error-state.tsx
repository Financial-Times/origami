import {Form, SelectInput} from '@financial-times/o3-form/esm';

function SelectPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<SelectInput
					label="Title"
					description="Description"
					feedback={{type: 'error', message: 'There is an error'}}
				>
					<option value="Option 1">Option 1</option>
				</SelectInput>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath = 'src/components/forms/preview/Select-input-error-state.tsx';

export {SelectPreview as preview};

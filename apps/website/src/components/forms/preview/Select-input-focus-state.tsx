import {Form, SelectInput} from '@financial-times/o3-form/esm';

function SelectPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<div className="o3-documentation-force-focus">
					<SelectInput
						label="Title"
						description="Description"
					>
						<option value="Option 1">Option 1</option>
					</SelectInput>
				</div>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath = 'src/components/forms/preview/Select-input-focus-state.tsx';

export {SelectPreview as preview};

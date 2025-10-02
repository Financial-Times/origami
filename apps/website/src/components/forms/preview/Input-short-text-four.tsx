import {Form, TextInput} from '@financial-times/o3-form/esm';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<TextInput
					label="Year of birth"
					length={4}
					description="Format: YYYY"
					attributes={{defaultValue: '1987'}}
				/>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath =
	'src/components/forms/preview/Input-short-text-four.tsx';

export {ButtonPreview as preview};

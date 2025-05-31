import {Form, TextInput} from '@financial-times/o3-form/esm';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<TextInput
					label="2 characters"
					length={2}
				/>
				<TextInput
					label="3 characters"
					length={3}
				/>
				<TextInput
					label="4 characters"
					length={4}
				/>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/forms/preview/Input-short-text.tsx';

export {ButtonPreview as preview};

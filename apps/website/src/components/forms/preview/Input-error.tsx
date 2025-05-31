import {Form, TextInput} from '@financial-times/o3-form/esm';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<TextInput
					label="Email"
					attributes={{defaultValue: 'john@gmailcom'}}
					feedback={{
						message: 'Please enter a valid email address',
						type: 'error',
					}}
				/>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/forms/preview/Input-error.tsx';

export {ButtonPreview as preview};

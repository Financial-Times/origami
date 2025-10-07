import {Form, TextInput} from '@financial-times/o3-form/esm';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<TextInput
					inputId="user-email"
					label="Email"
					feedback={{
						type: 'error',
						message: 'Please enter a valid email address',
					}}
					attributes={{defaultValue: 'john@gmcom'}}
				/>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/forms/preview/Error-summary-in-form.tsx';

export {ButtonPreview as preview};

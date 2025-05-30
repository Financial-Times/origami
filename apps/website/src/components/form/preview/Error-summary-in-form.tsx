import {
	Form,
	TextInput,
	PasswordInput,
	ErrorSummary,
} from '@financial-times/o3-form/esm';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<ErrorSummary
					errors={[
						{
							id: 'user-email',
							fieldName: 'Email',
							message: 'Please enter a valid email address',
						},
					]}
				/>
				<TextInput
					inputId="user-email"
					label="Email"
					attributes={{defaultValue: 'john@gmcom'}}
				/>
				<PasswordInput label="Password" />
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/form/preview/Error-summary-in-form.tsx';

export {ButtonPreview as preview};

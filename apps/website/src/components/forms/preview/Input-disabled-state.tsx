import {Form, TextInput} from '@financial-times/o3-form/esm';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<TextInput
					label="Email"
					description='You need to confirm your email before you can change it'
					attributes={{defaultValue: 'john@gmail.com'}}
					disabled={true}
				/>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/forms/preview/Input-error.tsx';

export {ButtonPreview as preview};

import {Form, PasswordInput} from '@financial-times/o3-form';

function ButtonPreview() {
	return (
		<div style={{width: "50%"}}>
			<meta itemProp="@preview" />
			<Form>
				<PasswordInput
					label="Password"
					description='Must be at least 8 characters long'
				/>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath = 'src/components/form/preview/Input-password.tsx';

export {ButtonPreview as preview};

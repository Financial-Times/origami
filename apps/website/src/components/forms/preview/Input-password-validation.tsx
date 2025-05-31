import {Form, PasswordInput} from '@financial-times/o3-form';

function ButtonPreview() {
	return (
		<div style={{width: "50%"}}>
			<meta itemProp="@preview" />
			<Form>
				<PasswordInput
					label="Password"
					description='Must be 8 characters or more and contain a number'
					feedback={{
						type: 'error',
						message: 'Your password must contain a number'
					}}
				/>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath = 'src/components/forms/preview/Input-password.tsx';

export {ButtonPreview as preview};

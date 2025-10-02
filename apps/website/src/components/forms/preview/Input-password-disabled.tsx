import {Form, PasswordInput} from '@financial-times/o3-form';

function ButtonPreview() {
	return (
		<div style={{width: '50%'}}>
			<meta itemProp="@preview" />
			<Form>
				<PasswordInput
					label="Password"
					description="You can't change your password because..."
					disabled
				/>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath =
	'src/components/forms/preview/Input-password-disabled.tsx';

export {ButtonPreview as preview};

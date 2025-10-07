import {Form, TextInput} from '@financial-times/o3-form';

function ButtonPreview() {
	return (
		<div style={{width: '50%'}}>
			<meta itemProp="@preview" />
			<Form>
				<TextInput
					label="Title"
					feedback={{message: 'Error message', type: 'error'}}
				/>
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath = 'src/components/forms/preview/Input-state-error.tsx';

export {ButtonPreview as preview};

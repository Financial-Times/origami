import {Form, TextInput} from '@financial-times/o3-form';

function ButtonPreview() {
	return (
		<div style={{width: '50%'}}>
			<meta itemProp="@preview" />
			<Form>
				<TextInput label="Title" />
			</Form>
			<meta itemProp="@preview" />
		</div>
	);
}
export const filePath = 'src/components/forms/preview/Input-state-default.tsx';

export {ButtonPreview as preview};

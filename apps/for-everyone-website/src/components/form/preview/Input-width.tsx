import {Form, TextInput} from '@financial-times/o3-form/esm';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<TextInput
					label="Full name"
					attributes={{defaultValue: 'John Smith'}}
				/>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/form/preview/Input-width.tsx';

export {ButtonPreview as preview};

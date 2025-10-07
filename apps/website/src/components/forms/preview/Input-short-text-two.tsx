import {Form, TextInput} from '@financial-times/o3-form/esm';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<TextInput label="State" length={2} attributes={{defaultValue: 'NY'}} />
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath = 'src/components/forms/preview/Input-short-text-two.tsx';

export {ButtonPreview as preview};

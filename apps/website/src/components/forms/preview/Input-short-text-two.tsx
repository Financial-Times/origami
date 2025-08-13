import {Form, TextInput} from '@financial-times/o3-form/esm';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<TextInput label="Your Initials" length={2} />
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/forms/preview/Input-short-text-two.tsx';

export {ButtonPreview as preview};

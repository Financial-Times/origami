import {Form, TextInput} from '@financial-times/o3-form/esm';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<TextInput
					label="CVV Code"
					length={3}
					description="3 digits on back of the card"
					attributes={{defaultValue: '621'}}
				/>
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath =
	'src/components/forms/preview/Input-short-text-three.tsx';

export {ButtonPreview as preview};

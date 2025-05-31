import {Form, ErrorSummary} from '@financial-times/o3-form/esm';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Form>
				<ErrorSummary errors={[{
					id: 'error-summary',
					fieldName: 'Email',
					message: 'Please enter a valid email address',
				}]} />
			</Form>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/forms/preview/Error-summary.tsx';

export {ButtonPreview as preview};

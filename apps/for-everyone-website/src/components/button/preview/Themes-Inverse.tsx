import {Button} from '@financial-times/o3-button';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Button label="Hello" type="primary" theme="inverse" />
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/button/preview/Themes-Inverse.tsx';
export {ButtonPreview as preview};

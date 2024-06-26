import {Button} from '@financial-times/o3-button';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Button label="Hello" type="primary" size="small" />
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/button/preview/Sizes-Small.tsx';
export {ButtonPreview as preview};

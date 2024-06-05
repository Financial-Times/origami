import {Button} from '@financial-times/o3-button';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Button label="Hello" type="primary" icon="search" />
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/button/preview/Icons-WithIcon.tsx';
export {ButtonPreview as preview};

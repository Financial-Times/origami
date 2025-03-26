import {Button} from '@financial-times/o3-button';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Button label="Hello" type="primary" theme="neutral" />
			<meta itemProp="@preview" />
		</>
	);
}

export const themes = {};
export const filePath = 'src/components/button/preview/Themes-Neutral.tsx';
export {ButtonPreview as preview};

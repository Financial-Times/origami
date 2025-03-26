import {Button} from '@financial-times/o3-button';
import {buttonThemes} from '../buttonThemes.ts';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Button label="Hello" type="secondary" />
			<meta itemProp="@preview" />
		</>
	);
}

export const themes = buttonThemes;
export const filePath = 'src/components/button/preview/Types-Secondary.tsx';
export {ButtonPreview as preview};

import {Button} from '@financial-times/o3-button';
import {buttonThemes} from '../getButtonThemeForBrand.ts';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Button label="Hello" type="primary" icon="search" />
			<meta itemProp="@preview" />
		</>
	);
}

export const themes = buttonThemes;
export const filePath = 'src/components/button/preview/Icons-WithIcon.tsx';
export {ButtonPreview as preview};

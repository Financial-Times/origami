import {Button} from '@financial-times/o3-button';

function ButtonPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Button label="Hello" type="primary" fluid={true} />
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/button/preview/Fluid.tsx';

export {ButtonPreview as preview};

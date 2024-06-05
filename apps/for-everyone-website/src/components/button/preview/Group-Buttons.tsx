import {Button, ButtonGroup} from '@financial-times/o3-button';

function ButtonGroupPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<ButtonGroup>
				<Button
					label="Hello"
					type="secondary"
					attributes={{'aria-selected': true}}
				/>
				<Button label="World" type="secondary" />
			</ButtonGroup>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath = 'src/components/button/preview/Group-Buttons.tsx';

export {ButtonGroupPreview as preview};

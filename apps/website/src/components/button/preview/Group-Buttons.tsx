import {Button, ButtonGroup} from '@financial-times/o3-button';

function ButtonGroupPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<ButtonGroup>
				<Button
					label="List"
					type="secondary"
					attributes={{'aria-selected': true}}
					icon="list"
				/>
				<Button label="Grid" type="secondary" icon="grid" />
			</ButtonGroup>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath = 'src/components/button/preview/Group-Buttons.tsx';

export {ButtonGroupPreview as preview};

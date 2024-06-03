import {Button, ButtonGroup} from '@financial-times/o3-button';

function ButtonGroupPreview() {
	return (
		// <preview>
		<ButtonGroup>
			<Button
				label="Hello"
				type="secondary"
				attributes={{'aria-selected': true}}
			/>
			<Button label="World" type="secondary" />
		</ButtonGroup>
		// </preview>
	);
}

export const filePath = 'src/components/button/preview/Group-Buttons.tsx';

export {ButtonGroupPreview as preview};

import { FormFieldset } from "../src/tsx/Form";
import { BoxRadioBtn, BoxRadioBtns, BoxRadioBtnProps } from "../src/tsx/BoxRadioBtns";


interface BoxBtnDemoProps {
	title: string;
	description: string;
	isOptional: boolean;
	Buttons: BoxRadioBtnProps[];
	errorMessage?: string;
	isVerticalCenter?: boolean;
	isInline?: boolean;
	state: 'saving'|'saved'| 'none';
	hideStateText?: boolean;
	customStateText: string;
}

export function BoxBtnDemo({title,
	description,
	Buttons,
	state,
	hideStateText,
	customStateText,
	errorMessage,
	isOptional,
	isVerticalCenter,
	isInline}: BoxBtnDemoProps) {
	return (
			<FormFieldset title={title}
				description={description}
				isOptional={isOptional}
				isInline={isInline}
				isVerticalCenter={isVerticalCenter}>
				<BoxRadioBtns state={state !== 'none' ? state : null }
					customStateText={customStateText}
					hideStateText={hideStateText}
					errorMessage={errorMessage}>
					{Buttons.map((props)=> {
						return <BoxRadioBtn key={props.value} {...props}/>
					})}
				</BoxRadioBtns>
			</FormFieldset>
	)
}

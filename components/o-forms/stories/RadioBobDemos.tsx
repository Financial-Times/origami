import { Form, FormFieldset } from "../src/tsx/Form";
import { BoxRadioBtn, BoxRadioBtns, BoxRadioBtnProps } from "../src/tsx/BoxRadioBtns";


interface BoxBtnDemoProps {
	title: string;
	description: string;
	isOptional: boolean;
	Buttons: BoxRadioBtnProps[];
	state: 'saving'|'saved'| 'none';
	hideStateText?: boolean;
	customStateText: string;
	error?: string;
	isVerticalCenter?: boolean;
	isInline?: boolean;
}

export function BoxBtnDemo({title, description, Buttons, state, hideStateText, customStateText, error, isOptional, isVerticalCenter, isInline}: BoxBtnDemoProps) {
	return (
		<Form>
			<FormFieldset title={title} description={description} isOptional={isOptional} isInline={isInline} isVerticalCenter={isVerticalCenter}>
				<BoxRadioBtns state={state !== 'none' ? state : null } customStateText={customStateText} hideStateText={hideStateText} error={error}>
					{Buttons.map((props)=> {
						return <BoxRadioBtn {...props}/>
					})}
				</BoxRadioBtns>
			</FormFieldset>
		</Form>
	)
}

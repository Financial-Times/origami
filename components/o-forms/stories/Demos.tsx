import { Form, FormField, FormFieldset } from "../src/tsx/Form";
import { TextInput, TextInputType } from "../src/tsx/TextInput";
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

export function BoxBtnDemo({title, description, Buttons, state, hideStateText, customStateText, errorMessage, isOptional, isVerticalCenter, isInline}: BoxBtnDemoProps) {
	return (
		<Form>
			<FormFieldset title={title} description={description} isOptional={isOptional} isInline={isInline} isVerticalCenter={isVerticalCenter}>
				<BoxRadioBtns state={state !== 'none' ? state : null } customStateText={customStateText} hideStateText={hideStateText} errorMessage={errorMessage}>
					{Buttons.map((props)=> {
						return <BoxRadioBtn key={props.value} {...props}/>
					})}
				</BoxRadioBtns>
			</FormFieldset>
		</Form>
	)
}

interface TextBoxDemoProps {
	title: string;
	id: string;
	value: string;
	description: string;
	type: TextInputType;
	name: string;
	onChange: Function;
	ref: any;
	highlight?: 'valid' | 'invalid';
	errorMessage?: string;
	required?: boolean;
	disabled?: boolean;
	isSmall?: boolean;
	hasSuffix?: boolean;

}

export function TextBoxDemo({title, id, value, description, type, name, onChange, ref, highlight, errorMessage, required, disabled, isSmall, hasSuffix}:TextBoxDemoProps){
	return(
		<Form>
			<FormField title={title} id={id} description={description}>
				<TextInput id={id} value={value} name={name} type={type} onChange={onChange} ref={ref} highlight={highlight} errorMessage={errorMessage} required={required} disabled={disabled} isSmall={isSmall} hasSuffix={hasSuffix}>
					<button>button</button>
				</TextInput>
			</FormField>
		</Form>
	)
}

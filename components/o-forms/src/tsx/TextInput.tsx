import { FormError, InputProps } from "./Form";

export type TextInputType = 'text' | 'password' | 'email' | 'textarea';

export interface TextInputProps extends InputProps{
	id: string;
	highlight?: 'valid' | 'invalid';
	errorMessage?: string;
	hasSuffix?: boolean;
	type?: TextInputType;
	isSmall?: boolean;
	children?: JSX.Element;
	onChange?: Function;
	ref?: any; /* Look up correct type */
}

export function TextInput({id, value, type, name, onChange, ref, highlight, errorMessage, isSmall, required, disabled, hasSuffix, children}: TextInputProps) {
	const InputComponent = type !== 'textarea' ? 'input' : 'textarea';
	const modifiers = [];
	const inputType = (!type || type === 'email') ? 'text' : type;
	modifiers.push(`o-forms-input--${inputType}`);
	if(highlight) modifiers.push(`o-forms-input--${highlight}`);
	if(errorMessage) modifiers.push(`o-forms-input--${highlight}`);
	if(isSmall) modifiers.push('o-forms-input--small')
	if((hasSuffix || children) && hasSuffix !== false) modifiers.push('o-forms-input--suffix')
	return(
		<span className={`o-forms-input ${modifiers.join(' ')}`}>
      <InputComponent id={id} type={type} name={name} value={value} onChange={onChange ? event => onChange(event) : null } ref={ref} required={required} disabled={disabled}/>
			{children}
			{errorMessage && <FormError errorMessage={errorMessage}/>}
    </span>
	)
}

/*
Suffix
if children add suffix modifier?
*/

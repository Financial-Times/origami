import { Form, FormFieldset } from "../src/tsx/Form";
import { BoxRadioBtn, BoxRadioBtns } from "../src/tsx/BoxRadioBtns";



export function BoxBtnDemo({title, describedby, boxBtns, saved, isOptional}) {
	/* console.log(saved);

	const saveState = saved ? 'saved' : 'saving'; */
	//console.log(saveState);

	return (<Form>
		<FormFieldset title={title} describedby={describedby} isOptional={isOptional}>
			<BoxRadioBtns state={null} /* customStateText='searching' */>
				{boxBtns.map(({name, value, checked, highlight, isNegative})=> {
					return <BoxRadioBtn name={name} value={value} highlight={highlight} checked={checked} isNegative={isNegative}/>
				})}
			</BoxRadioBtns>
		</FormFieldset>
	</Form>)
}

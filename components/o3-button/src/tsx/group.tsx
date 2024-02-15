import type {ButtonGroupProps} from '../types';
export function ButtonGroup({children = []}: ButtonGroupProps) {
	return <div className="o3-button-group">{children}</div>;
}
